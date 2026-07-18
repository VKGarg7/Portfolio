const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Particles background (shared visual language with homepage)
const canvas = document.getElementById('particles');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const isSmallOrTouch = window.matchMedia('(max-width: 760px), (pointer: coarse)').matches;
    const PARTICLE_COUNT = isSmallOrTouch ? 20 : 70;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.width, y: Math.random() * canvas.height,
            r: Math.random() * 2 + 1, dx: (Math.random() - 0.5) * 0.5, dy: (Math.random() - 0.5) * 0.5
        });
    }
    let particlesRunning = false;
    function drawParticlesFrame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.fillStyle = '#d81f37';
            ctx.globalAlpha = 0.6;
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
            if (!prefersReducedMotion) {
                p.x += p.dx; p.y += p.dy;
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            }
        });
        ctx.globalAlpha = 1;
    }
    function animate() {
        if (!particlesRunning) return;
        drawParticlesFrame();
        if (!prefersReducedMotion) requestAnimationFrame(animate);
        else particlesRunning = false;
    }
    function startParticles() { if (!particlesRunning) { particlesRunning = true; animate(); } }
    function stopParticles() { particlesRunning = false; }
    startParticles();
    document.addEventListener('visibilitychange', () => { document.hidden ? stopParticles() : startParticles(); });
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        if (prefersReducedMotion) drawParticlesFrame();
    });
}

// Custom cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
if (cursorDot && cursorRing && !prefersReducedMotion) {
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    function animateRing() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();
    document.querySelectorAll('a, button, .arch-node').forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
    });

    // Cursor state morphing: VIEW over project imagery/diagram nodes, OPEN over external links
    const cursorLabel = cursorRing.querySelector('.cursor-label');
    function setCursorState(state) {
        cursorRing.classList.remove('state-view', 'state-open');
        if (cursorLabel) cursorLabel.textContent = '';
        if (state) {
            cursorRing.classList.add(`state-${state}`);
            if (cursorLabel) cursorLabel.textContent = state.toUpperCase();
        }
    }
    document.querySelectorAll('.detail-hero-img, .arch-node').forEach(el => {
        el.addEventListener('mouseenter', () => setCursorState('view'));
        el.addEventListener('mouseleave', () => setCursorState(null));
    });
    document.querySelectorAll('a[target="_blank"]').forEach(el => {
        el.addEventListener('mouseenter', () => setCursorState('open'));
        el.addEventListener('mouseleave', () => setCursorState(null));
    });
}

// Mobile hamburger menu
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
}
if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
        if (isOpen) {
            const firstLink = mobileMenu.querySelector('.mobile-link');
            if (firstLink) firstLink.focus();
        } else {
            navToggle.focus();
        }
    });
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    mobileMenu.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        closeMobileMenu();
        navToggle.focus();
    });
}

// Scroll reveal for detail sections + section-number entrance animation
const revealTargets = document.querySelectorAll('.detail-section');
if (revealTargets.length) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const num = entry.target.querySelector('.detail-num');
                if (num) num.classList.add('num-visible');
            }
        });
    }, { threshold: 0.15 });
    revealTargets.forEach(el => revealObserver.observe(el));
}

// Image reveal mask on the hero screenshot
const heroImg = document.querySelector('.detail-hero-img');
if (heroImg && !heroImg.parentElement.classList.contains('img-mask-wrap')) {
    const wrap = document.createElement('div');
    wrap.className = 'img-mask-wrap';
    heroImg.parentNode.insertBefore(wrap, heroImg);
    wrap.appendChild(heroImg);
    const mask = document.createElement('div');
    mask.className = 'img-mask';
    wrap.appendChild(mask);

    const heroMaskObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                mask.classList.add('mask-open');
                heroMaskObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    heroMaskObserver.observe(wrap);
}

// Architecture diagram: lines draw in first, then a light pulse flows along them
const archDiagram = document.getElementById('archDiagram');
if (archDiagram) {
    const archLines = archDiagram.querySelectorAll('.arch-line');
    archLines.forEach(line => {
        const length = line.getTotalLength ? line.getTotalLength() : 300;
        line.style.setProperty('--ld-length', length);
        if (!prefersReducedMotion) line.classList.add('line-draw');
    });

    const archObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            archLines.forEach(line => line.classList.add('line-drawn'));
            const flowDelay = prefersReducedMotion ? 0 : 700;
            setTimeout(() => archDiagram.classList.add('arch-active'), flowDelay);
            archObserver.unobserve(entry.target);
        });
    }, { threshold: 0.3 });
    archObserver.observe(archDiagram);
}

// Simple scroll-progress bar reused in a slim form for detail pages
const detailProgressFill = document.getElementById('detailProgressFill');
if (detailProgressFill) {
    function updateDetailProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
        detailProgressFill.style.width = pct + '%';
    }
    window.addEventListener('scroll', updateDetailProgress);
    updateDetailProgress();
}

// ===== Page transitions: horizontal light sweep between internal pages =====
const pageSweep = document.getElementById('pageSweep');

if (pageSweep) {
    // Entrance sweep: plays briefly as each new page settles in
    if (!prefersReducedMotion) {
        requestAnimationFrame(() => {
            pageSweep.classList.add('sweep-enter');
            pageSweep.addEventListener('animationend', () => {
                pageSweep.classList.remove('sweep-enter');
            }, { once: true });
        });
    }

    document.addEventListener('click', (e) => {
        if (prefersReducedMotion) return;

        const link = e.target.closest('a[href]');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
        if (link.target === '_blank' || link.hasAttribute('download')) return;
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // let modifier-clicks / new-tab behave natively

        let url;
        try { url = new URL(href, window.location.href); } catch { return; }
        if (url.origin !== window.location.origin) return; // external links navigate immediately, no sweep

        // Anchor links to a section on the SAME page (e.g. index.html#projects from index.html) shouldn't sweep
        const isSamePageAnchor = url.pathname === window.location.pathname && url.hash;
        if (isSamePageAnchor) return;

        e.preventDefault();
        pageSweep.classList.remove('sweep-enter');
        pageSweep.classList.add('sweep-exit');
        const NAV_DELAY = 380; // stays within the 300-700ms window without stalling navigation
        setTimeout(() => { window.location.href = href; }, NAV_DELAY);
    });
}
