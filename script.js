// Main Portfolio Site JavaScript
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

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
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

    // Observe elements for animation (removed design-card references)
    const animateElements = document.querySelectorAll('.skill-item, .preview-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add animation CSS
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .skill-item,
        .preview-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .skill-item.animate-in,
        .preview-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);

    // Preview items are now simple links, no JavaScript needed

    // Design cards removed - using simple links in hero section

    // Contact form removed - using direct contact links instead

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${colors[type]};
            color: white;
            font-weight: 500;
            border-radius: 0.5rem;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            max-width: 400px;
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

    // Counter animation for hero stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = counter.textContent;
            const isPercentage = target.includes('%');
            const isInfinity = target.includes('∞');
            
            let numericValue;
            if (isInfinity) {
                numericValue = 100; // Animate to 100 for infinity
            } else if (isPercentage) {
                numericValue = parseFloat(target.replace('%', ''));
            } else {
                numericValue = parseFloat(target);
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
                if (isPercentage) {
                    displayValue += '%';
                } else if (isInfinity) {
                    displayValue = '∞';
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

    // Add hover effects to design cards (already handled above)

    // Button effects removed - no more form buttons

    // Typing effect for hero title
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
        const titleMain = heroTitle.querySelector('.title-main');
        const titleSub = heroTitle.querySelector('.title-sub');
        
        if (titleMain && titleSub) {
            setTimeout(() => {
                typeWriter(titleMain, 'Muestras de Diseño Web', 100);
                setTimeout(() => {
                    typeWriter(titleSub, 'RAPPIBELLION', 100);
                }, 2000);
            }, 500);
        }
    }

    // Add loading animation
    function showLoadingAnimation() {
        const loader = document.createElement('div');
        loader.className = 'portfolio-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo">Carlos Ezequiel Centurion</div>
                <div class="loader-progress">
                    <div class="loader-bar"></div>
                </div>
                <div class="loader-text">Cargando portfolio...</div>
            </div>
        `;
        
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
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
            }
            
            .loader-logo {
                font-family: 'Inter', sans-serif;
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--primary-color);
                margin-bottom: 2rem;
            }
            
            .loader-progress {
                width: 200px;
                height: 4px;
                background: #e2e8f0;
                border-radius: 2px;
                overflow: hidden;
                margin-bottom: 1rem;
            }
            
            .loader-bar {
                height: 100%;
                background: var(--primary-color);
                width: 0%;
                transition: width 0.3s ease;
                border-radius: 2px;
            }
            
            .loader-text {
                font-family: 'Inter', sans-serif;
                font-size: 0.9rem;
                color: var(--text-secondary);
            }
        `;
        document.head.appendChild(loaderStyle);
        
        document.body.appendChild(loader);
        
        // Simulate loading progress
        let progress = 0;
        const progressBar = loader.querySelector('.loader-bar');
        
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = progress + '%';
            
            if (progress >= 100) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        if (document.body.contains(loader)) {
                            document.body.removeChild(loader);
                        }
                    }, 500);
                }, 500);
            }
        }, 100);
    }

    // Show loading animation on page load (uncomment to enable)
    // showLoadingAnimation();

    // Add smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                }
            });
        }, { threshold: 0.1 });
        
        sectionObserver.observe(section);
    });

    // Add section reveal CSS
    const sectionStyle = document.createElement('style');
    sectionStyle.textContent = `
        section {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease;
        }
        
        section.section-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hero {
            opacity: 1;
            transform: none;
        }
    `;
    document.head.appendChild(sectionStyle);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Arrow keys for navigation
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const currentSection = document.querySelector('section.section-visible');
            if (currentSection) {
                const nextSection = currentSection.nextElementSibling;
                if (nextSection && nextSection.tagName === 'SECTION') {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
        
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const currentSection = document.querySelector('section.section-visible');
            if (currentSection) {
                const prevSection = currentSection.previousElementSibling;
                if (prevSection && prevSection.tagName === 'SECTION') {
                    prevSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });

    console.log('🎨 Portfolio de Carlos Ezequiel Centurion cargado!');
    console.log('🚀 Muestras de diseño web para RAPPIBELLION');
    console.log('💻 Programador & Diseñador de Simuladores Virtuales');
});
