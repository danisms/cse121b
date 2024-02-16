// GAME MENU
// (PlayBtn, ScoreBtn, ExitBtn)

// Global Variables
const playGameBtn = document.querySelector('#playGameBtn');
const scoresBtn = document.querySelector('#scoresBtn');
const exitBtn = document.querySelector('#exitBtn');

// Event Listeners
playGameBtn.addEventListener('click', playGameMenu);
scoresBtn.addEventListener('click', gameScores);
exitBtn.addEventListener('click', () => {close()})

function playGameMenu() {
    console.log(playGameBtn.value);
    // close();
    open('inGame.html', target='_self');
};

function gameScores() {
    console.log(scoresBtn.value);
    close();
    open('scores.html')
};

