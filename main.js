let debounce = false
let gameplayLegend = {
    "rock": {
        "rock": "tie",
        "paper": "lose",
        "scissors": "win"
    },
    "paper":{
        "rock": "win",
        "paper": "tie",
        "scissors": "lose"
    },
    "scissors":{
        "rock": "lose",
        "paper": "win",
        "scissors": "tie"
    },
};
let botLegend = {
    0:"rock",
    1:"paper",
    2:"scissors",
}
let imageLegend = {
    "player":{
        "rock": "images/RockPlayer.png",
        "paper": "images/PaperPlayer.png",
        "scissors": "images/ScissorsPlayer.png",
    },
    "bot":{
        "rock": "images/RockBot.png",
        "paper": "images/PaperBot.png",
        "scissors": "images/ScissorsBot.png",
    }
}
let colorLegend = {
    "win": '<span style="color: green;">win</span>',
    "lose": '<span style="color: red;">loose</span>',
    "tie": '<span style="color: gray;">tie</span>',
}

// wait function that throttles script in milliseconds
function wait(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function buttonClicked(event) {   
    
    // limit the amount of button inputs
    if (debounce) {return;}
    debounce = true;
    
    const playerImage = document.getElementById("playerImageHolder");
    const botImage = document.getElementById("botImageHolder");
    const resultText = document.getElementById("resultText");
    var playerChoice = event.target.id;
    var botChoice = botLegend[getRandomInt(3)];
    var result = gameplayLegend[playerChoice][botChoice];

    resultText.innerHTML = "Result: pending..."

    // set player image to chosen item
    playerImage.classList.add('animateHand');
    botImage.classList.add('animateHand');

     // set both images to rock
    document.getElementById("playerImageHolder").src = imageLegend["player"]["rock"];
    document.getElementById("botImageHolder").src = imageLegend["bot"]["rock"];

    playerImage.addEventListener('animationend', async function() {

        // set player image
        document.getElementById("playerImageHolder").src = imageLegend["player"][playerChoice];

        // set bot image
        document.getElementById("botImageHolder").src = imageLegend["bot"][botChoice];

        // remove anims to allow for another play
        playerImage.classList.remove('animateHand');
        botImage.classList.remove('animateHand');

        resultText.innerHTML = "Result: "+colorLegend[result]

        // throttle script for .25 seconds until next game
        await wait(1000);
        debounce = false;
    });
}

// wait for DOM to load before initilizing button connections
document.addEventListener("DOMContentLoaded", function() {
    // iterate through all of the buttons and add click listener to each one
    var btns = document.getElementById('btnContainer').children;
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', buttonClicked)
    }
});