// Global variable
// load video
const newYearVideoPath = 'videos/happy-new-year.mp4';
const videoElement = document.createElement('video');
videoElement.src = newYearVideoPath;
videoElement.load();
videoElement.controls = false;
videoElement.style.width = '100vw';
videoElement.style.height = '100vh';

const videoHolder = document.getElementById('video-holder');
videoHolder.style.display = 'none';
videoHolder.appendChild(videoElement);

// get elements
const audioElement = document.getElementById('audio');
const yearBox = document.getElementById('box1');
const timeBox = document.getElementById('box2');

// get current date and time when program starts
const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

let today = new Date(),
dd = String(today.getDate()).padStart(2, "0"),
mm = String(today.getMonth() + 1).padStart(2, "0"),
yyyy = today.getFullYear(),
nextYear = yyyy + 1,
dayMonth = "01/1/",
happyNewYear = dayMonth + nextYear;

today = mm + "/" + dd + "/" + yyyy;
if (today >= happyNewYear) {
    happyNewYear = dayMonth + nextYear;
}
//end

const countDown = new Date(happyNewYear).getTime()

const currentNow = new Date().getTime();
let globalDistance = countDown - currentNow;
let getDate = new Date();

let daysToNewYear = Math.floor(globalDistance / (day));
let hourToNewYear = Math.floor((globalDistance % (day)) / (hour));
let minsToNewYear = Math.floor((globalDistance % (hour)) / (minute));
let secsToNewYear = Math.floor((globalDistance % (minute)) / second);

(function () {
    today = new Date()
    dd = String(today.getDate()).padStart(2, "0"),
    mm = String(today.getMonth() + 1).padStart(2, "0"),
    yyyy = today.getFullYear(),
    nextYear = yyyy + 1,
    dayMonth = "01/1/",
    happyNewYear = dayMonth + nextYear;

    today = mm + "/" + dd + "/" + yyyy;
    if (today >= happyNewYear) {
        happyNewYear = dayMonth + nextYear;
    }
    //end

    const countDown = new Date(happyNewYear).getTime(),
        x = setInterval(function () {

            const now = new Date().getTime()
            let distance = countDown - now;
            let d = new Date();
            let year = d.getFullYear();
            
            let countYear = Math.ceil(year);
            let countDay = Math.floor(distance / (day));
            let countHour = Math.floor((distance % (day)) / (hour));
            let countMin = Math.floor((distance % (hour)) / (minute));
            let countSec = Math.floor((distance % (minute)) / second);

            // get and update time
            document.getElementById("dayNum2").innerText = countDay,
            document.getElementById("hourNum2").innerText = countHour,
            document.getElementById("minNum2").innerText = countMin,
            document.getElementById("secNum2").innerText = countSec;
            // get and update date(year)
            document.getElementById("dayNum").textContent = countYear.toString()[0];
            document.getElementById("hourNum").textContent = countYear.toString()[1];
            document.getElementById("minNum").textContent = countYear.toString()[2];
            document.getElementById("secNum").textContent = countYear.toString()[3];

            //play a one minute count down video and stop previous background song from playing
            if (countDay == 0 && countHour == 0 && countMin === 1 && countSec <= 1) {
                audioElement.src = '';  // clear current song;
                videoHolder.style.display = 'block';
                // focus allows the video to play even if I am not at the browser.
                videoElement.focus();
                videoElement.play();
                // backup play incase video did not play
                videoElement.addEventListener('focus', ()=> {
                    if (!videoIsPlaying(videoElement)) {
                        videoElement.play();
                    }
                });         
            }
            
            if (countDay == 0 && countHour == 0 && countMin == 0 && countSec > 1) {
                if (!videoIsPlaying(videoElement)) {
                    videoElement.play();
                }
            }

            if (countDay == 0 && countHour == 0 && countMin == 0 && countSec <= 10) {
                // yearBox.style.display = 'none';
                if (videoIsPlaying(videoElement)) {
                    timeBox.style.display = 'none';
                }
            }

            if (countDay == 0 && countHour == 0 && countMin == 0 && countSec <= 0) {
                if (videoIsPlaying(videoElement)) {
                    yearBox.style.display = 'none';
                }
                // timeBox.style.display = 'none';
            }
            // play the happy new year song.
            if (countDay < 0 && countHour <= 23 && countMin <= 59 && countSec <= 59) {
                audioElement.src = "sound/Happy-New-Year-Songs.mp3";
                audioElement.focus();
                audioElement.load();
                audioElement.muted = false;
                audioElement.autoplay = true;
                clearInterval(x);
                countDay = 0;
                countHour = 0;
                countMin = 0;
                countSec = 0;
                document.getElementById("dayNum2").innerText = countDay,
                document.getElementById("hourNum2").innerText = countHour,
                document.getElementById("minNum2").innerText = countMin,
                document.getElementById("secNum2").innerText = countSec;
            } 
            //seconds
        }, 0)
}());

// play the happy new year song till the end of January
if (daysToNewYear >= 335 && hourToNewYear <= 23 && minsToNewYear <= 59 && secsToNewYear <= 59) {
    document.getElementById("audio").src = "sound/Happy-New-Year-Songs.mp3";
    document.getElementById('audio').focus();
    document.getElementById("audio").load();
    document.getElementById("audio").muted = false;
    document.getElementById("audio").autoplay = true;
};

// IMPORTANT FUNCTION
function videoIsPlaying(videoElement) {
    return !videoElement.paused && !videoElement.ended && videoElement.readyState > 2;
}