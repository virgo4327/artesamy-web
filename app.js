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

// Decode images when approaching viewport for smoother rendering
const decodeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.decoding !== 'async') {
                img.decode().then(() => img.classList.add('decoded')).catch(() => {});
            }
            decodeObserver.unobserve(img);
        }
    });
}, { rootMargin: '200px' });

document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    decodeObserver.observe(img);
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

// Mobile Navigation & Modal Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
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

    // Product Details Modal Logic
    const modal = document.getElementById('product-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBackdrop = document.getElementById('modal-backdrop');
    
    const modalImg = document.getElementById('modal-img');
    const modalBadge = document.getElementById('modal-badge');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalWhatsappBtn = document.getElementById('modal-whatsapp-btn');

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

    const openModal = (productCard) => {
        const title = productCard.getAttribute('data-title');
        const description = productCard.getAttribute('data-description');
        const image = productCard.getAttribute('data-image');
        const badge = productCard.getAttribute('data-badge');

        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalImg.src = image;
        modalImg.alt = title;

        if (badge) {
            modalBadge.textContent = badge;
            modalBadge.style.display = 'inline-block';
        } else {
            modalBadge.style.display = 'none';
        }

        const phoneNumber = '51945921342';
        const messageText = `Hola ArteSamy, me gustaría pedir información sobre el amigurumi "${title}"`;
        modalWhatsappBtn.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.product-card').forEach(card => {
        const quickViewBtn = card.querySelector('.quick-view');
        if (quickViewBtn) {
            quickViewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openModal(card);
            });
        }
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Preload likely-next images (sequential logic)
    const productImages = Array.from(document.querySelectorAll('.product-card img')).map(img => img.src);
    const preloadThreshold = 3;
    productImages.slice(0, preloadThreshold).forEach(src => {
        if (src && !document.querySelector(`link[href="${src}"]`)) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            link.imagesizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';
            document.head.appendChild(link);
        }
    });
});

console.log('Amigurumi Site Engine Initialized');
