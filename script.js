document.addEventListener('DOMContentLoaded', function () {

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    if(navToggle) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animate headline text
    const headline = document.querySelector('.hero-headline');
    if (headline) {
        const text = headline.textContent;
        headline.innerHTML = '';
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char === ' ' ? '\u00A0' : char; // Non-breaking space
            span.style.animationDelay = `${index * 0.03}s`;
            headline.appendChild(span);
        });
    }

    // Intersection Observer for animations
    const animatedSections = document.querySelectorAll('.animated-section');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if(entry.target.id === 'stats') {
                    startCounters();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });

    animatedSections.forEach(section => {
        observer.observe(section);
    });

    // Statistics counter animation
    let countersStarted = false;
    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            animateValue(counter, 0, target, duration);
        });
    }
    
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.innerHTML = value.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

});