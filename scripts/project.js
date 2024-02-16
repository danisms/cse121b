let progress = 0;

// Display text by letters
textByLetter(`INTERACTIVE<br>TIC-TAC-TOE`, 'gameTitle', 90)

// Function to load bar
function loadBar() {
    function loader() {
        // let animatedImg = document.querySelector('#animatedImg')
        let loader = document.querySelector('#loader');
        // load progress bar by increasing the width
        if (progress < 100) {
            progress += 5;
            loader.style.width = `${progress}%`;
            loader.textContent = `${progress}%`;
            console.log(progress)
        }else {
            clearInterval(loading);
            console.log('Interval(loading) = cleared');
            open('my_project/index.html', '_self');
        };
    };
    let loading = setInterval(loader, 200);
}
setTimeout(() => { 
    const dis = document.querySelector('#progress-bar-box');
    dis.style.display = 'block';
    dis.innerHTML = 
    `<Marquee 
        direction="right" 
        scrollamount="8" 
        loop="1"
        behavior="alternate">
        <img id="animatedImg" src="my_project/images/gif/dinosaur.gif" width="250" alt="A working dinosaur">
    </Marquee>
    <div id="progress-bar">
        <div id="loader">0</div>
    </div>`;
    loadBar();
}, 2800);

let displayTitle = ``;
let indexNum = 0;

function textByLetter(text, idValue, speed) {
    let textList = text.split('');
    console.log(textList)
    console.log(textList.length)
    function writeText() {
        let textValue = textList[indexNum];
        displayTitle += textValue;
        document.getElementById(idValue).innerHTML = displayTitle;
        indexNum++;
        if (indexNum >= textList.length) {
            clearInterval(writing)
        }
    }
    writing = setInterval(writeText, speed)
};
