const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Particles background (shared visual language with homepage)
const canvas = document.getElementById('particles');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (let i = 0; i < 70; i++) {
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
            ctx.fillStyle = Math.random() > 0.5 ? '#ff2745' : '#00fff7';
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
}

// Mobile hamburger menu
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Scroll reveal for detail sections
const revealTargets = document.querySelectorAll('.detail-section');
if (revealTargets.length) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    revealTargets.forEach(el => revealObserver.observe(el));
}

// Architecture diagram: light pulse traveling along connector lines on scroll into view
const archDiagram = document.getElementById('archDiagram');
if (archDiagram) {
    const archObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) archDiagram.classList.add('arch-active');
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
