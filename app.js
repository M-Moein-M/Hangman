// how to send a get request with XML HTTP request
/* const Http = new XMLHttpRequest();
const url='http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d328f2c99bab8eddaaf22e3a0ae087a8';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
    console.log(Http.responseText)
}*/

function game() {
    let WORD;  // this is the word that user should guess through the game
    let foundCharacters;  // keeps track of each char that user guessed and it's in the WORD
    let hangmanState;  // if player reaches state 7 it means he/she lost the round
    const FatalState = 7;

    let startBtn = document.querySelector('.start-btn');
    startBtn.addEventListener('click', function () {
        document.querySelector('.intro').classList.add('hide');
        document.querySelector('.game').classList.remove('hide');
        startNewGame();
    });
    let playAgainBtn = document.querySelector('.play-again-btn');
    playAgainBtn.addEventListener('click', function () {
        document.querySelector('.after-game').classList.add('hide');
        document.querySelector('.game').classList.remove('hide');
        startNewGame();
    })

    // game
    function startNewGame() {
        document.querySelector('.hangman-image').src = "assets/man1.png";
        let wordInput = 'javascript';
        WORD = wordInput.toUpperCase();
        foundCharacters = [];
        hangmanState = 1;
        refreshWord();  // create word in the game
        // creating alphabet buttons
        let alphabetDiv = document.querySelector('.alphabet-div');
        while (alphabetDiv.firstChild) {
            alphabetDiv.removeChild(alphabetDiv.firstChild);
        }
        let aAsciiCode = 'A'.charCodeAt(0);
        for (let i = 0; i < 26; i++) {
            let newBtn = document.createElement('button');
            newBtn.classList.add('btn');
            newBtn.classList.add('btn-warning');
            newBtn.classList.add('alphabet-btn');
            newBtn.innerHTML = String.fromCharCode(aAsciiCode + i);
            newBtn.addEventListener("click", alphabetEntered);
            alphabetDiv.appendChild(newBtn);
        }
    }


    function alphabetEntered() {
        this.setAttribute('disabled', 'disabled');
        alphabetBtnPressed(this.innerHTML)
    }

    function hangmanNextState() {
        hangmanState++;

        let newSrc = 'assets/man';
        newSrc += hangmanState.toString() + '.png';
        document.querySelector('.hangman-image').src = newSrc;

        if (hangmanState === FatalState) {
            gameOver();
        }
    }

    function gameOver() {
        console.log('GAME OVER');
        document.querySelector('.game').classList.add('hide');
        document.querySelector('.after-game-title').innerHTML = "LOSING ISN'T ALWAYS BaD... THE ANSWER WAS '"+WORD+"'";
        document.querySelector('.after-game').classList.remove('hide');
    }

    function userWon() {
        console.log('WON');
        document.querySelector('.game').classList.add('hide');
        document.querySelector('.after-game-title').innerHTML = "WINNING IS ALWAYS GooD... THE ANSWER WAS '"+WORD+"'";
        document.querySelector('.after-game').classList.remove('hide');

    }

    function alphabetBtnPressed(character) {
        if (WORD.includes(character)) {
            foundCharacters.splice(foundCharacters.length, 0,
                character); // add the character to list of found characters
            refreshWord();

        } else {
            hangmanNextState();
        }
    }


    function refreshWord() {
        let win = true;  // if this gets true it means the user won the round

        let h1Word = "";  // here we update inner HTML of h1.word
        let word = document.querySelector('.word');
        for (let char of WORD) {
            if (foundCharacters.includes(char))
                h1Word += char + " ";
            else {
                h1Word += "_ ";
                win = false; // this indicates the user didn't guessed the word yet
            }
        }
        word.innerHTML = h1Word;
        if (win)
            userWon();
    }
}

window.addEventListener('load', game);