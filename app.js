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

// Subtle parallax effect on hero image/video with rAF throttling
const parallaxMedia = document.querySelector('.video-container');
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            if (parallaxMedia) {
                parallaxMedia.style.transform = `translateY(${scrolled * 0.05}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Mobile Navigation
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    const video = document.querySelector('.knitting-video');
    if (video) {
        video.play().catch(error => {
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
