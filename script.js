let currentLang = 'es';
let start, end, direction, wordDisplay, currentWordIndex, currentWord;

const langNames = { es: 'Spanish', fr: 'French' };

// Language switcher
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLang = btn.dataset.lang;
        updateLabels();
        updateMaxRange();
    });
});

function updateLabels() {
    const name = langNames[currentLang];
    document.getElementById('page-title').textContent = `Learn ${name} Vocabulary`;
    document.getElementById('label-lang-to-ge').textContent = `${name} to German`;
    document.getElementById('label-ge-to-lang').textContent = `German to ${name}`;
    document.title = `${name} Vocabulary Learning`;
}

function updateMaxRange() {
    const max = vocabularyData.length;
    document.getElementById('start').max = max - 1;
    document.getElementById('end').max = max;
    if (parseInt(document.getElementById('end').value) > max) {
        document.getElementById('end').value = max;
    }
}

document.getElementById('start-learning').addEventListener('click', startLearning);
document.getElementById('flip-card').addEventListener('click', flipCard);
document.getElementById('next-card').addEventListener('click', nextCard);
document.getElementById('restart').addEventListener('click', restartLearning);

function startLearning() {
    start = parseInt(document.getElementById('start').value);
    end = parseInt(document.getElementById('end').value);
    if (end > vocabularyData.length) end = vocabularyData.length;
    if (start >= end) {
        alert('Start must be less than End!');
        return;
    }
    direction = document.querySelector('input[name="direction"]:checked').value;
    wordDisplay = document.getElementById('word-display');
    currentWordIndex = start;
    document.getElementById('completion-area').style.display = 'none';
    showWord();
}

function showWord() {
    if (currentWordIndex >= end) {
        document.getElementById('completion-area').style.display = 'block';
        wordDisplay.textContent = '';
        document.getElementById('progress-display').textContent = '';
        return;
    }

    currentWord = vocabularyData[currentWordIndex];
    if (direction === 'lang_to_ge') {
        wordDisplay.textContent = currentWord[currentLang];
    } else {
        wordDisplay.textContent = currentWord.de;
    }

    document.getElementById('progress-display').textContent =
        `${currentWordIndex - start + 1} / ${end - start}`;
}

function flipCard() {
    if (!currentWord) return;
    if (direction === 'lang_to_ge') {
        if (wordDisplay.textContent === currentWord[currentLang]) {
            wordDisplay.textContent = currentWord.de;
        } else {
            wordDisplay.textContent = currentWord[currentLang];
        }
    } else {
        if (wordDisplay.textContent === currentWord.de) {
            wordDisplay.textContent = currentWord[currentLang];
        } else {
            wordDisplay.textContent = currentWord.de;
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

// Initialize
updateLabels();
updateMaxRange();
