/* ==========================================================================
   Saransh Singh — Personal Engineering Portfolio JavaScript
   Lightweight, performant, and zero dependency.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light)
  const themeToggle = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', nextTheme);
      localStorage.setItem('portfolio-theme', nextTheme);
    });
  }

  // 2. Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = navLinks.style.display === 'flex';
      navLinks.style.display = isOpen ? 'none' : 'flex';
      if (!isOpen) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'var(--bg-secondary)';
        navLinks.style.padding = '1.5rem';
        navLinks.style.borderBottom = '1px solid var(--border-color)';
        navLinks.style.gap = '1.25rem';
      }
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 680) {
          navLinks.style.display = 'none';
        }
      });
    });
  }

  // 3. Project Detail Modals
  const modalOverlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  const projectData = {
    'project-apricorn': {
      title: 'Project Apricorn — Architecture & Technical Specifications',
      subtitle: 'Online Code Judge & Practice Platform (Java / Spring Boot / Docker)',
      body: `
        <div style="line-height: 1.7; font-size: 0.95rem; color: var(--text-secondary);">
          <div style="background: var(--bg-secondary); padding: 1rem 1.25rem; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 1.25rem;">
            <p style="color: var(--text-primary); font-weight: 600; margin-bottom: 0.25rem;">
              <i class="fas fa-lock" style="color: var(--accent-amber); margin-right: 0.5rem;"></i> Active Development Repository (Private)
            </p>
            <p style="font-size: 0.88rem; margin: 0;">This codebase is currently in active private development. Architecture specifications, API contracts, and schema designs are detailed below. Code review access is available upon request.</p>
          </div>

          <h4 style="color: var(--text-primary); font-size: 1.1rem; margin: 1.25rem 0 0.5rem;">1. Sandboxed Execution Pipeline</h4>
          <p>Student and test submissions are processed through ephemeral Docker container runners. Each execution instance is constrained by:</p>
          <ul style="padding-left: 1.5rem; margin: 0.5rem 0;">
            <li><strong>Memory Caps:</strong> Hard limit at 256MB per process using cgroup constraints.</li>
            <li><strong>CPU Quota:</strong> 0.5 vCPU allocation to avoid CPU starvation attacks.</li>
            <li><strong>Execution Timeout:</strong> 2.0s wall-clock kill signal to intercept infinite loops.</li>
            <li><strong>Network Isolation:</strong> Fully disabled egress to prevent unauthorized external requests.</li>
          </ul>

          <h4 style="color: var(--text-primary); font-size: 1.1rem; margin: 1.25rem 0 0.5rem;">2. Backend & Data Modeling</h4>
          <p>Built with Spring Boot 3 on Java 21 LTS with PostgreSQL persistence. Features stateless JWT token authentication, Flyway migration scripts, and an asynchronous queueing abstraction to evaluate submissions without blocking HTTP handler threads.</p>

          <h4 style="color: var(--text-primary); font-size: 1.1rem; margin: 1.25rem 0 0.5rem;">3. Telemetry & User Growth</h4>
          <p>Unlike traditional binary pass/fail platforms, Apricorn logs attempt progression timelines, memory consumption trends, and common compile-time errors to help developers understand where their algorithmic mental model broke down.</p>

          <div style="margin-top: 1.75rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <a href="mailto:saransh.9822@gmail.com?subject=Code%20Review%20Access%20Request%3A%20Project%20Apricorn" class="btn btn-primary btn-sm">
              <i class="fas fa-envelope"></i> Request Code Access
            </a>
            <button class="btn btn-secondary btn-sm" onclick="document.getElementById('modal-overlay').classList.remove('open')">
              Close
            </button>
          </div>
        </div>
      `
    },
    'project-arbor': {
      title: 'Arbor — Programming Language Interpreter Design',
      subtitle: 'Custom Dynamically-Typed Tree-Walk Interpreter (Java)',
      body: `
        <div style="line-height: 1.7; font-size: 0.95rem; color: var(--text-secondary);">
          <div style="background: var(--bg-secondary); padding: 1rem 1.25rem; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 1.25rem;">
            <p style="color: var(--text-primary); font-weight: 600; margin-bottom: 0.25rem;">
              <i class="fas fa-lock" style="color: var(--accent-amber); margin-right: 0.5rem;"></i> Academic Side Project (Private)
            </p>
            <p style="font-size: 0.88rem; margin: 0;">Arbor is an educational compiler engineering project built to understand language implementation from first principles. Complete architectural stages are outlined below.</p>
          </div>

          <h4 style="color: var(--text-primary); font-size: 1.1rem; margin: 1.25rem 0 0.5rem;">1. Handwritten Lexical Scanner</h4>
          <p>Converts raw source code text into a stream of strongly typed tokens (keywords, identifiers, literals, operators). Tracks precise line and column metadata for expressive compile-time error diagnostics.</p>

          <h4 style="color: var(--text-primary); font-size: 1.1rem; margin: 1.25rem 0 0.5rem;">2. Recursive-Descent Parser & AST</h4>
          <p>Implements grammar rules to parse expressions and statements into a structured Abstract Syntax Tree (AST). Operator precedence is resolved using Pratt parsing techniques.</p>

          <h4 style="color: var(--text-primary); font-size: 1.1rem; margin: 1.25rem 0 0.5rem;">3. Tree-Walk Interpreter (Visitor Pattern)</h4>
          <p>Executes AST nodes directly via the Gang of Four Visitor pattern. Decouples AST node data structures from execution logic (e.g. arithmetic, control flow branching, loop execution).</p>

          <h4 style="color: var(--text-primary); font-size: 1.1rem; margin: 1.25rem 0 0.5rem;">4. Lexical Scoping & Closures</h4>
          <p>Maintains runtime environments in a linked ancestor chain. Functions capture their enclosing lexical environment upon definition, enabling full first-class closures and stateful callbacks.</p>

          <div style="margin-top: 1.75rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <a href="mailto:saransh.9822@gmail.com?subject=Code%20Review%20Access%20Request%3A%20Arbor%20Interpreter" class="btn btn-primary btn-sm">
              <i class="fas fa-envelope"></i> Request Code Access
            </a>
            <button class="btn btn-secondary btn-sm" onclick="document.getElementById('modal-overlay').classList.remove('open')">
              Close
            </button>
          </div>
        </div>
      `
    }
  };

  function openModal(key) {
    const data = projectData[key];
    if (!data || !modalBody || !modalOverlay) return;

    modalBody.innerHTML = `
      <h3 style="font-size: 1.4rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem;">${data.title}</h3>
      <p style="font-size: 0.9rem; color: var(--accent); margin-bottom: 1.5rem; font-weight: 600;">${data.subtitle}</p>
      ${data.body}
    `;

    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-modal-target]').forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-modal-target');
      openModal(target);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
});
