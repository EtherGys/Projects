
let word = [];
let wordState = [];
let lettersList = [];
let currentLetter = "";

let wordPrompt; 
const btnLetter = document.querySelector('#btn_letter');

let inputLetter = document.querySelector('#letter');


/**
* Get word from user input, init a wordstate for the player to see
* 
* @return void
*/
function initWord() {
    word = Array.from(wordPrompt); 
    for (let i = 0; i < word.length; i++){
        wordState[i] = '_';
    }    
};


/**
* Find all occurrences of currentLetter, changes the wordstate accordingly
* 
* @return void
*/
function findAllOccurrences () {
    for (let i = 0; i < word.length; i++){
        if (word[i] === currentLetter) {
            wordState[i] = currentLetter;
        }
    }
}

/**
* Check if the player has won
* 
* @return void
*/
function verifyWin () {
    if (wordState.toString() === word.toString()) {
        setTimeout(() => {
            alert("c'est gagné !");
        }, 200);
    }
}

/**
* Print gamestate
* 
* @return void
*/
function printGameState() {
    console.log(wordState);
    console.log(lettersList);
}

function displayWordState() {
    let divGame = document.querySelector('.divGame');
    divGame.innerText = `${wordState.toString().replaceAll(',', ' ')}`; 
};


function displayLettersList() {
    let divLettersList = document.querySelector('.divLettersList');
    divLettersList.innerText = `${lettersList.toString().replaceAll(',', ', ')}`;
}
/**
* Allows player to play the hangman game
* 
* @return void
*/
function play() {
    currentLetter = inputLetter.value.toLowerCase(); // We get the current letter
    if (!lettersList.includes(currentLetter)){ // If we didn't already use the letter
        lettersList.push(currentLetter); // We push the current letter to the list of used letters
        findAllOccurrences(); // We check the current letter occurences in the word
        displayWordState();
        displayLettersList()
        verifyWin();
    } 
    printGameState();
    inputLetter.value = '';
};

wordPrompt = prompt("Quel mot voulez-vous faire deviner ?");
initWord();
displayWordState();
btnLetter.onclick = play;





