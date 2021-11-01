import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength,padString) {
      targetLength = targetLength>>0; //floor if number or convert non-number to 0;
      padString = String(padString || ' ');
      if (this.length > targetLength) {
          return String(this);
      }
      else {
          targetLength = targetLength-this.length;
          if (targetLength > padString.length) {
              padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
          }
          return padString.slice(0,targetLength) + String(this);
      }
  };
}

const btnStartDateRef = document.querySelector("button[data-start]");
const daysRef = document.querySelector("[data-days]");
const hoursRef = document.querySelector("[data-hours]");
const minutesRef = document.querySelector("[data-minutes]");
const secondsRef = document.querySelector("[data-seconds]");
let selectedtime;
let timerId;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
       selectedtime = selectedDates[0].getTime();
        const  timeResult = selectedtime-new Date().getTime();
if(timeResult<0){
    setDisabled(btnStartDateRef);
    Notify.failure('Please choose a date in the future');
 } 
else{
    removeDisabled(btnStartDateRef); 
}  },  };

  const setDisabled = (element) => {
      if(element.hasAttribute("disabled")){return}
    element.setAttribute("disabled","");
  }
  const removeDisabled = (element) => {
    element.removeAttribute("disabled");
  }

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
 const startTimer = () => {
  setDisabled(btnStartDateRef);
     if(timerId){ clearInterval(timerId);}
     addTime(selectedtime);
     timerId = setInterval(addTime, 1000,selectedtime);
 }

const addLeadingZero = (value) => {
return value.toString().padStart(2,"0");
}

const clearTime = ()=>{
  clearInterval(timerId);
  daysRef.textContent="00";
   hoursRef.textContent="00";
minutesRef.textContent="00";
secondsRef.textContent="00"; 
}

 const addTime = (timeMs) => {
    const  timeResult = timeMs-new Date().getTime();
    if(timeResult<0){
        setDisabled(btnStartDateRef);
        clearTime();
        Notify.success('Bo-o-om');   
         return;
     } 
   const time =convertMs(timeResult);
   daysRef.textContent=addLeadingZero(time.days);
   hoursRef.textContent=addLeadingZero(time.hours);
minutesRef.textContent=addLeadingZero(time.minutes);
secondsRef.textContent=addLeadingZero(time.seconds);
 }

  setDisabled(btnStartDateRef);
flatpickr("#datetime-picker", options);
btnStartDateRef.addEventListener('click',startTimer)
