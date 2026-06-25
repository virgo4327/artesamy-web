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

// Mobile Navigation & Modal Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Logic
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Product Details Modal Logic
    const modal = document.getElementById('product-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBackdrop = document.getElementById('modal-backdrop');
    
    const modalImg = document.getElementById('modal-img');
    const modalBadge = document.getElementById('modal-badge');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalWhatsappBtn = document.getElementById('modal-whatsapp-btn');

    // Force video playback (bypassing some aggressive browser policies)
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

        // Custom dynamic WhatsApp message for this product
        const phoneNumber = '51945921342';
        const messageText = `Hola ArteSamy, me gustaría pedir información sobre el amigurumi "${title}"`;
        modalWhatsappBtn.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scroll
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Unlock scroll
    };

    // Attach listeners to "Detalles" buttons on each product card
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

    // Close modal on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

console.log('Amigurumi Site Engine Initialized');
