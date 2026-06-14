// Select the navbar element
const navbar = document.getElementById('navbar');

// Function to handle scroll events
function handleScroll() {/* 
   Nitesh Kumar— PERSONAL PORTFOLIO
   script.js
    */

/*  LOADER */


/* ─── CUSTOM CURSOR ───── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
  }, 60);
});

document.querySelectorAll('a, button, .skill-card, .tl-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '20px';
    cursor.style.height = '20px';
    ring.style.width    = '54px';
    ring.style.height   = '54px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '12px';
    cursor.style.height = '12px';
    ring.style.width    = '36px';
    ring.style.height   = '36px';
  });
});

/*  SCROLL PROGRESS BAR */
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = pct + '%';
});

/*  NAVBAR — scroll glass + active link */
const nav      = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const backTop  = document.getElementById('back-top');

window.addEventListener('scroll', () => {
  // Glass effect
  nav.classList.toggle('scrolled', window.scrollY > 60);

  // Back-to-top visibility
  backTop.classList.toggle('show', window.scrollY > 400);

  // Active nav link
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

/*  HAMBURGER / MOBILE MENU  */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

/*  SCROLL REVEAL  */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i % 5) * 0.1 + 's';
      entry.target.classList.add('visible');

      // Animate skill progress bars inside this element
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
      });

      // Animate counters inside this element
      entry.target.querySelectorAll('[data-target]').forEach(counter => {
        animateCounter(counter);
      });
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

/*  ANIMATED COUNTER  */
function animateCounter(el) {
  const target = +el.dataset.target;
  let count    = 0;
  const step   = Math.ceil(target / 40);

  const interval = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count + '+';
    if (count >= target) clearInterval(interval);
  }, 40);
}

/*  RIPPLE ON SEND BUTTON  */
const sendBtn = document.getElementById('send-btn');
if (sendBtn) {
  sendBtn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      width:  ${size}px;
      height: ${size}px;
      left:   ${e.clientX - rect.left - size / 2}px;
      top:    ${e.clientY - rect.top  - size / 2}px;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
}

/*  PARALLAX BLOBS ON MOUSE MOVE  */
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  document.querySelectorAll('.blob').forEach((blob, i) => {
    blob.style.transform = `translate(${x * (i + 1) * 0.4}px, ${y * (i + 1) * 0.4}px)`;
  });
});

/*  SMOOTH SCROLL FOR ANCHOR LINKS  */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/*  BACK TO TOP BUTTON  */
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
    // If scrolled down more than 50px
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        // If at the top
        navbar.classList.remove('scrolled');
    }
}

// Listen for the scroll event
window.addEventListener('scroll', handleScroll);