const { createCharacter, createEnemy, calculateWinner } = require("../app");

describe("Create character", () => {
  beforeEach(() => {
    window.alert = jest.fn();
    localStorage.clear();
    document.body.innerHTML = `
      <input id="character-name" value="Hero" />
      <input id="character-hp" value="100" />
      <input id="attack-damage" value="25" />
    `;
  });

  test("create character with correct values and sav in local-storage", () => {
    createCharacter("hero.png");
    const storedCharacter = JSON.parse(localStorage.getItem("character"));
    expect(storedCharacter).toEqual({
      name: "Hero",
      hp: 100,
      damage: 25,
      image: "hero.png",
    });
  });
});

describe("Generate enemy", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("create character with correct values and save in local-storage", () => {
    const enemy = createEnemy();

    expect(["Goblin", "Ork", "Drage"]).toContain(enemy.name);

    expect(enemy.hp).toBeGreaterThanOrEqual(50);
    expect(enemy.hp).toBeLessThanOrEqual(150);

    expect(enemy.damage).toBeGreaterThanOrEqual(10);
    expect(enemy.damage).toBeLessThanOrEqual(40);

    expect([
      "/assets/monster.jpg",
      "/assets/swamp-monster.jpg",
      "/assets/dragon.jpg",
    ]).toContain(enemy.image);

    const storedEnemy = JSON.parse(localStorage.getItem("enemy-fight"));
    expect(storedEnemy).toEqual(enemy);
  });
});

describe("Calculate winner", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="battle-area">
        <div id="battle-result"></div>
      </div>
    `;
    global.battleArea = document.getElementById("battle-area");
  });

  test("If hero wins, show: 'Du vant!'", () => {
    global.character = { hp: 120, damage: 10 };
    global.enemy = { hp: 100, damage: 20 };

    const resultText = calculateWinner(character, enemy);
    expect(resultText).toBe("Du vant!");
  });

  test("If hero loses, show: 'Du tapte!'", () => {
    global.character = { hp: 100, damage: 20 };
    global.enemy = { hp: 120, damage: 10 };

    const resultText = calculateWinner(character, enemy);
    expect(resultText).toBe("Du tapte!");
  });

  test("If a tie, show: 'Uavgjort!'", () => {
    global.character = { hp: 100, damage: 20 };
    global.enemy = { hp: 100, damage: 20 };

    const resultText = calculateWinner(character, enemy);
    expect(resultText).toBe("Uavgjort!");
  });
});
