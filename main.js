// Minimal JavaScript for Ten Point Hare website interactions

// DOM ready function
document.addEventListener('DOMContentLoaded', function() {
    
    // Contact modal functionality
    const contactBtn = document.querySelector('.contact-btn');
    const contactModal = document.getElementById('contact-modal');
    const closeModal = document.getElementById('close-modal');
    
    // Open modal
    contactBtn.addEventListener('click', function() {
        contactModal.classList.add('visible');
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal
    closeModal.addEventListener('click', closeContactModal);
    
    // Close modal when clicking outside
    contactModal.addEventListener('click', function(e) {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactModal.classList.contains('visible')) {
            closeContactModal();
        }
    });
    
    function closeContactModal() {
        contactModal.classList.remove('visible');
        document.body.style.overflow = '';
    }
    
    // Subtle parallax effect on scroll
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.logo-section, .company-name, .tagline');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Only enable parallax on larger screens
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', requestTick);
    }
    
    // Resize handler for parallax
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            window.addEventListener('scroll', requestTick);
        } else {
            window.removeEventListener('scroll', requestTick);
            // Reset transforms on mobile
            const parallaxElements = document.querySelectorAll('.logo-section, .company-name, .tagline');
            parallaxElements.forEach(element => {
                element.style.transform = '';
            });
        }
    });
    
    // Smooth scroll to top on logo click
    const logo = document.querySelector('.logo-section img');
    logo.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add subtle hover sound effect (optional - commented out)
    // Uncomment if you want audio feedback
    /*
    const hoverElements = document.querySelectorAll('.contact-btn, .logo-section img');
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function createTone(frequency, duration) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            createTone(800, 0.1);
        });
    });
    */
    
    // Preload hover states for smoother interactions
    const preloadElements = document.querySelectorAll('.contact-btn');
    preloadElements.forEach(element => {
        element.style.transition = 'none';
        element.offsetHeight; // Force reflow
        element.style.transition = '';
    });
    
    console.log('Ten Point Hare website initialized');
});