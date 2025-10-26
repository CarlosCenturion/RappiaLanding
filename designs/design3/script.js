// Retro Gaming Landing Page JavaScript
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
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Retro sound effects (visual feedback)
    function playRetroEffect(element) {
        element.style.transform = 'scale(1.1)';
        element.style.boxShadow = '0 0 20px var(--primary-color)';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.boxShadow = '';
        }, 200);
    }

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .play-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            playRetroEffect(this);
            
            // Add pixel explosion effect
            createPixelExplosion(e.clientX, e.clientY);
        });
    });

    // Pixel explosion effect
    function createPixelExplosion(x, y) {
        const explosion = document.createElement('div');
        explosion.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            background: var(--primary-color);
            pointer-events: none;
            z-index: 10000;
            animation: pixelExplode 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(explosion);
        
        setTimeout(() => {
            document.body.removeChild(explosion);
        }, 600);
    }

    // Add pixel explosion animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pixelExplode {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(10);
                opacity: 0;
            }
        }
        
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.95);
            padding: 1rem;
            border-top: 2px solid var(--primary-color);
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);

    // Retro typing effect
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
        const titleLines = heroTitle.querySelectorAll('.title-line');
        
        titleLines.forEach((line, index) => {
            setTimeout(() => {
                typeWriter(line, line.textContent, 150);
            }, index * 1000);
        });
    }

    // Game console interaction
    const gameConsole = document.querySelector('.game-console');
    const dPad = document.querySelector('.d-pad');
    const actionButtons = document.querySelectorAll('.btn-a, .btn-b');
    
    if (gameConsole) {
        // D-pad interaction
        const dPadDirections = dPad.querySelectorAll('.d-pad-up, .d-pad-down, .d-pad-left, .d-pad-right');
        dPadDirections.forEach(direction => {
            direction.addEventListener('click', function() {
                playRetroEffect(this);
                updateConsoleScreen('Direction: ' + this.className.split('-')[2].toUpperCase());
            });
        });
        
        // Action buttons interaction
        actionButtons.forEach(button => {
            button.addEventListener('click', function() {
                playRetroEffect(this);
                updateConsoleScreen('Button ' + this.textContent + ' pressed!');
            });
        });
    }

    // Update console screen
    function updateConsoleScreen(message) {
        const screenText = document.querySelector('.screen-text');
        if (screenText) {
            screenText.textContent = message;
            screenText.style.animation = 'none';
            setTimeout(() => {
                screenText.style.animation = 'textFlicker 3s ease-in-out infinite';
            }, 100);
        }
    }

    // Retro loading animation
    function showRetroLoading() {
        const loader = document.createElement('div');
        loader.className = 'retro-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo">RAPPIBELLION</div>
                <div class="loader-screen">
                    <div class="loader-text">LOADING...</div>
                    <div class="loader-progress">
                        <div class="progress-bar"></div>
                    </div>
                    <div class="loader-percentage">0%</div>
                </div>
            </div>
        `;
        
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000000;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 1;
            transition: opacity 0.5s ease;
        `;
        
        const loaderStyle = document.createElement('style');
        loaderStyle.textContent = `
            .loader-content {
                text-align: center;
                color: var(--primary-color);
            }
            
            .loader-logo {
                font-family: 'Press Start 2P', monospace;
                font-size: 2rem;
                margin-bottom: 2rem;
                text-shadow: 0 0 10px var(--primary-color);
            }
            
            .loader-screen {
                background: #000000;
                border: 2px solid var(--primary-color);
                border-radius: 10px;
                padding: 2rem;
                width: 300px;
            }
            
            .loader-text {
                font-family: 'Press Start 2P', monospace;
                font-size: 1rem;
                margin-bottom: 1rem;
                animation: textFlicker 1s ease-in-out infinite;
            }
            
            .loader-progress {
                width: 100%;
                height: 20px;
                background: #333333;
                border: 2px solid var(--primary-color);
                border-radius: 5px;
                overflow: hidden;
                margin-bottom: 1rem;
            }
            
            .progress-bar {
                height: 100%;
                background: var(--primary-color);
                width: 0%;
                transition: width 0.3s ease;
                box-shadow: 0 0 10px var(--primary-color);
            }
            
            .loader-percentage {
                font-family: 'Press Start 2P', monospace;
                font-size: 0.8rem;
            }
        `;
        document.head.appendChild(loaderStyle);
        
        document.body.appendChild(loader);
        
        // Simulate loading progress
        let progress = 0;
        const progressBar = loader.querySelector('.progress-bar');
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
                        if (document.body.contains(loader)) {
                            document.body.removeChild(loader);
                        }
                    }, 500);
                }, 1000);
            }
        }, 100);
    }

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
                showRetroNotification('ERROR: All fields required!', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showRetroNotification('ERROR: Invalid email format!', 'error');
                return;
            }
            
            // Simulate form submission
            showRetroNotification('SUCCESS: Message sent!', 'success');
            this.reset();
        });
    }

    // Retro notification system
    function showRetroNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `retro-notification notification-${type}`;
        notification.textContent = message;
        
        const colors = {
            success: '#00ff00',
            error: '#ff0080',
            info: '#0080ff'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: #000000;
            color: ${colors[type]};
            font-family: 'Press Start 2P', monospace;
            font-size: 0.7rem;
            border: 2px solid ${colors[type]};
            border-radius: 5px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 0 20px ${colors[type]};
            max-width: 400px;
            text-shadow: 0 0 10px ${colors[type]};
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

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
    const animateElements = document.querySelectorAll('.game-card, .grid-item, .stat-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add animation CSS
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .game-card,
        .grid-item,
        .stat-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .game-card.animate-in,
        .grid-item.animate-in,
        .stat-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);

    // Retro particle system
    function createRetroParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'retro-particles';
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
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'retro-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--primary-color);
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: retroFloat ${Math.random() * 10 + 10}s linear infinite;
                animation-delay: ${Math.random() * 10}s;
                box-shadow: 0 0 10px var(--primary-color);
            `;
            
            particleContainer.appendChild(particle);
        }
    }

    // Add particle animation CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes retroFloat {
            0% {
                transform: translateY(100vh) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Initialize particle system
    createRetroParticles();

    // Retro glitch effect for logo
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
                        logo.style.textShadow = '0 0 10px var(--primary-color)';
                    }, 100);
                }
            }, 2000);
        }
    }

    // Initialize glitch effect
    glitchEffect();

    // Show loading animation on page load (uncomment to enable)
    // showRetroLoading();

    // Add hover effects to game cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 0 30px rgba(0, 255, 0, 0.5)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Add keyboard controls for retro feel
    document.addEventListener('keydown', function(e) {
        // Arrow keys for D-pad simulation
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || 
            e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            updateConsoleScreen('Key: ' + e.key.replace('Arrow', ''));
        }
        
        // Space bar for action button
        if (e.key === ' ') {
            e.preventDefault();
            updateConsoleScreen('Action: SPACE');
        }
        
        // Enter for start button
        if (e.key === 'Enter') {
            updateConsoleScreen('Action: ENTER');
        }
    });

    console.log('🎮 RAPPIBELLION Retro Gaming Landing Page Loaded!');
    console.log('🕹️ Welcome to the retro gaming revolution!');
    console.log('💾 Use arrow keys and spacebar for retro controls!');
});
