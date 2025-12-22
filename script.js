document.addEventListener('DOMContentLoaded', () => {
    console.log("Portfolio loaded with premium animations.");

    // Luxury Smooth Scroll Engine
    function luxuryScroll(target, duration = 1200) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, offsetPosition - startPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Ease-In-Out-Quart for a deeper, more premium deceleration
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t * t + b;
            t -= 2;
            return -c / 2 * (t * t * t * t - 2) + b;
        }

        requestAnimationFrame(animation);
    }

    // Apply luxury scroll to navigations
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                luxuryScroll(target, 1200); // Calmer 1.2s duration
            }
        });
    });

    // Navbar Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });

    // Premium Reveal Animation Setup (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target elements to animate
    const revealElements = document.querySelectorAll('.editorial-sidebar, .editorial-main');

    revealElements.forEach((el) => {
        el.classList.add('reveal-me');
        observer.observe(el);
    });
});
