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
    'project-amber': {
      title: 'Amber — Architecture & Digital Signal Processing Pipeline',
      subtitle: 'Real-Time Acoustic Fingerprinting & Music Recognition Platform (Java 21 / Spring Boot 3 / React 19 / TypeScript 6 / PostgreSQL)',
      body: `
        <div style="line-height: 1.7; font-size: 0.95rem; color: var(--text-secondary);">
          <div style="background: var(--bg-secondary); padding: 1rem 1.25rem; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 1.25rem;">
            <p style="color: var(--text-primary); font-weight: 600; margin-bottom: 0.25rem;">
              <i class="fas fa-satellite-dish" style="color: var(--accent-emerald); margin-right: 0.5rem;"></i> Live Production Deployment &amp; Open Source
            </p>
            <p style="font-size: 0.88rem; margin: 0;">
              Amber is fully deployed across <strong>Render</strong> (Docker Web Service &amp; Static Site) and <strong>Neon Serverless PostgreSQL</strong>. 100% test coverage with 88 passing backend tests (Maven / JUnit 5) and 14 frontend tests.
            </p>
          </div>

          <h4 style="color: var(--text-primary); font-size: 1.1rem; margin: 1.25rem 0 0.5rem;">1. Digital Signal Processing (DSP) Pipeline</h4>
          <p>Instead of relying on third-party audio APIs or numeric libraries, Amber implements its entire audio analysis stack from mathematical first principles in pure Java:</p>
          <ul style="padding-left: 1.5rem; margin: 0.5rem 0;">
            <li><strong>Audio Ingestion &amp; Normalization:</strong> Raw audio is decoded via FFmpeg to 11,025 Hz 16-bit linear mono PCM, establishing a 5,512.5 Hz Nyquist frequency tailored to human musical pitch perception.</li>
            <li><strong>Spectral Framing &amp; FFT:</strong> Applies a periodic Hann window over 1024-sample frames with a 512-sample hop size (50% overlap / ~46.4 ms frames, 10.77 Hz/bin resolution). Computes power spectra using a custom in-place decimation-in-time Radix-2 Cooley–Tukey FFT.</li>
            <li><strong>Logarithmic Constellation Peaks:</strong> Partitions spectra into 10 logarithmic frequency sub-bands, extracting prominent peaks that surpass an adaptive noise floor (2.0x frame mean) and local time/frequency neighbors.</li>
            <li><strong>Combinatorial Constellation Hashing:</strong> Anchor peaks pair with forward target zone peaks (dt in [1, 63] frames) into compact 32-bit integer hashes: <code>(f1 &lt;&lt; 15) | (f2 &lt;&lt; 6) | (dt &amp; 0x3F)</code>.</li>
          </ul>

          <h4 style="color: var(--text-primary); font-size: 1.1rem; margin: 1.25rem 0 0.5rem;">2. PostgreSQL Indexing &amp; Offset Histogram Matching</h4>
          <p>Query hashes are batch-retrieved against indexed fingerprints using PostgreSQL B-tree indices. True audio matches are identified through <strong>time-coherent offset histogram clustering</strong>:</p>
          <ul style="padding-left: 1.5rem; margin: 0.5rem 0;">
            <li>Calculates the temporal shift differential: <code>&Delta;t = t_database - t_query</code>.</li>
            <li>Correct candidate tracks accumulate dense vote clusters in identical time-offset buckets (&le; 100ms tolerance), separating the authentic recording from background noise and hash collisions.</li>
          </ul>

          <h4 style="color: var(--text-primary); font-size: 1.1rem; margin: 1.25rem 0 0.5rem;">3. Real-Time AudioWorklet &amp; WebSocket Architecture</h4>
          <p>Continuous microphone recognition runs in modern browsers without thread contention:</p>
          <ul style="padding-left: 1.5rem; margin: 0.5rem 0;">
            <li><strong>AudioWorklet Downsampling:</strong> A dedicated Web Audio thread downsamples device audio (44.1 kHz / 48 kHz) to 11,025 Hz PCM without dropping UI frames.</li>
            <li><strong>Binary WebSocket Streaming:</strong> Streams raw 16-bit PCM chunks over WebSockets to a Spring WebSocket handler utilizing a 4-second circular buffer, delivering live interim recognition feedback.</li>
          </ul>

          <h4 style="color: var(--text-primary); font-size: 1.1rem; margin: 1.25rem 0 0.5rem;">4. Application Screenshots</h4>
          <div class="modal-image-grid">
            <div>
              <img src="assets/images/live_microphone_recognition.png" alt="Amber Live Microphone Recognition UI" class="modal-preview-img" loading="lazy">
              <div class="modal-img-caption">Live Microphone Recognition &amp; Oscilloscope</div>
            </div>
            <div>
              <img src="assets/images/noise_lab_benchmark.png" alt="Amber Noise Lab Benchmark Suite" class="modal-preview-img" loading="lazy">
              <div class="modal-img-caption">Noise Lab In-Memory Acoustic Benchmark Suite</div>
            </div>
            <div>
              <img src="assets/images/music_library_catalog.png" alt="Amber Reference Music Library Catalog" class="modal-preview-img" loading="lazy">
              <div class="modal-img-caption">Indexed Music Library &amp; Admin Authorization</div>
            </div>
            <div>
              <img src="assets/images/file_audio_search.png" alt="Amber File Audio Drag-and-Drop Search" class="modal-preview-img" loading="lazy">
              <div class="modal-img-caption">Audio File Search &amp; Time-Offset Alignment</div>
            </div>
          </div>

          <h4 style="color: var(--text-primary); font-size: 1.1rem; margin: 1.25rem 0 0.5rem;">5. Security &amp; Operational Controls</h4>
          <p>Engineered for safe public deployment: write endpoints (<code>POST /api/v1/songs</code>, <code>DELETE /api/v1/songs/{id}</code>) require constant-time administrative token verification (<code>AMBER_ADMIN_API_KEY</code>) with fail-closed enforcement. Computationally heavy benchmark routes enforce sliding-window rate limits (10 req/min) with bounded LRU memory protection.</p>

          <div style="margin-top: 1.75rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <a href="https://amber-frontend-w78m.onrender.com" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              <i class="fas fa-external-link-alt"></i> Open Live Demo
            </a>
            <a href="https://github.com/sars-23/Amber_Project" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
              <i class="fab fa-github"></i> View GitHub Repository
            </a>
            <button class="btn btn-secondary btn-sm" onclick="document.getElementById('modal-overlay').classList.remove('open')">
              Close
            </button>
          </div>
        </div>
      `
    },

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
