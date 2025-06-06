document.addEventListener('DOMContentLoaded', function () {
    console.log('Website loaded successfully');

    // DOM Elements for Cake Page Audio
    const birthdayAudio = document.getElementById('birthdayAudio');
    const playAudioBtn = document.getElementById('playAudioBtn');

    if (birthdayAudio && playAudioBtn) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        let analyser, dataArray;

        function setupAudioVisualizer() {
            const source = audioContext.createMediaElementSource(birthdayAudio);
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 32;
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            dataArray = new Uint8Array(analyser.frequencyBinCount);

            const visualizer = document.createElement('div');
            visualizer.className = 'audio-visualizer';
            for (let i = 0; i < 12; i++) {
                const bar = document.createElement('div');
                bar.className = 'visualizer-bar';
                visualizer.appendChild(bar);
            }
            playAudioBtn.parentNode.insertBefore(visualizer, playAudioBtn.nextSibling);

            function updateVisualizer() {
                if (!birthdayAudio.paused) {
                    requestAnimationFrame(updateVisualizer);
                    analyser.getByteFrequencyData(dataArray);
                    const bars = visualizer.children;
                    for (let i = 0; i < bars.length; i++) {
                        const value = dataArray[i] / 255;
                        bars[i].style.height = `${value * 30}px`;
                        bars[i].style.backgroundColor = `hsl(${200 + (value * 60)}, 70%, 60%)`;
                    }
                }
            }

            birthdayAudio.addEventListener('play', updateVisualizer);
        }

        playAudioBtn.addEventListener('click', function () {
            if (birthdayAudio.paused) {
                if (audioContext.state === 'suspended') {
                    audioContext.resume();
                }
                birthdayAudio.play()
                    .then(() => {
                        playAudioBtn.innerHTML = '🔊 Pause Song';
                        if (!document.querySelector('.audio-visualizer')) {
                            setupAudioVisualizer();
                        }
                    })
                    .catch(e => console.error("Audio playback failed:", e));
            } else {
                birthdayAudio.pause();
                playAudioBtn.innerHTML = '🎵 Play Birthday Song';
            }
        });

        birthdayAudio.addEventListener('ended', function () {
            playAudioBtn.innerHTML = '🎵 Play Again';
        });
    }
});

// Page Navigation
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// Message View Navigation
function goBack() {
    showPage('messages-page');
}

// Text Modal Functions
function showText(content) {
    document.getElementById('textContent').innerHTML = '<p>' + content + '</p>';
    document.getElementById('textModal').classList.add('active');
}

function closeText() {
    document.getElementById('textModal').classList.remove('active');
}

// Video Modal Functions
function showVideo(videoSrc) {
    const video = document.getElementById('modalVideo');
    const source = video.querySelector('source');
    source.src = videoSrc;
    video.load();
    document.getElementById('videoModal').classList.add('active');
}

function closeVideo() {
    const video = document.getElementById('modalVideo');
    video.pause();
    video.currentTime = 0;
    document.getElementById('videoModal').classList.remove('active');
}

// Close modals when clicking outside
document.getElementById('textModal')?.addEventListener('click', function (e) {
    if (e.target === this) closeText();
});

document.getElementById('videoModal')?.addEventListener('click', function (e) {
    if (e.target === this) closeVideo();
});

// Keyboard Escape Key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeText();
        closeVideo();
    }
});
