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
    if (type === 'explore') {
        while (true) {
            if (deck.length === 0) {
                deck = setupDeck(type, gameSettings);
            }
            market.push(deck[0].src);
            gameProgress.seasonProg += deck[0].time;
            if (deck[0].ruin === false) {
                deck.shift();
                break;
            }
            deck.shift();
        }
    }
    else {
        while (market.length < size && deck.length > 0) {
            if (deck.length === 0) {
                deck = setupDeck(type, gameSettings);
            }
            market.push(deck.shift());
        }
    }
    gameProgress[type + 'Deck'] = deck;
    gameProgress[type + 'Market'] = market;
    drawMarket(type, market);
    localStorage.setItem('gameProgress', JSON.stringify(gameProgress));
    return gameProgress;
}
function drawCard() {
    // Collect Memory
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
    gameProgress = refillMarket('explore', gameProgress.exploreDeck, [], -1);
    console.log(gameProgress.season);
    const seasonDisplaySeason = document.getElementById('season-display-season');
    seasonDisplaySeason.innerText = String(seasonData[gameProgress.season].name);
    console.log(gameProgress.seasonProg);
    console.log(gameProgress.seasonMax);
    const seasonDisplayProg = document.getElementById('season-display-prog');
    seasonDisplayProg.innerText = `${gameProgress.seasonProg} / ${gameProgress.seasonMax}`;
    localStorage.setItem('gameProgress', JSON.stringify(gameProgress));
}
