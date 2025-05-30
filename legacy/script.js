/* ─────────────────────────────── DATA  ─────────────────────────────── */
/* 100 distinct sword names, easiest→rarest */
const weapons = [
    "Twig", "Whittled Stick", "Training Dagger", "Rusty Knife", "Bronze Knife",
    "Bronze Short-Sword", "Copper Saber", "Copper Gladius", "Iron Dirk",
    "Iron Shortsword", "Iron Gladius", "Iron Longsword", "Iron Broadsword",
    "Steel Dirk", "Steel Shortsword", "Steel Gladius", "Steel Longsword",
    "Steel Broadsword", "Knight’s Sword", "Knight’s Claymore",
    "Polished Claymore", "Fine Estoc", "Fine Rapier", "Fine Falchion",
    "Masterwork Saber", "Masterwork Broadsword", "Masterwork Claymore",
    "Mithril Shortsword", "Mithril Longsword", "Mithril Claymore",
    "Shadowsteel Knife", "Shadowsteel Saber", "Shadowsteel Longsword",
    "Shadowsteel Greatblade", "Adamant Dagger", "Adamant Shortsword",
    "Adamant Broadsword", "Adamant Greatsword", "Drakebone Saber",
    "Drakebone Falchion", "Drakebone Claymore", "Frostbrand Knife",
    "Frostbrand Saber", "Frostbrand Greatblade", "Stormsteel Dirk",
    "Stormsteel Rapier", "Stormsteel Zweihänder", "Sun-forged Scimitar",
    "Sun-forged Falchion", "Sun-forged Greatsword", "Runic Shortsword",
    "Runic Longblade", "Runic Claymore", "Soul-edge Dagger",
    "Soul-edge Longsword", "Soul-edge Greatsword", "Dragonslayer Saber",
    "Dragonslayer Claymore", "Dragonslayer Colossus", "Crystal Dirk",
    "Crystal Falchion", "Crystal Greatsword", "Voidsteel Knife",
    "Voidsteel Saber", "Voidsteel Greatblade", "Eclipse Rapier",
    "Eclipse Longsword", "Eclipse Zweihänder", "Phoenix Talon",
    "Phoenix Wingblade", "Phoenix Greatblade", "Starlight Dirk",
    "Starlight Saber", "Starlight Claymore", "Celestial Shortsword",
    "Celestial Longsword", "Celestial Greatblade", "Astral Gladius",
    "Astral Broadsword", "Astral Colossus", "Arcane Scalpel",
    "Arcane Saber", "Arcane Greatsword", "Mythic Dagger",
    "Mythic Shortsword", "Mythic Claymore", "Eternal Saber",
    "Eternal Longsword", "Eternal Greatsword", "Realm-rend Knife",
    "Realm-rend Longblade", "Realm-rend Colossus", "Legendary Edge",
    "Legendary Claymore", "Legendary Greatsword", "Hero’s Testament",
    "King-slayer", "World-Breaker"
  ];
  
  /* derived constants */
/* ─────────────────────────────── CONFIG ─────────────────────────────── */
const MAX_LEVEL = 100;                // 0-based index: 0 … 99
const TICKET_PRICE = 100;             // gold
const SAVE_CHANCE = 0.50;             // 50 %

/* ─────────────────────────────── STATE ─────────────────────────────── */
let level   = 0;   // current sword tier (0 == Sword Lv. 1)
let gold    = 0;
let tickets = 0;

/* ──────────────────────────── DOM HANDLES ──────────────────────────── */
const d = id => document.getElementById(id);

const startScreen = d("start-screen");
const gameScreen  = d("game-screen");
const weaponName  = d("weapon-name");
const goldLabel   = d("gold");
const ticketLabel = d("tickets");
const log         = d("log");

const btnStart   = d("btn-start");
const btnEnhance = d("btn-enhance");
const btnSell    = d("btn-sell");
const btnBuy     = d("btn-buy");
const btnRestart = d("btn-restart");

/* ───────────────────────────── UTILITIES ───────────────────────────── */
const weaponStr = lv => weapons[lv];
const sellValue  = lv => (lv) * 20;   // simple linear formula

function updateHUD () {
  weaponName.textContent = weaponStr(level);
  goldLabel.textContent   = `Gold ${gold}`;
  ticketLabel.textContent = `Tickets ${tickets}`;
}

/* ────────────────────────── EVENT HANDLERS ────────────────────────── */
btnStart.onclick = () => {
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  updateHUD();
};

btnEnhance.onclick = () => {
  const success = Math.random() < 0.5;

  if (success) {
    if (level === MAX_LEVEL - 1) {
      log.textContent = "Max level reached! Nothing left to upgrade.";
      return;
    }
    level++;
    log.textContent = "Success! Weapon upgraded.";
  } else {
    // failed: check destruction save
    let saved = false;
    if (tickets > 0 && Math.random() < SAVE_CHANCE) {
      tickets--;
      saved = true;
    }

    if (saved) {
      log.textContent = "Enhancement failed but your ticket saved the sword!";
    } else {
      log.textContent = "Enhancement failed… sword destroyed.";
      level = 0;
    }
  }
  updateHUD();
};

btnSell.onclick = () => {
  const value = sellValue(level);
  gold += value;
  log.textContent = `Sold for ${value} g. Back to Sword Lv. 1.`;
  level = 0;
  updateHUD();
};

btnBuy.onclick = () => {
  if (gold < TICKET_PRICE) {
    log.textContent = "Not enough gold.";
    return;
  }
  gold -= TICKET_PRICE;
  tickets++;
  log.textContent = "Bought a Protection Ticket.";
  updateHUD();
};

btnRestart.onclick = () => {
  level = gold = tickets = 0;
  log.textContent = "";
  btnEnhance.disabled = false;
  btnRestart.classList.add("hidden");
  updateHUD();
};

/* ───────────────────────── INITIALISE ───────────────────────── */
updateHUD();
