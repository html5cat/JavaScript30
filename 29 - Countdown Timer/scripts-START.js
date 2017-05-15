let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}


function displayTimeLeft(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  const display = `${min}:${sec < 10 ? '0' + sec : sec}`

  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(t) {
  const end = new Date(t);
  endTimeDisplay.textContent = `Be back at ${end.getHours()}:${end.getMinutes() < 10 ? '0' + end.getMinutes() : end.getMinutes()}`;
}

function startTimer() {
  timer(this.dataset.time);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  timer(this.minutes.value * 60);
  this.reset();
});
