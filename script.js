// Page Navigation
function showHome() {
    document.getElementById('home').classList.add('active');
    document.getElementById('gallery').classList.remove('active');
}

function showGallery() {
    document.getElementById('home').classList.remove('active');
    document.getElementById('gallery').classList.add('active');
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
    video.load(); // Reload the video element
    document.getElementById('videoModal').classList.add('active');
}

function closeVideo() {
    const video = document.getElementById('modalVideo');
    video.pause();
    video.currentTime = 0;
    document.getElementById('videoModal').classList.remove('active');
}

// Close modals when clicking outside
document.getElementById('textModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeText();
    }
});

document.getElementById('videoModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeVideo();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeText();
        closeVideo();
    }
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Any initialization code can go here
    console.log('Website loaded successfully');
});
