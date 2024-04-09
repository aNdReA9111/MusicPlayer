// Assuming the rest of your document remains unchanged

const audio = document.getElementById('musicPlayer');
const progressSlider = document.getElementById('progressSlider');
const currentTimeDisplay = document.getElementById('currentTime');
const totalDurationDisplay = document.getElementById('totalDuration');
const trackInfo = document.getElementById('trackInfo');
const imgAlbum = document.getElementById('img-album');

const track_list = [
{
    name: "Intro",
    artist: "Madman",
    image: "https://images.genius.com/15f26706b0b1601382ff2d2ca0b837bf.300x300x1.jpg",
    path: "Example/01. Intro.mp3",
    bg: "rgba(0, 0, 0, 0.368);"
},
{
    name: "Come ti fa Mad",
    artist: "Madman",
    image: "https://images.genius.com/15f26706b0b1601382ff2d2ca0b837bf.300x300x1.jpg",
    path: "Example/02. Come ti fa Mad (prod by Pk).mp3",
    bg: "rgba(0, 0, 0, 0.368);"
},
{
    name: "Freaks",
    artist: "Madman",
    image: "https://images.genius.com/15f26706b0b1601382ff2d2ca0b837bf.300x300x1.jpg",
    path: "Example/03. Freaks.mp3",
    bg: "rgba(0, 0, 0, 0.368);"
},
{
    name: "Veleno 6",
    artist: "Madman",
    image:"https://m.media-amazon.com/images/I/51QAEB7kayL._UXNaN_FMjpg_QL85_.jpg",
    path:"Example/08 Veleno 6 ft. Gemitaiz (Prod. by Mixer T).mp3",
    bg: "rgba(255, 0, 0, 0.325);"
},
{
    name: "Haterproof",
    artist: "Madman & Gemitaiz",
    image:"https://images.genius.com/30d5b3c7020eb28da03a97c31f8e437b.610x610x1.jpg",
    path: "Example/08 Haterproof.mp3",
    bg: "rgba(187, 85, 85, 0.325);"
}
];

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let repeat = false;


// Stack
const stack = [];


function reset() {
    totalDurationDisplay.textContent = "00:00";
    currentTimeDisplay.textContent = "00:00";
    progressSlider.value = 0;
}

function loadTrack(track_index) {
    reset();
    
    // Load a new track
    audio.src = track_list[track_index].path;
    audio.load();
    
    // Update details of the track
    imgAlbum.src = track_list[track_index].image;
    const trackInfoName = document.createElement('span');
    trackInfoName.textContent = track_list[track_index].name;
    const trackInfoArtist = document.createElement('span');
    trackInfoArtist.textContent = `${track_list[track_index].artist}`;
    trackInfo.textContent = '';
    trackInfo.appendChild(trackInfoName);
    trackInfo.appendChild(document.createElement('br'));
    trackInfo.appendChild(trackInfoArtist);
    const bgColor = track_list[track_index].bg;
    const rgbaValues = bgColor.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)/);
    if (rgbaValues) {
        const r = parseInt(rgbaValues[1]);
        const g = parseInt(rgbaValues[2]);
        const b = parseInt(rgbaValues[3]);
        const a = parseFloat(rgbaValues[4]);
        document.body.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    document.body.style.backgroundColor = track_list[track_index].bg;

    audio.addEventListener("ended", nextFunc);

    
}

// Play/Pause toggle function
function togglePlayPause() {
    const playPauseIcon = document.getElementById('playPauseIcon');
    if (isPlaying) {
        audio.pause();
        playPauseIcon.classList.remove('bi-pause-circle-fill');
        playPauseIcon.classList.add('bi-play-circle-fill');
    } else {
        audio.play();
        playPauseIcon.classList.remove('bi-play-circle-fill');
        playPauseIcon.classList.add('bi-pause-circle-fill');
    }
    isPlaying = !isPlaying;
}

function nextFunc(){
    if(repeat){
        // l'indice rimane uguale
    }else if(isRandom){
        stack.push(track_index);
        while((tmp = Math.floor(Math.random() * track_list.length)) == track_index){}
        track_index = tmp;
    }else if (track_index < track_list.length - 1)
        track_index += 1;
    else 
        track_index = 0;
    
    loadTrack(track_index);
    if (isPlaying)
        audio.play();
    else
        audio.pause();
}

function prevFunc(){
    if(repeat){
        // l'indice rimane uguale
    }else if(stack.length != 0){
        track_index = stack.pop();
    }else if (track_index > 0)
        track_index -= 1;
    else 
        track_index = track_list.length - 1;
    
    loadTrack(track_index);
    if (isPlaying)
        audio.play();
    else
        audio.pause();
}

function repeatFunc(){    
    if(repeat)
        document.getElementById('repeat').style.color = "#333";
    else
        document.getElementById('repeat').style.color = "lime";


    repeat = !repeat;
}

function randomTrack(){
    if(isRandom)
        document.getElementById('randomTrack').style.color = '#333';
    else
        document.getElementById('randomTrack').style.color = 'lime';

        isRandom = !isRandom;
}

document.getElementById('repeat').addEventListener('click', repeatFunc);
document.getElementById('randomTrack').addEventListener('click', randomTrack);

document.getElementById('playButton').addEventListener('click', togglePlayPause);
document.getElementById('nextButton').addEventListener('click', nextFunc);
document.getElementById('prevButton').addEventListener('click', prevFunc);

// Format time to display as minutes:seconds
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Display total duration once the audio metadata is loaded
audio.addEventListener('loadedmetadata', () => {
    totalDurationDisplay.textContent = formatTime(audio.duration);
});

// Update current time and progress bar as the audio plays
audio.addEventListener('timeupdate', function () {
    const percentage = (this.currentTime / this.duration) * 100;
    progressSlider.value = percentage;
    currentTimeDisplay.textContent = formatTime(this.currentTime);
});

// Update the current time when the user seeks
progressSlider.addEventListener('input', function () {
    const seekTime = (audio.duration / 100) * progressSlider.value;
    audio.currentTime = seekTime;
});

// Handle audio ending
audio.onended = function () {
    const playPauseIcon = document.getElementById('playPauseIcon');
    curr_track.addEventListener("ended", nextFunc);
};

// Volume Control remains unchanged
document.getElementById('volumeControl').addEventListener('input', function () {
    audio.volume = this.value;
});