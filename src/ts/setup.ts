type gameResDataType = {
  explore: exploreCardType[];
  goal: {
    forest: string[];
    farm: string[];
    village: string[];
    area: string[];
  };
  skill: [];
  ambush: string[];
  hero: string[];
};

type exploreCardType = {
  src: string;
  time: number;
  ruin: boolean;
};

interface SeasonData {
  [key: number]: { name: string; duration: number };
}

const seasonData: SeasonData = {
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

const cardDatabase: { [key: string]: gameResDataType } = {
  houseruled: {
    explore: [
      {
        src: 'res/images/explore-base-01.png',
        time: 0,
        ruin: true,
      },
      {
        src: 'res/images/explore-base-02.png',
        time: 0,
        ruin: true,
      },
      {
        src: 'res/images/explore-base-03.png',
        time: 1,
        ruin: false,
      },
      {
        src: 'res/images/explore-base-04.png',
        time: 1,
        ruin: false,
      },
      {
        src: 'res/images/explore-base-05.png',
        time: 1,
        ruin: false,
      },
      {
        src: 'res/images/explore-base-06.png',
        time: 1,
        ruin: false,
      },
      {
        src: 'res/images/explore-base-07.png',
        time: 2,
        ruin: false,
      },
      {
        src: 'res/images/explore-base-08.png',
        time: 2,
        ruin: false,
      },
      {
        src: 'res/images/explore-base-09.png',
        time: 2,
        ruin: false,
      },
      {
        src: 'res/images/explore-base-10.png',
        time: 2,
        ruin: false,
      },
      {
        src: 'res/images/explore-base-11.png',
        time: 2,
        ruin: false,
      },
      {
        src: 'res/images/explore-base-12.png',
        time: 2,
        ruin: false,
      },
      {
        src: 'res/images/explore-base-13.png',
        time: 0,
        ruin: false,
      },
    ],
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
    ambush: [
      'res/images/ambush-base-01.png',
      'res/images/ambush-base-02.png',
      'res/images/ambush-base-03.png',
      'res/images/ambush-base-04.png',
      'res/images/ambush-base-05.png',
      'res/images/ambush-base-06.png',
      'res/images/ambush-base-07.png',
      'res/images/ambush-base-08.png',
    ],
    hero: [],
  },
};

type GameSettings = {
  newGame: boolean;
  rulesSetting: string;
  skillsSetting: string;
  ambushSetting: string;
  heroesSetting: string;
  mapPack: string;
  seed: number | string;
};

type GameProgress = {
  season: 0 | 1 | 2 | 3;
  seasonProg: number;
  seasonMax: number;
  goalMarket: string[];
  exploreDeck: string[];
  ambushDeck: string[];
  heroDeck: string[];
  skillDeck: string[];
  skillMarket: string[];
};

function resetGameSettings(): GameSettings {
  return {
    newGame: true,
    rulesSetting: 'houseruled',
    skillsSetting: 'disabled',
    ambushSetting: 'disabled',
    heroesSetting: 'disabled',
    mapPack: 'base',
    seed: '',
  };
}
function setupDeck(
  deckType: 'explore' | 'ambush' | 'hero' | 'skill',
  gameSettings: GameSettings,
): string[] | exploreCardType[] {
  const myList: string[] | exploreCardType[] =
    cardDatabase[gameSettings.rulesSetting][deckType];
  return randUniqueItems(myList, myList.length);
}

function setupGoals(gameSettings: GameSettings): string[] {
  let myList: string[] = [
    ...[randItem(cardDatabase[gameSettings.rulesSetting].goal.forest)],
    ...[randItem(cardDatabase[gameSettings.rulesSetting].goal.farm)],
    ...[randItem(cardDatabase[gameSettings.rulesSetting].goal.village)],
    ...[randItem(cardDatabase[gameSettings.rulesSetting].goal.area)],
  ];
  myList = randUniqueItems(myList, myList.length);
  drawMarket('goal', myList);
  return myList;
}

function setupRules(gameSettings: GameSettings) {
  return {
    season: 0,
    seasonProg: 0,
    seasonMax: 8,
    exploreDeck: setupDeck('explore', gameSettings),
    ambushDeck: setupDeck('ambush', gameSettings),
    heroDeck: setupDeck('hero', gameSettings),
    skillDeck: setupDeck('skill', gameSettings),
    goalMarket: setupGoals(gameSettings),
    skillMarket: [],
  };
}

function setupGame(): GameSettings {
  const gameSettings = resetGameSettings();
  gameSettings.newGame = false;
  gameSettings.rulesSetting = getInputElementValue('rules-setting');
  gameSettings.skillsSetting = getInputElementValue('skill-setting');
  gameSettings.ambushSetting = getInputElementValue('ambush-setting');
  gameSettings.heroesSetting = getInputElementValue('hero-setting');
  gameSettings.mapPack = getInputElementValue('map-pack');
  gameSettings.seed = calculateSeed(getInputElementValue('game-seed'));
  localStorage.setItem('gameSettings', JSON.stringify(gameSettings));

  let gameProgress = setupRules(gameSettings);
  localStorage.setItem('gameSettings', JSON.stringify(gameSettings));
  localStorage.setItem('gameProgress', JSON.stringify(gameProgress));

  return gameSettings;
}
