<div align="center">
  <h1>🕰️ Built By Shantanu: The Anatomy of Precision 🚀</h1>
  <p><i>A High-Performance, Cinematic 3D Digital Product Film</i></p>

  <img src="./images/Video 1_gwr_video_mvp.gif" width="800" alt="Luxury Watch Animation Showcase" style="border-radius: 12px; box-shadow: 0 10px 30px rgba(201, 168, 76, 0.2);" />

  <br><br>

  <div style="display: flex; justify-content: space-between; text-align: center; margin-top: 20px;">
    <div style="width: 32%;">
      <img src="./images/frame_000126.webp" alt="Watch Mechanism" style="border-radius: 8px; width: 100%;" />
      <p><b>Microscopic Precision</b><br><small>Detailed internal mechanics</small></p>
    </div>
    <div style="width: 32%;">
      <img src="./images/frame_000237.webp" alt="Watch Exploded View" style="border-radius: 8px; width: 100%;" />
      <p><b>Exploded View</b><br><small>3D component separation</small></p>
    </div>
    <div style="width: 32%;">
      <img src="./images/frame_000199.webp" alt="Watch Sapphire Lift" style="border-radius: 8px; width: 100%;" />
      <p><b>Sapphire Lift</b><br><small>Optically pure layers</small></p>
    </div>
  </div>

  <br>

  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/)
  [![Lenis](https://img.shields.io/badge/Lenis_Scroll-000000?style=for-the-badge)](https://lenis.studiofreight.com/)

</div>

---

## ✨ Overview

This project is a cutting-edge portfolio piece demonstrating advanced frontend engineering and interactive 3D digital experiences. Bridging the gap between static web design and cinematic video production, it showcases the intricate anatomy, disassembly, and precision engineering of a luxury timepiece.

The experience is built as a continuous, scroll-hijacked visual journey utilizing **2,880 individual frames** (12 video sequences) meticulously rendered on an HTML5 Canvas at 60fps.

## 💎 Features & "Exaggerated Minimalism"

- 🎬 **Multi-Sequence Render Engine:** Lazy-loads 12 sequential video folders (WebP frames) via `IntersectionObserver` to keep bandwidth low and performance high.
- 📜 **Cinematic Smooth Scroll:** Powered by Lenis, ensuring physics-based, buttery smooth scrolling that drives the Canvas animation.
- ⚡ **Char-by-Char Animations:** Text is split using `SplitType`, revealing itself with dynamic `blur` effects and golden pulsing glows orchestrated by GSAP.
- 🪟 **Glassmorphism:** Dark, frosted-glass feature cards ensure complex mechanical backgrounds never compromise text legibility.
- ⏱️ **Animated Stat Counters:** Real-time numerical counters ticking up on scroll ("327 Components", "72h Power Reserve").
- 📐 **Floating Annotations:** Blueprint-style technical labels with parallax drift.
- 📼 **Film Grain Overlay:** A subtle, animated SVG noise overlay adds a premium cinematic texture to every frame.
- ▶️ **Autoplay Mode:** A one-click automated scrolling experience that plays the entire sequence like a 1-minute digital film.
- 🎮 **Konami Code Easter Egg:** Enter `↑↑↓↓←→←→BA` for a surprise.

## ⚙️ Why Vanilla TS over React?

Initially conceived as a React application, the architecture was explicitly pivoted to **Vanilla TypeScript and Vite**. 

**The Problem:** Syncing `canvas.drawImage()` to high-frequency scroll events (via GSAP ScrollTrigger) while simultaneously tracking scroll state in React's Virtual DOM caused microscopic layout thrashing and dropped frames.
**The Solution:** Operating directly on the DOM and Canvas API allowed us to hit a flawless 60fps render cycle, providing the "Apple-tier" smoothness required for a true luxury experience.

## 🚀 Quick Start

1. **Clone & Install**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📬 Contact & Portfolio

**Built By Shantanu**
- **Email:** [shantanushinde233@gmail.com](mailto:shantanushinde233@gmail.com)
- **Phone:** +91 9284769827
- **Portfolio:** [shantanu-portfolio-site.vercel.app](https://shantanu-portfolio-site.vercel.app/)
- **LinkedIn:** [Shantanu Shinde](https://www.linkedin.com/in/shantanu-shinde-a11b63170/)

---
<div align="center">
  <p><i>Precision. Crafted in Code.</i></p>
</div>
