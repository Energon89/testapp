import { ClassHelper } from "./classHelper.js";

function StopwatchTimer(initMode, initSeconds) {
  let mode = initMode;
  let time, start, currentTime;
  let startTime = initSeconds;
  const self = this;

  this.htmlElements = {
    output: document.querySelector(
      `.container [data-mode = "${mode}"] .output`
    ),
    buttons: document.querySelectorAll(
      `.container .tabs [data-mode="${mode}"] .buttons button`
    ),
    startButton: document.querySelector(
      `.container .tabs [data-mode="${mode}"] .buttons .start`
    ),
    stopButton: document.querySelector(
      `.container .tabs [data-mode="${mode}"] .buttons .stop`
    ),
    resetButton: document.querySelector(
      `.container .tabs [data-mode="${mode}"] .buttons .reset`
    )
  };

  const htmlElements = this.htmlElements;

  htmlElements.startButton.addEventListener("click", onStartButtonClick);
  htmlElements.stopButton.addEventListener("click", onStopButtonClick);
  htmlElements.resetButton.addEventListener("click", onResetButtonClick);

  function onStartButtonClick() {
    start = new Date().getTime();
    time = setInterval(myInterval, 1000);
    ClassHelper.removeClass("disabled", htmlElements.buttons);
    ClassHelper.addClass("disabled", [htmlElements.startButton]);
  }

  function onStopButtonClick() {
    ClassHelper.removeClass("disabled", htmlElements.buttons);
    ClassHelper.addClass("disabled", [htmlElements.stopButton]);
    clearInterval(time);
    startTime = currentTime;
  }

  function onResetButtonClick() {
    ClassHelper.removeClass("disabled", htmlElements.buttons);
    ClassHelper.addClass("disabled", [htmlElements.resetButton]);
    clearInterval(time);
    start = new Date().getTime();
    startTime = initSeconds;
    myInterval(initSeconds);
  }

  function myInterval() {
    const difference = self.calculateDifference(startTime, start, time);

    let hours = parseInt(difference / 3600);
    let minutes = parseInt((difference / 60) % 60);
    let seconds = parseInt(difference % 60);

    currentTime = hours * 3600 + minutes * 60 + seconds;

    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    htmlElements.output.innerText = `${hours}:${minutes}:${seconds}`;
  }
}

export { StopwatchTimer };
