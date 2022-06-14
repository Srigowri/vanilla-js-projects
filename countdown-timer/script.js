
const newYears = '23 Nov 2022';
let daysElement = document.getElementById('days');
let hoursElement = document.getElementById('hours');
let minutesElement = document.getElementById('minutes');
let secondsElement = document.getElementById('seconds');

function countdown(){
    const currentDate = new Date();
    const newYearsDate = new Date(newYears);
    const diff = newYearsDate - currentDate;
    const totalSeconds = diff/1000;
    const days = Math.floor(totalSeconds/ (3600*24) );
    const hours = Math.floor((totalSeconds / 3600) %24);
    const minutes = Math.floor ((totalSeconds/60)%60);
    const seconds = Math.floor(totalSeconds % 60);
    
    daysElement.innerHTML = days;
    hoursElement.innerHTML = formatTime(hours);
    minutesElement.innerHTML = formatTime(minutes);
    secondsElement.innerHTML = formatTime(seconds);

}
function formatTime(time){
    return time < 10 ? `0${time}`: time;
}
countdown();
setInterval(countdown, 1000);