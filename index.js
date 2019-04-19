const turnCounter = document.getElementById('turn');
const topLeft = document.getElementById('topLeft');
const topRight = document.getElementById('topRight');
const bottomLeft = document.getElementById('bottomLeft');
const strictButton = document.getElementById('strict');
const onButton = document.getElementById('on');
const startButton = document.getElementById('start');

let order = [];
let playerOrder = [];
let flash;
let turn;
let correct;
let wrong;
let computerTurn;
let intervalID;
let strict = false;
let noise = true;
let on = false;
let win;
const maximumTurns = 20;

strictButton.addEventListener('change', event => {
  if (strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});

onButton.addEventListener('click', event => {
  if (onButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColour();
    clearInterval(intervalID);
  }
});

startButton.addEventListener('click', event => {
  if (on || win) {
    play();
  }
});

function clearColour() {
  topLeft.style.backgroundImage = 'none';
  topLeft.style.backgroundColor = 'lightgreen';
  topRight.style.backgroundImage = 'none';
  topRight.style.backgroundColor = 'lightgrey';
  bottomLeft.style.backgroundImage = 'none';
  bottomLeft.style.backgroundColor = 'tomato';
  bottomRight.style.backgroundImage = 'none';
  bottomRight.style.backgroundColor = 'lightskyblue';
}

function flashImage() {
  topLeft.style.backgroundImage = 'grass.jpg';
  topRight.style.backgroundImage = 'storm.jpg';
  bottomLeft.style.backgroundImage = 'fire.jpg';
  bottomRight.style.backgroundImage = 'water.jpg';
}

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalID = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  correct = true;
  for (let i = 0; i < maximumTurns; i++) {
    order.push(Math.floor(Math.random() * 4) + 1)
  }
  computerTurn = true;
  intervalID = setInterval(gameTurn, 1000);
}

function gameTurn() {
  on = false;
  if (flash == turn) {
    clearInterval(intervalID);
    computerTurn = false;
    clearColour();
    on = true;
  }

  if (computerTurn) {
    clearColour();
    setTimeout(() => {
      if(order[flash] == 1) earth();
      if(order[flash] == 2) wind();
      if(order[flash] == 3) fire();
      if(order[flash] == 4) water();
      flash++;
    }, 500)
  }
}

function earth() {
  if(noise) {
    let audio = document.getElementById('earth');
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundImage = 'url(grass.jpg)';
}

function wind() {
  if(noise) {
    let audio = document.getElementById('wind');
    audio.play();
  }
  noise = true;
  topRight.style.backgroundImage = 'url(storm.jpg)';
}

function fire() {
  if(noise) {
    let audio = document.getElementById('fire');
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundImage = 'url(fire.jpg)';
}

function water() {
  if(noise) {
    let audio = document.getElementById('water');
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundImage = 'url(water.jpg)';
}

topLeft.addEventListener('click', event => {
    if (on) {
      playerOrder.push(1);
      check();
      earth();
      if(!win) {
        setTimeout(() => {
          clearColour();
        }, 500);
      }
    }
})

topRight.addEventListener('click', event => {
    if (on) {
      playerOrder.push(2);
      check();
      wind();
      if(!win) {
        setTimeout(() => {
          clearColour();
        }, 500)
      }
    }
})

bottomLeft.addEventListener('click', event => {
  if (on) {
    playerOrder.push(3);
    check();
    fire();
    if(!win) {
      setTimeout(() => {
        clearColour();
      }, 500)
    }
  }
})

bottomRight.addEventListener('click', event => {
  if (on) {
    playerOrder.push(4);
    check();
    water();
    if(!win) {
      setTimeout(() => {
        clearColour();
      }, 500)
    }
  }
})

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    correct = false;

  if (playerOrder.length == 10 && correct) {
    winGame();
  }
  if (correct == false) {
    flashImage();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColour();

      if (strict) {
        play();
      } else {
        computerTurn = true;
        flash = 0;
        playerOrder = [];
        correct = true;
        intervalID = setInterval(gameTurn, 1000);
      }
    }, 1000);

    noise = false;
  }
    if (turn == playerOrder.length && correct && !win) {
      turn++;
      playerOrder = [];
      computerTurn = true;
      flash = 0;
      turnCounter.innerHTML = turn;
      intervalID = setInterval(gameTurn, 1000)
    }
}

function winGame() {
  flashImage();
  turnCounter.innerHTML = 'WIN!';
  on = false;
  win = true;
}
