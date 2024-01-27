type gameResDataType = {
  goal: {
    forest: string[];
    farm: string[];
    village: string[];
    area: string[];
  };
  skill: string[];
};

const tileData: { [key: string]: string } = {
  ambush: 'res/tiles/tile-ambush.png',
  farm: 'res/tiles/tile-farm.png',
  forest: 'res/tiles/tile-forest.png',
  village: 'res/tiles/tile-village.png',
  water: 'res/tiles/tile-water.png',
  fv_hybrid: 'res/tiles/tile-fv_hybrid.png',
};

const seasonData: {
  [key: number]: { name: string; duration: number };
} = {
  0: {
    name: 'Spring',
    duration: 8,
  },
  1: {
    name: 'Summer',
    duration: 8,
  },
  2: {
    name: 'Autumn',
    duration: 7,
  },
  3: {
    name: 'Winter',
    duration: 6,
  },
};

const cardDatabase: gameResDataType = {
  goal: {
    forest: [
      'res/images/goal-forest-base-01.png',
      'res/images/goal-forest-base-02.png',
      'res/images/goal-forest-base-03.png',
      'res/images/goal-forest-base-04.png',
    ],
    farm: [
      'res/images/goal-farm-base-01.png',
      'res/images/goal-farm-base-02.png',
      'res/images/goal-farm-base-03.png',
      'res/images/goal-farm-base-04.png',
    ],
    village: [
      'res/images/goal-village-base-01.png',
      'res/images/goal-village-base-02.png',
      'res/images/goal-village-base-03.png',
      'res/images/goal-village-base-04.png',
    ],
    area: [
      'res/images/goal-area-base-01.png',
      'res/images/goal-area-base-02.png',
      'res/images/goal-area-base-03.png',
      'res/images/goal-area-base-04.png',
    ],
  },
  skill: [],
};

type GameSettings = {
  newGame: boolean;
  skillsSetting: string;
  ambushSetting: string;
  heroesSetting: string;
  mapPack: string;
};

type GameProgress = {
  season: 0 | 1 | 2 | 3;
  seasonProg: number;
  seasonMax: number;
  goalMarket: string[];
  ambushDeck: string[];
  heroDeck: string[];
  skillDeck: string[];
  skillMarket: string[];
};

function resetGameSettings(): GameSettings {
  return {
    newGame: true,
    skillsSetting: 'disabled',
    ambushSetting: 'disabled',
    heroesSetting: 'disabled',
    mapPack: 'base',
  };
}

function setupDeck(deckType: 'skill'): string[] {
  const myList: string[] = cardDatabase[deckType];
  return randUniqueItems(myList, myList.length);
}

function setupGoals(): string[] {
  let myList: string[] = [
    ...[randItem(cardDatabase.goal.forest)],
    ...[randItem(cardDatabase.goal.farm)],
    ...[randItem(cardDatabase.goal.village)],
    ...[randItem(cardDatabase.goal.area)],
  ];
  myList = shuffleList(myList);
  drawMarket('goal', myList);
  return myList;
}

function setupRules(gameSettings: GameSettings) {
  return {
    season: 0,
    seasonProg: 0,
    seasonMax: 8,
    skillDeck: setupDeck('skill'),
    goalMarket: setupGoals(),
    skillMarket: [],
  };
}

function setupGame(): GameSettings {
  seededRandom(calculateSeed(getInputElementValue('game-seed')));

  const gameSettings = resetGameSettings();
  gameSettings.newGame = false;
  gameSettings.skillsSetting = getInputElementValue('skill-setting');
  gameSettings.ambushSetting = getInputElementValue('ambush-setting');
  gameSettings.heroesSetting = getInputElementValue('hero-setting');
  gameSettings.mapPack = getInputElementValue('map-pack');
  localStorage.setItem('gameSettings', JSON.stringify(gameSettings));

  const gameProgress = setupRules(gameSettings);
  localStorage.setItem('gameProgress', JSON.stringify(gameProgress));

  return gameSettings;
}

function restart(): void {
  clearBox('rule-container');
  clearBox('goal-display');
  clearBox('skill-display');
  clearBox('explore-display');
  hide_elem('rules');
  hide_elem('results');
  unhide_elem('main-menu');
  localStorage.clear();
}

function clearLocalStorage(): void {
  restart();
  const skillsSetting = ((
    document.getElementById('skill-setting') as HTMLInputElement
  ).value = 'disabled');

  const ambushSetting = ((
    document.getElementById('ambush-setting') as HTMLInputElement
  ).value = 'disabled');

  const heroesSetting = ((
    document.getElementById('hero-setting') as HTMLInputElement
  ).value = 'disabled');

  const mapPack = ((
    document.getElementById('map-pack') as HTMLInputElement
  ).value = 'base');

  const gameSeed = ((
    document.getElementById('game-seed') as HTMLInputElement
  ).value = '');
}
