let character = null;
let enemy = null;
let selectedImage = null;
let fightResult = null;

//---Del 1: Lag karakter og lagre karakteren i localStorage------------------------------------------------------------------------

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

//---Seksjon 2: Generer fiende------------------------------------------------------------------------------------------------------

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

//---Seksjon 3: Sloss!-------------------------------------------------------------------------------------------------------------
//Du skal vise frem helten og fienden. Se HTML-dokumentet for hvordan fremvisningen skal se ut, med tanke på hvilke tagger, hierarki og hvilke klasser de skal ha.
//Du skal lage den strukturen som vist i HTML, her i Javascript og legge de til i div'en "battle-arena" fra HTML.

const battleArea = document.getElementById("battle-area");

function displayArenaFighter(fighter) {
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

function calculateWinner() {
  let charHpAfterFight = character.hp - enemy.damage;
  let enemyHpAfterFight = enemy.hp - character.damage;

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

document.addEventListener("DOMContentLoaded", () => {
  setupCharacterImageSelection();
  displayArenaFighter("character");
  displayArenaFighter("enemy-fight");
  resetFightButton();
  document
    .getElementById("create-character")
    .addEventListener("click", function () {
      createCharacter();
      displayArenaFighter("character");
      displayArenaFighter("enemy-fight");
      resetFightButton();
      resetResult();
    });
  document
    .getElementById("generate-enemy")
    .addEventListener("click", function () {
      enemy = createEnemy();
      displayCreatedEnemy(enemy);
      displayArenaFighter("enemy-fight");
      resetFightButton();
      resetResult();
    });
  document
    .getElementById("start-fight")
    .addEventListener("click", calculateWinner);
});
