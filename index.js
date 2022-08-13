const wordContainer = document.getElementById("wordContainer");
const btnStart = document.getElementById("btnStart");
const usedLettersElement = document.getElementById("usedLetters");


//Inicio
//Dibjar el canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.canvas.width = 0;
ctx.canvas.height = 0;

const bodyParts = [
    [4, 2, 1, 1],
    [4, 3, 1, 2],
    [3, 3, 1, 1],
    [5, 3, 1, 1],
    [3, 5, 1, 1],
    [5, 5, 1, 1]
];
let selectedWord;
let usedLetters;
let mistakes;
let hints;

//Variables para jugar
//Empezar el juego
const startGame = () => {
    selectedWord = [];
    usedLetters = [];
    mistakes = 0;
    hints = 0;
    btnStart.style.display = 'none';
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    drawGallow();
    selectRandomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent);
}
btnStart.addEventListener('click', startGame);

const drawGallow = () => {
    ctx.canvas.width = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#d95d39';
    //Dibujar horca
    ctx.fillRect(0, 7, 3, 1);
    ctx.fillRect(1, 0, 1, 7);
    ctx.fillRect(1, 0, 4, 1);
    ctx.fillRect(4, 0, 1, 2);
}

//Intermedio
//Tomar un palabra aleatoria
const selectRandomWord = () => {
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    selectedWord = word.split('');
}

const drawWord = () => {
    selectedWord.forEach((lettter) => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = lettter.toUpperCase();
        letterElement.classList.add("letter");
        letterElement.classList.add("hidden");
        wordContainer.appendChild(letterElement);
    });
}

const letterEvent = (e) => {
    let newLetter = e.key.toUpperCase();
    if (newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    }
}

const letterInput = letter => {
    if (selectedWord.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter(letter);
    }
    addLetter(letter);
    usedLetters.push(letter);
}

const correctLetter = letter => {
    const { children } = wordContainer;
    for (let i = 0; i < children.length; i++) {
        if (children[i].innerHTML === letter) {
            children[i].classList.toggle("hidden");
            hints++;
        }
    }
    if (hints === selectedWord.length) endGame();
}

const wrongLetter = letter => {
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if(mistakes=== bodyParts.length) endGame();
}

const addBodyPart = (bodyPart) => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...bodyPart);
}

const addLetter = (letter) => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
}
//Final
//Final del juego
const endGame = () => {
    document.removeEventListener('keydown', letterEvent);
    btnStart.style.display = 'block';
}
//Resetear el juego