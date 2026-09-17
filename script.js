document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('[data-menu-button]');
    const nav = document.querySelector('[data-nav]');
    const siteHeader = document.querySelector('.site-header');

    if (menuButton && nav) {
        const closeMenu = () => {
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.setAttribute('aria-label', 'メニューを開く');
            nav.classList.remove('is-open');
            document.body.classList.remove('menu-open');
        };

        const openMenu = () => {
            menuButton.setAttribute('aria-expanded', 'true');
            menuButton.setAttribute('aria-label', 'メニューを閉じる');
            nav.classList.add('is-open');
            document.body.classList.add('menu-open');
        };

        menuButton.addEventListener('click', () => {
            const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
            if (isOpen) closeMenu(); else openMenu();
        });

        nav.addEventListener('click', (event) => {
            if (event.target.closest('a')) closeMenu();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMenu();
                menuButton.focus();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 920) closeMenu();
        });
    }

    const handleHeaderState = () => {
        if (!siteHeader) return;
        siteHeader.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    handleHeaderState();
    window.addEventListener('scroll', handleHeaderState, { passive: true });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.requestAnimationFrame(() => {
        document.body.classList.add('is-loaded');
    });

    const revealTargets = document.querySelectorAll(
        '.split-heading > *, .business-item, .minoly-grid > *, .section-heading, .company-list div, .contact-cta-inner > *, .detail-grid > *, .contact-page-grid > *, .legal-content > *'
    );

    revealTargets.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.setProperty('--reveal-delay', `${Math.min((index % 6) * 70, 350)}ms`);
    });

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealTargets.forEach((el) => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px'
    });

    revealTargets.forEach((el) => observer.observe(el));
});



