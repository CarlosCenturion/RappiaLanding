// Cyberpunk Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .gallery-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Por favor, completa todos los campos', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('¡Mensaje enviado! Te contactaremos pronto.', 'success');
            this.reset();
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? 'var(--primary-color)' : type === 'error' ? 'var(--secondary-color)' : 'var(--accent-color)'};
            color: var(--bg-dark);
            font-weight: 700;
            border-radius: 5px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: var(--neon-glow);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Cyberpunk typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }

    // Particle system for background
    function createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        
        document.body.appendChild(particleContainer);
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--primary-color);
                border-radius: 50%;
                opacity: 0.6;
                animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 10}s;
            `;
            
            particleContainer.appendChild(particle);
        }
    }

    // Add particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(100vh) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            90% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
        
        .feature-card,
        .gallery-item {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.6s ease;
        }
        
        .feature-card.animate-in,
        .gallery-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(10px);
            padding: 20px;
            border-top: 1px solid rgba(0, 255, 136, 0.3);
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;
    document.head.appendChild(style);

    // Initialize particle system
    createParticles();

    // Cyberpunk glitch effect for logo
    function glitchEffect() {
        const logo = document.querySelector('.logo-text');
        if (logo) {
            setInterval(() => {
                if (Math.random() < 0.1) { // 10% chance every interval
                    logo.style.textShadow = `
                        ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 var(--secondary-color),
                        ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 var(--accent-color)
                    `;
                    
                    setTimeout(() => {
                        logo.style.textShadow = 'var(--neon-glow)';
                    }, 100);
                }
            }, 2000);
        }
    }

    // Initialize glitch effect
    glitchEffect();

    // Cyberpunk sound effects (visual feedback)
    function playVisualEffect(element) {
        element.style.transform = 'scale(1.05)';
        element.style.boxShadow = '0 0 30px var(--primary-color)';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.boxShadow = '';
        }, 200);
    }

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            playVisualEffect(this);
        });
    });

    // Add hover effects to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotateY(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg)';
        });
    });

    // Cyberpunk loading animation
    function showLoadingAnimation() {
        const loader = document.createElement('div');
        loader.className = 'cyber-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-text">RAPPIBELLION</div>
                <div class="loader-bar">
                    <div class="loader-progress"></div>
                </div>
                <div class="loader-percentage">0%</div>
            </div>
        `;
        
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-darker);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 1;
            transition: opacity 0.5s ease;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .loader-content {
                text-align: center;
            }
            
            .loader-text {
                font-family: 'Orbitron', monospace;
                font-size: 2rem;
                font-weight: 900;
                color: var(--primary-color);
                margin-bottom: 30px;
                text-shadow: var(--neon-glow);
            }
            
            .loader-bar {
                width: 300px;
                height: 4px;
                background: rgba(0, 255, 136, 0.2);
                border-radius: 2px;
                overflow: hidden;
                margin-bottom: 20px;
            }
            
            .loader-progress {
                height: 100%;
                background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
                width: 0%;
                transition: width 0.3s ease;
                box-shadow: var(--neon-glow);
            }
            
            .loader-percentage {
                font-family: 'Rajdhani', sans-serif;
                font-size: 1.2rem;
                font-weight: 700;
                color: var(--text-secondary);
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(loader);
        
        // Simulate loading progress
        let progress = 0;
        const progressBar = loader.querySelector('.loader-progress');
        const percentage = loader.querySelector('.loader-percentage');
        
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = progress + '%';
            percentage.textContent = Math.round(progress) + '%';
            
            if (progress >= 100) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(loader);
                    }, 500);
                }, 500);
            }
        }, 100);
    }

    // Show loading animation on page load
    // showLoadingAnimation(); // Uncomment to enable loading animation

    console.log('🚀 RAPPIBELLION Cyberpunk Landing Page Loaded!');
    console.log('🎮 Welcome to the gaming revolution!');
});
