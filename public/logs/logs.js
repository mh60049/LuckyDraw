let lngTotal = 0;  //Total number of users
getData();
let myTimer;
let myID0 = 0;
let myID;


async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  let theID = 0;
  let userID = '';
  lngTotal = JSON.parse(JSON.stringify(data)).length
  root = document.getElementById('rootID');
  for (item of data) {
    theID++;
    const userName = document.createElement('div');
    userName.className='userName1';
    userID = ('id' + toString(theID));
    userName.id = theID;
    userName.textContent = `${item.mood}`;

    root.append(userName);
  }
  console.log(data);
}

function changeStyle(){
  if (myID0 > 0) {
    let element0=document.getElementById(myID0);
    element0.style.backgroundColor = "red";
  }
  console.log(lngTotal);
  myID = Math.floor(Math.random() * lngTotal) + 1;
  let element = document.getElementById(myID);
  element.style.backgroundColor = "green";

  myID0 = myID;
  document.getElementById('txtWinner').textContent=element.textContent
}

function startDraw() {
  myTimer = setInterval(changeStyle, 200);
}

function stopDraw() {
  clearInterval(myTimer);
}