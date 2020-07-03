/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePLayer, gamePLaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
        if (gamePLaying) {
        //1. random number
        var dice = Math.floor(Math.random() * 6) +1;

        //2. display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'resources/img/dice-' + dice + '.png';


        //3. update the round score IF the rolled number is NOT a 1
        if (dice !== 1) {
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePLayer).textContent = roundScore;
        } else {
            nextPLayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePLaying) {
        //add current score to globale score
        scores[activePLayer] += roundScore;


        //update the UI
        document.querySelector('#score-' + activePLayer).textContent = scores[activePLayer];

        //Check if player won the game
        if (scores[activePLayer] >= 100) {
            document.querySelector('#name-' + activePLayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePLayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePLayer + '-panel').classList.remove('active');
            gamePLaying = false;
        } else {
        //next player
        nextPLayer();
        }
    }
});

function nextPLayer(){
    //next player
    activePLayer === 0 ? activePLayer = 1 : activePLayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
};

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    activePLayer = 0;
    roundScore = 0;
    gamePLaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
};


//document.querySelector('#current-' + activePLayer).textContent = dice;
//document.querySelector('current-' + activePLayer).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#score-0').textContent;
//console.log(x);