# System Patterns

## Architecture
The application is a single-page HTML/TS/CSS application served via Vite.

### Core Rendering Engine
Instead of an actual `<video>` tag (which struggles with precise frame scrubbing on scroll), the system uses an Image Sequence technique:
1. **Frames:** 2880 individual WebP frames hosted on ImageKit.
2. **Canvas (`#watch-canvas`):** A single fixed full-screen HTML5 Canvas.
3. **Logic (`render()`):** Calculates `drawWidth` and `drawHeight` based on `imgRatio` vs `canvasRatio` to perfectly `object-fit: cover` the frame to the window size.

### Memory & Performance Management
- **Lazy Loading:** `IntersectionObserver` watches upcoming `<section class="video-section">` elements. When one nears the viewport, it triggers `preloadVideo(vidIndex)` to fetch the next 240 frames into the `videoCache` array.
- **Scroll Syncing:** `GSAP ScrollTrigger` maps the scroll progress (0.0 to 1.0) of each section to a specific frame index (0 to 239).
- **Smooth Scrolling:** `Lenis` intercepts native scrolling to provide a buttery-smooth physics-based scroll, preventing jittery canvas updates.

## UI/UX Patterns
- **Visibility Toggling:** To prevent overlapping `position: sticky` text blocks from different sections, `ScrollTrigger` adds an `.is-active` class that controls `visibility` and `opacity`.
- **Char-by-Char Reveals:** Text is split using `SplitType`. GSAP orchestrates a 3-step animation:
  1. The outer wrapper slides up to reveal the line (clip path style).
  2. Individual characters fade in and transition from `filter: blur(8px)` to `blur(0px)`.
  3. Golden text elements receive a secondary pulsing `text-shadow` glow.
- **Glassmorphism (`.glass-card`):** Used when text must remain readable over complex/bright parts of the watch. Applies a dark semi-transparent background with heavy `backdrop-filter: blur(30px)`.
