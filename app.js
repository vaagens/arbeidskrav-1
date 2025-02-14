let character = null;
let enemy = null;
let selectedImage = null;

//---Del 1: Lag karakter og lagre karakteren i localStorage------------------------------------------------------------------------

class Fighter {
  constructor(
    fighterName,
    fighterHp,
    fighterAttackDamage,
    fighterImage
  ) {
    this.name = fighterName;
    this.hp = fighterHp;
    this.damage = fighterAttackDamage;
    this.image = fighterImage;
  }
}

function setupCharacterImageSelection() {
  const characterImage = document.querySelectorAll(
    "#character-creator .profile-pics img"
  );
  characterImage.forEach((img) => {
    img.addEventListener("click", () => {
      characterImage.forEach((pic) => pic.classList.remove("selected"));
      img.classList.add("selected");
      selectedImage = img.src;
    });
  });
}

function createCharacter(injectedImage) {
  const nameInput = document.getElementById("character-name").value;
  const hpInput = parseInt(document.getElementById("character-hp").value);
  const attackInput = parseInt(document.getElementById("attack-damage").value);

  const imageToUse = injectedImage || selectedImage;

  if (!nameInput || isNaN(hpInput) || isNaN(attackInput) || !imageToUse) {
    alert("Vennligst fyll ut alle feltene og velg et profilbilde!");
    return;
  }

  character = new Fighter(nameInput, hpInput, attackInput, imageToUse);

  localStorage.setItem("character", JSON.stringify(character));
}

//---Seksjon 2: Generer fiende------------------------------------------------------------------------------------------------------

function createEnemy() {
  const randomName = ["Goblin", "Ork", "Drage"][Math.floor(Math.random() * 3)];
  const randomHp = Math.floor(Math.random() * (150 - 50 + 1) + 50);
  const randomAttackDamage = Math.floor(Math.random() * (40 - 10 + 1) + 10);
  const randomImage = [
    "/assets/monster.jpg",
    "/assets/swamp-monster.jpg",
    "/assets/dragon.jpg",
  ][Math.floor(Math.random() * 3)];

  enemy = new Fighter(randomName, randomHp, randomAttackDamage, randomImage);

  localStorage.setItem("enemy-fight", JSON.stringify(enemy));

  return enemy;
}

function displayCreatedEnemy(enemy) {
  document.getElementById("enemy-img").src = enemy.image;
  document.getElementById("enemy-name").textContent = `Fiende: ${enemy.name}`;
  document.getElementById("enemy-hp").textContent = `HP: ${enemy.hp}`;
  document.getElementById("enemy-attack").textContent = `Angrepsstyrke: ${enemy.damage}`;
}

//---Seksjon 3: Sloss!-------------------------------------------------------------------------------------------------------------
//Du skal vise frem helten og fienden. Se HTML-dokumentet for hvordan fremvisningen skal se ut, med tanke på hvilke tagger, hierarki og hvilke klasser de skal ha.
//Du skal lage den strukturen som vist i HTML, her i Javascript og legge de til i div'en "battle-arena" fra HTML.

function displayArenaFighter(fighter) {
  const battleArea = document.getElementById("battle-area");
  const storedFighter = JSON.parse(localStorage.getItem(fighter));

  if (!storedFighter) {
    return;
  } else {
    const existingFighterCard = document.getElementById(`${fighter}-display`);
    if (existingFighterCard) {
      existingFighterCard.remove();
    }
  }

  const fighterCard = document.createElement("div");
  fighterCard.id = `${fighter}-display`;
  fighterCard.className = "profile-card";

  const fighterHeading = document.createElement("h2");

  const fighterImg = document.createElement("img");
  fighterImg.src = storedFighter.image;
  fighterImg.id = `${fighter}-img`;

  const fighterName = document.createElement("p");
  fighterName.innerText = `Navn: ${storedFighter.name}`;
  fighterName.id = `${fighter}-name`;

  const fighterHp = document.createElement("p");
  fighterHp.innerText = `HP: ${storedFighter.hp}`;
  fighterHp.id = `${fighter}-hp`;

  const fighterAttack = document.createElement("p");
  fighterAttack.innerText = `Angrepsstyrke: ${storedFighter.damage}`;
  fighterAttack.id = `${fighter}-attack`;

  if (fighter === "character") {
    character = storedFighter;
    fighterHeading.innerText = "Helten";
    fighterImg.alt = "Profilbilde";
  } else {
    enemy = storedFighter;
    fighterHeading.innerText = "Fiende";
    fighterImg.alt = "Fiendens profilbilde";
  }

  fighterCard.append(
    fighterHeading,
    fighterImg,
    fighterName,
    fighterHp,
    fighterAttack
  );
  battleArea.appendChild(fighterCard);
}

function calculateWinner(player, monster) {
  const playerHpAfterFight = player.hp - monster.damage;
  const monsterHpAfterFight = monster.hp - player.damage;

  if (playerHpAfterFight > monsterHpAfterFight) {
    return "Du vant!";
  } else if (monsterHpAfterFight > playerHpAfterFight) {
    return "Du tapte!";
  } else {
    return "Uavgjort!";
  }
}

function updateFightResult(result) {
  const battleArea = document.getElementById("battle-area");
  const fightResult = document.getElementById("battle-result");
  fightResult.innerText = result;
  battleArea.appendChild(fightResult);
}

function resetFightButton() {
  const battleArea = document.getElementById("battle-area");
  const fightButton = document.getElementById("start-fight");
  battleArea.appendChild(fightButton);
}

function resetResult() {
  const battleArea = document.getElementById("battle-area");
  const fightResult = document.getElementById("battle-result");
  if (fightResult) {
    fightResult.innerText = "";
    battleArea.appendChild(fightResult);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupCharacterImageSelection();
  displayArenaFighter("character");
  displayArenaFighter("enemy-fight");
  resetFightButton();
  document
    .getElementById("create-character")
    .addEventListener("click", () => {
      createCharacter();
      displayArenaFighter("character");
      displayArenaFighter("enemy-fight");
      resetFightButton();
      resetResult();
    });
  document
    .getElementById("generate-enemy")
    .addEventListener("click", () => {
      enemy = createEnemy();
      displayCreatedEnemy(enemy);
      displayArenaFighter("enemy-fight");
      resetFightButton();
      resetResult();
    });
  document.getElementById("start-fight").addEventListener("click", () => {
    const result = calculateWinner(character, enemy);
    updateFightResult(result);
  });
});

if (typeof module !== "undefined") {
  module.exports = { createCharacter, createEnemy, calculateWinner };
}
