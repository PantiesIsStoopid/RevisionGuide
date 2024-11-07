let countdownTimer;
let dingSound = document.getElementById('ding-sound');
let timeRemaining;

function updateCountdownDisplay() {
  let minutes = Math.floor(timeRemaining / 60);
  let seconds = timeRemaining % 60;
  document.getElementById('countdown-display').textContent =
    `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

document.getElementById('start-timer').addEventListener('click', () => {
  const timeInput = parseInt(document.getElementById('time-input').value);

  // Initialize the timer with correct seconds and update the UI
  timeRemaining = timeInput * 60;
  updateCountdownDisplay();

  countdownTimer = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining--;
      updateCountdownDisplay();
    } else {
      clearInterval(countdownTimer);
      dingSound.play();
      alert('Time is up!');
    }
  }, 1000);
});

document.querySelectorAll('.subject').forEach(button => {
  button.addEventListener('click', (event) => {
    const subject = event.target.getAttribute('data-subject');
    openSubjectTabs(subject);
  });
});

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

  if (subjectTabs[subject]) {
    subjectTabs[subject].forEach(url => {
      chrome.tabs.create({ url });
    });
  }
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'timerDone') {
    alert('Time is up!');
    dingSound.play();
  }
});
