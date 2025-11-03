// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Update active nav link
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            
            // Smooth scroll to target
            const offsetTop = targetElement.offsetTop - 70; // Adjust for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        try {
            // Simulate API call - replace with actual endpoint
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const messageDiv = document.getElementById('formMessage');
            messageDiv.innerHTML = `
                <div class="success">
                    <i class="fas fa-check-circle"></i>
                    <strong>Thank you for your message!</strong><br>
                    I'll get back to you within 24 hours.
                </div>
            `;
            messageDiv.className = 'form-message success';
            
            // Reset form
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
            
        } catch (error) {
            console.error('Error:', error);
            const messageDiv = document.getElementById('formMessage');
            messageDiv.innerHTML = `
                <div class="error">
                    <i class="fas fa-exclamation-circle"></i>
                    <strong>There was an error sending your message.</strong><br>
                    Please try again or contact me directly via email.
                </div>
            `;
            messageDiv.className = 'form-message error';
        } finally {
            // Reset button state
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target); // Animate only once
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
        '.expertise-card, .project-card, .timeline-item, .skill-category, .stat-item'
    );
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
});

// Enhanced BLE Code Animation
function initCodeAnimation() {
    const codeLines = document.querySelectorAll('.code-line');
    
    codeLines.forEach((line, index) => {
        // Store original text
        const originalText = line.textContent;
        line.textContent = '';
        line.style.overflow = 'hidden';
        line.style.whiteSpace = 'nowrap';
        line.style.width = '0';
        
        // Add typing class after delay
        setTimeout(() => {
            line.style.animation = `typing 2s steps(${originalText.length}, end) forwards`;
            line.textContent = originalText;
            
            // Add blinking cursor effect
            line.style.borderRight = '2px solid #FF4081';
            line.style.animation = `typing 2s steps(${originalText.length}, end) forwards, blink 1s infinite`;
            
        }, index * 1500); // 1.5 second delay between lines
        
        // Remove cursor after animation completes
        setTimeout(() => {
            line.style.borderRight = 'none';
            line.style.animation = 'none';
        }, (index + 1) * 1500 + 2000);
    });
}

// Add CSS for animations dynamically
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes typing {
            from { width: 0; }
            to { width: 100%; }
        }
        
        @keyframes blink {
            0%, 100% { border-color: transparent; }
            50% { border-color: #FF4081; }
        }
        
        .code-line {
            overflow: hidden;
            white-space: nowrap;
            margin: 0;
        }
        
        /* Mobile optimization for code */
        @media (max-width: 768px) {
            .code-animation {
                font-size: 0.8rem;
                padding: 1rem;
            }
            
            .code-line {
                font-size: 0.75rem;
            }
        }
        
        @media (max-width: 480px) {
            .code-animation {
                font-size: 0.7rem;
                padding: 0.8rem;
            }
            
            .code-line {
                font-size: 0.7rem;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    addAnimationStyles();
    initCodeAnimation();
    
    // Restart animation when section comes into view
    const heroSection = document.getElementById('home');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Re-initialize animation when hero section is visible
                setTimeout(initCodeAnimation, 500);
            }
        });
    });
    
    if (heroSection) {
        observer.observe(heroSection);
    }
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initCodeAnimation();
    
    // Add CSS for typing animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes typing {
            from { width: 0 }
            to { width: 100% }
        }
        
        .code-line {
            overflow: hidden;
            white-space: nowrap;
            border-right: 2px solid transparent;
        }
        
        .code-line:last-child {
            border-right: none;
        }
    `;
    document.head.appendChild(style);
});

// Add scroll to top functionality
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        display: none;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(scrollBtn);
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
}

// Initialize scroll to top button
initScrollToTop();

// Add loading animation for images
function initImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCodeAnimation();
    initScrollToTop();
    initImageLoading();
});

// Add some interactive effects to skill tags
document.querySelectorAll('.skill-tag, .tech-stack span, .project-tech span').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});