"use strict";
const tileData = {
    ambush: 'res/tiles/tile-ambush.png',
    farm: 'res/tiles/tile-farm.png',
    forest: 'res/tiles/tile-forest.png',
    village: 'res/tiles/tile-village.png',
    water: 'res/tiles/tile-water.png',
    fv_hybrid: 'res/tiles/tile-fv_hybrid.png',
};
const seasonData = {
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
const cardDatabase = {
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
function resetGameSettings() {
    return {
        newGame: true,
        skillsSetting: 'disabled',
        ambushSetting: 'disabled',
        heroesSetting: 'disabled',
        mapPack: 'base',
    };
}
function setupDeck(deckType) {
    const myList = cardDatabase[deckType];
    return randUniqueItems(myList, myList.length);
}
function setupGoals() {
    let myList = [
        ...[randItem(cardDatabase.goal.forest)],
        ...[randItem(cardDatabase.goal.farm)],
        ...[randItem(cardDatabase.goal.village)],
        ...[randItem(cardDatabase.goal.area)],
    ];
    myList = shuffleList(myList);
    drawMarket('goal', myList);
    return myList;
}
function setupRules(gameSettings) {
    return {
        season: 0,
        seasonProg: 0,
        seasonMax: 8,
        skillDeck: setupDeck('skill'),
        goalMarket: setupGoals(),
        skillMarket: [],
    };
}
function setupGame() {
    const gameSettings = resetGameSettings();
    gameSettings.newGame = false;
    gameSettings.skillsSetting = getInputElementValue('skill-setting');
    gameSettings.ambushSetting = getInputElementValue('ambush-setting');
    gameSettings.heroesSetting = getInputElementValue('hero-setting');
    gameSettings.mapPack = getInputElementValue('map-pack');
    localStorage.setItem('gameSettings', JSON.stringify(gameSettings));
    const gameProgress = setupRules(gameSettings);
    localStorage.setItem('gameProgress', JSON.stringify(gameProgress));
    seededRandom(calculateSeed(getInputElementValue('game-seed')));
    return gameSettings;
}
function restart() {
    clearBox('skill-display');
    clearBox('explore-display');
    clearBox('goal-display');
    clearBox('season-display-season');
    clearBox('season-display-prog');
    clearBox('rule-container');
    hide_elem('rules');
    hide_elem('rule-container');
    unhide_elem('main-menu');
    localStorage.clear();
}
function clearLocalStorage() {
    restart();
    const skillsSetting = (document.getElementById('skill-setting').value = 'disabled');
    const ambushSetting = (document.getElementById('ambush-setting').value = 'disabled');
    const heroesSetting = (document.getElementById('hero-setting').value = 'disabled');
    const mapPack = (document.getElementById('map-pack').value = 'base');
    const gameSeed = (document.getElementById('game-seed').value = '');
}
