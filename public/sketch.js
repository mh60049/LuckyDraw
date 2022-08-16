function setup() {
  let lat, lon;
  const button = document.getElementById('submit');
  button.addEventListener('click', async event => {
    const mood = document.getElementById('mood').value;
    const drawn = false;
    const data = { lat, lon, mood, drawn };
    const options = {
      method: 'POST',  //Use POST in fetch function to pass data to the server
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const response = await fetch('/api', options);  //To post data to server then get "response"
    const json = await response.json();
    document.getElementById('msg1').textContent=`${mood} has been submitted.`
  });

  if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      document.getElementById('latitude').textContent = lat;
      document.getElementById('longitude').textContent = lon;
    });
  } else {
    console.log('geolocation not available');
  }
}