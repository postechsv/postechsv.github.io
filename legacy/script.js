/* Simple client-side state machine */
const weapons = ["Stick", "Short Sword", "Longsword", "Awesome Sword"];
let stage = 0;                                    // current index in `weapons`

// DOM cache
const startScreen  = document.getElementById("start-screen");
const gameScreen   = document.getElementById("game-screen");
const weaponName   = document.getElementById("weapon-name");
const log          = document.getElementById("log");
const btnStart     = document.getElementById("btn-start");
const btnEnhance   = document.getElementById("btn-enhance");
const btnRestart   = document.getElementById("btn-restart");

/* ---------- wiring ---------- */
btnStart.onclick = () => {
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  initGame();
};

btnEnhance.onclick = () => {
  const success = Math.random() < 0.5;           // 50 % chance
  if (success) {
    stage++;
    if (stage === weapons.length - 1) {          // reached final sword
      weaponName.textContent = weapons[stage];
      log.textContent = "Success! You forged the Awesome Sword.";
      btnEnhance.disabled = true;
      btnRestart.classList.remove("hidden");
    } else {
      weaponName.textContent = weapons[stage];
      log.textContent = "Enhancement succeeded. Weapon upgraded.";
    }
  } else {
    log.textContent = "Enhancement failed. Try again.";
  }
};

btnRestart.onclick = () => {
  stage = 0;
  btnEnhance.disabled = false;
  btnRestart.classList.add("hidden");
  log.textContent = "";
  initGame();
};

function initGame() {
  weaponName.textContent = weapons[stage];
}
