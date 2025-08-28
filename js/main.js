// === Таймер до следующей выдачи сатоши ===
function startClaimTimer(duration, display) {
  let timer = duration, minutes, seconds;
  setInterval(() => {
    minutes = String(parseInt(timer / 60, 10)).padStart(2, '0');
    seconds = String(parseInt(timer % 60, 10)).padStart(2, '0');
    display.textContent = minutes + ":" + seconds;
    if (--timer < 0) timer = duration;
  }, 1000);
}
startClaimTimer(3600, document.getElementById('timer'));

// === Демо HI‑LO ===
const rollBtn = document.getElementById('roll-btn');
const rollResult = document.getElementById('roll-result');
if (rollBtn) {
  rollBtn.addEventListener('click', () => {
    let roll = Math.floor(Math.random() * 10000);
    rollResult.textContent = `🎲 ${roll.toString().padStart(4, '0')}`;
    if (roll === 8888) {
      alert('Выпало 8888! Представь, что это был реальный выигрыш 😎');
    }
  });
}

// === Калькулятор дохода ===
const friendsInput = document.getElementById('friends');
const betsInput = document.getElementById('bets');
const incomeOutput = document.getElementById('income');

function calculateIncome() {
  const friends = parseInt(friendsInput.value) || 0;
  const betsPerDay = parseInt(betsInput.value) || 0;
  const refPercent = 0.004; // 0.40%
  const satoshiPerBet = 500; // пример
  const btcPerSatoshi = 0.00000001;
  const monthlyIncome = friends * betsPerDay * 30 * satoshiPerBet * btcPerSatoshi * refPercent;
  incomeOutput.textContent = monthlyIncome.toFixed(8) + ' BTC';
}

if (friendsInput && betsInput) {
  friendsInput.addEventListener('input', calculateIncome);
  betsInput.addEventListener('input', calculateIncome);
  calculateIncome();
}

// === Таймер лотереи (пример) ===
function startLottoTimer(days, hours, minutes, seconds, display) {
  let totalSeconds = days*86400 + hours*3600 + minutes*60 + seconds;
  setInterval(() => {
    let d = Math.floor(totalSeconds / 86400);
    let h = Math.floor((totalSeconds % 86400) / 3600);
    let m = Math.floor((totalSeconds % 3600) / 60);
    let s = totalSeconds % 60;
    display.textContent = `${d}д ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    if (--totalSeconds < 0) totalSeconds = 0;
  }, 1000);
}
startLottoTimer(32, 17, 29, 3, document.getElementById('lotto-timer'));

// === Бегущая строка победителей (фейковые данные) ===
const winners = [
  "user123 получил 0.0005 BTC",
  "cryptoFan выиграл 0.0012 BTC",
  "alexBTC заработал 0.0008 BTC",
  "satoshi4life получил 0.0020 BTC"
];
let feedIndex = 0;
setInterval(() => {
  const feed = document.getElementById('live-feed');
  if (feed) {
    feed.textContent = `💬 ${winners[feedIndex]}`;
    feedIndex = (feedIndex + 1) % winners.length;
  }
}, 4000);

// === Монетопад ===
function createCoin() {
  const coin = document.createElement('div');
  coin.classList.add('coin');
  coin.style.left = Math.random() * 100 + 'vw';
  coin.style.animationDuration = (3 + Math.random() * 2) + 's';
  document.querySelector('.hero').appendChild(coin);
  setTimeout(() => coin.remove(), 5000);
}

setInterval(createCoin, 300);

// Еженедельная лотерея до воскресенья
function nextSundayCountdown(display) {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysUntilSunday = (7 - dayOfWeek) % 7 || 7;
  const sunday = new Date(now);
  sunday.setDate(now.getDate() + daysUntilSunday);
  sunday.setHours(20, 0, 0, 0); // например, 20:00

  function updateTimer() {
    const diff = sunday - new Date();
    let d = Math.floor(diff / 86400000);
    let h = Math.floor((diff / 3600000) % 24);
    let m = Math.floor((diff / 60000) % 60);
    let s = Math.floor((diff / 1000) % 60);
    display.textContent = `${d}д ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }
  updateTimer();
  setInterval(updateTimer, 1000);
}
nextSundayCountdown(document.getElementById('lotto-timer'));

// Розыгрыш Lamborghini — фиксируем дату
function lamboCountdown(display) {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 32); // пример 32 дня до конца
  endDate.setHours(0, 0, 0, 0);

  function updateTimer() {
    const diff = endDate - new Date();
    let d = Math.floor(diff / 86400000);
    let h = Math.floor((diff / 3600000) % 24);
    let m = Math.floor((diff / 60000) % 60);
    let s = Math.floor((diff / 1000) % 60);
    display.textContent = `${d}д ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }
  updateTimer();
  setInterval(updateTimer, 1000);
}
lamboCountdown(document.getElementById('lambo-timer'));
