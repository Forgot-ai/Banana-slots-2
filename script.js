const emojis = ["🍒", "🍎", "🍇", "🍉", "🍋", "🍌"];
const slots = [document.getElementById("slot1"), document.getElementById("slot2"), document.getElementById("slot3")];
const result = document.getElementById("result");
const spinBtn = document.getElementById("spin");

const settingsBtn = document.getElementById("settings-btn");
const settingsPanel = document.getElementById("settings-panel");
const closeSettings = document.getElementById("closeSettings");
const skipToggle = document.getElementById("skipToggle");
const oddsInput = document.getElementById("oddsInput");
const resetSettings = document.getElementById("resetSettings");

let skipAnimation = false;
let winOdds = 10; // 1 in 10 by default
let spinning = false;

// Open/Close Settings
settingsBtn.onclick = () => settingsPanel.style.display = "flex";
closeSettings.onclick = () => settingsPanel.style.display = "none";

// Reset Defaults
resetSettings.onclick = () => {
  skipToggle.checked = false;
  oddsInput.value = 10;
  skipAnimation = false;
  winOdds = 10;
};

// Listen for changes
skipToggle.onchange = () => skipAnimation = skipToggle.checked;
oddsInput.oninput = () => winOdds = Math.max(1, parseInt(oddsInput.value) || 1);

// Spin logic
spinBtn.onclick = async () => {
  if (spinning) return;
  spinning = true;
  result.textContent = "";

  const win = Math.floor(Math.random() * winOdds) === 0;
  const outcome = win ? ["🍌", "🍌", "🍌"] :
    Array.from({ length: 3 }, () => emojis[Math.floor(Math.random() * emojis.length)]);

  for (let i = 0; i < 3; i++) {
    if (!skipAnimation) {
      for (let j = 0; j < 10; j++) {
        slots[i].textContent = emojis[Math.floor(Math.random() * emojis.length)];
        await new Promise(r => setTimeout(r, 80));
      }
    }
    slots[i].textContent = outcome[i];
  }

  result.textContent = outcome.every(e => e === "🍌") ? "🎉 YOU WIN! 🍌🍌🍌" : "😢 Try Again!";
  spinning = false;
};
