// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP ScrollTrigger Plugin
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('hidden')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            }
        });

        // Close mobile menu when link is clicked
        const navLinks = document.querySelectorAll('#mobile-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // GSAP Animations (only if GSAP is loaded)
    if (typeof gsap !== 'undefined') {
        // Hero Section Animation
        const heroH1 = document.querySelector('.hero-content h1');
        const heroP = document.querySelectorAll('.hero-content p');
        const featureBadges = document.querySelectorAll('.feature-badge');
        const heroButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

        if (heroH1) {
            gsap.from(heroH1, {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power3.out'
            });
        }

        if (heroP.length > 0) {
            gsap.from(heroP, {
                duration: 1,
                y: 30,
                opacity: 0,
                delay: 0.3,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }

        if (featureBadges.length > 0) {
            gsap.from(featureBadges, {
                duration: 0.8,
                y: 30,
                opacity: 0,
                delay: 0.6,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }

        if (heroButtons.length > 0) {
            gsap.from(heroButtons, {
                duration: 0.8,
                y: 20,
                opacity: 0,
                delay: 1,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }
    }

        // Section Animations with ScrollTrigger
        if (typeof ScrollTrigger !== 'undefined') {
            const serviceCards = document.querySelectorAll('.service-card');
            if (serviceCards.length > 0) {
                gsap.utils.toArray('.service-card').forEach((card, i) => {
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                            toggleActions: 'play none none none'
                        },
                        duration: 0.8,
                        y: 50,
                        opacity: 0,
                        delay: i * 0.1,
                        ease: 'power3.out'
                    });
                });
            }

            const portfolioItems = document.querySelectorAll('.portfolio-item');
            if (portfolioItems.length > 0) {
                gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
                    gsap.from(item, {
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 80%',
                            toggleActions: 'play none none none'
                        },
                        duration: 0.8,
                        scale: 0.8,
                        opacity: 0,
                        delay: i * 0.1,
                        ease: 'back.out(1.7)'
                    });
                });
            }

            // Professional Sequential Process Animation
            const processSection = document.querySelector('#process');
            if (processSection && typeof ScrollTrigger !== 'undefined') {
                const processSteps = document.querySelectorAll('.process-step');
                const processNumbers = document.querySelectorAll('.process-number');
                const processContents = document.querySelectorAll('.process-content');
                const processLines = document.querySelectorAll('.process-line');
                
                if (processSteps.length > 0) {
                    // Set initial states
                    gsap.set(processNumbers, {
                        scale: 0,
                        opacity: 0
                    });
                    
                    gsap.set(processContents, {
                        opacity: 0,
                        x: -30
                    });
                    
                    gsap.set(processLines, {
                        opacity: 0,
                        height: 0
                    });
                    
                    // Create a master timeline for sequential animation
                    const processTimeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: processSection,
                            start: 'top 70%',
                            toggleActions: 'play none none none'
                        }
                    });
                    
                    // Animate each step sequentially
                    processSteps.forEach((step, index) => {
                        const number = processNumbers[index];
                        const content = processContents[index];
                        const line = index < processLines.length ? processLines[index] : null;
                        
                        // Step 1 - Immediate animation
                        if (index === 0) {
                            // Animate number circle with bounce
                            processTimeline.to(number, {
                                duration: 0.7,
                                scale: 1,
                                opacity: 1,
                                ease: 'back.out(1.7)'
                            })
                            // Animate content slide in
                            .to(content, {
                                duration: 0.7,
                                opacity: 1,
                                x: 0,
                                ease: 'power3.out'
                            }, '-=0.4')
                            // Animate connecting line (if exists)
                            .to(line, {
                                duration: 0.6,
                                opacity: 1,
                                height: '48px',
                                ease: 'power2.out'
                            }, '-=0.3');
                        } else {
                            // Subsequent steps - sequential animation with delay
                            // Animate connecting line first (grows downward)
                            if (line) {
                                processTimeline.to(line, {
                                    duration: 0.6,
                                    opacity: 1,
                                    height: '48px',
                                    ease: 'power2.out'
                                });
                            }
                            
                            // Animate number circle with bounce effect
                            processTimeline.to(number, {
                                duration: 0.7,
                                scale: 1,
                                opacity: 1,
                                ease: 'back.out(1.7)'
                            })
                            // Animate content slide in
                            .to(content, {
                                duration: 0.7,
                                opacity: 1,
                                x: 0,
                                ease: 'power3.out'
                            }, '-=0.4');
                        }
                    });
                }
            }

            const pricingCards = document.querySelectorAll('.pricing-card');
            if (pricingCards.length > 0) {
                gsap.utils.toArray('.pricing-card').forEach((card, i) => {
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                            toggleActions: 'play none none none'
                        },
                        duration: 0.8,
                        y: 50,
                        opacity: 0,
                        delay: i * 0.1,
                        ease: 'power3.out'
                    });
                });
            }

            // About Section Animation
            const aboutContent = document.querySelector('.about-content');
            const aboutImage = document.querySelector('.about-image');
            const aboutSection = document.querySelector('#about');

            if (aboutContent && aboutSection) {
                gsap.from(aboutContent, {
                    scrollTrigger: {
                        trigger: aboutSection,
                        start: 'top 70%',
                        toggleActions: 'play none none none'
                    },
                    duration: 1,
                    x: -50,
                    opacity: 0,
                    ease: 'power3.out'
                });
            }

            if (aboutImage && aboutSection) {
                gsap.from(aboutImage, {
                    scrollTrigger: {
                        trigger: aboutSection,
                        start: 'top 70%',
                        toggleActions: 'play none none none'
                    },
                    duration: 1,
                    x: 50,
                    opacity: 0,
                    ease: 'power3.out'
                });
            }

            const statCards = document.querySelectorAll('.stat-card');
            if (statCards.length > 0) {
                gsap.utils.toArray('.stat-card').forEach((card, i) => {
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                            toggleActions: 'play none none none'
                        },
                        duration: 0.6,
                        scale: 0,
                        delay: i * 0.1,
                        ease: 'back.out(1.7)'
                    });
                });
            }
        }

    // Portfolio Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        // Initialize: Show all items by default
        portfolioItems.forEach(item => {
            item.classList.remove('hidden');
        });

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active state from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    // Remove purple/white classes
                    btn.classList.remove('bg-purple-600', 'text-white');
                    // Add gray classes
                    if (!btn.classList.contains('bg-gray-200')) {
                        btn.classList.add('bg-gray-200', 'text-gray-700');
                    }
                });
                
                // Add active state to clicked button
                this.classList.add('active');
                this.classList.remove('bg-gray-200', 'text-gray-700');
                this.classList.add('bg-purple-600', 'text-white');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        // Show item
                        item.classList.remove('hidden');
                        // Animate if GSAP is available
                        if (typeof gsap !== 'undefined') {
                            gsap.fromTo(item, 
                                { scale: 0.8, opacity: 0 },
                                { 
                                    duration: 0.5, 
                                    scale: 1, 
                                    opacity: 1,
                                    ease: 'back.out(1.7)' 
                                }
                            );
                        }
                    } else {
                        // Hide item
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }

    // Counter Animation
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        if (isNaN(target)) return;
        
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (target === 100 ? '%' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
            }
        }, 16);
    }

    // Intersection Observer for Counters
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageInput = contactForm.querySelector('textarea');
            
            if (!nameInput || !emailInput || !messageInput) return;
            
            const name = nameInput.value;
            const email = emailInput.value;
            const message = messageInput.value;
            
            // Create mailto link
            const subject = encodeURIComponent('New Contact Form Submission');
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
            const mailtoLink = `mailto:ilyas99352@gmail.com?subject=${subject}&body=${body}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'form-success';
            successMsg.textContent = 'Thank you! Your email client will open shortly.';
            contactForm.appendChild(successMsg);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 5000);
        });
    }

    // Parallax Effect for Hero Section (optional - can be removed if causing issues)
    // window.addEventListener('scroll', () => {
    //     const scrolled = window.pageYOffset;
    //     const hero = document.querySelector('#home');
    //     if (hero) {
    //         hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    //         hero.style.opacity = 1 - scrolled / 500;
    //     }
    // });

    // Add hover effects to service cards
    if (typeof gsap !== 'undefined') {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    duration: 0.3,
                    scale: 1.05,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    duration: 0.3,
                    scale: 1,
                    ease: 'power2.out'
                });
            });
        });

        // Add hover effects to portfolio items
        const portfolioItemsHover = document.querySelectorAll('.portfolio-item');
        portfolioItemsHover.forEach(item => {
            item.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    duration: 0.3,
                    scale: 1.03,
                    ease: 'power2.out'
                });
            });
            
            item.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    duration: 0.3,
                    scale: 1,
                    ease: 'power2.out'
                });
            });
        });

        // Animate on scroll for testimonials
        if (typeof ScrollTrigger !== 'undefined') {
            const testimonials = document.querySelectorAll('#testimonials .bg-gray-50');
            if (testimonials.length > 0) {
                gsap.utils.toArray('#testimonials .bg-gray-50').forEach((testimonial, i) => {
                    gsap.from(testimonial, {
                        scrollTrigger: {
                            trigger: testimonial,
                            start: 'top 80%',
                            toggleActions: 'play none none none'
                        },
                        duration: 0.8,
                        y: 30,
                        opacity: 0,
                        delay: i * 0.2,
                        ease: 'power3.out'
                    });
                });
            }
        }
    }

    // Navbar active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('text-purple-600', 'font-semibold');
                const href = link.getAttribute('href');
                if (href === `#${current}`) {
                    link.classList.add('text-purple-600', 'font-semibold');
                }
            });
        });
    }

    // Loading Animation
    if (typeof gsap !== 'undefined') {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            gsap.from('body', {
                duration: 0.5,
                opacity: 0,
                ease: 'power2.out'
            });
        });
    }

    // Add smooth reveal animation to sections
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const revealSections = document.querySelectorAll('section');
        if (revealSections.length > 0) {
            revealSections.forEach(section => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    duration: 1,
                    opacity: 0,
                    y: 30,
                    ease: 'power3.out'
                });
            });
        }
    }
}); // End of DOMContentLoaded

