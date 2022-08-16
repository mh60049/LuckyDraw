//This piece of codes will be running on the server side. The codes here cannot be seen from any clients.

const express = require('express');  //Import the package of Express
const Datastore = require('nedb');  //Import the package of NeDB database
require('dotenv').config();  //Import the package of DotEnv (for management of Environment Variables)

const app = express();  //Assign the whole package of Express to an variable "app"
const port = process.env.PORT  || 3000;  //If the PORT cannot be determined automatically, then use PORT of 3000

//Listen at the port
app.listen(port, () => {
 console.log(`Starting server at ${port}`);
});

app.use(express.static('public'));  //To send the contents of the whole directory "public" to client upon receiving a request
app.use(express.json({ limit: '1mb'}));  //Set the limit to 1mb

const dbDraw = new Datastore('draw.db');
dbDraw.loadDatabase();

app.get('/api', (request, response) => {
  dbDraw.find({}, (err, data) => {  //Query the database to find everythging
    if (err) {
      response.end();
      return;
    }
  response.json(data);  //Send back data to the client
  });
});

//Receive request from client via post. "Request" is from client. "Response" is back to client.
app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;  //Add TimeStamp to the existing data (request.body)
  dbDraw.insert(data);  //Save data to the database
  //Define the contents of the response to be sent back to client
  response.json({
    status: 'success',
    mood: data.mood,
    latitude: data.lat,
    longitude: data.lon,
    timestamp: data.timestamp
  })
});