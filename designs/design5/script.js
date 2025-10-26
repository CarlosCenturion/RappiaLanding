// Dark Gaming Landing Page JavaScript
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

    // Dark effects
    function createDarkEffect(element) {
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
            createDarkEffect(this);
            
            // Create dark ripple effect
            createDarkRipple(e.clientX, e.clientY);
        });
    });

    // Dark ripple effect
    function createDarkRipple(x, y) {
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
            animation: darkRipple 0.8s ease-out forwards;
            border-radius: 50%;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            if (document.body.contains(ripple)) {
                document.body.removeChild(ripple);
            }
        }, 800);
    }

    // Add dark ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes darkRipple {
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
            background: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(10px);
            padding: 1rem;
            border-top: 1px solid var(--border-color);
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

    // Dark typing effect
    function darkTypeWriter(element, text, speed = 100) {
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

    // Initialize dark typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleLines = heroTitle.querySelectorAll('.title-line');
        
        titleLines.forEach((line, index) => {
            setTimeout(() => {
                darkTypeWriter(line, line.textContent, 120);
            }, index * 1000);
        });
    }

    // Terminal interface interaction
    const darkInterface = document.querySelector('.dark-interface');
    const controlItems = document.querySelectorAll('.control-item');
    
    if (darkInterface) {
        // Control items interaction
        controlItems.forEach(item => {
            item.addEventListener('click', function() {
                createDarkEffect(this);
                updateTerminalScreen('Command: ' + this.querySelector('span').textContent);
            });
        });
    }

    // Update terminal screen
    function updateTerminalScreen(message) {
        const terminalBody = document.querySelector('.terminal-body');
        if (terminalBody) {
            const newLine = document.createElement('div');
            newLine.className = 'terminal-line';
            newLine.innerHTML = `<span class="output">${message}</span>`;
            
            terminalBody.appendChild(newLine);
            
            // Scroll to bottom
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    }

    // Dark loading animation
    function showDarkLoading() {
        const loader = document.createElement('div');
        loader.className = 'dark-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo">RAPPIBELLION</div>
                <div class="loader-terminal">
                    <div class="terminal-header">
                        <div class="terminal-buttons">
                            <span class="btn-close"></span>
                            <span class="btn-minimize"></span>
                            <span class="btn-maximize"></span>
                        </div>
                        <div class="terminal-title">RAPPIBELLION TERMINAL</div>
                    </div>
                    <div class="terminal-body">
                        <div class="terminal-line">
                            <span class="prompt">system@rappibellion:~$</span>
                            <span class="command">init_dark_mode</span>
                        </div>
                        <div class="terminal-line">
                            <span class="output">Initializing dark gaming protocols...</span>
                        </div>
                        <div class="terminal-line">
                            <span class="output">Loading shadow matrix...</span>
                        </div>
                        <div class="terminal-line">
                            <span class="output">Connecting to dark network...</span>
                        </div>
                        <div class="terminal-line">
                            <span class="output">Dark mode activated successfully!</span>
                        </div>
                        <div class="terminal-line">
                            <span class="prompt">system@rappibellion:~$</span>
                            <span class="cursor">_</span>
                        </div>
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
            background: var(--bg-darkest);
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
                font-family: 'Roboto Mono', monospace;
                font-size: 2.5rem;
                font-weight: 700;
                margin-bottom: 2rem;
                text-shadow: var(--shadow-glow);
                animation: logoGlow 2s ease-in-out infinite;
            }
            
            .loader-terminal {
                background: var(--bg-darker);
                border: 2px solid var(--primary-color);
                border-radius: 15px;
                width: 500px;
                box-shadow: var(--shadow-glow);
            }
            
            .terminal-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .terminal-buttons {
                display: flex;
                gap: 0.5rem;
            }
            
            .btn-close, .btn-minimize, .btn-maximize {
                width: 12px;
                height: 12px;
                border-radius: 50%;
            }
            
            .btn-close { background: #ff5f56; }
            .btn-minimize { background: #ffbd2e; }
            .btn-maximize { background: #27ca3f; }
            
            .terminal-title {
                font-family: 'Roboto Mono', monospace;
                font-size: 0.8rem;
                color: var(--text-muted);
            }
            
            .terminal-body {
                padding: 1rem;
                font-family: 'Roboto Mono', monospace;
                font-size: 0.9rem;
                line-height: 1.5;
                max-height: 200px;
                overflow-y: auto;
            }
            
            .terminal-line {
                margin-bottom: 0.5rem;
            }
            
            .prompt {
                color: var(--primary-color);
                font-weight: 600;
            }
            
            .command {
                color: var(--text-primary);
            }
            
            .output {
                color: var(--text-secondary);
                margin-left: 1rem;
            }
            
            .cursor {
                color: var(--primary-color);
                animation: cursorBlink 1s infinite;
            }
        `;
        document.head.appendChild(loaderStyle);
        
        document.body.appendChild(loader);
        
        // Simulate terminal loading
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(loader)) {
                    document.body.removeChild(loader);
                }
            }, 500);
        }, 3000);
    }

    // Form submission handling
    const contactForm = document.querySelector('.form-terminal form');
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
                showDarkNotification('ERROR: All fields required for dark connection!', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showDarkNotification('ERROR: Invalid dark email format!', 'error');
                return;
            }
            
            // Simulate form submission
            showDarkNotification('SUCCESS: Dark connection established!', 'success');
            this.reset();
        });
    }

    // Dark notification system
    function showDarkNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `dark-notification notification-${type}`;
        notification.textContent = message;
        
        const colors = {
            success: '#ff6b35',
            error: '#f7931e',
            info: '#ffd23f'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: var(--bg-darker);
            color: ${colors[type]};
            font-family: 'Inter', sans-serif;
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
    const animateElements = document.querySelectorAll('.feature-card, .grid-item, .stat-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add animation CSS
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .feature-card,
        .grid-item,
        .stat-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .feature-card.animate-in,
        .grid-item.animate-in,
        .stat-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);

    // Dark particle system
    function createDarkParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'dark-particles';
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
            particle.className = 'dark-particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--primary-color);
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: darkFloat ${Math.random() * 20 + 10}s linear infinite;
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
        @keyframes darkFloat {
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
    createDarkParticles();

    // Dark glitch effect for logo
    function darkGlitchEffect() {
        const logo = document.querySelector('.logo-text');
        if (logo) {
            setInterval(() => {
                if (Math.random() < 0.1) { // 10% chance every interval
                    logo.style.textShadow = `
                        ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 var(--secondary-color),
                        ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 var(--accent-color)
                    `;
                    
                    setTimeout(() => {
                        logo.style.textShadow = 'var(--shadow-glow)';
                    }, 100);
                }
            }, 2000);
        }
    }

    // Initialize glitch effect
    darkGlitchEffect();

    // Show loading animation on page load (uncomment to enable)
    // showDarkLoading();

    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 0 30px rgba(255, 107, 53, 0.5)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Add keyboard controls for dark interface
    document.addEventListener('keydown', function(e) {
        // Arrow keys for dark interface
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || 
            e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            updateTerminalScreen('Command: ' + e.key.replace('Arrow', ''));
        }
        
        // Space bar for dark action
        if (e.key === ' ') {
            e.preventDefault();
            updateTerminalScreen('Action: DARK SCAN');
        }
        
        // Enter for dark initialization
        if (e.key === 'Enter') {
            updateTerminalScreen('Action: DARK INITIALIZATION');
        }
    });

    // Dark data visualization
    function updateDarkStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            if (stat.textContent.includes('%')) {
                const currentValue = parseFloat(stat.textContent);
                const newValue = Math.max(95, Math.min(100, currentValue + Math.random() * 2 - 1));
                stat.textContent = newValue.toFixed(1) + '%';
            }
        });
    }

    // Update dark stats every 5 seconds
    setInterval(updateDarkStats, 5000);

    // Terminal command simulation
    function simulateTerminalCommands() {
        const commands = [
            'scanning_dark_network',
            'analyzing_shadow_data',
            'processing_dark_matter',
            'initializing_dark_mode',
            'connecting_to_shadow_realm'
        ];
        
        setInterval(() => {
            const randomCommand = commands[Math.floor(Math.random() * commands.length)];
            updateTerminalScreen(`Command: ${randomCommand}`);
        }, 10000);
    }

    // Start terminal command simulation
    simulateTerminalCommands();

    console.log('🌑 RAPPIBELLION Dark Gaming Landing Page Loaded!');
    console.log('🖤 Welcome to the dark side of gaming!');
    console.log('⚡ Dark mode activated successfully!');
});
