const constants = require("../utilities/constants");

buildDeck = () => {
    let deck = []
    let cardNames = constants.CardNames.values();
    for (let card of cardNames) {
        addToDeck(card, deck);
    }
    for(let i = 0; i < deck.length*2; i++) {
        const one = Math.floor(Math.random()*(deck.length-1));
        const two = Math.floor(Math.random()*(deck.length-1));
        let temp = deck[one];
        deck[one] = deck[two];
        deck[two] = temp;
    }
    return deck;
}

function addToDeck(cardName, deck) {
    if (!cardName || !deck) {
        console.log("cardName and deck must not be undefined.")
        return;
    }
    for (let i = 0; i < 3; i++) {
        deck.push(cardName);
    }
}

shuffleArray = (arr) => {
    if (!arr) {
        console.log(`arr must not be undefined. arr was ${arr}`);
    }

    for(let i = 0; i < arr.length*2; i++) {
        const one = i%arr.length
        const two = Math.floor(Math.random()*(arr.length-1));
        let temp = arr[one];
        arr[one] = arr[two];
        arr[two] = temp;
    }
    return arr;
}

buildNameSocketMap = (players) => {
    let map = {}
    players.map((x) => {
        map[x.name] = x.socketID;
    })
    return map
}

buildNameIndexMap = (players) => {
    let map = {}
    players.map((x, index) => {
        map[x.name] = index;
    })
    return map
}

buildPlayers = (players) => {
    // colors = ['#55a555', '#4397bb', '#b93f49', '#6c49ce', '#cc6e33', '#bd7676', '#bb399a']
    colors = ['#e35d5d', '#4bd8e2', '#f5e44d', '#e477ff', '#777dff', '#4ae08b', '#e29f22'];
    colorsText = ['#ff7d7d', '#5df4ff', '#fff06b', '#e993ff', '#9499ff', '#84ffb9', '#ffc353'];
    shuffleArray(colors);

    players.forEach(x => {
        delete x.chosen;
        x.money = 2;
        x.influences = [];
        x.isDead = false;
        x.color = colors.pop();
        x.colorText = colorsText.pop(); 
        delete x.isReady;
    });
    console.log(players);
    return players;
}

exportPlayers = (players) => {
    players.forEach(x => {
        delete x.socketID;
    });
    return players;
}

module.exports = {
    buildDeck: buildDeck,
    buildPlayers: buildPlayers,
    exportPlayers: exportPlayers,
    shuffleArray: shuffleArray,
    buildNameSocketMap: buildNameSocketMap,
    buildNameIndexMap: buildNameIndexMap
}