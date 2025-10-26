// RAPPIBELLION Blockchain Gaming JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after 3 seconds
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 3000);

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

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 1)';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });

    // Blockchain animation
    function animateBlockchain() {
        const blocks = document.querySelectorAll('.block');
        blocks.forEach((block, index) => {
            setTimeout(() => {
                block.style.transform = 'scale(1.2)';
                block.style.boxShadow = '0 0 20px rgba(255, 199, 44, 0.5)';
                
                setTimeout(() => {
                    block.style.transform = 'scale(1)';
                    block.style.boxShadow = 'none';
                }, 300);
            }, index * 200);
        });
    }

    // Start blockchain animation every 3 seconds
    setInterval(animateBlockchain, 3000);

    // RAPPIA token price animation
    function animateTokenPrice() {
        const tokenValue = document.querySelector('.token-value');
        if (tokenValue) {
            const currentPrice = parseFloat(tokenValue.textContent.replace('$', ''));
            const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
            const newPrice = Math.max(0.20, Math.min(0.30, currentPrice + variation));
            
            tokenValue.textContent = `$${newPrice.toFixed(2)} USD`;
            
            // Color based on price change
            if (variation > 0) {
                tokenValue.style.color = '#4caf50'; // Green for increase
            } else {
                tokenValue.style.color = '#f44336'; // Red for decrease
            }
            
            setTimeout(() => {
                tokenValue.style.color = 'rgba(255, 255, 255, 0.9)';
            }, 1000);
        }
    }

    // Update token price every 5 seconds
    setInterval(animateTokenPrice, 5000);

    // Wallet balance animation
    function animateWalletBalance() {
        const walletAmount = document.querySelector('.wallet-amount');
        if (walletAmount) {
            const currentAmount = parseFloat(walletAmount.textContent.replace(/[^\d.]/g, ''));
            const earnings = Math.random() * 10 + 5; // Random earnings between 5-15 RAPPIA
            const newAmount = currentAmount + earnings;
            
            // Animate the increase
            walletAmount.style.transform = 'scale(1.1)';
            walletAmount.style.color = '#4caf50';
            
            setTimeout(() => {
                walletAmount.textContent = `${newAmount.toFixed(2)} RAPPIA`;
                walletAmount.style.transform = 'scale(1)';
                walletAmount.style.color = '#ffc72c';
            }, 500);
        }
    }

    // Update wallet balance every 8 seconds
    setInterval(animateWalletBalance, 8000);

    // Floating coins animation enhancement
    function enhanceFloatingCoins() {
        const coins = document.querySelectorAll('.coin');
        coins.forEach((coin, index) => {
            // Add random movement
            setInterval(() => {
                const randomX = Math.random() * 20 - 10; // -10px to +10px
                const randomY = Math.random() * 20 - 10;
                coin.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 360}deg)`;
            }, 2000 + index * 500);
        });
    }

    enhanceFloatingCoins();

    // Feature cards hover effect
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
        });
    });

    // Button click effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const username = this.querySelector('input[type="text"]').value;
            
            if (!email || !username) {
                showNotification('Por favor, completa todos los campos', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Por favor, ingresa un email válido', 'error');
                return;
            }
            
            // Simulate registration
            showNotification('¡Registro exitoso! Bienvenido a RAPPIBELLION', 'success');
            this.reset();
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        const colors = {
            success: '#4caf50',
            error: '#f44336',
            info: '#2196f3'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${colors[type]};
            color: white;
            font-weight: 600;
            border-radius: 12px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            max-width: 400px;
            font-family: 'Inter', sans-serif;
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
    const animateElements = document.querySelectorAll('.feature-card, .token-display, .chain-block');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add animation CSS
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .feature-card,
        .token-display,
        .chain-block {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .feature-card.animate-in,
        .token-display.animate-in,
        .chain-block.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);

    // Counter animation for hero stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = counter.textContent;
            const isPercentage = target.includes('%');
            const isCurrency = target.includes('$');
            const isPlus = target.includes('+');
            
            let numericValue;
            if (isCurrency) {
                numericValue = parseFloat(target.replace(/[$,]/g, ''));
            } else if (isPercentage) {
                numericValue = parseFloat(target.replace('%', ''));
            } else if (isPlus) {
                numericValue = parseFloat(target.replace(/[K+,]/g, '')) * 1000;
            } else {
                numericValue = parseFloat(target.replace(/[K+,]/g, '')) * 1000;
            }
            
            let current = 0;
            const increment = numericValue / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    current = numericValue;
                    clearInterval(timer);
                }
                
                let displayValue = Math.floor(current);
                if (isCurrency) {
                    displayValue = `$${(displayValue / 1000).toFixed(1)}M`;
                } else if (isPercentage) {
                    displayValue += '%';
                } else if (isPlus) {
                    displayValue = `${(displayValue / 1000).toFixed(0)}K+`;
                } else {
                    displayValue = `${(displayValue / 1000).toFixed(0)}K+`;
                }
                
                counter.textContent = displayValue;
            }, 30);
        });
    }

    // Trigger counter animation when hero section is visible
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        heroObserver.observe(heroSection);
    }

    // Add particle effect to hero section
    function createParticles() {
        const hero = document.querySelector('.hero');
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                pointer-events: none;
                animation: floatParticle ${3 + Math.random() * 4}s ease-in-out infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            hero.appendChild(particle);
        }
    }

    // Add particle animation CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes floatParticle {
            0%, 100% { 
                transform: translateY(0px) translateX(0px); 
                opacity: 0.6; 
            }
            25% { 
                transform: translateY(-20px) translateX(10px); 
                opacity: 1; 
            }
            50% { 
                transform: translateY(-10px) translateX(-10px); 
                opacity: 0.8; 
            }
            75% { 
                transform: translateY(-30px) translateX(5px); 
                opacity: 0.9; 
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Create particles after loading screen
    setTimeout(createParticles, 3500);

    // Add sound effects (optional - requires user interaction)
    function addSoundEffects() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // Create audio context for sound effects
                if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
                    const audioContext = new (AudioContext || webkitAudioContext)();
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
                    
                    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.1);
                }
            });
        });
    }

    // Add sound effects after user interaction
    document.addEventListener('click', addSoundEffects, { once: true });

    console.log('🚀 RAPPIBELLION Blockchain Gaming Platform loaded!');
    console.log('💰 Ready to earn RAPPIA tokens!');
    console.log('🎮 Blockchain Gaming Revolution started!');
});
