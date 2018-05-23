const player = document.querySelector('.player');

const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreenButton = player.querySelector('#full_screen_button')

function togglePlay() {
    if (video.paused) {
        video.play()
    } else {
        video.pause()
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.innerHTML = icon;
}

function skip(e) {
    let current = video.currentTime
    video.currentTime = current + Number(this.dataset.skip)
}

function deltaRange() {
    video[this.name] = this.value
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function goFullScreen() {
    console.log('clicked')
    video.webkitEnterFullscreen()
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('pause', updateButton)
video.addEventListener('play', updateButton)

skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('input', deltaRange))

video.addEventListener('timeupdate', handleProgress)

let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))

progress.addEventListener('mousedown', () => mousedown = true)
document.addEventListener('mouseup', () => mousedown = false)

fullScreenButton.addEventListener('click', goFullScreen)