/**
 * Saransh Singh - Personal Portfolio JavaScript Engine
 * Dynamic features: Theme toggling, responsive menu, tab filtering, typing animation,
 * contact form validation, toast notifications, project & resume modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initThemeToggle();
  initMobileMenu();
  initNavbarScroll();
  initTypingEffect();
  initSkillFilter();
  initProjectFilter();
  initContactForm();
  initCopyButtons();
  initBackToTop();
  initModals();
});

/* --------------------------------------------------------------------------
   1. DARK / LIGHT THEME TOGGLE
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;
  
  // Check saved theme preference or system default
  const savedTheme = localStorage.getItem('portfolio-theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    
  setTheme(savedTheme);

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  
  const themeIcon = document.querySelector('#theme-toggle i');
  if (themeIcon) {
    if (theme === 'light') {
      themeIcon.className = 'fas fa-moon';
      themeIcon.setAttribute('aria-label', 'Switch to Dark Theme');
    } else {
      themeIcon.className = 'fas fa-sun';
      themeIcon.setAttribute('aria-label', 'Switch to Light Theme');
    }
  }
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION MENU
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isExpanded = navMenu.classList.contains('active');
    toggleBtn.setAttribute('aria-expanded', isExpanded);
    toggleBtn.innerHTML = isExpanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  // Close menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}

/* --------------------------------------------------------------------------
   3. NAVBAR SCROLL EFFECT & ACTIVE SECTION HIGHLIGHT
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Highlight current section link
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. TYPING TEXT ANIMATION
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const targetElement = document.getElementById('typing-text');
  if (!targetElement) return;

  const phrases = [
    "Building Scalable Backends â€” One Clean API at a Time",
    "GATE 2026 Qualifier (Top Percentile across 8 CS subjects)",
    "LeetCode Knight (Top 5% Global Competitive Programmer)",
    "Java 21, Spring Boot & Distributed Online Judge Developer"
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentPhrase = phrases[phraseIdx];
    
    if (isDeleting) {
      targetElement.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 35;
    } else {
      targetElement.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 70;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 2200; // Pause at full line
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typingSpeed = 400; // Pause before typing next phrase
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   5. SKILLS FILTERING
   -------------------------------------------------------------------------- */
function initSkillFilter() {
  const filterBtns = document.querySelectorAll('.skills-filter .filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. PROJECTS FILTERING
   -------------------------------------------------------------------------- */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.projects-filter .filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. CONTACT FORM VALIDATION & HANDLING
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const subject = document.getElementById('contact-subject');
    const message = document.getElementById('contact-message');

    // Reset error states
    document.querySelectorAll('.form-group').forEach(group => group.classList.remove('has-error'));

    // Validate Name
    if (!name.value.trim()) {
      showError(name, 'Please enter your name');
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
      showError(email, 'Please enter a valid email address');
      isValid = false;
    }

    // Validate Subject
    if (!subject.value.trim()) {
      showError(subject, 'Please enter a subject');
      isValid = false;
    }

    // Validate Message
    if (!message.value.trim() || message.value.trim().length < 10) {
      showError(message, 'Message must be at least 10 characters long');
      isValid = false;
    }

    if (isValid) {
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      // Simulate network request
      setTimeout(() => {
        showToast('Message sent successfully! Saransh will reply shortly.', 'success');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1200);
    }
  });
}

function showError(inputElement, message) {
  const parentGroup = inputElement.closest('.form-group');
  if (parentGroup) {
    parentGroup.classList.add('has-error');
    const errorSpan = parentGroup.querySelector('.form-error');
    if (errorSpan) errorSpan.textContent = message;
  }
}

/* --------------------------------------------------------------------------
   8. COPY TO CLIPBOARD BUTTONS
   -------------------------------------------------------------------------- */
function initCopyButtons() {
  const copyElements = document.querySelectorAll('[data-copy]');

  copyElements.forEach(el => {
    el.addEventListener('click', () => {
      const textToCopy = el.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard!`, 'info');
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  });
}

/* --------------------------------------------------------------------------
   9. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const topBtn = document.getElementById('back-to-top');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   10. MODAL POPUPS FOR PROJECT & RESUME
   -------------------------------------------------------------------------- */

const projectDetailsData = {
  'apricorn': {
    title: 'Project Apricorn â€” Where Ideas Compile',
    subtitle: 'Java 21, Spring Boot, PostgreSQL, Docker, Spring Security, Flyway, Testcontainers',
    date: 'June 2026',
    description: 'Project Apricorn is an enterprise-grade, Docker-isolated online code execution judge platform built with high performance and microservice security in mind.',
    features: [
      'Built a Docker-isolated online judge with asynchronous execution, resource limits, and automated verdict generation for submitted Java solutions.',
      'Designed a metadata-driven function-based judging engine that generates execution harnesses, processes structured test cases, and performs typed return-value validation.',
      'Developed Solution Journey, Coding Insights, and Growth Analytics for attempt tracking, failure-pattern analysis, performance improvement, and personalized recommendations.',
      'Implemented JWT-based authentication, Flyway-managed PostgreSQL persistence, Testcontainers integration testing, and 110+ automated tests across service, MVC, security, and judge layers.'
    ],
    github: 'https://github.com/sars-23/Project-Apricorn_1'
  },
  'arbor': {
    title: 'Arbor â€” Custom Interpreted Programming Language',
    subtitle: 'Java, Maven, JUnit 5, Compiler Design & AST Analysis',
    date: 'March 2026',
    description: 'Arbor is a full-featured programming language interpreter written in Java, featuring a custom lexer, recursive descent parser, AST tree walker, and scope environment manager.',
    features: [
      'Engineered a fully functional interpreted language in Java featuring a hand-written Lexer, Recursive Descent Parser, and AST-based Tree-Walk Interpreter supporting variables, functions, closures, and control flow.',
      'Implemented lexical scoping via a nested Environment class, Visitor pattern across 7+ AST node types, and structured error handling (Lexical, Parse, Runtime) with line-level diagnostics.',
      'Delivered a CLI (arbor run) and interactive REPL with 80%+ unit test coverage using JUnit 5 across Lexer, Parser, Interpreter, and scope resolution modules.'
    ],
    github: 'https://github.com/sars-23/Arbor_0.5'
  },
  'swing-crud': {
    title: 'Java Contact Management System',
    subtitle: 'Java SE, Swing GUI, HashMap Data Structure, OOP, Git',
    date: 'Sept 2025',
    description: 'High-speed desktop CRUD application optimizing contact lookups to O(1) time complexity with an event-driven Swing interface.',
    features: [
      'Built a desktop CRUD application handling 500+ contact records with an event-driven Java Swing GUI, reducing interaction steps by 40% compared to CLI-based alternatives.',
      'Leveraged HashMap data structures for O(1) average-time retrieval across all 4 CRUD operations â€” up to 10x faster than linear search alternatives on large datasets.',
      'Designed 6+ modular OOP classes with <50ms UI refresh via DefaultTableModel and input validation covering 10+ edge cases, ensuring robustness and maintainability.'
    ],
    github: 'https://github.com/sars-23/Java_Contact_Management_System'
  },
    'drowsiness': {
      title: 'Real-Time Drowsiness Detection',
      subtitle: 'Python 3.11, OpenCV, MediaPipe Face Mesh, Computer Vision',
      date: 'June 2025',
      description: 'Experimental real-time computer-vision prototype using webcam video and 468 MediaPipe facial mesh landmarks to compute Eye Aspect Ratio (EAR) and Mouth Aspect Ratio (MAR).',
      features: [
        'Calculates Eye Aspect Ratio (EAR) from six facial landmarks around each eye and computes Mouth Aspect Ratio (MAR) from six mouth landmarks.',
        'Renders on-screen visual warning messages (DROWSY! and YAWNING!) when values cross configured sensitivity thresholds.',
        'Modular architecture separating geometric calculation logic (geometry.py) from camera capture and GUI display loops.',
        'Configurable runtime CLI options for camera index, EAR threshold, and MAR threshold with unit test verification.'
      ],
      github: 'https://github.com/sars-23/real-time-drowsiness-detection'
    }
};

function initModals() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body');

  if (!modalOverlay || !modalBody) return;

  // Open modal buttons
  document.querySelectorAll('[data-modal-target]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-modal-target');

      if (target === 'resume') {
        renderResumeModal(modalBody);
      } else if (projectDetailsData[target]) {
        renderProjectModal(modalBody, projectDetailsData[target]);
      }

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal event
  modalCloseBtn?.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function renderProjectModal(container, data) {
  const actionButton = data.isPrivate
    ? `<div style="display: flex; align-items: center; gap: 0.75rem; background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); padding: 0.85rem 1.25rem; border-radius: var(--radius-sm); color: #fbbf24; font-size: 0.9rem;">
        <i class="fas fa-lock" style="font-size: 1.1rem;"></i>
        <span><strong>Private Repository:</strong> Source code is currently hosted in a private repository. Architecture, data models, and specifications are documented above.</span>
      </div>`
    : `<a href="${data.github}" target="_blank" class="btn btn-primary" style="text-decoration:none;">
        <i class="fab fa-github"></i> View Public GitHub Repository
      </a>`;

  container.innerHTML = `
    <h3 style="font-size: 1.8rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem;">${data.title}</h3>
    <p style="color: var(--accent-primary); font-weight: 600; font-size: 0.95rem; margin-bottom: 1rem;">${data.subtitle} (${data.date})</p>
    <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">${data.description}</p>
    <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">Key Architecture & Technical Accomplishments:</h4>
    <ul style="padding-left: 1.25rem; list-style: disc; color: var(--text-secondary); line-height: 1.7; margin-bottom: 2rem;">
      ${data.features.map(f => `<li style="margin-bottom: 0.6rem;">${f}</li>`).join('')}
    </ul>
    <div style="display: flex; gap: 1rem;">
      ${actionButton}
    </div>
  `;
}

function renderResumeModal(container) {
  container.innerHTML = `
    <h3 style="font-size: 1.8rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem;">Saransh Singh â€” Resume Summary</h3>
    <p style="color: var(--accent-primary); font-weight: 600; margin-bottom: 1.5rem;">Building Scalable Backends â€” One Clean API at a Time | GATE 2026 Qualifier</p>
    <div style="background: var(--bg-tertiary); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; color: var(--text-secondary); line-height: 1.7;">
      <p><strong>Education:</strong> B.Tech Computer Science & Engineering (CGPA 8.21/10), JECRC University Jaipur (2023 - 2027)</p>
      <p style="margin-top:0.5rem;"><strong>Top Skills:</strong> Java (Core/Advanced), Spring Boot, PostgreSQL, Docker, Compiler Design, GCP, Microservices, REST APIs</p>
      <p style="margin-top:0.5rem;"><strong>Key Honors:</strong> LeetCode Knight (Top 5%), GATE 2026 Qualifier across 8 CS subjects, Google Cloud Engineering Certified</p>
    </div>
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <button onclick="window.print()" class="btn btn-primary">
        <i class="fas fa-print"></i> Print / Save PDF
      </button>
      <a href="mailto:saransh.9822@gmail.com?subject=Portfolio%20Inquiry%20-%20Saransh%20Singh" class="btn btn-secondary">
        <i class="fas fa-envelope"></i> Hire / Contact Saransh
      </a>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   11. TOAST NOTIFICATION UTILITY
   -------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const iconMap = {
    info: 'fa-info-circle',
    success: 'fa-check-circle',
    warning: 'fa-exclamation-triangle'
  };

  toast.innerHTML = `<i class="fas ${iconMap[type] || 'fa-info-circle'}"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
