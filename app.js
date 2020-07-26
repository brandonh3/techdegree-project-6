// Variables
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const start = document.querySelector('.btn__reset');
let chars = [];
const phrases = [
    'I love JavaScript',
    'FEWD is loads of fun',
    'Treehouse Techdegree',
    'Traverse the DOM',
    'Loops Arrays and Functions'
]
let missed = 0;

// Click listener for start overlay
start.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// Get a random phrase from phrases array
function getRandomPhraseAsArray(arr) {
    const randomPhrase = arr[Math.floor(Math.random() * phrases.length)].toUpperCase();

    const chars = randomPhrase.split("");
    return chars;
}
chars = getRandomPhraseAsArray(phrases);

// Add the individual characters from the random array to the Ul at list items
const ul = phrase.querySelector('ul');

function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        li.textContent = arr[i];
        if(arr[i] === " ") {
            li.classList.add('space');
        } else {
            li.classList.add('letter');
        }
        
        ul.appendChild(li);
    }
}

addPhraseToDisplay(chars);

// Check the puzzle for the letter chosen by the user
const letters = document.getElementsByClassName('letter');
const show = document.getElementsByClassName('show');
let match = 0;

function checkLetter(letter) {
    for (let i = 0; i < letters.length; i++) {
        if (letters[i].textContent == letter) {
            letters[i].classList.add('show');
            match++;
        }
    }
    if (match > 0) {
        match = 0;
        return letter;
    }
}

function checkWin() {
    const title = document.querySelector('.title');

    if (letters.length == show.length) {
        overlay.style.display = 'flex';
        overlay.classList.add('win');
        title.textContent = 'Awesome Job! You Won!';
        start.style.hover
    } else if (missed >= 5) {
        overlay.style.display = 'flex';
        overlay.classList.add('lose');
        title.textContent = 'You Lost! Better Luck Next Time!';
    }
    if (overlay.style.display === 'flex') {
        start.textContent = 'Play Again';
        start.addEventListener('click', () => {
            reset();
        });
    }
}

// Listen for keyboard clicks from user
const tries = document.getElementsByClassName('tries');

qwerty.addEventListener('click', (event) => {
    if (event.target.tagName == 'BUTTON') {
        const button = event.target;
        const guess = button.textContent.toUpperCase();
        const letterFound = checkLetter(guess);
        if (!letterFound) {
            missed += 1;
            tries[missed - 1].style.display = 'none';
        }
        button.classList.add('chosen');
        button.disabled = true;
    }
    checkWin(event);
});

// Start or Reset Game
function reset() {
    const keyboard = document.getElementsByTagName('button');
    for (let i = 0; i < keyboard.length; i++) {
        if (keyboard[i].classList.contains('chosen')) {
            keyboard[i].classList.remove('chosen');
            keyboard[i].disabled = false;
        }
    }   
    overlay.style.display = 'none';
    overlay.className = 'start';
    missed = 0;
    ul.innerHTML = '';
    chars = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(chars);
    for (let i = 0; i < tries.length; i++) {
        tries[i].style.display = 'inline-block';
    }
}











