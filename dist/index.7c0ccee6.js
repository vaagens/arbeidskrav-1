// Del 1: Lag karakter og lagre karakteren i localStorage
let selectedImage = null;
let character = null;
let enemy = null;
class Character {
    constructor(charaterName, characterHp, characterAttackDamage, characterImage){
        this.name = charaterName;
        this.hp = characterHp;
        this.damage = characterAttackDamage;
        this.image = characterImage;
    }
}
function setupCharacterImageSelection() {
    const characterImage = document.querySelectorAll("#character-creator .profile-pics img");
    characterImage.forEach((img)=>{
        img.addEventListener("click", ()=>{
            characterImage.forEach((pic)=>pic.classList.remove("selected"));
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
document.addEventListener("DOMContentLoaded", ()=>{
    setupCharacterImageSelection();
    document.getElementById("create-character").addEventListener("click", createCharacter);
    document.getElementById("generate-enemy").addEventListener("click", function() {
        const enemy = createEnemy();
        displayEnemy(enemy);
    });
});
//Seksjon 2: Generer fiende
class Enemy {
    constructor(enemyName, enemyHp, enemyAttackDamage, enemyImage){
        this.name = enemyName;
        this.hp = enemyHp;
        this.damage = enemyAttackDamage;
        this.image = enemyImage;
    }
}
function createEnemy() {
    const randomName = [
        "Goblin",
        "Ork",
        "Drage"
    ][Math.floor(Math.random() * 3)];
    const randomHp = Math.floor(Math.random() * 101 + 50);
    const randomAttackDamage = Math.floor(Math.random() * 31 + 10);
    const randomImage = [
        "/assets/monster.jpg",
        "/assets/swamp-monster.jpg",
        "/assets/dragon.jpg"
    ][Math.floor(Math.random() * 3)];
    enemy = new Enemy(randomName, randomHp, randomAttackDamage, randomImage);
    localStorage.setItem("enemy", JSON.stringify(enemy));
    return enemy;
}
function displayEnemy(enemy) {
    document.getElementById("enemy-img").src = enemy.image;
    document.getElementById("enemy-name").textContent = "Fiende: " + enemy.name;
    document.getElementById("enemy-hp").textContent = "HP: " + enemy.hp;
    document.getElementById("enemy-attack").textContent = "Angrepsstyrke: " + enemy.damage;
}
// Seksjon 3: Sloss!
//Du skal vise frem helten og fienden. Se HTML-dokumentet for hvordan fremvisningen skal se ut, med tanke på hvilke tagger, hierarki og hvilke klasser de skal ha.
//Helt
const characterCard = document.createElement("div");
characterCard.id = "character-display";
characterCard.className = "profile-card";
const storedCharacterJson = localStorage.getItem("character");
const storedCharacter = JSON.parse(storedCharacterJson);
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
document.body.appendChild(characterCard);
characterCard.appendChild(document.createElement("h2")).innerText = "Helten";
characterCard.append(charImg, charName, charHp, charAttack);
// Fiende
const enemyCard = document.createElement("div");
enemyCard.id = "enemy-fight-display";
enemyCard.className = "profile-card";
const storedEnemyJson = localStorage.getItem("enemy");
const storedEnemy = JSON.parse(storedEnemyJson);
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
document.body.appendChild(enemyCard);
enemyCard.appendChild(document.createElement("h2")).innerText = "Fiende";
enemyCard.append(enemyImg, enemyName, enemyHp, enemyAttack);
console.log("Bildets src:", enemyImg.src);
console.log(localStorage.getItem("enemy")); //Du skal lage den strukturen som vist i HTML, her i Javascript og legge de til i div'en "battle-arena" fra HTML.

//# sourceMappingURL=index.7c0ccee6.js.map
