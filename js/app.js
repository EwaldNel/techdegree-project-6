
// variables

const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const startGame = document.querySelector("a.btn__reset");
const overlay = document.getElementById("overlay");
const ulPhrase = document.getElementById("phrase");
const heartLives = document.getElementsByTagName("img");

let missed = 0;

// listen for the start game button to be pressed

startGame.addEventListener("click" , () => {
   overlay.style.display = "none";
});

let phrases = [
    "Enjoy Coding",
    "Shining Star",
    "Riding Horses",
    "Video Games",
    "Kick a Ball"
];

// return a random phrase from an array

function getRandomPhraseAsArray(arr) {
    let randomPhrase = Math.floor(Math.random() * phrases.length);
    let splitPhrase = arr[randomPhrase].split("");
    return splitPhrase;
}

const phraseArray = getRandomPhraseAsArray(phrases);

//adds the letter of a string to the display

function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++ ) {
        const createListItem = document.createElement("li");
        createListItem.textContent = arr[i];
        
        ulPhrase.appendChild(createListItem);

        if (arr[i] === " ") {
            createListItem.className = "space";
        } else {
            createListItem.className = "letter";
        }
    }
}

addPhraseToDisplay(phraseArray);

// check if a letter is in the phrase

function checkLetter(button) {
    let classLetterElements = phrase.querySelectorAll(".letter");
    let match = null;
    for (i = 0; i < classLetterElements.length; i++) {
      const eachLetter = classLetterElements[i].textContent.toLowerCase();
      if (eachLetter === button.textContent) {
        classLetterElements[i].classList.add("show");
        match = button.textContent;
        } 
      }
      if (match != null) {
        return match;
      } else {
        return null;
      }
}
  
  checkLetter(qwerty);
  
  // listen for the onscreen keyboard to be clicked

  qwerty.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      event.target.classList.add("chosen");
      event.target.setAttribute("disabled", true);
      const letterFound = checkLetter(event.target);
      if (! letterFound) {
        heartLives[missed].setAttribute("src", "images/lostHeart.jpg");
        missed++;
      }
      if (event.target) {
        return checkWin();
      }
    }
  });
  
// check if the game has been won or lost

  function checkWin() {
    let eLetter = ulPhrase.getElementsByClassName('letter');
    let eShow = ulPhrase.getElementsByClassName('show');
    if (eLetter.length === eShow.length) {
    overlay.classList.add("win");
    overlay.querySelector("h2").textContent = "You've Won!";
    overlay.style.display = "flex";
    overlay.querySelector("a.btn__reset").textContent = "Play Again!";
    gameReset();
    }
    else if (missed > 4) {
    overlay.classList.add("lose");
    overlay.querySelector("h2").textContent = "You've Lost!";
    overlay.style.display = "flex";
    overlay.querySelector("a.btn__reset").textContent = "Play Again!";
    gameReset();
    }
  }
  
// resets the game

  function gameReset() {
    let key = document.querySelectorAll(".keyrow button");
    for (let i = 0; i < key.length; i++) {
          key[i].className = "";
          key[i].disabled = false;
      }
      ulPhrase.innerHTML = "";
      addPhraseToDisplay(getRandomPhraseAsArray(phrases));
      for (let i = 0; i < heartLives.length; i++) {
        let tries = document.querySelectorAll(".tries");
        tries[i].style.display = "inline";
      }
      missed = 0;
      if (gameReset) {
        for (let i = 0; i < heartLives.length; i++) {
        heartLives[i].setAttribute("src", "images/liveHeart.jpg");
        }
      }
  }
