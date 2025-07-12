// Contact form functionality and interactions
class ContactManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        this.setupFormValidation();
        this.setupFormSubmission();
        this.setupInputAnimations();
        this.setupContactAnimations();
    }

    setupFormValidation() {
        if (!this.form) return;

        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearFieldError(field);

        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;
            
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            
            case 'subject':
                if (value.length < 5) {
                    isValid = false;
                    errorMessage = 'Subject must be at least 5 characters long';
                }
                break;
            
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.opacity = '1';
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.opacity = '0';
            setTimeout(() => errorElement.remove(), 300);
        }
    }

    setupFormSubmission() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });
    }

    async handleFormSubmission() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Validate all fields
        let isFormValid = true;
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showFormMessage('Please fix the errors above', 'error');
            return;
        }

        // Show loading state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        try {
            // Simulate form submission (replace with actual implementation)
            await this.submitForm(data);
            
            this.showFormMessage('Thank you! Your message has been sent successfully.', 'success');
            this.form.reset();
            this.createSuccessAnimation();
            
        } catch (error) {
            this.showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Restore button state
            setTimeout(() => {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }, 2000);
        }
    }

    async submitForm(data) {
        // Simulate API call - replace with actual implementation
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success/failure
                if (Math.random() > 0.1) { // 90% success rate for demo
                    resolve({ success: true });
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
        
        // Example of actual implementation:
        /*
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return response.json();
        */
    }

    showFormMessage(message, type) {
        let messageElement = document.querySelector('.form-message');
        
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = 'form-message';
            this.form.appendChild(messageElement);
        }

        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0)';

        // Auto-hide success messages
        if (type === 'success') {
            setTimeout(() => {
                messageElement.style.opacity = '0';
                messageElement.style.transform = 'translateY(-10px)';
            }, 5000);
        }
    }

    createSuccessAnimation() {
        // Create floating success particles
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                this.createSuccessParticle();
            }, i * 100);
        }
    }

    createSuccessParticle() {
        const particle = document.createElement('div');
        particle.className = 'success-particle';
        particle.innerHTML = '✓';
        particle.style.position = 'fixed';
        particle.style.color = 'var(--primary-color)';
        particle.style.fontSize = '20px';
        particle.style.fontWeight = 'bold';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10000';
        
        const formRect = this.form.getBoundingClientRect();
        particle.style.left = formRect.left + Math.random() * formRect.width + 'px';
        particle.style.top = formRect.top + formRect.height / 2 + 'px';
        
        document.body.appendChild(particle);
        
        particle.animate([
            {
                transform: 'translateY(0px) scale(0.5)',
                opacity: 1
            },
            {
                transform: 'translateY(-100px) scale(1.2)',
                opacity: 0
            }
        ], {
            duration: 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }

    setupInputAnimations() {
        const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentNode.classList.add('focused');
                this.createFocusRipple(input);
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentNode.classList.remove('focused');
                }
            });
            
            // Check if input has value on load
            if (input.value) {
                input.parentNode.classList.add('focused');
            }
        });
    }

    createFocusRipple(input) {
        const ripple = document.createElement('div');
        ripple.className = 'input-ripple';
        ripple.style.position = 'absolute';
        ripple.style.top = '50%';
        ripple.style.left = '0';
        ripple.style.width = '100%';
        ripple.style.height = '2px';
        ripple.style.background = 'var(--primary-color)';
        ripple.style.transform = 'scaleX(0)';
        ripple.style.transformOrigin = 'center';
        ripple.style.transition = 'transform 0.3s ease';
        
        input.parentNode.style.position = 'relative';
        input.parentNode.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.transform = 'scaleX(1)';
        }, 10);
        
        input.addEventListener('blur', () => {
            ripple.style.transform = 'scaleX(0)';
            setTimeout(() => ripple.remove(), 300);
        }, { once: true });
    }

    setupContactAnimations() {
        // Animate contact methods on scroll
        const contactMethods = document.querySelectorAll('.contact-method');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 200);
                }
            });
        }, { threshold: 0.1 });
        
        contactMethods.forEach((method, index) => {
            method.style.opacity = '0';
            method.style.transform = 'translateX(-50px)';
            method.style.transition = 'all 0.6s ease';
            observer.observe(method);
        });

        // Animate social links
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach((link, index) => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-5px) scale(1.1)';
                this.createSocialRipple(link);
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    createSocialRipple(element) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '100%';
        ripple.style.height = '100%';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.transition = 'transform 0.6s ease';
        ripple.style.top = '0';
        ripple.style.left = '0';
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.transform = 'scale(2)';
        }, 10);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Email validation with suggestions
    suggestEmailCorrection(email) {
        const commonDomains = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
            'aol.com', 'icloud.com', 'protonmail.com'
        ];
        
        const emailParts = email.split('@');
        if (emailParts.length !== 2) return null;
        
        const [localPart, domain] = emailParts;
        
        // Check for common typos
        const suggestions = {
            'gmial.com': 'gmail.com',
            'gmai.com': 'gmail.com',
            'yahooo.com': 'yahoo.com',
            'hotmial.com': 'hotmail.com',
            'outlok.com': 'outlook.com'
        };
        
        if (suggestions[domain]) {
            return `${localPart}@${suggestions[domain]}`;
        }
        
        return null;
    }

    // Copy email functionality
    setupEmailCopy() {
        const emailElements = document.querySelectorAll('[data-email]');
        
        emailElements.forEach(element => {
            element.addEventListener('click', () => {
                const email = element.dataset.email;
                this.copyToClipboard(email);
                this.showCopyNotification(element);
            });
        });
    }

    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }

    showCopyNotification(element) {
        const notification = document.createElement('div');
        notification.textContent = 'Email copied to clipboard!';
        notification.style.position = 'absolute';
        notification.style.background = 'var(--primary-color)';
        notification.style.color = 'white';
        notification.style.padding = '8px 12px';
        notification.style.borderRadius = '4px';
        notification.style.fontSize = '12px';
        notification.style.top = '-40px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.whiteSpace = 'nowrap';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        
        element.style.position = 'relative';
        element.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// Contact form CSS
const contactCSS = `
    .form-message {
        margin-top: 20px;
        padding: 15px;
        border-radius: 8px;
        font-weight: 500;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
    }

    .form-message.success {
        background: rgba(34, 197, 94, 0.1);
        color: #22c55e;
        border: 1px solid rgba(34, 197, 94, 0.3);
    }

    .form-message.error {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
        border: 1px solid rgba(239, 68, 68, 0.3);
    }

    .error-message {
        color: #ef4444;
        font-size: 0.8rem;
        margin-top: 5px;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .form-group input.error,
    .form-group textarea.error {
        border-color: #ef4444;
    }

    .success-particle {
        animation: successFloat 2s ease-out forwards;
    }

    @keyframes successFloat {
        0% {
            transform: translateY(0px) scale(0.5);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(1.2);
            opacity: 0;
        }
    }

    .contact-method {
        transition: all 0.3s ease;
    }

    .contact-method:hover {
        background: rgba(0, 212, 255, 0.1);
        transform: translateX(5px);
    }

    .social-link {
        position: relative;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .input-ripple {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--primary-color);
        transform: scaleX(0);
        transform-origin: center;
        transition: transform 0.3s ease;
    }

    .form-group.focused label {
        color: var(--primary-color);
    }

    @media (max-width: 768px) {
        .form-message {
            font-size: 0.9rem;
            padding: 12px;
        }
    }
`;

// Inject contact CSS
const contactStyle = document.createElement('style');
contactStyle.textContent = contactCSS;
document.head.appendChild(contactStyle);

// Initialize contact manager
document.addEventListener('DOMContentLoaded', () => {
    new ContactManager();
});