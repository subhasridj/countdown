document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button');
  const initialCountdownEl = document.getElementById('initial-countdown');
  const mainCountdownEl = document.getElementById('main-countdown');
  const initialNumberEl = document.querySelector('.initial-number');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const quoteEl = document.getElementById('quote');
  const letsGoEl = document.getElementById('lets-go');
  const blastSound = document.getElementById('blast-sound');
  const techdivathonAnimationEl = document.getElementById('techdivathon-animation');

  const quotes = [
    "Code like a girl? No, code like a boss!",
    "In a world of ones and zeros, be a multiplier of change.",
    "Behind every successful woman is a tribe of other successful women who have her back.",
    "The future of tech is female, and the future is now!",
    "Women in tech: We're not the future, we're the present.",
    "Debug like a mother: with patience, persistence, and precision.",
    "Your code doesn't care about your gender, it cares about your logic.",
    "Innovation knows no gender.",
    "Empowered women empower women.",
    "The best way to predict the future is to create it."
  ];

  let initialCount = 10;
  let timeLeft = {
    hours: 24,
    minutes: 0,
    seconds: 0
  };

  function createConfetti() {
    const colors = ['#ec4899', '#eab308', '#ffffff', '#f472b6', '#fde047'];
    const confettiCount = 200; // Increased count

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      confetti.style.width = `${5 + Math.random() * 10}px`; // Varied sizes
      confetti.style.height = confetti.style.width;
      confetti.style.animation = `confettiFall ${1 + Math.random() * 2}s linear forwards`;
      document.body.appendChild(confetti);

      confetti.addEventListener('animationend', () => {
        confetti.remove();
      });
    }
  }

  function createBlast() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const colors = ['#ec4899', '#eab308', '#ffffff', '#f472b6', '#fde047'];
    const particleCount = 200; // Increased count

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'blast';
      particle.style.left = centerX + 'px';
      particle.style.top = centerY + 'px';
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 100 + Math.random() * 1400;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;

      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);
      particle.style.animation = 'blastOut 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';

      document.body.appendChild(particle);

      particle.addEventListener('animationend', () => {
        particle.remove();
      });
    }
  }

  function updateQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteEl.textContent = randomQuote;
  }

  // Initial 10-second countdown
  function startInitialCountdown() {
    console.log("Initial countdown started"); // Debugging log
    let initialTimer = setInterval(() => {
      initialCount--;
      initialNumberEl.textContent = initialCount;

      // Play sound and create confetti/blast at the last second of the 10-second countdown
      if (initialCount === 1) {
        blastSound.play();
        setTimeout(() => {
          createConfetti(); // Trigger confetti
          createBlast(); // Trigger blast
        }, 100); // Slight delay to synchronize with sound
      }

      if (initialCount <= 0) {
        clearInterval(initialTimer);
        setTimeout(() => {
          initialCountdownEl.classList.add('hidden');
          techdivathonAnimationEl.classList.remove('hidden');
          setTimeout(() => {
            techdivathonAnimationEl.classList.add('hidden');
            mainCountdownEl.classList.remove('hidden');
            startMainCountdown();
            updateQuote();
          }, 1500); // Delay for the TechDivathon animation
        }, 1000); // Delay 1 second to show the effects
      }
    }, 1000);
  }

  // Main 24-hour countdown
  function startMainCountdown() {
    console.log("Main countdown started"); // Debugging log
    const timer = setInterval(() => {
      if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
        clearInterval(timer);
        return;
      }

      if (timeLeft.seconds === 0) {
        if (timeLeft.minutes === 0) {
          timeLeft.hours--;
          timeLeft.minutes = 59;
        } else {
          timeLeft.minutes--;
        }
        timeLeft.seconds = 59;
      } else {
        timeLeft.seconds--;
      }

      // Update quote every 5 minutes
      if (timeLeft.minutes % 5 === 0 && timeLeft.seconds === 0) {
        updateQuote();
      }

      // Add deadline effect for last 10 minutes
      if (timeLeft.hours === 0 && timeLeft.minutes <= 10) {
        document.querySelectorAll('.timer-card').forEach(card => {
          card.classList.add('deadline');
        });
      }

      // Trigger confetti and blast at 1 second remaining
      if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 1) {
        createConfetti();
        createBlast();
        blastSound.play(); // Play the blast sound again at the end
        letsGoEl.classList.remove('hidden');
        // Create continuous confetti for the last second
        const lastSecondConfetti = setInterval(createConfetti, 100);
        setTimeout(() => clearInterval(lastSecondConfetti), 1000);
      }

      updateDisplay();
    }, 1000);
  }

  function updateDisplay() {
    hoursEl.textContent = String(timeLeft.hours).padStart(2, '0');
    minutesEl.textContent = String(timeLeft.minutes).padStart(2, '0');
    secondsEl.textContent = String(timeLeft.seconds).padStart(2, '0');
  }

  // Start countdown on button click
  startButton.addEventListener('click', () => {
    console.log("Button clicked"); // Debugging log
    startButton.classList.add('hidden');
    startInitialCountdown();
  });

  // Display the start button
  startButton.classList.remove('hidden');
  console.log("Button displayed"); // Debugging log
});

