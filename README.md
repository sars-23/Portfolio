# Saransh Singh — Software Engineering Portfolio

Official personal portfolio website for **Saransh Singh**, showcasing backend systems, compiler design, object-oriented desktop software, and computer-vision engineering projects.

Live Site: [https://sars-23.github.io/Portfolio/](https://sars-23.github.io/Portfolio/)

---

## Featured Engineering Projects

1. **[Amber — Real-Time Acoustic Fingerprinting & Music Recognition Platform](https://github.com/sars-23/Amber_Project) *(Public Repository / Live Demo)*** — Full-stack acoustic fingerprinting and music identification platform engineered from first principles in Java 21, Spring Boot 3, and React 19 / TypeScript 6 without third-party recognition APIs. Features a hand-crafted Radix-2 Cooley–Tukey FFT, Short-Time Fourier Transform (STFT) spectral framing, logarithmic peak extraction, 32-bit constellation hashing, PostgreSQL B-tree candidate retrieval, and time-coherent offset histogram matching. Includes continuous 11,025 Hz browser microphone streaming via native AudioWorklet downsamplers and WebSockets, an in-memory Noise Lab benchmark suite, and fail-closed administrative security.
   - **Live Demo:** [https://amber-frontend-w78m.onrender.com](https://amber-frontend-w78m.onrender.com)
   - **Source Code:** [https://github.com/sars-23/Amber_Project](https://github.com/sars-23/Amber_Project)
2. **Project Apricorn *(Private Repository)*** — Developer Growth Platform and coding practice engine built with Java 21, Spring Boot 3.3.5, and Docker sandbox container execution. Features the Solution Journey timeline, deterministic coding insights, and Flyway-managed PostgreSQL persistence. Complete architecture specifications and UI screenshots are documented on the live portfolio site.
3. **Arbor *(Private Repository)*** — Custom dynamically typed programming language interpreter built in Java with handwritten lexical scanner, recursive-descent parser, AST visitor pattern, first-class lexical closures, and an integrated Swing mini-IDE. Grammar rules (EBNF) and execution pipeline are documented on the live portfolio site.
4. **[Java Contact Management System](https://github.com/sars-23/Java_Contact_Management_System) *(Public Repository)*** — Desktop CRUD application built with Java Swing and LinkedHashMap indexing, providing O(1) contact lookups while preserving insertion order.
5. **[Real-Time Drowsiness Detection](https://github.com/sars-23/real-time-drowsiness-detection) *(Public Repository)*** — Experimental computer-vision prototype using Python, OpenCV, and 468 MediaPipe facial mesh landmarks to compute Eye Aspect Ratio (EAR) and Mouth Aspect Ratio (MAR) for real-time fatigue visual warnings.

---

## Design System & Features

- **Typography:** Modern pairing using `Plus Jakarta Sans` for clean, professional headings and `JetBrains Mono` for code badges and technical metrics.
- **Theme Engine:** Dynamic Dark / Light theme switcher with local storage persistence and system preference detection.
- **Interactive Modals:** Detailed architecture modal popups for all four featured projects detailing key engineering accomplishments.
- **Source Availability Badges:** Clear visual indicators denoting public open-source repositories vs. private codebases with publicly available architecture specifications.
- **Category Filtering:** Filter projects across Backend & Systems, Compiler Architecture, Desktop Software, and Computer Vision.
- **Responsive Layout:** Mobile-first, fully responsive design tested across mobile, tablet, and desktop viewports.
- **Zero-Dependency Static Architecture:** Pure semantic HTML5, Vanilla CSS3, and modern Vanilla JavaScript, optimized for fast loading and native GitHub Pages hosting.

---

## Project Structure

```text
saransh-singh-portfolio/
├── index.html            # Main semantic HTML5 document
├── styles.css            # Complete design system, theme variables, and responsive rules
├── script.js             # Theme toggle, filter buttons, project modals, and navigation
├── assets/
│   └── images/
│       ├── avatar.png           # Profile photo
│       ├── live_microphone_recognition.png # Amber live microphone UI
│       ├── noise_lab_benchmark.png         # Amber Noise Lab benchmark
│       ├── music_library_catalog.png       # Amber music catalog UI
│       ├── file_audio_search.png           # Amber audio file search
│       └── project-apricorn.png # Project Apricorn UI preview
├── .gitignore            # OS and editor ignore rules
└── README.md             # Repository documentation
```

---

## Local Development & Preview

Because this is a pure static web application, no build tools or package managers are required.

To run locally with Python:

```bash
# Navigate to the repository root
cd saransh-singh-portfolio

# Start a local HTTP server
python -m http.server 3000
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## GitHub Pages Deployment

To deploy or update GitHub Pages for this repository:

1. Navigate to **Repository Settings** on GitHub (`https://github.com/sars-23/Portfolio/settings/pages`).
2. Under **Build and deployment** > **Source**, select **Deploy from a branch**.
3. Under **Branch**, select `main` and the `/ (root)` folder, then click **Save**.
4. GitHub Pages will automatically publish the website to:
   `https://sars-23.github.io/Portfolio/`

---

## Author & Connect

**Saransh Singh**  
- GitHub: [@sars-23](https://github.com/sars-23)  
- Email: [saransh.9822@gmail.com](mailto:saransh.9822@gmail.com)  