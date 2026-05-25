document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // MOBILE NAVIGATION DRAWER TOGGLE ENGINE
    // ==========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            
            // Switch menu icons interactively
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close dropdown securely when clicking any outside region
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            }
        });
    }

    // ==========================================================================
    // RESPONSIVE CAROUSEL CARDS LOGIC ENGINE
    // ==========================================================================
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;

        const getSlidesPerView = () => {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1024) return 2;
            return 3;
        };

        const updateCarouselPosition = () => {
            const slides = document.querySelectorAll('.carousel-slide');
            const totalSlides = slides.length;
            const slidesPerView = getSlidesPerView();
            const maxIndex = totalSlides - slidesPerView;

            // Constrain limits boundaries securely
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;

            const slideWidth = slides[0].getBoundingClientRect().width;
            const gapSize = 24; // Corresponds to the 1.5rem structural CSS spacing gap
            
            const moveDistance = currentIndex * (slideWidth + gapSize);
            track.style.transform = `translateX(-${moveDistance}px)`;
        };

        nextBtn.addEventListener('click', () => {
            const slides = document.querySelectorAll('.carousel-slide');
            if (currentIndex < slides.length - getSlidesPerView()) {
                currentIndex++;
            } else {
                currentIndex = 0; // Seamless loop back to head track anchor
            }
            updateCarouselPosition();
        });

        prevBtn.addEventListener('click', () => {
            const slides = document.querySelectorAll('.carousel-slide');
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = slides.length - getSlidesPerView(); // Loop back to end boundaries
            }
            updateCarouselPosition();
        });

        // Re-calculate window layout bounds dynamically on desktop resize triggers
        window.addEventListener('resize', updateCarouselPosition);
    }
});