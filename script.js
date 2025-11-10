let secret = generateSecret(4);
let history = [];
let attempts = 0;

const input = document.getElementById("guessInput");
const result = document.getElementById("result");
const attemptsTxt = document.getElementById("attempts");
const restartBtn = document.getElementById("restartBtn");
const giveUpBtn = document.getElementById("giveUpBtn");
const historyBox = document.getElementById("history");

document.getElementById("submitBtn").addEventListener("click", checkGuess);
restartBtn.addEventListener("click", resetGame);
giveUpBtn.addEventListener("click", giveUp);

function generateSecret(length) {
  const digits = "0123456789".split("");
  let result = "";
  for (let i = 0; i < length; i++) {
    const idx = Math.floor(Math.random() * digits.length);
    result += digits[idx];
    digits.splice(idx, 1);
  }
  console.log("Secret:", result);
  return result;
}

function checkGuess() {
  const guess = input.value.trim();
  if (!/^\d{4}$/.test(guess)) {
    result.textContent = "❌ ต้องกรอกเลข 4 หลักเท่านั้น!";
    return;
  }

  attempts++;
  let bulls = 0;
  let cows = 0;

  for (let i = 0; i < 4; i++) {
    if (guess[i] === secret[i]) bulls++;
    else if (secret.includes(guess[i])) cows++;
  }

  history.push(`${guess} → ถูกตรงตำแหน่ง: ${bulls}, ถูกผิดตำแหน่ง: ${cows}`);
  historyBox.innerHTML = history.join("<br>");

  if (bulls === 4) {
    result.textContent = `🎉 ถูกต้อง! คุณทายถูกใน ${attempts} รอบ✅`;
    restartBtn.classList.remove("hidden");
    return;
  }

  result.textContent = `รอบล่าสุด: ถูกตรงตำแหน่ง ${bulls}, ผิดตำแหน่ง ${cows}`;
  attemptsTxt.textContent = `รอบที่เล่น: ${attempts}`;

  input.value = "";
  input.focus();
}

function resetGame() {
  secret = generateSecret(4);
  attempts = 0;
  history = [];
  result.textContent = "";
  attemptsTxt.textContent = "";
  historyBox.innerHTML = "";
  restartBtn.classList.add("hidden");
  input.value = "";
  input.focus();
}

function giveUp() {
  result.textContent = `💥 คำตอบคือ: ${secret}`;
  history.push(`เฉลย: ${secret}`);
  historyBox.innerHTML = history.join("<br>");
  restartBtn.classList.remove("hidden");
}
