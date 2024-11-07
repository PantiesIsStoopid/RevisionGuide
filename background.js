let countdownTimer;
let timeRemaining;
let alarmSound = new Audio(chrome.runtime.getURL('ding.mp3')); // Load sound

chrome.runtime.onInstalled.addListener(() => {
  console.log("Study Companion Extension Installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'startTimer') {
    startTimer(message.minutes);
  } else if (message.type === 'cancelTimer') {
    cancelTimer();
  }
});

function startTimer(minutes) {
  timeRemaining = minutes * 60;  // Convert minutes to seconds
  console.log(`Timer started. Total time: ${timeRemaining} seconds.`);

  // Start the timer in the background
  countdownTimer = setInterval(() => {
    timeRemaining--;  // Decrease time by 1 second

    // If the time runs out, stop the timer and play the sound
    if (timeRemaining <= 0) {
      clearInterval(countdownTimer);
      alarmSound.play();  // Play the "ding" sound
      chrome.runtime.sendMessage({ type: 'timerDone' }); // Notify popup
      console.log('Timer ended.');
    }
  }, 1000);  // Interval of 1 second
}

function cancelTimer() {
  if (countdownTimer) {
    clearInterval(countdownTimer);
    console.log('Timer canceled.');
  }
}
