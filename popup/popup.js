let countdownTimer; // This will hold the interval ID to manage the timer
let dingSound = document.getElementById('ding-sound'); // Get the "ding" sound element
let timeRemaining; // To keep track of remaining time

// Function to update the countdown display
function updateCountdownDisplay() {
  let minutes = Math.floor(timeRemaining / 60);
  let seconds = timeRemaining % 60;
  // Ensure two digits for seconds
  document.getElementById('countdown-display').textContent = 
    `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Send message to background to start the timer
document.getElementById('start-timer').addEventListener('click', () => {
  const timeInput = parseInt(document.getElementById('time-input').value);
  
  // Send message to background to start the timer
  chrome.runtime.sendMessage({ type: 'startTimer', minutes: timeInput });

  console.log(`Starting timer for ${timeInput} minutes`);

  // Set initial time for countdown and update the UI
  timeRemaining = timeInput * 60;
  updateCountdownDisplay();

  // Start interval to update the countdown display every second
  countdownTimer = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining--;
      updateCountdownDisplay();
    } else {
      clearInterval(countdownTimer); // Stop interval when time runs out
    }
  }, 1000);
});

// Subject button click event handler
document.querySelectorAll('.subject').forEach(button => {
  button.addEventListener('click', (event) => {
    const subject = event.target.getAttribute('data-subject');
    openSubjectTabs(subject);
  });
});

// Function to open the relevant tabs based on subject
function openSubjectTabs(subject) {
  const subjectTabs = {
    english: [
      'https://www.bbc.co.uk/bitesize/subjects/zr9d7ty',
      'https://quizlet.com/gb',
      'https://senecalearning.com/en-GB/'
    ],
    spanish: [
      'https://www.duolingo.com/',
      'https://translate.google.com/',
      'https://www.bbc.co.uk/bitesize/subjects/z4dqxnb'
    ],
    french: [
      'https://www.duolingo.com/',
      'https://translate.google.com/',
      'https://www.bbc.co.uk/bitesize/subjects/z9dqxnb'
    ],
    german: [
      'https://www.duolingo.com/',
      'https://translate.google.com/',
      'https://www.bbc.co.uk/bitesize/subjects/z8j2tfr'
    ],
    history: [
      'https://www.revisely.com/',
      'https://www.physicsandmathstutor.com/'
    ],
    geography: [
      'https://www.physicsandmathstutor.com/',
      'https://www.geography-revision.co.uk/'
    ],
    maths: [
      'https://www.physicsandmathstutor.com/',
      'https://www.cognitoedu.org/',
      'https://www.desmos.com/'
    ],
    physics: [
      'https://www.physicsandmathstutor.com/',
      'https://www.cognitoedu.org/'
    ],
    chemistry: [
      'https://www.physicsandmathstutor.com/',
      'https://www.cognitoedu.org/'
    ],
    bio: [
      'https://www.physicsandmathstutor.com/',
      'https://www.cognitoedu.org/'
    ]
  };

  // Open the relevant tabs for the selected subject
  if (subjectTabs[subject]) {
    subjectTabs[subject].forEach(url => {
      chrome.tabs.create({ url });
    });
  }
}

// Listen for when the timer is done, then show a message or notification
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'timerDone') {
    alert('Time is up!');
    dingSound.play(); // Play the "ding" sound when the timer ends
  }
});
