"use strict";
function randItem(myList) {
    if (myList.length === 0) {
        return '';
    }
    const value = myList[Math.floor(seededRandom() * myList.length)];
    return value;
}
function shuffleList(myList) {
    for (let i = myList.length - 1; i > 0; i--) {
        const j = randItem([...Array(i + 1).keys()]);
        [myList[i], myList[j]] = [myList[j], myList[i]];
    }
    return myList;
}
function randUniqueItems(myList, amount) {
    myList = shuffleList(myList);
    if (amount >= myList.length) {
        return myList;
    }
    myList = myList.slice(0, amount);
    return myList;
}
