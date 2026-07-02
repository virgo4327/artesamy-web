// Scroll Reveal Implementation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

function initReveal() {
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
}

function initCatalogImages() {
    document.querySelectorAll('.product-card .enhanced-img').forEach(img => {
        const showWhenLoaded = () => {
            img.style.opacity = '1';
        };
        if (img.complete && img.naturalWidth > 0) {
            showWhenLoaded();
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.4s ease';
            img.addEventListener('load', showWhenLoaded, { once: true });
            img.addEventListener('error', showWhenLoaded, { once: true });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    initCatalogImages();
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
    const fallbackBtn = document.querySelector('.video-fallback-btn');
    
    if (video) {
        console.log('Video element found:', video);
        console.log('Video source:', video.querySelector('source')?.src);
        console.log('Video readyState:', video.readyState);
        
        const hideFallback = () => {
            if (fallbackBtn) {
                fallbackBtn.classList.remove('visible');
            }
        };
        
        const showFallback = () => {
            if (fallbackBtn) {
                fallbackBtn.classList.add('visible');
            }
        };
        
        if (fallbackBtn) {
            fallbackBtn.addEventListener('click', () => {
                video.play().then(() => {
                    hideFallback();
                }).catch(error => {
                    console.warn('Video play on button click failed:', error);
                });
            });
        }
        
        const attemptPlay = () => {
            console.log('Attempting to play video...');
            video.play().then(() => {
                console.log('Video autoplay succeeded');
                hideFallback();
            }).catch(error => {
                console.warn('Video autoplay failed:', error);
                showFallback();
                const playOnInteraction = () => {
                    video.play().then(() => {
                        console.log('Video play on interaction succeeded');
                        hideFallback();
                    }).catch(interactionError => {
                        console.warn('Video play on interaction failed:', interactionError);
                        showFallback();
                    });
                    document.removeEventListener('mousedown', playOnInteraction);
                    document.removeEventListener('scroll', playOnInteraction);
                };
                document.addEventListener('mousedown', playOnInteraction);
                document.addEventListener('scroll', playOnInteraction);
            });
        };

        if (video.readyState >= 2) {
            console.log('Video ready, attempting play');
            attemptPlay();
        } else {
            console.log('Video not ready, waiting for loadeddata');
            video.addEventListener('loadeddata', attemptPlay, { once: true });
            video.addEventListener('canplay', attemptPlay, { once: true });
        }
    } else {
        console.warn('Video element not found');
    }
});

console.log('Amigurumi Site Engine Initialized');
