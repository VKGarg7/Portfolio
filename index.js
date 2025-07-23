// Typing Animation
const text = ["Full Stack Developer", "MERN Stack Engineer", "Creative Coder"];
let index = 0, charIndex = 0, currentText = "";
function type() {
    if (charIndex < text[index].length) {
        currentText += text[index].charAt(charIndex++);
        document.querySelector('.typing').innerHTML = currentText;
        setTimeout(type, 100);
    } else { setTimeout(erase, 1500); }
}
function erase() {
    if (charIndex > 0) {
        currentText = text[index].substring(0, --charIndex);
        document.querySelector('.typing').innerHTML = currentText;
        setTimeout(erase, 50);
    } else {
        index = (index + 1) % text.length;
        setTimeout(type, 500);
    }
}
document.addEventListener("DOMContentLoaded", type);

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
function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#00fff7';
    particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if(p.x<0 || p.x>canvas.width) p.dx*=-1;
        if(p.y<0 || p.y>canvas.height) p.dy*=-1;
    });
    requestAnimationFrame(animate);
}
animate();
window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
});