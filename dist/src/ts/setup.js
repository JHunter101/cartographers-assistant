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
    seededRandom(calculateSeed(getInputElementValue('game-seed')));
    const gameSettings = resetGameSettings();
    gameSettings.newGame = false;
    gameSettings.mapPack = getInputElementValue('map-pack');
    localStorage.setItem('gameSettings', JSON.stringify(gameSettings));
    const gameProgress = setupRules(gameSettings);
    localStorage.setItem('gameProgress', JSON.stringify(gameProgress));
    return gameSettings;
}
function restart() {
    clearBox('rule-container');
    clearBox('goal-display');
    clearBox('skill-display');
    clearBox('explore-display');
    hide_elem('rules');
    hide_elem('results');
    unhide_elem('main-menu');
    localStorage.clear();
}
function clearLocalStorage() {
    restart();
    const mapPack = (document.getElementById('map-pack').value = 'base');
    const gameSeed = (document.getElementById('game-seed').value = '');
}
