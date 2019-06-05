const htmlElements = { 
    output: document.querySelector('.container [data-mode="stopwatch"] .output'),
    buttons: document.querySelectorAll('.container [data-mode="stopwatch"] .buttons button')
};

let startTime = 0;
let time, hours, minutes, seconds;
let isRunning = false;


function Stopwatch() {};
  
Stopwatch.prototype.init = function() {
    htmlElements.buttons.forEach(function(button) {
        button.addEventListener('click', function() { buttonClicked(this.dataset.mode);});
    });
  };

  function buttonClicked (mode){
    switch (mode) {
        case 'start':
        if(!isRunning){
        isRunning = true;
        startTimer(startTime);}
        break;
        case 'stop':
        clearInterval(time);
        isRunning = false; 
        break;
        case 'reset':
        isRunning = false; 
        clearInterval(time);
        startTime = 0;
        htmlElements.output.innerText = '00:00:00';
    }
};


function startTimer(duration) {
    if(isRunning){
    const start = new Date().getTime();

    function timer () {
    const difference = duration + ((new Date().getTime() - start) / 1000);
    seconds = parseInt(difference % 60);
    minutes = parseInt((difference / 60) % 60);
    hours = parseInt(difference/3600);

    startTime = hours*3600 + minutes*60 + seconds;

    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    
    htmlElements.output.innerText = `${hours}:${minutes}:${seconds}`;}
    timer();
    time = setInterval(timer, 1000);}
}

  export { Stopwatch };