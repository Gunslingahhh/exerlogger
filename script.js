// Elements
const container = document.getElementById('circleContainer');
const bgCircle = document.querySelector('.bg');
const progressCircle = document.querySelector('.progress');
const timeText = document.getElementById('timeText');
const startBtn = document.getElementById('startBtn');
const clicksElement = document.getElementById('clicks');

// State
let timer = null;
let clickCount = 0;
let circleData = { radius:0, circumference:0 };

// Calculate sizes
function resizeCircle() {
  const size = container.offsetWidth;
  const stroke = 20;
  const radius = (size / 2) - (stroke / 2) - 4;
  const cx = size / 2;
  const cy = size / 2;

  bgCircle.setAttribute('cx', cx);
  bgCircle.setAttribute('cy', cy);
  bgCircle.setAttribute('r', radius);

  progressCircle.setAttribute('cx', cx);
  progressCircle.setAttribute('cy', cy);
  progressCircle.setAttribute('r', radius);

  const circumference = 2 * Math.PI * radius;
  progressCircle.style.strokeDasharray = circumference;
  progressCircle.style.strokeDashoffset = 0;

  timeText.style.fontSize = Math.max(Math.round(size / 6), 20) + 'px';
  startBtn.style.fontSize = Math.max(Math.round(size / 18), 14) + 'px';
  startBtn.style.padding =
    Math.max(Math.round(size / 36), 12) + 'px ' +
    Math.max(Math.round(size / 24), 20) + 'px';

  circleData = { radius, circumference };
  return circleData;
}

resizeCircle();
window.addEventListener('resize', resizeCircle);

function startTimer(durationSeconds) {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  document.body.classList.remove('flash');
  const { circumference } = resizeCircle();
  let time = durationSeconds;

  timeText.style.display = 'block';
  startBtn.style.display = 'none';

  timeText.textContent = `${time}s`;
  progressCircle.style.strokeDashoffset = 0;

  timer = setInterval(() => {
    time--;
    const display = time >= 0 ? `${time}s` : '0s';
    timeText.textContent = display;

    const offset = circumference - Math.max(0, (time / durationSeconds)) * circumference;
    progressCircle.style.strokeDashoffset = isFinite(offset) ? offset : circumference;

    if (time <= 0) {
      clearInterval(timer);
      timer = null;
      timeText.textContent = '';
      progressCircle.style.strokeDashoffset = circumference;
      startBtn.style.display = 'block';
      startBtn.classList.add('fade-in');
      setTimeout(() => startBtn.classList.remove('fade-in'), 300);
      document.body.classList.add('flash');
    }
  }, 1000);
}

startBtn.addEventListener('click', () => {
  clickCount++;
  clicksElement.textContent = `Clicks: ${clickCount}`;
  startBtn.style.display = 'none';
  startTimer(2); // change to e.g. 5 for testing
});
