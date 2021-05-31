/*  ----------------------------------- work and break button ----------------------------------------*/

// select work button and break button
const workBtn = document.querySelector("#workbtn");
const breakBtn = document.querySelector("#breakbtn");

workBtn.addEventListener("click", event => {
    if (workBtn.classList.contains("active")) {// if breakBtn if active, get timeLeft from beakTimeEl
        stopTimer();
    }

    active(workBtn); // set workBtn to active
    inactive(breakBtn); // set breakBtn to inactive
    setTimer(); // set timer
})

breakBtn.addEventListener("click", () => {
    if (workBtn.classList.contains("active")) {// if breakBtn if active, get timeLeft from beakTimeEl
        stopTimer();
    }

    active(breakBtn); // set breakBtn to active
    inactive(workBtn); // set workBtn to inactive
    setTimer(); // set timer
})

function active(btn) {
    btn.classList.add("active");
}

function inactive(btn) {
    btn.classList.remove("active");
}


/*  ------------------------------------------ plus and minus button ------------------------------------------*/

// selct plus and minus buttons
const workPlususBtn = document.querySelector(".WORK .plus");
const workMinusBtn = document.querySelector(".WORK .minus");

const breakPlususBtn = document.querySelector(".BREAK .plus");
const breakMinusBtn = document.querySelector(".BREAK .minus");

// select the work time element and break time element
const workTimeEl = document.querySelector(".work.number");
const breakTimeEl = document.querySelector(".break.number");

let workMin = 25; // default work time is 25 min
// add event listeners to the buttons
workPlususBtn.addEventListener("click", () => {
    workMin++ // one click means adding one minute
    setWorkTime();
})
workMinusBtn.addEventListener("click", () => {
    workMin--; // one click means substrating one minute
    setWorkTime();
})

function setWorkTime() {
    if (0 < workMin & workMin < 61) { // workMin should not be negative or greater than 60
        workTimeEl.innerHTML = workMin; // update workTimeEl
        setTimer(); // update timer
    }
}

let breakMin = 5; // default break time is 5 min
breakPlususBtn.addEventListener("click", () => {
    breakMin++;
    setBreakTime();
})
breakMinusBtn.addEventListener("click", () => {
    breakMin--;
    setBreakTime();
});

function setBreakTime() {
    if (0 < breakMin & breakMin < 31) {
        breakTimeEl.innerHTML = breakMin;
        setTimer(); // update timer
    }
}


/*  ---------------------------------- start, stop and reset buttons ---------------------------------------*/

// select start, stop and reset buttons
const startBtn = document.querySelector("#startbtn");
const stopBtn = document.querySelector("#stopbtn");
const resetBtn = document.querySelector("#resetbtn");

// select time left element and progressin bar 
const timeLeft = document.querySelector("#time-left");
const bar = document.querySelector(".progress-bar");


let myInterval = -1;
var seconds = checkMode();
var totalSec = seconds;
startBtn.addEventListener("click", () => {
    if (myInterval == -1) {
        myInterval = setInterval(() => {
            startBtn.innerHTML = "STOP"; // change button to stop
            seconds--;
            if (seconds == 0) {
                stopTimer();
                setTimer();
                alert("FINISHED!");
            }

            let progression = (parseInt((totalSec - seconds) / totalSec * 100));// convert the progression percentage to one decimal
            console.log(progression)
            bar.innerHTML = progression + '%'; // format progression percentage to percentage + '%'
            bar.style.width = progression + '%'; // update progress bar width

            let secLeft;
            let minLeft;
            minLeft = Math.trunc(seconds / 60);
            secLeft = seconds % 60;
            if (secLeft < 10) secLeft = '0' + seconds % 60;

            timeLeft.innerHTML = minLeft + " : " + secLeft; // format countdown string + set tag value
        }, 1000);
    } else {
        stopTimer();
    }
})

function stopTimer() {
    startBtn.innerHTML = "START";
    clearInterval(myInterval);
    myInterval = -1;
}

function checkMode() {
    let countdownMin;
    let countdownSec;
    // if workBtn is active, get countdown time form workTimeEl
    if (workBtn.classList.contains("active")) {
        countdownMin = parseInt(workTimeEl.innerHTML);
    }
    // if breakBtn is active, get countdown time form breakTimeEl
    if (breakBtn.classList.contains("active")) {
        countdownMin = parseInt(breakTimeEl.innerHTML);
    }
    countdownSec = countdownMin * 60;
    return countdownSec;
}

resetBtn.addEventListener("click", () => {
    setTimer(); // set timer
    stopTimer();
})

function setTimer() {
    // if workBtn is active, get timeLeft from workTimeEl
    if (workBtn.classList.contains("active"))
        timeLeft.innerHTML = workTimeEl.innerHTML + " : 00"; // format timeLeft
    // if breakBtn if active, get timeLeft from beakTimeEl
    if (breakBtn.classList.contains("active"))
        timeLeft.innerHTML = breakTimeEl.innerHTML + " : 00"; // format timeLeft

    seconds = checkMode();
    totalSec = seconds;
    bar.innerHTML = "0.0 %";
    bar.style.width = "0%";
}

