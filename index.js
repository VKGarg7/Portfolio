const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Rotating role indicator
const roleText = ["FRONTEND", "BACKEND", "AI", "FULL STACK"];
let roleIndex = 0, roleCharIndex = 0, roleCurrentText = "";
function typeRole() {
    const el = document.getElementById('roleRotator');
    if (!el) return;
    if (roleCharIndex < roleText[roleIndex].length) {
        roleCurrentText += roleText[roleIndex].charAt(roleCharIndex++);
        el.textContent = roleCurrentText;
        setTimeout(typeRole, 100);
    } else { setTimeout(eraseRole, 1400); }
}
function eraseRole() {
    const el = document.getElementById('roleRotator');
    if (!el) return;
    if (roleCharIndex > 0) {
        roleCurrentText = roleText[roleIndex].substring(0, --roleCharIndex);
        el.textContent = roleCurrentText;
        setTimeout(eraseRole, 50);
    } else {
        roleIndex = (roleIndex + 1) % roleText.length;
        setTimeout(typeRole, 400);
    }
}
function startTypingAnimation() {
    const el = document.getElementById('roleRotator');
    if (!el) return;
    if (prefersReducedMotion) {
        el.textContent = roleText[0];
    } else {
        typeRole();
    }
}

// ===== Boot / Ignition Sequence =====
const BOOT_SESSION_KEY = 'garageBootComplete';
const bootScreen = document.getElementById('bootScreen');
const bootList = document.getElementById('bootList');
const bootStartWrap = document.getElementById('bootStartWrap');
const bootStartBtn = document.getElementById('bootStartBtn');
const bootSkip = document.getElementById('bootSkip');
const heroSection = document.getElementById('home');

function enterHero() {
    document.body.classList.remove('boot-pending');
    document.body.classList.add('hero-entered');
    startTypingAnimation();
}

function dismissBoot(instant) {
    if (!bootScreen) { enterHero(); return; }
    if (instant) bootScreen.classList.add('boot-instant');
    bootScreen.classList.add('boot-hidden');
    enterHero();
    setTimeout(() => bootScreen.remove(), instant ? 0 : 650);
}

function runIgnitionSequence() {
    bootStartBtn.classList.add('boot-pressed');
    bootScreen.classList.add('boot-igniting');
    sessionStorage.setItem(BOOT_SESSION_KEY, '1');
    setTimeout(() => dismissBoot(false), 750);
}

function playBootChecklist() {
    const lines = bootList.querySelectorAll('li');
    lines.forEach((li, i) => {
        setTimeout(() => {
            li.classList.add('boot-line-visible');
            setTimeout(() => li.classList.add('boot-ready'), 250);
        }, i * 220);
    });
    const totalDelay = lines.length * 220 + 350;
    setTimeout(() => bootStartWrap.classList.add('boot-start-visible'), totalDelay);
}

(function initBoot() {
    if (!bootScreen) { enterHero(); return; }

    const alreadyBooted = sessionStorage.getItem(BOOT_SESSION_KEY) === '1';

    if (alreadyBooted || prefersReducedMotion) {
        dismissBoot(true);
        if (!alreadyBooted) sessionStorage.setItem(BOOT_SESSION_KEY, '1');
        return;
    }

    playBootChecklist();

    bootStartBtn.addEventListener('click', runIgnitionSequence);
    bootSkip.addEventListener('click', () => {
        sessionStorage.setItem(BOOT_SESSION_KEY, '1');
        dismissBoot(false);
    });
})();

// Scroll Reveal
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.2 });
sections.forEach(section => observer.observe(section));

// Particles Background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
for (let i=0; i<100; i++) {
    particles.push({
        x: Math.random()*canvas.width, y: Math.random()*canvas.height,
        r: Math.random()*2+1, dx: (Math.random()-0.5)*0.5, dy: (Math.random()-0.5)*0.5
    });
}
let particlesRunning = false;
let particlesFrame = null;

function drawParticlesFrame() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.fillStyle = Math.random() > 0.5 ? '#ff2745' : '#00fff7';
        ctx.globalAlpha = 0.6;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
        if (!prefersReducedMotion) {
            p.x += p.dx; p.y += p.dy;
            if(p.x<0 || p.x>canvas.width) p.dx*=-1;
            if(p.y<0 || p.y>canvas.height) p.dy*=-1;
        }
    });
    ctx.globalAlpha = 1;
}

function animate() {
    if (!particlesRunning) return;
    drawParticlesFrame();
    if (!prefersReducedMotion) {
        particlesFrame = requestAnimationFrame(animate);
    } else {
        particlesRunning = false;
    }
}

function startParticles() {
    if (particlesRunning) return;
    particlesRunning = true;
    animate();
}

function stopParticles() {
    particlesRunning = false;
    if (particlesFrame) cancelAnimationFrame(particlesFrame);
}

startParticles();

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopParticles();
    } else {
        startParticles();
    }
});

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    if (prefersReducedMotion) drawParticlesFrame();
});

// ===== Mobile hamburger menu =====
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

// ===== Custom cursor =====
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

    const hoverTargets = document.querySelectorAll('a, button, .tool-card, .card-wrapper');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
    });
}

// ===== Lap progress bar =====
const lapFill = document.querySelector('.lap-fill');
const lapCar = document.querySelector('.lap-car');

// ===== RPM Scroll System =====
const rpmWidget = document.getElementById('rpmWidget');
const rpmArc = document.getElementById('rpmArc');
const rpmPct = document.getElementById('rpmPct');
const rpmState = document.getElementById('rpmState');
const rpmBarFill = document.getElementById('rpmBarFill');
const RPM_ARC_CIRCUMFERENCE = 264;
const rpmStates = [
    { threshold: 0, label: 'IDLE' },
    { threshold: 25, label: 'CRUISE' },
    { threshold: 50, label: 'PERFORMANCE' },
    { threshold: 75, label: 'REDLINE' },
    { threshold: 100, label: 'DESTINATION' },
];
let currentRpmLabel = '';

function getRpmState(pct) {
    let state = rpmStates[0];
    for (const s of rpmStates) {
        if (pct >= s.threshold) state = s;
    }
    return state;
}

function updateLapProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
    if (lapFill) lapFill.style.width = pct + '%';
    if (lapCar) lapCar.style.left = pct + '%';

    const state = getRpmState(pct);
    if (rpmArc) rpmArc.style.strokeDashoffset = String(RPM_ARC_CIRCUMFERENCE * (1 - pct / 100));
    if (rpmPct) rpmPct.textContent = Math.round(pct) + '%';
    if (rpmBarFill) rpmBarFill.style.width = pct + '%';
    if (rpmState && state.label !== currentRpmLabel) {
        currentRpmLabel = state.label;
        rpmState.textContent = state.label;
    }
    if (rpmWidget) {
        rpmWidget.classList.toggle('rpm-redline', state.label === 'REDLINE');
        rpmWidget.classList.toggle('rpm-destination', state.label === 'DESTINATION');
    }
}
window.addEventListener('scroll', updateLapProgress);
updateLapProgress();

// ===== Active nav gauge link tracking =====
const navLinks = document.querySelectorAll('.gauge-link');
const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`.gauge-link[href="#${id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active-link'));
            link.classList.add('active-link');
        }
    });
}, { threshold: 0.4 });
sections.forEach(s => navObserver.observe(s));

// ===== Ignition / gauge sweep =====
const ignitionBtn = document.getElementById('ignitionBtn');
let ignited = false;
function sweepGauges() {
    document.querySelectorAll('.gauge-progress').forEach((circle, i) => {
        const targets = [0.72, 0.9, 1]; // rpm, speed, fuel
        const circumference = 327;
        setTimeout(() => {
            circle.style.strokeDashoffset = circumference * (1 - targets[i % targets.length]);
        }, i * 150);
    });
}
if (ignitionBtn) {
    ignitionBtn.addEventListener('click', () => {
        ignited = !ignited;
        ignitionBtn.classList.toggle('started', ignited);
        ignitionBtn.querySelector('.ignition-label').textContent = ignited ? 'ENGINE ON' : 'PUSH TO START';
        if (ignited) sweepGauges();
    });
}
// Auto-sweep gauges once on load for visual interest even without a click
window.addEventListener('load', () => setTimeout(sweepGauges, 600));

// ===== Cockpit centerpiece: spokes, cursor tilt, scroll rotation =====
const spokesGroup = document.querySelector('.cp-spokes');
if (spokesGroup) {
    const spokeCount = 12;
    for (let i = 0; i < spokeCount; i++) {
        const angle = (i / spokeCount) * 2 * Math.PI;
        const x1 = 250 + Math.cos(angle) * 115;
        const y1 = 250 + Math.sin(angle) * 115;
        const x2 = 250 + Math.cos(angle) * 175;
        const y2 = 250 + Math.sin(angle) * 175;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1.toFixed(1));
        line.setAttribute('y1', y1.toFixed(1));
        line.setAttribute('x2', x2.toFixed(1));
        line.setAttribute('y2', y2.toFixed(1));
        spokesGroup.appendChild(line);
    }
}

const centerpieceWrap = document.getElementById('centerpieceWrap');
const centerpieceSvg = document.getElementById('centerpiece');

if (centerpieceWrap && centerpieceSvg && !prefersReducedMotion) {
    let targetTiltX = 0, targetTiltY = 0, curTiltX = 0, curTiltY = 0;
    let scrollRotation = 0;

    centerpieceWrap.addEventListener('mousemove', (e) => {
        const rect = centerpieceWrap.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        targetTiltY = relX * 18;
        targetTiltX = -relY * 18;
    });
    centerpieceWrap.addEventListener('mouseleave', () => {
        targetTiltX = 0; targetTiltY = 0;
    });

    function renderCenterpieceTransform() {
        curTiltX += (targetTiltX - curTiltX) * 0.08;
        curTiltY += (targetTiltY - curTiltY) * 0.08;
        centerpieceSvg.style.transform =
            `perspective(900px) rotateX(${curTiltX}deg) rotateY(${curTiltY}deg) rotate(${scrollRotation}deg)`;
        requestAnimationFrame(renderCenterpieceTransform);
    }
    renderCenterpieceTransform();

    window.addEventListener('scroll', () => {
        scrollRotation = window.scrollY * 0.05;
    });
}

// ===== Skills — Performance Systems module board =====
const systemsBoard = document.getElementById('systemsBoard');
const connLines = document.querySelectorAll('.conn-line');
const sysModules = document.querySelectorAll('.sys-module');
const animatedTelemetry = new WeakSet();

function animateTelemetryValue(el) {
    if (animatedTelemetry.has(el)) return;
    animatedTelemetry.add(el);
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    if (prefersReducedMotion) {
        el.textContent = target;
        return;
    }
    const duration = 900;
    const start = performance.now();
    function step(now) {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

sysModules.forEach(mod => {
    const key = mod.getAttribute('data-module');

    function activate() {
        connLines.forEach(line => {
            const pair = line.getAttribute('data-pair') || '';
            if (pair.split(' ').includes(key)) {
                line.classList.add('conn-active');
            }
        });
        const teleValue = mod.querySelector('.tele-value');
        if (teleValue) animateTelemetryValue(teleValue);
    }
    function deactivate() {
        connLines.forEach(line => line.classList.remove('conn-active'));
    }

    mod.addEventListener('mouseenter', activate);
    mod.addEventListener('mouseleave', deactivate);
    mod.addEventListener('focusin', activate);
    mod.addEventListener('focusout', deactivate);
    mod.setAttribute('tabindex', '0');
});

// On touch/mobile the board becomes a static stacked list; reveal telemetry values immediately as each module scrolls into view
if (systemsBoard) {
    const teleObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const teleValue = entry.target.querySelector('.tele-value');
                if (teleValue) animateTelemetryValue(teleValue);
            }
        });
    }, { threshold: 0.5 });
    sysModules.forEach(mod => teleObserver.observe(mod));
}

// ===== Experience — The Journey (route indicator + checkpoint reveals) =====
const routeTrack = document.getElementById('routeTrack');
const routeIndicator = document.getElementById('routeIndicator');
const routePathFill = document.getElementById('routePathFill');
const checkpoints = document.querySelectorAll('.checkpoint');

if (routeTrack && routeIndicator && routePathFill) {
    function updateRouteProgress() {
        const rect = routeTrack.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const trackHeight = rect.height;
        if (trackHeight <= 0) return;

        // Progress: 0 when track top enters bottom of viewport, 1 when track bottom exits top
        const traveled = viewportH - rect.top;
        const totalTravel = viewportH + trackHeight;
        const pct = Math.min(1, Math.max(0, traveled / totalTravel));

        routeIndicator.style.top = (pct * trackHeight) + 'px';
        routePathFill.style.strokeDashoffset = String(400 * (1 - pct));
    }
    window.addEventListener('scroll', updateRouteProgress);
    window.addEventListener('resize', updateRouteProgress);
    updateRouteProgress();
}

if (checkpoints.length) {
    const checkpointObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('checkpoint-visible');
        });
    }, { threshold: 0.2 });
    checkpoints.forEach(cp => checkpointObserver.observe(cp));
}

// ===== Projects — The Garage (spec panel showcase) =====
const specPanels = document.querySelectorAll('.spec-panel');

if (specPanels.length) {
    const specObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('spec-visible');
        });
    }, { threshold: 0.15 });
    specPanels.forEach(panel => specObserver.observe(panel));

    if (!prefersReducedMotion) {
        specPanels.forEach(panel => {
            const visual = panel.querySelector('.spec-visual');
            if (!visual) return;
            visual.addEventListener('mousemove', (e) => {
                const rect = visual.getBoundingClientRect();
                const relX = (e.clientX - rect.left) / rect.width - 0.5;
                const relY = (e.clientY - rect.top) / rect.height - 0.5;
                visual.style.transform =
                    `perspective(800px) rotateX(${(-relY * 8).toFixed(2)}deg) rotateY(${(relX * 8).toFixed(2)}deg) scale(1.02)`;
            });
            visual.addEventListener('mouseleave', () => {
                visual.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
            });
        });
    }
}
