// Advanced animations for the portfolio website
class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupBackgroundAnimations();
        this.setupTextAnimations();
    }

    setupScrollAnimations() {
        // Create scroll-triggered animations
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerScrollAnimation(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observe elements for scroll animations
        document.querySelectorAll([
            '.section-title',
            '.timeline-item',
            '.skill-category',
            '.stat-item',
            '.contact-method'
        ].join(',')).forEach(el => {
            scrollObserver.observe(el);
        });
    }

    triggerScrollAnimation(element) {
        const animationType = element.dataset.animation || 'fadeInUp';
        
        switch (animationType) {
            case 'slideInLeft':
                this.slideInLeft(element);
                break;
            case 'slideInRight':
                this.slideInRight(element);
                break;
            case 'scaleIn':
                this.scaleIn(element);
                break;
            case 'rotateIn':
                this.rotateIn(element);
                break;
            default:
                this.fadeInUp(element);
        }
    }

    fadeInUp(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }

    slideInLeft(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-50px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 100);
    }

    slideInRight(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(50px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 100);
    }

    scaleIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, 100);
    }

    rotateIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'rotate(-10deg) scale(0.9)';
        element.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'rotate(0deg) scale(1)';
        }, 100);
    }

    setupHoverEffects() {
        // Enhanced hover effects for interactive elements
        this.setupButtonHoverEffects();
        this.setupCardHoverEffects();
        this.setupLinkHoverEffects();
    }

    setupButtonHoverEffects() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                this.createRippleEffect(btn);
                this.addGlowEffect(btn);
            });

            btn.addEventListener('mouseleave', () => {
                this.removeGlowEffect(btn);
            });
        });
    }

    setupCardHoverEffects() {
        document.querySelectorAll('.project-card, .skill-category, .about-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addFloatEffect(card);
                this.addShadowEffect(card);
            });

            card.addEventListener('mouseleave', () => {
                this.removeFloatEffect(card);
                this.removeShadowEffect(card);
            });
        });
    }

    setupLinkHoverEffects() {
        document.querySelectorAll('.nav-link, .project-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.addTextGlowEffect(link);
            });

            link.addEventListener('mouseleave', () => {
                this.removeTextGlowEffect(link);
            });
        });
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    addGlowEffect(element) {
        element.style.boxShadow = '0 0 20px var(--primary-color), 0 0 40px var(--primary-color)';
        element.style.transition = 'box-shadow 0.3s ease';
    }

    removeGlowEffect(element) {
        element.style.boxShadow = '';
    }

    addFloatEffect(element) {
        element.style.transform = 'translateY(-10px) scale(1.02)';
        element.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }

    removeFloatEffect(element) {
        element.style.transform = 'translateY(0) scale(1)';
    }

    addShadowEffect(element) {
        element.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.3)';
        element.style.transition = 'box-shadow 0.3s ease';
    }

    removeShadowEffect(element) {
        element.style.boxShadow = '';
    }

    addTextGlowEffect(element) {
        element.style.textShadow = '0 0 10px var(--primary-color)';
        element.style.transition = 'text-shadow 0.3s ease';
    }

    removeTextGlowEffect(element) {
        element.style.textShadow = '';
    }

    setupBackgroundAnimations() {
        this.animateFloatingShapes();
        this.createParticleSystem();
    }

    animateFloatingShapes() {
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const duration = 6000 + (index * 1000);
            const delay = index * 1000;
            
            shape.style.animation = `float ${duration}ms ease-in-out infinite`;
            shape.style.animationDelay = `${delay}ms`;
        });
    }

    createParticleSystem() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-system';
        particleContainer.style.position = 'fixed';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.pointerEvents = 'none';
        particleContainer.style.zIndex = '1';
        
        document.body.appendChild(particleContainer);
        
        setInterval(() => {
            this.createParticle(particleContainer);
        }, 2000);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'var(--primary-color)';
        particle.style.borderRadius = '50%';
        particle.style.opacity = '0.6';
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        
        container.appendChild(particle);
        
        const animation = particle.animate([
            {
                transform: 'translateY(0px)',
                opacity: 0.6
            },
            {
                transform: `translateY(-${window.innerHeight + 100}px)`,
                opacity: 0
            }
        ], {
            duration: 15000 + Math.random() * 10000,
            easing: 'linear'
        });
        
        animation.onfinish = () => particle.remove();
    }

    setupTextAnimations() {
        this.setupTypewriterEffect();
        this.setupTextRevealEffect();
    }

    setupTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.dataset.typewriterSpeed) || 100;
            
            element.textContent = '';
            element.style.borderRight = '2px solid var(--primary-color)';
            element.style.animation = 'blink 1s infinite';
            
            let index = 0;
            const typeInterval = setInterval(() => {
                element.textContent += text.charAt(index);
                index++;
                
                if (index >= text.length) {
                    clearInterval(typeInterval);
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                        element.style.animation = 'none';
                    }, 1000);
                }
            }, speed);
        });
    }

    setupTextRevealEffect() {
        const revealElements = document.querySelectorAll('[data-text-reveal]');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.revealText(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    revealText(element) {
        const text = element.textContent;
        const chars = text.split('');
        
        element.innerHTML = '';
        
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.5s ease ${index * 50}ms`;
            element.appendChild(span);
            
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 100);
        });
    }

    // Performance monitoring
    setupPerformanceMonitoring() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        const measureFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                // Reduce animations if FPS is low
                if (fps < 30) {
                    this.reduceAnimations();
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        requestAnimationFrame(measureFPS);
    }

    reduceAnimations() {
        // Disable non-essential animations for better performance
        document.documentElement.style.setProperty('--reduced-motion', '1');
        
        document.querySelectorAll('.floating-shapes .shape').forEach(shape => {
            shape.style.animation = 'none';
        });
        
        console.log('Animations reduced for better performance');
    }
}

// CSS for additional animations
const additionalCSS = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes textGlow {
        0%, 100% {
            text-shadow: 0 0 5px var(--primary-color);
        }
        50% {
            text-shadow: 0 0 20px var(--primary-color), 0 0 30px var(--primary-color);
        }
    }
    
    @keyframes morphBackground {
        0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
        }
        50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
        }
    }
    
    .particle-system {
        pointer-events: none;
    }
    
    [data-reduced-motion="true"] * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Initialize animation controller
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
});