// GAME MENU
// (PlayBtn, ScoreBtn, ExitBtn)

// Global Variables
const playGameBtn = document.querySelector('#playGameBtn');
const scoresBtn = document.querySelector('#scoresBtn');
const aboutBtn = document.querySelector('#aboutBtn');
const exitBtn = document.querySelector('#exitBtn');

// Event Listeners
playGameBtn.addEventListener('click', playGameMenu);
scoresBtn.addEventListener('click', gameScores);
aboutBtn.addEventListener('click', ()=> open('about.html', target='_self'))
exitBtn.addEventListener('click', () => {
    open('index.html', '_self');
    close();
});

function playGameMenu() {
    console.log(playGameBtn.value);
    // close();
    open('inGame.html', target='_self');
};

function gameScores() {
    console.log(scoresBtn.value);
    open('scores.html', target='_self')
};

