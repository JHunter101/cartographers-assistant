"use strict";
function drawMarket(type, market) {
    const marketCon = document.getElementById(type + '-display');
    marketCon.innerText = '';
    market.forEach((cardSrc) => {
        const cardCon = document.createElement('div');
        cardCon.classList.add(type + '-card-con');
        const card = document.createElement('img');
        card.src = cardSrc;
        cardCon.appendChild(card);
        marketCon.appendChild(cardCon);
    });
}
function refillMarket(type, deck, // Modify the type of deck
market, size) {
    const gameProgress = JSON.parse(localStorage.getItem('gameProgress') || 'null');
    const gameSettings = JSON.parse(localStorage.getItem('gameSettings') || 'null');
    while (market.length < size && deck.length > 0) {
        if (deck.length === 0) {
            deck = setupDeck(type);
        }
        market.push(deck.shift());
    }
    gameProgress[type + 'Deck'] = deck;
    gameProgress[type + 'Market'] = market;
    drawMarket(type, market);
    localStorage.setItem('gameProgress', JSON.stringify(gameProgress));
    return gameProgress;
}
function smoothShape(shape) {
    const size = shape.length;
    const newShape = emptyGird(3);
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const neighbors = [];
            for (let x = Math.max(0, i - 1); x < Math.min(size, i + 2); x++) {
                for (let y = Math.max(0, j - 1); y < Math.min(size, j + 2); y++) {
                    neighbors.push(shape[x][y]);
                }
            }
            neighbors.push(shape[i][j]);
            const average = neighbors.reduce((sum, value) => sum + value, 0) / neighbors.length;
            newShape[i][j] = average;
        }
    }
    return newShape;
}
function thresholdShape(shape, thresholdCount) {
    const size = shape.length;
    const newShape = emptyGird(3);
    const flatList = shape.flat();
    const thresholdSize = flatList.sort((a, b) => b - a)[thresholdCount];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            newShape[i][j] = shape[i][j] > thresholdSize ? 1 : 0;
        }
    }
    return newShape;
}
function emptyGird(size) {
    return Array.from({ length: size }, () => Array(size).fill(0));
}
function createShape(size) {
    let shape = emptyGird(3);
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            shape[i][j] = seededRandom();
        }
    }
    shape = smoothShape(shape);
    shape = thresholdShape(shape, size);
    return shape;
}
function createExploreCard() {
    const exploreData = {
        time: 0,
        types: [],
        shapes: [],
        ruined: [],
        coins: [],
    };
    const shapeSize = Math.ceil(seededRandom() * 6);
    exploreData['time'] = Math.floor(shapeSize / 2);
    const choiceTypeCount = seededRandom() < 0.65 ? 1 : 2;
    const choiceSizeCount = shapeSize === 1 ? 1 : seededRandom() < 0.65 ? 1 : 2;
    for (let i = 0; i < choiceSizeCount; i++) {
        exploreData['shapes'] = exploreData['shapes'].concat([
            createShape(Math.floor(shapeSize / (i + 1))),
        ]);
    }
    exploreData['types'] = randUniqueItems(['forest', 'village', 'water', 'farm'], choiceTypeCount);
    const maxTypeShapeLength = Math.max(exploreData['types'].length, exploreData['shapes'].length);
    let isRuined = [seededRandom() < 0.1];
    let isCoined = [seededRandom() < 0.65];
    if (choiceSizeCount > 1) {
        if (isCoined[0]) {
            isCoined = [false, true];
        }
        else if (isRuined[0]) {
            isRuined = [true, false];
            isCoined = [false, false];
        }
        else {
            isCoined = [false, true];
        }
    }
    else {
        isCoined = [false];
    }
    isRuined = isRuined.concat(Array(maxTypeShapeLength - isRuined.length).fill(isRuined[isRuined.length - 1]));
    isCoined = isCoined.concat(Array(maxTypeShapeLength - isCoined.length).fill(isCoined[isCoined.length - 1]));
    exploreData['ruined'] = isRuined;
    exploreData['coins'] = isCoined;
    exploreData['types'] = exploreData['types'].concat(Array(maxTypeShapeLength - exploreData['types'].length).fill(exploreData['types'][exploreData['types'].length - 1]));
    exploreData['shapes'] = exploreData['shapes'].concat(Array(maxTypeShapeLength - exploreData['shapes'].length).fill(exploreData['shapes'][exploreData['shapes'].length - 1]));
    return exploreData;
}
function drawCard() {
    const gameSettings = JSON.parse(localStorage.getItem('gameSettings') || 'null') || setupGame();
    let gameProgress = JSON.parse(localStorage.getItem('gameProgress') || 'null');
    if (Number(gameProgress.seasonProg) >= Number(gameProgress.seasonMax)) {
        if (gameProgress.season === 3) {
            return;
        }
        gameProgress.season += 1;
        gameProgress.seasonProg = 0;
        gameProgress.seasonMax = seasonData[gameProgress.season].duration;
        localStorage.setItem('gameProgress', JSON.stringify(gameProgress));
    }
    gameProgress = refillMarket('skill', gameProgress.skillDeck, gameProgress.skillMarket, 3);
    const exploreData = createExploreCard();
    gameProgress.seasonProg += exploreData['time'];
    const gridContainer = document.getElementById('explore-display');
    if (gridContainer) {
        gridContainer.innerHTML = '';
        for (let i = 0; i < exploreData['types'].length; i++) {
            const grid = document.createElement('div');
            grid.classList.add('grid', 'grid-cols-3');
            gridContainer.appendChild(grid);
            for (let y = 0; y < 3; y++) {
                const row = document.createElement('div');
                for (let x = 0; x < 3; x++) {
                    const cell = document.createElement('div');
                    const image = document.createElement('img');
                    if (exploreData['shapes'][i][y][x] === 1) {
                        image.src = tileData[exploreData['types'][i]];
                    }
                    else {
                        image.src = 'res/tiles/tile-empty.png';
                    }
                    cell.appendChild(image);
                    row.appendChild(cell);
                }
                grid.appendChild(row);
            }
            const extra = document.createElement('div');
            extra.classList.add('extra');
            const extraType = ['ruined', 'coins'];
            for (const element of extraType) {
                if (exploreData[element][i]) {
                    const imgBox = document.createElement('div');
                    const extraImg = document.createElement('img');
                    extraImg.src = 'res/tiles/extra-' + element + '.png';
                    imgBox.appendChild(extraImg);
                    extra.appendChild(imgBox);
                }
            }
            gridContainer.appendChild(extra);
        }
    }
    const seasonDisplaySeason = document.getElementById('season-display-season');
    seasonDisplaySeason.innerText = String(seasonData[gameProgress.season].name);
    const seasonDisplayProg = document.getElementById('season-display-prog');
    seasonDisplayProg.innerText = `${gameProgress.seasonProg} / ${gameProgress.seasonMax}`;
    const seasonDisplayAddition = document.getElementById('season-display-addition');
    seasonDisplayAddition.innerText = '+' + exploreData.time;
    localStorage.setItem('gameProgress', JSON.stringify(gameProgress));
}
