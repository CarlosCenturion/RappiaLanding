// Holographic Landing Page JavaScript
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

    // Holographic effects
    function createHolographicEffect(element) {
        element.style.transform = 'scale(1.05)';
        element.style.boxShadow = '0 0 30px var(--primary-color)';
        element.style.textShadow = '0 0 20px var(--primary-color)';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.boxShadow = '';
            element.style.textShadow = '';
        }, 300);
    }

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createHolographicEffect(this);
            
            // Create holographic ripple effect
            createHolographicRipple(e.clientX, e.clientY);
        });
    });

    // Holographic ripple effect
    function createHolographicRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, var(--primary-color), transparent);
            pointer-events: none;
            z-index: 10000;
            animation: holographicRipple 0.8s ease-out forwards;
            border-radius: 50%;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            if (document.body.contains(ripple)) {
                document.body.removeChild(ripple);
            }
        }, 800);
    }

    // Add holographic ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes holographicRipple {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(15);
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
            background: rgba(0, 0, 17, 0.95);
            backdrop-filter: blur(10px);
            padding: 1rem;
            border-top: 1px solid var(--primary-color);
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

    // Holographic typing effect
    function holographicTypeWriter(element, text, speed = 100) {
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

    // Initialize holographic typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleLines = heroTitle.querySelectorAll('.title-line');
        
        titleLines.forEach((line, index) => {
            setTimeout(() => {
                holographicTypeWriter(line, line.textContent, 120);
            }, index * 1000);
        });
    }

    // Holographic interface interaction
    const holoInterface = document.querySelector('.holographic-interface');
    const controlButtons = document.querySelectorAll('.control-button');
    
    if (holoInterface) {
        // Control buttons interaction
        controlButtons.forEach(button => {
            button.addEventListener('click', function() {
                createHolographicEffect(this);
                updateHoloScreen('Command: ' + this.textContent.trim());
            });
        });
    }

    // Update holographic screen
    function updateHoloScreen(message) {
        const holoLogo = document.querySelector('.holo-logo');
        if (holoLogo) {
            const originalText = holoLogo.textContent;
            holoLogo.textContent = message;
            holoLogo.style.animation = 'none';
            setTimeout(() => {
                holoLogo.style.animation = 'hologramPulse 3s ease-in-out infinite';
                setTimeout(() => {
                    holoLogo.textContent = originalText;
                }, 2000);
            }, 100);
        }
    }

    // Holographic loading animation
    function showHolographicLoading() {
        const loader = document.createElement('div');
        loader.className = 'holo-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo">RAPPIBELLION</div>
                <div class="loader-interface">
                    <div class="loader-text">INITIALIZING SYSTEM...</div>
                    <div class="loader-progress">
                        <div class="progress-bar"></div>
                    </div>
                    <div class="loader-percentage">0%</div>
                    <div class="loader-status">
                        <div class="status-line">Neural Interface: ONLINE</div>
                        <div class="status-line">Quantum Processor: ONLINE</div>
                        <div class="status-line">Holographic Matrix: ONLINE</div>
                    </div>
                </div>
            </div>
        `;
        
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-dark);
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
                font-family: 'Rajdhani', sans-serif;
                font-size: 2.5rem;
                font-weight: 700;
                margin-bottom: 2rem;
                text-shadow: var(--hologram-glow);
                animation: hologramPulse 2s ease-in-out infinite;
            }
            
            .loader-interface {
                background: rgba(0, 255, 255, 0.05);
                border: 2px solid var(--primary-color);
                border-radius: 15px;
                padding: 2rem;
                width: 400px;
                box-shadow: var(--hologram-glow);
            }
            
            .loader-text {
                font-family: 'Rajdhani', sans-serif;
                font-size: 1.2rem;
                margin-bottom: 1.5rem;
                text-shadow: var(--hologram-glow);
            }
            
            .loader-progress {
                width: 100%;
                height: 20px;
                background: var(--bg-darker);
                border: 1px solid var(--primary-color);
                border-radius: 10px;
                overflow: hidden;
                margin-bottom: 1rem;
            }
            
            .progress-bar {
                height: 100%;
                background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
                width: 0%;
                transition: width 0.3s ease;
                box-shadow: var(--hologram-glow);
            }
            
            .loader-percentage {
                font-family: 'Rajdhani', sans-serif;
                font-size: 1rem;
                font-weight: 600;
                margin-bottom: 1.5rem;
                text-shadow: var(--hologram-glow);
            }
            
            .loader-status {
                text-align: left;
            }
            
            .status-line {
                font-family: 'Rajdhani', sans-serif;
                font-size: 0.9rem;
                margin-bottom: 0.5rem;
                color: var(--accent-color);
                text-shadow: var(--hologram-glow-yellow);
            }
        `;
        document.head.appendChild(loaderStyle);
        
        document.body.appendChild(loader);
        
        // Simulate loading progress
        let progress = 0;
        const progressBar = loader.querySelector('.progress-bar');
        const percentage = loader.querySelector('.loader-percentage');
        
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 12;
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
    const contactForm = document.querySelector('.form-hologram form');
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
                showHolographicNotification('ERROR: All fields required for connection!', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showHolographicNotification('ERROR: Invalid quantum email format!', 'error');
                return;
            }
            
            // Simulate form submission
            showHolographicNotification('SUCCESS: Connection established!', 'success');
            this.reset();
        });
    }

    // Holographic notification system
    function showHolographicNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `holo-notification notification-${type}`;
        notification.textContent = message;
        
        const colors = {
            success: '#00ffff',
            error: '#ff00ff',
            info: '#ffff00'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: rgba(0, 0, 17, 0.9);
            color: ${colors[type]};
            font-family: 'Rajdhani', sans-serif;
            font-size: 0.9rem;
            font-weight: 600;
            border: 2px solid ${colors[type]};
            border-radius: 10px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 0 20px ${colors[type]};
            max-width: 400px;
            text-shadow: 0 0 10px ${colors[type]};
            backdrop-filter: blur(10px);
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
    const animateElements = document.querySelectorAll('.feature-module, .grid-item, .stat-hologram');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add animation CSS
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .feature-module,
        .grid-item,
        .stat-hologram {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .feature-module.animate-in,
        .grid-item.animate-in,
        .stat-hologram.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);

    // Holographic particle system
    function createHolographicParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'holo-particles';
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
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.className = 'holo-particle';
            particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: var(--primary-color);
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: holoFloat ${Math.random() * 15 + 10}s linear infinite;
                animation-delay: ${Math.random() * 10}s;
                box-shadow: 0 0 10px var(--primary-color);
                border-radius: 50%;
            `;
            
            particleContainer.appendChild(particle);
        }
    }

    // Add particle animation CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes holoFloat {
            0% {
                transform: translateY(100vh) translateX(0) scale(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
                transform: scale(1);
            }
            90% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Initialize particle system
    createHolographicParticles();

    // Holographic glitch effect for logo
    function holographicGlitchEffect() {
        const logo = document.querySelector('.logo-text');
        if (logo) {
            setInterval(() => {
                if (Math.random() < 0.1) { // 10% chance every interval
                    logo.style.textShadow = `
                        ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 var(--secondary-color),
                        ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 var(--accent-color)
                    `;
                    
                    setTimeout(() => {
                        logo.style.textShadow = 'var(--hologram-glow)';
                    }, 100);
                }
            }, 2000);
        }
    }

    // Initialize glitch effect
    holographicGlitchEffect();

    // Show loading animation on page load (uncomment to enable)
    // showHolographicLoading();

    // Add hover effects to feature modules
    const featureModules = document.querySelectorAll('.feature-module');
    featureModules.forEach(module => {
        module.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.5)';
        });
        
        module.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Add keyboard controls for holographic interface
    document.addEventListener('keydown', function(e) {
        // Arrow keys for holographic interface
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || 
            e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            updateHoloScreen('Command: ' + e.key.replace('Arrow', ''));
        }
        
        // Space bar for holographic action
        if (e.key === ' ') {
            e.preventDefault();
            updateHoloScreen('Action: HOLOGRAPHIC SCAN');
        }
        
        // Enter for holographic initialization
        if (e.key === 'Enter') {
            updateHoloScreen('Action: SYSTEM INITIALIZATION');
        }
    });

    // Holographic data visualization
    function updateSystemStatus() {
        const statusValues = document.querySelectorAll('.status-value');
        statusValues.forEach(status => {
            if (status.textContent.includes('%')) {
                const currentValue = parseInt(status.textContent);
                const newValue = Math.max(95, Math.min(100, currentValue + Math.random() * 2 - 1));
                status.textContent = Math.round(newValue) + '%';
            }
        });
    }

    // Update system status every 5 seconds
    setInterval(updateSystemStatus, 5000);

    console.log('🔮 RAPPIBELLION Holographic Landing Page Loaded!');
    console.log('✨ Welcome to the future of gaming!');
    console.log('🌐 Holographic interface initialized successfully!');
});
