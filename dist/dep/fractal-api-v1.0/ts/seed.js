"use strict";
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
function seededRandom(seed = -1) {
    if (seed === -1) {
        seed = getStoredSeed();
    }
    const nextSeed = getNextSeed(seed);
    localStorage.setItem('seed', String(nextSeed));
    return nextSeed / 0x7fffffff;
}
function getStoredSeed() {
    const storedSeed = localStorage.getItem('seed') || '';
    let gameSeed = parseInt(storedSeed, 10);
    gameSeed = calculateSeed(storedSeed);
    return gameSeed;
}
