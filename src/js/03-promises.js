import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
const inputDelayRef = formRef.querySelector('[name="delay"]')
const inputStepRef = formRef.querySelector('[name="step"]')
const inputAmountRef = formRef.querySelector('[name="amount"]')
const btnSubmitRef = formRef.querySelector('[type="submit"]')

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
            if (shouldResolve)  {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const startCreate =(event)=>{
event.preventDefault();
  let delay = +inputDelayRef.value;
  const delayStep = +inputStepRef.value;
  const amount = inputAmountRef.value;

for(let i = 1; i<=amount;i+=1){

  createPromise(i, delay)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });

  delay += delayStep;

}
}

btnSubmitRef.addEventListener('click',startCreate)