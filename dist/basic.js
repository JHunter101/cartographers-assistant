"use strict";
function spoiler(element) {
    element.classList.toggle('blur');
}
function toggle_elem(elem) {
    const element = document.getElementById(elem);
    if (element) {
        if (element.classList.contains('hidden')) {
            unhide_elem(elem); // If hidden, unhide the element
        }
        else {
            hide_elem(elem); // If visible, hide the element
        }
    }
}
function unhide_elem(elem) {
    const element = document.getElementById(elem);
    if (element)
        element.classList.remove('hidden');
}
function hide_elem(elem) {
    const element = document.getElementById(elem);
    if (element)
        element.classList.add('hidden');
}
function clearBox(elem) {
    document.getElementById(elem).innerHTML = '';
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
    const rulesSetting = (document.getElementById('rules-setting').value = 'houseruled');
    const skillsSetting = (document.getElementById('skill-setting').value = 'disabled');
    const ambushSetting = (document.getElementById('ambush-setting').value = 'disabled');
    const heroesSetting = (document.getElementById('hero-setting').value = 'disabled');
    const mapPack = (document.getElementById('map-pack').value = 'base');
    const gameSeed = (document.getElementById('game-seed').value = '');
}
// Helpers
function getInputElementValue(id) {
    const inputElement = document.getElementById(id);
    // Check if the element is present before accessing its value
    if (inputElement) {
        return inputElement.value;
    }
    else {
        // Handle the case when the element is not found
        console.error(`Element with id '${id}' not found.`);
        return ''; // or any default value you want
    }
}
function shuffleArray(array) {
    const gameSettings = JSON.parse(localStorage.getItem('gameSettings') || 'null') || setupGame();
    let gameSeed = calculateSeed(gameSettings.seed);
    gameSettings.seed = getNextSeed(gameSeed);
    localStorage.setItem('gameSettings', JSON.stringify(gameSettings));
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(seededRandom(gameSeed) * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function randUniqueItems(myList, amount) {
    if (amount >= myList.length) {
        return shuffleArray(myList.slice()); // Return a shuffled copy of the original list since all items are unique
    }
    const uniqueItems = new Set();
    while (uniqueItems.size < amount) {
        const randomItem = randItem(myList);
        uniqueItems.add(randomItem);
    }
    return shuffleArray(Array.from(uniqueItems));
}
function randItem(myList) {
    if (myList.length === 0) {
        return '';
    }
    const gameSettings = JSON.parse(localStorage.getItem('gameSettings') || 'null') || setupGame();
    let gameSeed = calculateSeed(gameSettings.seed);
    let value = myList[Math.floor(seededRandom(gameSeed) * myList.length)];
    gameSettings.seed = getNextSeed(gameSeed);
    localStorage.setItem('gameSettings', JSON.stringify(gameSettings));
    return value;
}
function calculateSeed(input) {
    if (typeof input === 'number') {
        return input;
    }
    if (input === '') {
        return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    }
    let seed = 0;
    const strInput = input.toString();
    for (let i = 0; i < strInput.length; i++) {
        seed = (seed * 31 + strInput.charCodeAt(i)) & 0x7fffffff;
    }
    return seed;
}
function getNextSeed(seed) {
    seed = (seed * 1664525 + 1013904223) & 0x7fffffff;
    return seed;
}
function seededRandom(seed) {
    const nextSeed = getNextSeed(seed);
    return nextSeed / 0x7fffffff;
}
