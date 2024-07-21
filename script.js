let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapTimes = [];

const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const timeDisplay = document.getElementById('time');
const lapsDisplay = document.getElementById('laps');

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function startStop() {
  if (!running) {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
    running = true;
    startStopButton.innerHTML = 'Pause';
  } else {
    clearInterval(tInterval);
    running = false;
    startStopButton.innerHTML = 'Start';
  }
}

function reset() {
  clearInterval(tInterval);
  running = false;
  startStopButton.innerHTML = 'Start';
  timeDisplay.innerHTML = '00:00:00';
  lapsDisplay.innerHTML = '';
  lapTimes = [];
}

function getShowTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;
  let milliseconds = Math.floor((difference % 1000) / 10);
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  milliseconds = (milliseconds < 10) ? '0' + milliseconds : milliseconds;
  seconds = (seconds < 10) ? '0' + seconds : seconds;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  timeDisplay.innerHTML = `${minutes}:${seconds}:${milliseconds}`;
}

function recordLap() {
  if (running) {
    let lapTime = timeDisplay.innerHTML;
    lapTimes.push(lapTime);
    let lapElement = document.createElement('div');
    lapElement.innerHTML = `Lap ${lapTimes.length}: ${lapTime}`;
    lapsDisplay.appendChild(lapElement);
  }
}
