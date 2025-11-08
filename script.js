let secret = generateSecret(4);
let history = [];
let attempts = 0;


const input = document.getElementById("guessInput");
const result = document.getElementById("result");
const attemptsTxt = document.getElementById("attempts");
const restartBtn = document.getElementById("restartBtn");
const giveUpBtn = document.getElementById("giveUpBtn");

document.getElementById("submitBtn").addEventListener("click", checkGuess);
restartBtn.addEventListener("click", resetGame);
giveUpBtn.addEventListener("click", giveUp);

function generateSecret(length) {
  let digits = "0123456789".split("");
  let result = "";
  for (let i = 0; i < length; i++) {
    const idx = Math.floor(Math.random() * digits.length);
    result += digits[idx];
    digits.splice(idx, 1);
  }
  console.log("Secret:", result); // ดูเลขลับใน console
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
    if (guess[i] === secret[i]) {
      bulls++;
    } else if (secret.includes(guess[i])) {
      cows++;
    }
  }

  if (bulls === 4) {
    result.textContent = `🎉 ถูกต้อง! คุณทายถูกใน ${attempts} รอบ`;
    restartBtn.classList.remove("hidden");
  } else {
    result.textContent = `ถูกตัวและถูกตำแหน่ง: ${bulls}, ถูกตัวแต่ผิดตำแหน่ง: ${cows}`;
  }

  attemptsTxt.textContent = `รอบที่เล่น: ${attempts}`;
  input.value = "";
  input.focus();
}

function resetGame() {
    secret = generateSecret(4);
    attempts = 0;
    history = []; // ลบประวัติคำทาย
    result.textContent = "";
    attemptsTxt.textContent = "";
    document.getElementById("history").innerHTML = ""; // เคลียร์กล่องแสดงประวัติ
    restartBtn.classList.add("hidden");
    input.value = "";
    input.focus();
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
        if (guess[i] === secret[i]) {
            bulls++;
        } else if (secret.includes(guess[i])) {
            cows++;
        }
    }

    // ถ้า Bulls ครบ → ชนะ
    if (bulls === 4) {
        result.textContent = `🎉 ถูกต้อง! คุณทายถูกใน ${attempts} รอบ✅`;
        history.push(`${guess} → ถูกตัวและถูกตำแหน่ง: ${bulls}, ถูกตัวแต่ผิดตำแหน่ง: ${cows}`);
        document.getElementById("history").innerHTML = history.join('<br>');
        restartBtn.classList.remove("hidden");
        return; // หยุดฟังก์ชัน ไม่ให้ข้อความรอบล่าสุดไปเขียนทับ
    }

    // ถ้ายังไม่ชนะ → อัปเดตรอบล่าสุดและประวัติ
    result.textContent = `รอบล่าสุด: ถูกตัวและถูกตำแหน่ง: ${bulls}, ถูกตัวแต่ผิดตำแหน่ง: ${cows}`;
    attemptsTxt.textContent = `รอบที่เล่น: ${attempts}`;

    // บันทึกคำทายลง history
    history.push(`${guess} → ถูกตัวและถูกตำแหน่ง: ${bulls}, ถูกตัวแต่ผิดตำแหน่ง: ${cows}`);
    document.getElementById("history").innerHTML = history.join('<br>');

    input.value = "";
    input.focus();
}
function giveUp() {
    // แสดงเฉลยเลขลับ
    result.textContent = `💥 คำตอบคือ: ${secret}`;
    // อัพประวัติ
    history.push(`เฉลย : ${secret}`);
    document.getElementById("history").innerHTML = history.join('<br>');
    // ปุ่มรีสตาร์ทและ popup แสดง
    restartBtn.classList.remove("hidden");
    winPopup.classList.remove("hidden");
    document.getElementById("popupAttempts").textContent = `คุณยอมแพ้ หลังเล่น ${attempts} รอบ`;
}
