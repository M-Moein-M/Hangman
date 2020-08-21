
function game() {
    let WORD;  // this is the word that user should guess through the game
    let foundCharacters;  // keeps track of each char that user guessed and it's in the WORD
    let hangmanState;  // if player reaches state 7 it means he/she lost the round
    const FatalState = 7;

    async function getWord() {
        try {
            let url = 'https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=odltax03v4i0mtn04tdg5fj1q95crhp6s6ml0sp9t9vfdv7uo';
            let res = (await fetch(url)).json();
            res.then(data=>startNewGame(data.word));
        } catch (error) {
            console.log(error)
        }
    }


    let startBtn = document.querySelector('.start-btn');
    startBtn.addEventListener('click', function () {
        document.querySelector('.intro').classList.add('hide');
        document.querySelector('.game').classList.remove('hide');
        getWord();
    });
    let playAgainBtn = document.querySelector('.play-again-btn');
    playAgainBtn.addEventListener('click', function () {
        document.querySelector('.after-game').classList.add('hide');
        document.querySelector('.game').classList.remove('hide');
        getWord();
    })

    // game
    function startNewGame(word) {
        document.querySelector('.hangman-image').src = "assets/man1.png";
        let wordInput = word;
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
        document.querySelector('.game').classList.add('hide');
        document.querySelector('.after-game-title').innerHTML = "LOSING ISN'T ALWAYS BaD... THE ANSWER WAS '" + WORD + "'";
        document.querySelector('.after-game').classList.remove('hide');
    }
    function userWon() {

        document.querySelector('.game').classList.add('hide');
        document.querySelector('.after-game-title').innerHTML = "WINNING IS ALWAYS GooD... THE ANSWER WAS '" + WORD + "'";
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