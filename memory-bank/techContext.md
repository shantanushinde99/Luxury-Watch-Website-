# Technical Context

## Technologies Used
- **Core:** HTML5, CSS3, TypeScript
- **Build Tool:** Vite
- **Animation Engine:** GSAP (GreenSock Animation Platform)
- **Scroll Handling:** GSAP ScrollTrigger
- **Smooth Scrolling:** Lenis (Studio Freight)
- **Text Manipulation:** SplitType (for char-by-char splitting)

## Assets & Hosting
- **Video Frames:** Hosted externally on ImageKit (`ik.imagekit.io`). Formatted as WebP for optimal compression/quality ratio. Total of 12 directories (`video 1` through `video 12`).
- **Typography:** Google Fonts (`Inter` for UI text, `Playfair Display` for elegant serif headers).

## Development Environment
- Node.js environment running via Vite dev server.
- The project was explicitly migrated *away* from React/JSX to avoid Virtual DOM overhead during high-frequency scroll events (60fps canvas updates).

## Constraints
- **Bandwidth:** Preloading 240 frames per section requires significant network activity. The `IntersectionObserver` lazy-loading logic is critical to prevent the browser from freezing on initial load.
- **Mobile Browsers:** Heavy canvas operations tied to scroll can stutter on low-end mobile devices. Future optimizations may involve reducing frame rate or resolution based on screen size.
