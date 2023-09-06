let vocabulary = [
    {"spanish word": "german word"},
    {"spanish word": "german word"},
    // ... (add all your words here)
];

document.getElementById('start-learning').addEventListener('click', startLearning);
document.getElementById('flip-card').addEventListener('click', flipCard);
document.getElementById('next-card').addEventListener('click', nextCard);
document.getElementById('restart').addEventListener('click', restartLearning);

let start, end, direction, wordDisplay, currentWordIndex, currentWord;

function startLearning() {
    start = parseInt(document.getElementById('start').value);
    end = parseInt(document.getElementById('end').value);
    direction = document.querySelector('input[name="direction"]:checked').value;
    wordDisplay = document.getElementById('word-display');
    currentWordIndex = start;

    showWord();
}

function showWord() {
    if (currentWordIndex >= end) {
        document.getElementById('completion-area').style.display = 'block';
        return;
    }

    currentWord = vocabulary[currentWordIndex];
    if (direction === 'sp_to_ge') {
        wordDisplay.textContent = Object.keys(currentWord)[0]; // Gets the "spanish word"
    } else {
        wordDisplay.textContent = currentWord[Object.keys(currentWord)[0]]; // Gets the "german word"
    }
}

function flipCard() {
    if (currentWord) {
        if (wordDisplay.textContent === Object.keys(currentWord)[0]) {
            wordDisplay.textContent = currentWord[Object.keys(currentWord)[0]];
        } else {
            wordDisplay.textContent = Object.keys(currentWord)[0];
        }
    }
}

function nextCard() {
    currentWordIndex++;
    showWord();
}

function restartLearning() {
    currentWordIndex = start;
    document.getElementById('completion-area').style.display = 'none';
    showWord();
}
