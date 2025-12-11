// SUPERPETS Veterinary Hospital - Main JavaScript
// Handles emergency booking, multilingual support, and interactive features

class SuperpetsApp {
    constructor() {
        this.currentLanguage = 'en';
        this.emergencyNumber = '+919821112746';
        this.whatsappLink = 'https://wa.me/919821112746';
        this.init();
    }

    init() {
        this.setupLanguageToggle();
        this.setupEmergencySystem();
        this.setupAppointmentBooking();
        this.setupAnimations();
        this.setupAnalytics();
        this.setupMobileNavigation();
        this.setupFormValidation();
        this.initializeVisualEffects();
    }

    // Language Toggle System
    setupLanguageToggle() {
        const langToggle = document.getElementById('language-toggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }

        // Auto-detect browser language on first visit
        if (!localStorage.getItem('preferred-language')) {
            const browserLang = navigator.language || navigator.userLanguage;
            if (browserLang && browserLang.includes('hi')) {
                this.currentLanguage = 'hi';
                this.updateLanguage();
            }
        } else {
            this.currentLanguage = localStorage.getItem('preferred-language');
            this.updateLanguage();
        }
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'hi' : 'en';
        localStorage.setItem('preferred-language', this.currentLanguage);
        this.updateLanguage();
        this.trackEvent('language_toggle', this.currentLanguage);
    }

    updateLanguage() {
        const elements = document.querySelectorAll('[data-en]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${this.currentLanguage}`);
            if (text) {
                element.textContent = text;
            }
        });

        // Update language toggle button
        const langToggle = document.getElementById('language-toggle');
        if (langToggle) {
            langToggle.textContent = this.currentLanguage === 'en' ? 'हिन्दी' : 'English';
        }

        // Update document direction for Hindi
        document.documentElement.setAttribute('lang', this.currentLanguage);
        if (this.currentLanguage === 'hi') {
            document.documentElement.setAttribute('dir', 'ltr'); // Hindi is LTR despite common misconception
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
        }
    }

    // Emergency Contact System
    setupEmergencySystem() {
        // Emergency call buttons
        const emergencyButtons = document.querySelectorAll('.emergency-call');
        emergencyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleEmergencyCall();
            });
        });

        // WhatsApp emergency buttons
        const whatsappButtons = document.querySelectorAll('.emergency-whatsapp');
        whatsappButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleEmergencyWhatsApp();
            });
        });

        // Emergency banner pulse animation
        this.setupEmergencyBanner();
    }

    handleEmergencyCall() {
        this.trackEvent('emergency_call', 'click');
        window.location.href = `tel:${this.emergencyNumber}`;
    }

    handleEmergencyWhatsApp() {
        this.trackEvent('emergency_whatsapp', 'click');
        const message = this.currentLanguage === 'hi' 
            ? 'नमस्ते, मुझे आपातकालीन पशु चिकित्सा सहायता चाहिए। कृपया मेरी मदद करें।'
            : 'Hello, I need emergency veterinary care. Please help.';
        window.open(`${this.whatsappLink}?text=${encodeURIComponent(message)}`, '_blank');
    }

    setupEmergencyBanner() {
        const banner = document.getElementById('emergency-banner');
        if (banner) {
            // Pulse animation for emergency banner
            setInterval(() => {
                banner.style.opacity = '0.8';
                setTimeout(() => {
                    banner.style.opacity = '1';
                }, 500);
            }, 3000);
        }
    }

    // Appointment Booking System
    setupAppointmentBooking() {
        const bookingForms = document.querySelectorAll('.booking-form');
        bookingForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAppointmentBooking(new FormData(form));
            });
        });

        // Service selection handlers
        const serviceButtons = document.querySelectorAll('.service-booking');
        serviceButtons.forEach(button => {
            button.addEventListener('click', () => {
                const service = button.getAttribute('data-service');
                this.openBookingModal(service);
            });
        });
    }

    handleAppointmentBooking(formData) {
        const appointmentData = {
            petName: formData.get('pet-name'),
            species: formData.get('species'),
            age: formData.get('age'),
            concern: formData.get('concern'),
            ownerName: formData.get('owner-name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            preferredDate: formData.get('preferred-date'),
            preferredTime: formData.get('preferred-time'),
            service: formData.get('service'),
            language: this.currentLanguage
        };

        // Simulate booking process
        this.showBookingConfirmation(appointmentData);
        this.trackEvent('appointment_booking', 'submit', appointmentData.service);
    }

    showBookingConfirmation(appointmentData) {
        const modal = document.createElement('div');
        modal.className = 'booking-confirmation-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${this.currentLanguage === 'hi' ? 'अपॉइंटमेंट बुक किया गया' : 'Appointment Booked'}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${this.currentLanguage === 'hi' ? 'आपका अपॉइंटमेंट सफलतापूर्वक बुक हो गया है।' : 'Your appointment has been successfully booked.'}</p>
                    <div class="appointment-details">
                        <p><strong>${this.currentLanguage === 'hi' ? 'पालतू जानवर का नाम:' : 'Pet Name:'}</strong> ${appointmentData.petName}</p>
                        <p><strong>${this.currentLanguage === 'hi' ? 'सेवा:' : 'Service:'}</strong> ${appointmentData.service}</p>
                        <p><strong>${this.currentLanguage === 'hi' ? 'तारीख:' : 'Date:'}</strong> ${appointmentData.preferredDate}</p>
                        <p><strong>${this.currentLanguage === 'hi' ? 'समय:' : 'Time:'}</strong> ${appointmentData.preferredTime}</p>
                    </div>
                    <p class="confirmation-note">
                        ${this.currentLanguage === 'hi' ? 'कृपया अपने फोन पर कन्फर्मेशन एसएमएस और ईमेल की प्रतीक्षा करें।' : 'Please wait for confirmation SMS and email on your phone.'}
                    </p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary close-modal-btn">
                        ${this.currentLanguage === 'hi' ? 'ठीक है' : 'OK'}
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Close modal handlers
        const closeButtons = modal.querySelectorAll('.close-modal, .close-modal-btn');
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        });

        // Auto-close after 5 seconds
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }, 5000);
    }

    // Animation System
    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Animate statistics counters
        this.animateCounters();
    }

    animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            // Start animation when element is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(counter);
        });
    }

    // Analytics Tracking
    setupAnalytics() {
        // Google Analytics 4 events
        this.gtag = function() {
            if (typeof gtag !== 'undefined') {
                gtag.apply(this, arguments);
            }
        };
    }

    trackEvent(action, category, label = null, value = null) {
        const eventData = {
            event_name: action,
            event_category: category,
            language: this.currentLanguage,
            page_location: window.location.href,
            page_title: document.title
        };

        if (label) eventData.event_label = label;
        if (value) eventData.value = value;

        this.gtag('event', action, eventData);
    }

    // Mobile Navigation
    setupMobileNavigation() {
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileToggle && mobileMenu) {
            mobileToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                mobileToggle.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            });
        }
    }

    // Form Validation
    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });

                input.addEventListener('input', () => {
                    if (input.classList.contains('error')) {
                        this.validateField(input);
                    }
                });
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = this.currentLanguage === 'hi' ? 'यह फ़ील्ड आवश्यक है' : 'This field is required';
        }

        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = this.currentLanguage === 'hi' ? 'कृपया एक वैध ईमेल दर्ज करें' : 'Please enter a valid email';
            }
        }

        // Phone validation
        if (type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                errorMessage = this.currentLanguage === 'hi' ? 'कृपया एक वैध फोन नंबर दर्ज करें' : 'Please enter a valid phone number';
            }
        }

        // Update field appearance
        if (isValid) {
            field.classList.remove('error');
            this.hideFieldError(field);
        } else {
            field.classList.add('error');
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    hideFieldError(field) {
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Visual Effects
    initializeVisualEffects() {
        // Initialize particle system for hero background
        this.initParticleSystem();
        
        // Initialize smooth scrolling
        this.initSmoothScroll();
        
        // Initialize testimonial carousel
        this.initTestimonialCarousel();
    }

    initParticleSystem() {
        const heroSection = document.getElementById('hero-particles');
        if (heroSection && typeof p5 !== 'undefined') {
            new p5((sketch) => {
                let particles = [];
                
                sketch.setup = () => {
                    const canvas = sketch.createCanvas(heroSection.offsetWidth, heroSection.offsetHeight);
                    canvas.parent('hero-particles');
                    
                    // Create particles
                    for (let i = 0; i < 50; i++) {
                        particles.push({
                            x: sketch.random(sketch.width),
                            y: sketch.random(sketch.height),
                            vx: sketch.random(-0.5, 0.5),
                            vy: sketch.random(-0.5, 0.5),
                            size: sketch.random(2, 4)
                        });
                    }
                };
                
                sketch.draw = () => {
                    sketch.clear();
                    
                    // Update and draw particles
                    particles.forEach(particle => {
                        particle.x += particle.vx;
                        particle.y += particle.vy;
                        
                        // Wrap around edges
                        if (particle.x < 0) particle.x = sketch.width;
                        if (particle.x > sketch.width) particle.x = 0;
                        if (particle.y < 0) particle.y = sketch.height;
                        if (particle.y > sketch.height) particle.y = 0;
                        
                        // Draw particle
                        sketch.fill(28, 167, 166, 100); // Medical teal with transparency
                        sketch.noStroke();
                        sketch.ellipse(particle.x, particle.y, particle.size);
                    });
                };
                
                sketch.windowResized = () => {
                    sketch.resizeCanvas(heroSection.offsetWidth, heroSection.offsetHeight);
                };
            });
        }
    }

    initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initTestimonialCarousel() {
        if (typeof Splide !== 'undefined') {
            const testimonialCarousel = document.getElementById('testimonial-carousel');
            if (testimonialCarousel) {
                new Splide(testimonialCarousel, {
                    type: 'loop',
                    perPage: 3,
                    perMove: 1,
                    gap: '2rem',
                    autoplay: true,
                    interval: 5000,
                    pauseOnHover: true,
                    breakpoints: {
                        768: {
                            perPage: 1,
                            gap: '1rem'
                        },
                        1024: {
                            perPage: 2
                        }
                    }
                }).mount();
            }
        }
    }

    // Utility Functions
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto remove
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.superpetsApp = new SuperpetsApp();
});

// Emergency functions for HTML onclick handlers
window.emergencyCall = function() {
    if (window.superpetsApp) {
        window.superpetsApp.handleEmergencyCall();
    }
};

window.emergencyWhatsApp = function() {
    if (window.superpetsApp) {
        window.superpetsApp.handleEmergencyWhatsApp();
    }
};

window.toggleLanguage = function() {
    if (window.superpetsApp) {
        window.superpetsApp.toggleLanguage();
    }
};