const btnStartRef = document.querySelector('button[data-start]');
const btnStopRef = document.querySelector('button[data-stop]');
const bodyRef = document.querySelector('body');
let timerId;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

const stopColor = ()=>{
    btndisabled(btnStopRef,btnStartRef);
    clearInterval(timerId);
}

const startColor = ()=>{
    btndisabled(btnStartRef,btnStopRef);
    bodyColor();
    timerId = setInterval(bodyColor, 1000);
}

const bodyColor = ()=>{    
    bodyRef.setAttribute("style",`background-color: ${getRandomHexColor()};`);
}

const btndisabled = (btnActiv,btnPass)=>{
    btnActiv.setAttribute("disabled","");
    btnPass.removeAttribute("disabled");
}

btnStartRef.addEventListener('click',startColor);
btnStopRef.addEventListener('click',stopColor);


