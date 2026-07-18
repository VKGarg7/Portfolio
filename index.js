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
// Fewer particles on small/touch screens — same ambience, far less CPU/battery draw on phones
const isSmallOrTouch = window.matchMedia('(max-width: 760px), (pointer: coarse)').matches;
const PARTICLE_COUNT = isSmallOrTouch ? 30 : 100;
for (let i=0; i<PARTICLE_COUNT; i++) {
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
        ctx.fillStyle = '#d81f37';
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
    const cursorLabel = cursorRing.querySelector('.cursor-label');

    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
    });

    // Cursor state morphing: VIEW over project visuals, OPEN over external links
    const viewTargets = document.querySelectorAll('.flip-card, .spec-visual, .arch-node, .detail-hero-img');
    const openTargets = document.querySelectorAll('a[target="_blank"]');

    function setCursorState(state) {
        cursorRing.classList.remove('state-view', 'state-open');
        if (cursorLabel) cursorLabel.textContent = '';
        if (state) {
            cursorRing.classList.add(`state-${state}`);
            if (cursorLabel) cursorLabel.textContent = state.toUpperCase();
        }
    }

    viewTargets.forEach(el => {
        el.addEventListener('mouseenter', () => setCursorState('view'));
        el.addEventListener('mouseleave', () => setCursorState(null));
    });
    openTargets.forEach(el => {
        el.addEventListener('mouseenter', () => setCursorState('open'));
        el.addEventListener('mouseleave', () => setCursorState(null));
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
const rpmStatesTrackMode = [
    { threshold: 0, label: 'PIT LANE' },
    { threshold: 25, label: 'OUT LAP' },
    { threshold: 50, label: 'FLYING LAP' },
    { threshold: 75, label: 'REDLINE' },
    { threshold: 100, label: 'CHECKERED FLAG' },
];
let currentRpmLabel = '';
let trackModeActive = false;

function getRpmState(pct) {
    const source = trackModeActive ? rpmStatesTrackMode : rpmStates;
    let state = source[0];
    for (const s of source) {
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

// ===== Active nav gauge link tracking + sliding indicator =====
const navLinks = document.querySelectorAll('.gauge-link');
const navIndicator = document.getElementById('navIndicator');
const dashLinks = document.getElementById('dashLinks');

function moveNavIndicator(link) {
    if (!navIndicator || !dashLinks || !link) return;
    const linkRect = link.getBoundingClientRect();
    const parentRect = dashLinks.getBoundingClientRect();
    navIndicator.style.transform = `translateX(${linkRect.left - parentRect.left}px)`;
    navIndicator.style.width = `${linkRect.width}px`;
    navIndicator.classList.add('visible');
}

const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`.gauge-link[href="#${id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active-link'));
            link.classList.add('active-link');
            moveNavIndicator(link);
        }
    });
}, { threshold: 0.4 });
sections.forEach(s => navObserver.observe(s));

window.addEventListener('resize', () => {
    const active = document.querySelector('.gauge-link.active-link');
    if (active) moveNavIndicator(active);
});

// ===== Ignition / gauge sweep =====
const ignitionBtn = document.getElementById('ignitionBtn');
let ignited = false;
function sweepGauges(reset = false) {
    const circumference = 327;
    document.querySelectorAll('.gauge-progress').forEach((circle, i) => {
        const targets = [0.72, 0.9, 1]; // rpm, speed, fuel
        if (reset) {
            circle.style.transition = 'none';
            circle.style.strokeDashoffset = circumference;
            void circle.offsetWidth;
            circle.style.transition = '';
        }
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
        sweepGauges(true);
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

// ===== Cockpit centerpiece: cycling hub readout =====
const cpHubText = document.getElementById('cpHubText');
const cpHubSub = document.getElementById('cpHubSub');
if (cpHubText && cpHubSub) {
    const readouts = [
        ['VKG', 'CORE'],
        ['15+', 'APIS SHIPPED'],
        ['FASTAPI', 'PYTHON'],
        ['NODE.JS', 'EXPRESS'],
        ['SPRING', 'BOOT'],
        ['800+', 'PROBLEMS SOLVED'],
        ['POSTGRES', 'MONGODB'],
    ];
    let readoutIndex = 0;
    function cycleHubReadout() {
        readoutIndex = (readoutIndex + 1) % readouts.length;
        cpHubText.style.opacity = 0;
        cpHubSub.style.opacity = 0;
        setTimeout(() => {
            const [main, sub] = readouts[readoutIndex];
            cpHubText.textContent = main;
            cpHubSub.textContent = sub;
            cpHubText.style.opacity = 1;
            cpHubSub.style.opacity = 1;
        }, 350);
    }
    if (!prefersReducedMotion) {
        setInterval(cycleHubReadout, 2600);
    }
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
        mod.setAttribute('aria-expanded', 'true');
    }
    function deactivate() {
        connLines.forEach(line => line.classList.remove('conn-active'));
        mod.setAttribute('aria-expanded', 'false');
    }

    mod.addEventListener('mouseenter', activate);
    mod.addEventListener('mouseleave', deactivate);
    mod.addEventListener('focusin', activate);
    mod.addEventListener('focusout', deactivate);
    // Enter/Space activate like a real button, since role="button" implies that keyboard contract
    mod.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            mod.classList.toggle('sys-module-pinned');
        }
    });
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
    // Image reveal mask: a panel slides away the first time each card scrolls into view
    specPanels.forEach(panel => {
        const visual = panel.querySelector('.spec-visual');
        if (!visual || visual.querySelector('.img-mask')) return;
        const mask = document.createElement('div');
        mask.className = 'img-mask';
        visual.appendChild(mask);
    });

    const specObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('spec-visible');
                const mask = entry.target.querySelector('.img-mask');
                if (mask) mask.classList.add('mask-open');
                const index = entry.target.querySelector('.spec-index');
                if (index) index.classList.add('num-visible');
            }
        });
    }, { threshold: 0.15 });
    specPanels.forEach(panel => specObserver.observe(panel));

    // Landing directly on a hash (e.g. returning from a project detail page via
    // "Back to the Garage") skips the scroll that normally triggers the reveal
    // observers above, leaving the target section (and everything above it)
    // stuck at opacity:0. Force those sections/panels visible immediately instead.
    if (location.hash) {
        const target = document.querySelector(location.hash);
        if (target) {
            sections.forEach(section => {
                if (section === target || (section.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING)) {
                    section.classList.add('visible');
                }
            });
            target.querySelectorAll('.spec-panel').forEach(panel => {
                panel.classList.add('spec-visible');
                const mask = panel.querySelector('.img-mask');
                if (mask) mask.classList.add('mask-open');
                const index = panel.querySelector('.spec-index');
                if (index) index.classList.add('num-visible');
            });
        }
    }

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

// ===== Easter egg: Konami code -> Track Mode =====
const KONAMI_SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiProgress = 0;
const trackModeToast = document.getElementById('trackModeToast');

function showTrackModeToast(message) {
    if (!trackModeToast) return;
    trackModeToast.textContent = message;
    trackModeToast.classList.add('show');
    clearTimeout(showTrackModeToast._t);
    showTrackModeToast._t = setTimeout(() => trackModeToast.classList.remove('show'), 3200);
}

function setTrackMode(active) {
    trackModeActive = active;
    document.body.classList.toggle('track-mode', active);
    currentRpmLabel = ''; // force label re-render on next scroll tick
    updateLapProgress();
    showTrackModeToast(active
        ? '🏁 TRACK MODE UNLOCKED — telemetry running hot'
        : 'Track Mode disengaged');
}

window.addEventListener('keydown', (e) => {
    // Ignore keystrokes while typing in an input/textarea, so this never interferes with normal usage
    const tag = document.activeElement && document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === KONAMI_SEQUENCE[konamiProgress]) {
        konamiProgress++;
        if (konamiProgress === KONAMI_SEQUENCE.length) {
            konamiProgress = 0;
            setTrackMode(!trackModeActive);
        }
    } else {
        konamiProgress = (key === KONAMI_SEQUENCE[0]) ? 1 : 0;
    }
});

// ===== Easter egg: My Dream Garage =====
const hiddenGarageTrigger = document.getElementById('hiddenGarageTrigger');
const dreamGarageOverlay = document.getElementById('dreamGarageOverlay');
const dreamGarageClose = document.getElementById('dreamGarageClose');
let lastFocusedBeforeGarage = null;

function openDreamGarage() {
    if (!dreamGarageOverlay) return;
    lastFocusedBeforeGarage = document.activeElement;
    dreamGarageOverlay.hidden = false;
    requestAnimationFrame(() => dreamGarageOverlay.classList.add('open'));
    dreamGarageClose.focus();
    document.addEventListener('keydown', handleDreamGarageKeydown);
}

function closeDreamGarage() {
    if (!dreamGarageOverlay) return;
    dreamGarageOverlay.classList.remove('open');
    document.removeEventListener('keydown', handleDreamGarageKeydown);
    setTimeout(() => { dreamGarageOverlay.hidden = true; }, 300);
    if (lastFocusedBeforeGarage) lastFocusedBeforeGarage.focus();
}

function handleDreamGarageKeydown(e) {
    if (e.key === 'Escape') {
        closeDreamGarage();
        return;
    }
    // Simple focus trap: keep Tab cycling within the modal
    if (e.key === 'Tab') {
        const focusable = dreamGarageOverlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault(); first.focus();
        }
    }
}

if (hiddenGarageTrigger) hiddenGarageTrigger.addEventListener('click', openDreamGarage);
if (dreamGarageClose) dreamGarageClose.addEventListener('click', closeDreamGarage);
if (dreamGarageOverlay) {
    dreamGarageOverlay.addEventListener('click', (e) => {
        if (e.target === dreamGarageOverlay) closeDreamGarage();
    });
}

// ===== Contact — Transmission Console =====
const CONTACT_EMAIL = 'ivansh.garg4@gmail.com';
const contactForm = document.getElementById('contactForm');
const consoleSuccess = document.getElementById('consoleSuccess');
const consoleReset = document.getElementById('consoleReset');

function setFieldError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    const field = input.closest('.console-field');
    if (message) {
        field.classList.add('field-invalid');
        errorEl.textContent = message;
        input.setAttribute('aria-invalid', 'true');
    } else {
        field.classList.remove('field-invalid');
        errorEl.textContent = '';
        input.removeAttribute('aria-invalid');
    }
}

function validateContactForm() {
    let valid = true;
    const name = document.getElementById('ccName').value.trim();
    const email = document.getElementById('ccEmail').value.trim();
    const message = document.getElementById('ccMessage').value.trim();

    if (!name) {
        setFieldError('ccName', 'ccNameError', 'Please enter your name.');
        valid = false;
    } else {
        setFieldError('ccName', 'ccNameError', '');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        setFieldError('ccEmail', 'ccEmailError', 'Please enter your email.');
        valid = false;
    } else if (!emailPattern.test(email)) {
        setFieldError('ccEmail', 'ccEmailError', 'Please enter a valid email address.');
        valid = false;
    } else {
        setFieldError('ccEmail', 'ccEmailError', '');
    }

    if (!message) {
        setFieldError('ccMessage', 'ccMessageError', 'Please enter a message.');
        valid = false;
    } else {
        setFieldError('ccMessage', 'ccMessageError', '');
    }

    return valid ? { name, email, message } : null;
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = validateContactForm();
        if (!data) {
            const firstInvalid = contactForm.querySelector('.field-invalid input, .field-invalid textarea');
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        const subject = encodeURIComponent(`Portfolio contact from ${data.name}`);
        const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

        contactForm.hidden = true;
        consoleSuccess.hidden = false;
        consoleSuccess.querySelector('.btn').focus();
    });
}

if (consoleReset) {
    consoleReset.addEventListener('click', () => {
        contactForm.reset();
        ['ccName', 'ccEmail', 'ccMessage'].forEach((id, i) => {
            const errIds = ['ccNameError', 'ccEmailError', 'ccMessageError'];
            setFieldError(id, errIds[i], '');
        });
        consoleSuccess.hidden = true;
        contactForm.hidden = false;
        document.getElementById('ccName').focus();
    });
}

// ===== Motion system: magnetic buttons =====
if (!prefersReducedMotion) {
    document.querySelectorAll('.magnetic').forEach(btn => {
        const strength = 0.35;
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const relX = e.clientX - rect.left - rect.width / 2;
            const relY = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ===== Motion system: hero parallax =====
const cockpitGrid = document.querySelector('.cockpit-grid');
const coordMarkers = document.querySelectorAll('.coord-marker');
if (!prefersReducedMotion && (cockpitGrid || coordMarkers.length)) {
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (cockpitGrid) cockpitGrid.style.transform = `translateY(${y * 0.15}px)`;
        coordMarkers.forEach(m => { m.style.transform = `translateY(${y * 0.08}px)`; });
    }, { passive: true });
}

// ===== Motion system: text-mask reveal on section titles =====
document.querySelectorAll('.section-title, .cockpit-name, .pit-headline').forEach(el => {
    if (el.querySelector('.mask-inner')) return; // already wrapped
    el.classList.add('mask-reveal');
    const inner = document.createElement('span');
    inner.className = 'mask-inner';
    inner.innerHTML = el.innerHTML;
    el.innerHTML = '';
    el.appendChild(inner);
});
const maskRevealTargets = document.querySelectorAll('.mask-reveal');
if (maskRevealTargets.length) {
    const maskObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('mask-revealed');
                maskObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });
    maskRevealTargets.forEach(el => maskObserver.observe(el));
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
