/**
 * Satya Tent Agency - Interactive JavaScript
 * Handles navigation, animations, gallery, and form interactions
 */

// ==================== DOM CONTENT LOADED ====================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initHeroSlider();
    initParallax();
    initScrollAnimations();
    initGallery();
    initFAQ();
    initForms();
    initCounters();
    initFilterGallery();
    initAdvancedAnimations();
    initPagination();
});

// ==================== HERO BACKGROUND SLIDER ====================
function initHeroSlider() {
    const heroBackgrounds = document.querySelectorAll('.hero-background');
    const sliderDots = document.querySelectorAll('.slider-dot');
    
    if (heroBackgrounds.length > 0) {
        let currentIndex = 0;
        let autoPlayInterval;
        
        // Function to change slide
        function changeSlide(index) {
            // Remove active class from all backgrounds
            heroBackgrounds.forEach(bg => bg.classList.remove('active'));
            
            // Add active class to current background
            currentIndex = index;
            heroBackgrounds[currentIndex].classList.add('active');
            
            // Update active dot
            sliderDots.forEach((dot, i) => {
                if (i === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Auto-play function
        function startAutoPlay() {
            autoPlayInterval = setInterval(function() {
                const nextIndex = (currentIndex + 1) % heroBackgrounds.length;
                changeSlide(nextIndex);
            }, 4000); // Change every 4 seconds
        }
        
        // Stop auto-play
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }
        
        // Click event for dots
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                stopAutoPlay();
                changeSlide(index);
                startAutoPlay(); // Restart auto-play after manual selection
            });
        });
        
        // Start auto-play
        startAutoPlay();
    }
}

// ==================== PARALLAX EFFECT ====================
function initParallax() {
    const heroBackgrounds = document.querySelectorAll('.hero-background');
    
    if (heroBackgrounds.length > 0) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroBackgrounds.forEach(bg => {
                bg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            });
        });
    }
}

// ==================== NAVIGATION ====================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    // Transparent navbar on hero, solid on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('transparent');
        } else {
            navbar.classList.remove('scrolled');
            if (document.querySelector('.hero')) {
                navbar.classList.add('transparent');
            }
        }
    });

    // Set transparent initially if on home page
    if (document.querySelector('.hero') && window.scrollY < 100) {
        navbar.classList.add('transparent');
    }

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // Close menu on outside click
    document.addEventListener('click', function(event) {
        if (window.innerWidth < 992) {
            if (!event.target.closest('.navbar')) {
                navMenu.classList.remove('active');
                if (mobileToggle) {
                    const icon = mobileToggle.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        }
    });
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate service cards, gallery items, testimonials, etc.
    const animatedElements = document.querySelectorAll(
        '.service-card, .gallery-item, .testimonial-card, .city-card, .feature-box, .offering-card'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ==================== GALLERY & LIGHTBOX ====================
let currentImageIndex = 0;
let galleryImages = [];

function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryImages = Array.from(galleryItems).map(item => {
        return {
            src: item.querySelector('img').src,
            alt: item.querySelector('img').alt,
            title: item.querySelector('.gallery-overlay h4')?.textContent || '',
            subtitle: item.querySelector('.gallery-overlay p')?.textContent || ''
        };
    });

    // Add click event to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            openLightbox(index);
        });
    });
}

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const img = document.getElementById('lightbox-img');
        const caption = document.getElementById('lightbox-caption');
        
        img.src = galleryImages[index].src;
        caption.innerHTML = `<h4>${galleryImages[index].title}</h4><p>${galleryImages[index].subtitle}</p>`;
        
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    
    img.src = galleryImages[currentImageIndex].src;
    caption.innerHTML = `<h4>${galleryImages[currentImageIndex].title}</h4><p>${galleryImages[currentImageIndex].subtitle}</p>`;
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.style.display === 'block') {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'ArrowRight') changeImage(1);
    }
});

// ==================== GALLERY FILTER ====================
function initFilterGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category.includes(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ==================== FAQ ACCORDION ====================
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('i');

            // Close all other FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = null;
                    item.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
                }
            });

            // Toggle current FAQ
            faqItem.classList.toggle('active');
            
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            } else {
                answer.style.maxHeight = null;
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
}

// ==================== FORM HANDLING ====================
function initForms() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message
            showFormMessage('Thank you! Your message has been sent. We will contact you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    }

    // Dealer Form
    const dealerForm = document.querySelector('.dealer-form');
    if (dealerForm) {
        dealerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            showFormMessage('Thank you for your interest! Our team will contact you within 24 hours.', 'success');
            this.reset();
        });
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            if (validateEmail(email)) {
                showFormMessage('Successfully subscribed to our newsletter!', 'success');
                this.reset();
            } else {
                showFormMessage('Please enter a valid email address.', 'error');
            }
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showFormMessage(message, type) {
    const messageDiv = document.getElementById('formMessage') || createMessageDiv();
    messageDiv.textContent = message;
    messageDiv.className = 'form-message ' + type;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

function createMessageDiv() {
    const div = document.createElement('div');
    div.id = 'formMessage';
    div.className = 'form-message';
    div.style.cssText = 'margin-top: 1rem; padding: 1rem; border-radius: 8px; text-align: center;';
    
    const form = document.querySelector('form');
    if (form) {
        form.appendChild(div);
    }
    
    return div;
}

// ==================== COUNTER ANIMATION ====================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count') || counter.getAttribute('data-target'));
                if (target) {
                    animateCounter(counter, target);
                    counterObserver.unobserve(counter);
                }
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    // Determine suffix based on target value
    const suffix = target >= 1000 ? '+' : (target === 98 ? '%' : '+');

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== FORM VALIDATION STYLING ====================
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value) {
                this.style.borderColor = '#d32f2f';
            } else {
                this.style.borderColor = '';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = '#1976d2';
        });
    });
});

// ==================== SCROLL TO TOP BUTTON ====================
(function() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color, #d32f2f);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
    });

    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    });
})();

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', function() {
    // Hide loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// ==================== LAZY LOADING IMAGES ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ==================== FORM HELPER FUNCTIONS ====================
// Phone number formatting
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        e.target.value = value;
    });
});

// ==================== ADVANCED ANIMATIONS ====================
function initAdvancedAnimations() {
    // Stagger animation for feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Scale animation on scroll for service cards
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const scaleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'scaleIn 0.6s ease forwards';
            }
        });
    }, observerOptions);

    // Add scale animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Observe cards
    document.querySelectorAll('.service-card, .city-card, .testimonial-card').forEach(card => {
        card.style.opacity = '0';
        scaleObserver.observe(card);
    });
}

// ==================== SMOOTH REVEAL ON SCROLL ====================
window.addEventListener('scroll', function() {
    const reveals = document.querySelectorAll('.section-header, .about-text, .check-list');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
});

// ==================== PRODUCT FILTERS ====================
function initProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            productCards.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    }, 100);
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filter) {
                        card.classList.remove('hidden');
                        setTimeout(() => {
                            card.style.animation = 'fadeInUp 0.5s ease forwards';
                        }, 100);
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });
}

// ==================== PRODUCT QUICK VIEW MODAL ====================
// Product data for quick view modal
const productData = {
    'Tables & Chairs': {
        image: 'images/products/table and chairs.svg',
        title: 'Tables & Chairs',
        description: 'Premium quality tables and chairs for events. Multiple designs and sizes available to suit any occasion.',
        price: 'Starting ₹50/piece',
        stock: 'In Stock',
        features: [
            'Multiple sizes available',
            'Premium quality materials',
            'Easy to clean and maintain',
            'Comfortable seating',
            'Durable construction',
            'Available in various colors'
        ]
    },
    'Chairs with Covers': {
        image: 'images/products/charis and cover.svg',
        title: 'Chairs with Covers',
        description: 'Elegant chair covers in various colors. Perfect for weddings and formal events.',
        price: 'Starting ₹80/piece',
        stock: 'In Stock',
        features: [
            'Elegant design',
            'Various color options',
            'Perfect for formal events',
            'Easy to install',
            'Premium fabric material',
            'Wedding special'
        ]
    },
    'Designer Chair Covers': {
        image: 'images/products/chair cover\'.png',
        title: 'Designer Chair Covers',
        description: 'Premium designer chair covers with decorative elements. Add elegance to your event.',
        price: 'Starting ₹100/piece',
        stock: 'In Stock',
        features: [
            'Designer patterns',
            'Decorative elements',
            'Premium quality',
            'Elegant appearance',
            'Perfect for special occasions',
            'Easy maintenance'
        ]
    },
    'Round Tables': {
        image: 'images/products/round tables and covers.svg',
        title: 'Round Tables with Covers',
        description: 'Round tables with elegant table covers. Available in multiple sizes and colors.',
        price: 'Starting ₹150/piece',
        stock: 'In Stock',
        features: [
            'Round table design',
            'Elegant table covers',
            'Multiple sizes',
            'Various colors',
            'Sturdy construction',
            'Perfect for dining'
        ]
    },
    'Jhummar': {
        image: 'images/products/jhummar.svg',
        title: 'Jhummar Lights',
        description: 'Traditional Jhummar lights for grand decorations. Multiple designs available.',
        price: 'Starting ₹500/piece',
        stock: 'In Stock',
        features: [
            'Traditional design',
            'Grand decoration',
            'Multiple designs',
            'Premium quality',
            'Perfect for weddings',
            'LED lighting options'
        ]
    },
    'Flowers': {
        image: 'images/products/flowers.svg',
        title: 'Flower Decorations',
        description: 'Fresh and artificial flower arrangements. Perfect for all types of events.',
        price: 'Starting ₹200/arrangement',
        stock: 'In Stock',
        features: [
            'Fresh flowers available',
            'Artificial options',
            'Custom arrangements',
            'Various flower types',
            'Professional setup',
            'All event types'
        ]
    },
    'Fancy Flowers': {
        image: 'images/products/fancy flower.svg',
        title: 'Fancy Flower Decorations',
        description: 'Exclusive fancy flower arrangements for premium events and weddings.',
        price: 'Starting ₹500/arrangement',
        stock: 'In Stock',
        features: [
            'Exclusive designs',
            'Premium arrangements',
            'Wedding special',
            'Custom designs',
            'Premium flowers',
            'Professional styling'
        ]
    },
    'Decoration Sets': {
        image: 'images/products/decoration.svg',
        title: 'Complete Decoration Sets',
        description: 'Full decoration packages for your entire venue. Customizable themes available.',
        price: 'Starting ₹5,000/package',
        stock: 'In Stock',
        features: [
            'Complete packages',
            'Customizable themes',
            'Full venue coverage',
            'Professional setup',
            'Various themes',
            'All-inclusive service'
        ]
    },
    'Fancy Decoration': {
        image: 'images/products/fancy decoration.svg',
        title: 'Fancy Decoration Items',
        description: 'Unique and fancy decoration pieces to make your event stand out.',
        price: 'Starting ₹300/piece',
        stock: 'In Stock',
        features: [
            'Unique designs',
            'Fancy pieces',
            'Event standout',
            'Premium quality',
            'Custom options',
            'Modern styles'
        ]
    },
    'Hot Case': {
        image: 'images/products/hot case.svg',
        title: 'Hot Case (Food Warmer)',
        description: 'Professional food warmers for catering. Keep food fresh and hot for hours.',
        price: 'Starting ₹800/piece',
        stock: 'In Stock',
        features: [
            'Professional grade',
            'Food warming',
            'Long-lasting heat',
            'Catering quality',
            'Easy to use',
            'Temperature control'
        ]
    },
    'Cooler': {
        image: 'images/products/cooler.svg',
        title: 'Air Coolers',
        description: 'Industrial air coolers for outdoor events. Beat the heat in summer events.',
        price: 'Starting ₹500/day',
        stock: 'In Stock',
        features: [
            'Industrial grade',
            'Outdoor events',
            'Summer cooling',
            'High capacity',
            'Energy efficient',
            'Easy installation'
        ]
    },
    'Fans': {
        image: 'images/products/fan.svg',
        title: 'Ceiling & Pedestal Fans',
        description: 'High-speed fans for tent ventilation. Multiple units available.',
        price: 'Starting ₹100/day',
        stock: 'In Stock',
        features: [
            'High-speed operation',
            'Tent ventilation',
            'Multiple units',
            'Energy efficient',
            'Easy installation',
            'Quiet operation'
        ]
    },
    'Heater': {
        image: 'images/products/heater.svg',
        title: 'Room Heaters',
        description: 'Electric heaters for winter events. Keep your guests warm and comfortable.',
        price: 'Starting ₹400/day',
        stock: 'In Stock',
        features: [
            'Electric heating',
            'Winter events',
            'Guest comfort',
            'Safe operation',
            'Temperature control',
            'Energy efficient'
        ]
    },
    'Parda': {
        image: 'images/products/parda.svg',
        title: 'Tent Parda (Sidewalls)',
        description: 'Quality tent sidewalls in various colors. Protect from wind and rain.',
        price: 'Starting ₹200/panel',
        stock: 'In Stock',
        features: [
            'Wind protection',
            'Rain protection',
            'Various colors',
            'Quality material',
            'Easy installation',
            'Durable construction'
        ]
    },
    'Tent Cloth': {
        image: 'images/products/cloth.png',
        title: 'Tent Cloth Material',
        description: 'Premium quality tent fabric for wholesale. Various colors and grades available.',
        price: '₹80-150/meter',
        stock: 'In Stock',
        features: [
            'Premium quality',
            'Wholesale available',
            'Various colors',
            'Different grades',
            'Durable fabric',
            'Weather resistant'
        ]
    }
};

// Quick View Function for Products
function quickView(productName) {
    const product = productData[productName];
    if (!product) {
        console.error('Product not found:', productName);
        return;
    }
    
    // Populate modal with product image only
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductImage').alt = product.title;
    
    // Show modal
    const modal = document.getElementById('productModal');
    modal.style.display = 'flex';
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Add animation
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// Close Product Modal
function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.style.opacity = '0';
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('productModal');
        if (modal && modal.style.display === 'flex') {
            closeProductModal();
        }
    }
});

// Initialize product filters when page loads
document.addEventListener('DOMContentLoaded', function() {
    initProductFilters();
    initImageCarousel();
});

// ==================== IMAGE CAROUSEL ====================
function initImageCarousel() {
    const carousels = document.querySelectorAll('.image-carousel');
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelector('.carousel-slides');
        const slideElements = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-nav.prev');
        const nextBtn = carousel.querySelector('.carousel-nav.next');
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        
        if (!slides || slideElements.length === 0) return;
        
        let currentSlide = 0;
        const totalSlides = slideElements.length;
        let autoPlayInterval;
        
        // Function to show specific slide
        function showSlide(index) {
            if (index >= totalSlides) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = totalSlides - 1;
            } else {
                currentSlide = index;
            }
            
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update indicators
            indicators.forEach((indicator, i) => {
                if (i === currentSlide) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
        
        // Next slide
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        // Previous slide
        function prevSlide() {
            showSlide(currentSlide - 1);
        }
        
        // Auto play
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }
        
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }
        
        // Event listeners for navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoPlay();
                startAutoPlay(); // Restart auto-play after manual navigation
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoPlay();
                startAutoPlay();
            });
        }
        
        // Event listeners for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
                stopAutoPlay();
                startAutoPlay();
            });
        });
        
        // Pause on hover
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
        
        // Touch support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                nextSlide();
                stopAutoPlay();
                startAutoPlay();
            }
            if (touchEndX > touchStartX + 50) {
                prevSlide();
                stopAutoPlay();
                startAutoPlay();
            }
        }
        
        // Initialize
        showSlide(0);
        startAutoPlay();
    });
}

// ==================== PAGINATION ====================
function initPagination() {
    const pageButtons = document.querySelectorAll('.page-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    const postsPerPage = 3;
    let currentPage = 1;
    
    if (pageButtons.length === 0 || blogCards.length === 0) return;
    
    // Function to show specific page
    function showPage(pageNumber) {
        const startIndex = (pageNumber - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        
        // Hide all blog cards
        blogCards.forEach((card, index) => {
            if (index >= startIndex && index < endIndex) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update active page button
        pageButtons.forEach((btn, index) => {
            if (index === pageNumber - 1) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        currentPage = pageNumber;
    }
    
    // Add click event listeners to page buttons
    pageButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            if (btn.textContent.includes('Next')) {
                const totalPages = Math.ceil(blogCards.length / postsPerPage);
                if (currentPage < totalPages) {
                    showPage(currentPage + 1);
                }
            } else {
                showPage(index + 1);
            }
        });
    });
    
    // Initialize with first page
    showPage(1);
}

// ==================== CONSOLE INFO ====================
console.log('%c 🎪 Satya Tent Agency ', 'background: linear-gradient(135deg, #E63946, #F4B400); color: white; font-size: 20px; padding: 10px; font-weight: bold;');
console.log('%c ✨ Best Tent House in Punjab ', 'background: #1D3557; color: white; font-size: 14px; padding: 5px;');
console.log('%c 🌟 Modern Indian Event Theme ', 'background: #F4B400; color: #1D3557; font-size: 12px; padding: 5px;');
console.log('Website: https://satyatenthouse.com');
console.log('Contact: +91 98765 43210');

