"use strict";

let Btn = document.querySelectorAll('button');
let gameStatus = document.querySelector('#gameStatus');
let currentLetter = "X";
let state = "gameOn"

function player() {
    gameStatus.innerHTML = `La main est au joueur ${currentLetter} !`;
}



function checkWin() {
    if (Btn[0].innerText != "" && (Btn[0].innerText == Btn[1].innerText) && (Btn[1].innerText == Btn[2].innerText)) {
        state = 'win';
        return;
    }
    if (Btn[3].innerText != "" && (Btn[3].innerText == Btn[4].innerText) && (Btn[4].innerText == Btn[5].innerText)) {
        state = 'win';
        return;
    }
    if (Btn[6].innerText != "" && (Btn[6].innerText == Btn[7].innerText) && (Btn[7].innerText == Btn[8].innerText)) {
        state = 'win';
        return;
    }
    if (Btn[0].innerText != "" && (Btn[0].innerText == Btn[3].innerText) && (Btn[3].innerText== Btn[6].innerText)) {
        state = 'win';
        return;
    }
    if (Btn[1].innerText != "" && (Btn[1].innerText == Btn[4].innerText) && (Btn[4].innerText== Btn[7].innerText)) {
        state = 'win';
        return;
    }
    if (Btn[5].innerText != "" && (Btn[2].innerText == Btn[5].innerText) && (Btn[5].innerText== Btn[8].innerText)) {
        state = 'win';
        return;
    }
    if (Btn[0].innerText != "" && (Btn[0].innerText == Btn[4].innerText) && (Btn[4].innerText== Btn[8].innerText)) {
        state = 'win';
        return;
    }
    if (Btn[6].innerText != "" && (Btn[6].innerText == Btn[4].innerText) && (Btn[4].innerText== Btn[2].innerText)) {
        state = 'win';
        return;
    }
    state = 'draw';
    for (let i = 0; i < Btn.length; i++) {
        if (Btn[i].innerText == "") {
            state = 'gameOn';
        }
    };
    return;
};

function drawBox() {
    setTimeout(() => {
        console.log(state);
        if (confirm(`Match nul ! \n Nouvelle partie ?`) == true) {
            location.reload();
        }
    }, 100);
};

function winBox () {
    setTimeout(() => {
        if (confirm(`Le joueur ${currentLetter} a gagné ! \n Nouvelle partie ?`) == true) {
            location.reload();
        }
    }, 100);
};


player(currentLetter);

function play(event) {
    if (event.target.innerText == "") {
        event.target.innerText = currentLetter;
        checkWin();
        if(state === 'gameOn') {
            switch (currentLetter) {
                case "X":
                currentLetter = "O";
                break;
                case "O":
                currentLetter = "X";
                break;
                default:
                break;
            } } 
            else if (state === 'draw') {
                drawBox();
            }
            else {
                winBox();
            }
            player();
        }};
        
for (let i = 0; i < Btn.length; i++) {
    Btn[i].addEventListener('click', function(event)  {
        play(event)
    }) 
};
        
        