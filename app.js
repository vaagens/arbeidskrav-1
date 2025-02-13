// Del 1: Lag karakter og lagre karakteren i localStorage

let selectedImage = null;
let fightResult;

class Character {
  constructor(
    characterName,
    characterHp,
    characterAttackDamage,
    characterImage
  ) {
    this.name = characterName;
    this.hp = characterHp;
    this.damage = characterAttackDamage;
    this.image = characterImage;
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

function createCharacter() {
  const nameInput = document.getElementById("character-name").value;
  const hpInput = parseInt(document.getElementById("character-hp").value);
  const attackInput = parseInt(document.getElementById("attack-damage").value);

  if (!nameInput || isNaN(hpInput) || isNaN(attackInput) || !selectedImage) {
    alert("Vennligst fyll ut alle feltene og velg et profilbilde!");
    return;
  }

  character = new Character(nameInput, hpInput, attackInput, selectedImage);

  localStorage.setItem("character", JSON.stringify(character));
}

document.addEventListener("DOMContentLoaded", () => {
  setupCharacterImageSelection();
  displayFightingCharacter();
  displayFightingEnemy();
  resetFightButton();
  document
    .getElementById("create-character")
    .addEventListener("click", function () {
      createCharacter();
      displayFightingCharacter();
      displayFightingEnemy();
      resetFightButton();
      resetResult();
    });
  document
    .getElementById("generate-enemy")
    .addEventListener("click", function () {
      enemy = createEnemy();
      displayCreatedEnemy(enemy);
      displayFightingEnemy();
      resetFightButton();
      resetResult();
    });
  document
    .getElementById("start-fight")
    .addEventListener("click", calculateWinner);
});

//Seksjon 2: Generer fiende

class Enemy {
  constructor(enemyName, enemyHp, enemyAttackDamage, enemyImage) {
    this.name = enemyName;
    this.hp = enemyHp;
    this.damage = enemyAttackDamage;
    this.image = enemyImage;
  }
}

function createEnemy() {
  const randomName = ["Goblin", "Ork", "Drage"][Math.floor(Math.random() * 3)];
  const randomHp = Math.floor(Math.random() * (150 - 50 + 1) + 50);
  const randomAttackDamage = Math.floor(Math.random() * (40 - 10 + 1) + 10);
  const randomImage = [
    "/assets/monster.jpg",
    "/assets/swamp-monster.jpg",
    "/assets/dragon.jpg",
  ][Math.floor(Math.random() * 3)];

  enemy = new Enemy(randomName, randomHp, randomAttackDamage, randomImage);

  localStorage.setItem("enemy-fight", JSON.stringify(enemy));

  return enemy;
}

function displayCreatedEnemy(enemy) {
  document.getElementById("enemy-img").src = enemy.image;
  document.getElementById("enemy-name").textContent = "Fiende: " + enemy.name;
  document.getElementById("enemy-hp").textContent = "HP: " + enemy.hp;
  document.getElementById("enemy-attack").textContent =
    "Angrepsstyrke: " + enemy.damage;
}

// Seksjon 3: Sloss!
//Du skal vise frem helten og fienden. Se HTML-dokumentet for hvordan fremvisningen skal se ut, med tanke på hvilke tagger, hierarki og hvilke klasser de skal ha.
//Du skal lage den strukturen som vist i HTML, her i Javascript og legge de til i div'en "battle-arena" fra HTML.
const battleArea = document.getElementById("battle-area");

//Helt
function displayArenaFighter(fighter) {
  storedFighter = JSON.parse(localStorage.getItem(fighter));

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
  if (fighter === "character") {
    fighterHeading.innerText = "Helten";
    fighterImg.alt = "Profilbilde";
  } else {
    fighterHeading.innerText = "Fiende";
    fighterImg.alt = "Fiendens profilbilde";
  }

  const fighterImg = document.createElement("img");
  fighterImg.src = storedFighter.image;
  fighterImg.id = `${fighter}-img`;


  const fighterName = document.createElement("p");
  fighterName.innerText = `Navn: ${storedFighter.name}`;
  charName.id = `${fighter}-name`;

  const fighterHp = document.createElement("p");
  fighterHp.innerText = `HP: ${storedFighter.hp}`;
  fighterHp.id = `${fighter}-hp`;

  const fighterAttack = document.createElement("p");
  charAttack.innerText = "Angrepsstyrke: " + storedCharacter.damage;
  charAttack.id = "char-attack";

  characterCard.append(characterHeading, charImg, charName, charHp, charAttack);
  battleArea.appendChild(characterCard);
}

function displayFightingCharacter() {
  storedCharacter = JSON.parse(localStorage.getItem("character"));

  if (!storedCharacter) {
    return;
  } else {
    const existingCharacterCard = document.getElementById("character-display");
    if (existingCharacterCard) {
      existingCharacterCard.remove();
    }

    const characterCard = document.createElement("div");
    characterCard.id = "character-display";
    characterCard.className = "profile-card";

    const characterHeading = document.createElement("h2");
    characterHeading.innerText = "Helten";

    const charImg = document.createElement("img");
    charImg.src = storedCharacter.image;
    charImg.id = "char-img";
    charImg.alt = "Profilbilde";

    const charName = document.createElement("p");
    charName.innerText = "Navn: " + storedCharacter.name;
    charName.id = "char-name";

    const charHp = document.createElement("p");
    charHp.innerText = "HP: " + storedCharacter.hp;
    charHp.id = "char-hp";

    const charAttack = document.createElement("p");
    charAttack.innerText = "Angrepsstyrke: " + storedCharacter.damage;
    charAttack.id = "char-attack";

    characterCard.append(
      characterHeading,
      charImg,
      charName,
      charHp,
      charAttack
    );
    battleArea.appendChild(characterCard);
  }
}

// Fiende
function displayFightingEnemy() {
  storedEnemy = JSON.parse(localStorage.getItem("enemy"));
  if (!storedEnemy) {
    return;
  } else {
    const existingEnemyCard = document.getElementById("enemy-fight-display");
    if (existingEnemyCard) {
      existingEnemyCard.remove();
    }

    const enemyCard = document.createElement("div");
    enemyCard.id = "enemy-fight-display";
    enemyCard.className = "profile-card";

    const enemyHeading = document.createElement("h2");
    enemyHeading.innerText = "Fiende";

    const enemyImg = document.createElement("img");
    enemyImg.src = storedEnemy.image;
    enemyImg.id = "enemy-fight-img";
    enemyImg.alt = "Fiendens profilbilde";

    const enemyName = document.createElement("p");
    enemyName.innerText = "Navn: " + storedEnemy.name;
    enemyName.id = "enemy-fight-name";

    const enemyHp = document.createElement("p");
    enemyHp.innerText = "HP: " + storedEnemy.hp;
    enemyHp.id = "enemy-fight-hp";

    const enemyAttack = document.createElement("p");
    enemyAttack.innerText = "Angrepsstyrke: " + storedEnemy.damage;
    enemyAttack.id = "enemy-fight-attack";

    enemyCard.append(enemyHeading, enemyImg, enemyName, enemyHp, enemyAttack);
    battleArea.appendChild(enemyCard);
  }
}

function calculateWinner() {
  let charHpAfterFight = storedCharacter.hp - storedEnemy.damage;
  let enemyHpAfterFight = storedEnemy.hp - storedCharacter.damage;

  if (charHpAfterFight > enemyHpAfterFight) {
    battleResult = "Du vant!";
  } else if (enemyHpAfterFight > charHpAfterFight) {
    battleResult = "Du tapte!";
  } else {
    battleResult = "Uavgjort!";
  }

  fightResult = document.getElementById("battle-result");
  fightResult.innerText = battleResult;
  battleArea.appendChild(fightResult);
}

function resetFightButton() {
  const fightButton = document.getElementById("start-fight");
  battleArea.appendChild(fightButton);
}

function resetResult() {
  if (fightResult) {
    fightResult.innerText = "";
    battleArea.appendChild(fightResult);
  }
}
