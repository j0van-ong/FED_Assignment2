// Function to start the countdown after the page finishes loading
let totalTimeInSeconds = 150; // 2 minutes and 30 seconds

function startTimer() {
  // Get the initial time from the timer div, currently at 00:02:30
  console.log("hi") //test
  let timerElement = document.getElementById('timer');

  let countdownInterval = setInterval(function () {
      let hours = Math.floor(totalTimeInSeconds / 3600);
      let minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
      let seconds = totalTimeInSeconds % 60;

      let formattedTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
      timerElement.textContent = formattedTime;

      if (totalTimeInSeconds <= 0) {
          clearInterval(countdownInterval);
          alert('Countdown complete!');
      } else {
          totalTimeInSeconds--;
      }
  }, 1000);
}
    
// Function to format time (add leading zeros)
function formatTime(time) {
  return time < 10 ? '0' + time : time;
}

window.onload = function(){
    startTimer();
}