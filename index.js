/* ==========================================================================
   INTERACTIVE APPLICATION SCRIPTS
   Varshini C R - Premium Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    /* ==========================================================================
       MOBILE NAVIGATION MENU
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle icon representation
            const icon = mobileToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Header scroll background indicator
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       PROJECTS FILTER SYSTEM
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from other buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    // Show animation
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        display: 'flex',
                        ease: 'power2.out'
                    });
                } else {
                    // Hide animation
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.92,
                        duration: 0.3,
                        display: 'none',
                        ease: 'power2.in'
                    });
                }
            });
            
            // Refresh ScrollTrigger to recalculate positions
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 350);
        });
    });

    /* ==========================================================================
       CONTACT FORM HANDLER
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const contactStatus = document.getElementById('contact-status');
    const submitBtn = document.getElementById('btn-submit-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Disable submit button and show loading state
            submitBtn.disabled = true;
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending message... <i class="fa-solid fa-spinner fa-spin"></i>';

            // Simulate form submission (e.g. backend AJAX)
            setTimeout(() => {
                // Success message
                contactStatus.className = 'contact-status-msg success';
                contactStatus.innerHTML = '<strong>Success!</strong> Thank you, Varshini will get back to you shortly.';
                
                // Reset form
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                
                // Smooth scroll to status message
                contactStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                // Fade out message after 6 seconds
                setTimeout(() => {
                    gsap.to(contactStatus, {
                        opacity: 0,
                        height: 0,
                        padding: 0,
                        duration: 0.5,
                        onComplete: () => {
                            contactStatus.style.display = 'none';
                            contactStatus.style.opacity = 1;
                            contactStatus.style.height = 'auto';
                            contactStatus.style.padding = '';
                        }
                    });
                }, 6000);

            }, 1500);
        });
    }

    /* ==========================================================================
       GSAP ANIMATIONS & EFFECTS
       ========================================================================== */

    // Subtle Hover Tilt/Mousemove Effect for Bento Cards and Glass Cards
    const tiltCards = document.querySelectorAll('.glass-card, .bento-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within card
            const y = e.clientY - rect.top;  // y position within card
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt angle (max 3 degrees)
            const tiltX = ((centerY - y) / centerY) * 3;
            const tiltY = ((x - centerX) / centerX) * 3;
            
            gsap.to(card, {
                transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.015, 1.015, 1.015)`,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });

    // Floating micro-animations for background accents
    gsap.to('.floating-accent-1', {
        y: -20,
        x: 10,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // Parallax Zoom on Hero Image
    gsap.to('.hero-image', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 40,
        scale: 1.08,
        ease: 'none'
    });

    // Fade-in Reveal Animations for Sections
    const revealElements = [
        '.hero-intro', '.hero-title', '.hero-role', '.hero-desc', '.hero-actions',
        '.section-title-wrapper', '.about-grid > div', '.about-bio-text', 
        '.internship-grid > div', '.project-card', '.bento-card', '.bento-text-card',
        '.cert-card-vertical', '.skills-category', '.profile-card', '.contact-grid > div'
    ];

    revealElements.forEach(selector => {
        gsap.utils.toArray(selector).forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 40,
                duration: 0.85,
                ease: 'power2.out',
                clearProps: 'all' // clear properties after animation completes
            });
        });
    });

    // Stats Counter Animation
    const stats = document.querySelectorAll('.profile-number');
    stats.forEach(stat => {
        const text = stat.innerText;
        // Parse numerical part
        const numberVal = parseInt(text.replace(/[^0-9]/g, ''));
        
        if (!isNaN(numberVal)) {
            const suffix = text.replace(/[0-9]/g, ''); // '+' or '★' or none
            
            // Set initial state
            stat.innerText = '0' + suffix;
            
            ScrollTrigger.create({
                trigger: stat,
                start: 'top 90%',
                onEnter: () => {
                    let countObj = { val: 0 };
                    gsap.to(countObj, {
                        val: numberVal,
                        duration: 2.2,
                        ease: 'power3.out',
                        onUpdate: () => {
                            stat.innerText = Math.floor(countObj.val) + suffix;
                        }
                    });
                },
                once: true
            });
        }
    });

    // Timeline Node highlight transition
    gsap.utils.toArray('.timeline-item').forEach(item => {
        const node = item.querySelector('.timeline-node');
        gsap.from(node, {
            scrollTrigger: {
                trigger: item,
                start: 'top 75%',
                toggleActions: 'play none none none'
            },
            scale: 0,
            duration: 0.5,
            ease: 'back.out(1.7)'
        });
    });

});
