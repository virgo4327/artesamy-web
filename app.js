// Scroll Reveal Implementation
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// Subtle parallax effect on hero image/video
window.addEventListener('scroll', () => {
    const heroMedia = document.querySelector('.video-container');
    if (heroMedia) {
        const scrolled = window.pageYOffset;
        heroMedia.style.transform = `translateY(${scrolled * 0.05}px)`;
    }
});

// Force video playback (bypassing some aggressive browser policies)
document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.knitting-video');
    if (video) {
        video.play().catch(error => {
            console.log("Autoplay was prevented, waiting for interaction", error);
            // Fallback: try playing on first click/scroll
            const playOnInteraction = () => {
                video.play();
                document.removeEventListener('mousedown', playOnInteraction);
                document.removeEventListener('scroll', playOnInteraction);
            };
            document.addEventListener('mousedown', playOnInteraction);
            document.addEventListener('scroll', playOnInteraction);
        });
    }
});

console.log('Amigurumi Site Engine Initialized');
