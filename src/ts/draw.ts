function drawMarket(type: string, market: string[]): void {
  const marketCon = document.getElementById(
    type + '-display',
  ) as HTMLInputElement;
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

function refillMarket(
  type: 'explore' | 'ambush' | 'hero' | 'skill',
  deck: (exploreCardType | string)[], // Modify the type of deck
  market: string[],
  size: number,
): GameProgress {
  const gameProgress = JSON.parse(
    localStorage.getItem('gameProgress') || 'null',
  );
  const gameSettings = JSON.parse(
    localStorage.getItem('gameSettings') || 'null',
  );

  if (type === 'explore') {
    while (true) {
      if (deck.length === 0) {
        deck = setupDeck(type, gameSettings);
      }
      market.push((deck[0] as exploreCardType).src as string);
      gameProgress.seasonProg += (deck[0] as exploreCardType).time;

      if ((deck[0] as exploreCardType).ruin === false) {
        deck.shift();
        break;
      }
      deck.shift();
    }
  } else {
    while (market.length < size && deck.length > 0) {
      if (deck.length === 0) {
        deck = setupDeck(type, gameSettings);
      }
      market.push(deck.shift() as string);
    }
  }
  gameProgress[type + 'Deck'] = deck;
  gameProgress[type + 'Market'] = market;

  drawMarket(type, market);

  localStorage.setItem('gameProgress', JSON.stringify(gameProgress));
  return gameProgress;
}

function drawCard(): void {
  // Collect Memory
  const gameSettings =
    JSON.parse(localStorage.getItem('gameSettings') || 'null') || setupGame();

  let gameProgress: GameProgress = JSON.parse(
    localStorage.getItem('gameProgress') || 'null',
  );
  if (Number(gameProgress.seasonProg) >= Number(gameProgress.seasonMax)) {
    if (gameProgress.season === 3) {
      return;
    }
    gameProgress.season += 1;
    gameProgress.seasonProg = 0;
    gameProgress.seasonMax = seasonData[gameProgress.season].duration;
    localStorage.setItem('gameProgress', JSON.stringify(gameProgress));
  }

  gameProgress = refillMarket(
    'skill',
    gameProgress.skillDeck,
    gameProgress.skillMarket,
    3,
  );

  gameProgress = refillMarket('explore', gameProgress.exploreDeck, [], -1);
  const seasonDisplaySeason = document.getElementById(
    'season-display-season',
  ) as HTMLInputElement;
  seasonDisplaySeason.innerText = String(seasonData[gameProgress.season].name);
  const seasonDisplayProg = document.getElementById(
    'season-display-prog',
  ) as HTMLInputElement;
  seasonDisplayProg.innerText = `${gameProgress.seasonProg} / ${gameProgress.seasonMax}`;

  localStorage.setItem('gameProgress', JSON.stringify(gameProgress));
}
