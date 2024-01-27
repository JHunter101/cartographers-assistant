function shuffleList(myList: any[]): any[] {
  for (let i = myList.length - 1; i > 0; i--) {
    const j = randItem([...Array(i + 1).keys()]);
    [myList[i], myList[j]] = [myList[j], myList[i]];
  }
  return myList;
}

function randUniqueItems(myList: any[], amount: number): any[] {
  myList = shuffleList(myList);

  if (amount >= myList.length) {
    return myList;
  }

  myList = myList.slice(0, amount);
  return myList;
}

function randItem(myList: any[]): any {
  if (myList.length === 0) {
    return '';
  }
  const gameSeed = getStoredSeed();
  const value = myList[Math.floor(seededRandom(gameSeed) * myList.length)];
  return value;
}
