# Progress Tracking

## What Works
- ✅ High-performance Canvas rendering engine.
- ✅ ImageKit URL construction and preloading logic.
- ✅ Lenis smooth scrolling integration.
- ✅ GSAP ScrollTrigger mapping (Scroll position → Canvas Frame).
- ✅ Dynamic lazy-loading of 12 distinct video sequences.
- ✅ "Exaggerated Minimalism" styling and rich gold color palette.
- ✅ Advanced typography animations (SplitType char blurs + glow).
- ✅ Left/Right alternating text layout to prevent obstructing the watch.
- ✅ Visibility toggling for sticky text to prevent overlapping.
- ✅ Magnetic CTA buttons.
- ✅ Automated "Autoplay" feature (80s cinematic scroll).
- ✅ Floating technical annotations with parallax drift.
- ✅ Stat counters that animate numerically on scroll.
- ✅ Glassmorphism cards for ensuring readability over busy frames.
- ✅ Konami Code easter egg implementation.

## What's Left to Build
- 🔲 Mobile specific optimizations (e.g., resizing fonts, adjusting padding, potentially down-scaling images or frame counts to save bandwidth on mobile).
- 🔲 Final production build (`npm run build`) and deployment to a static host (Vercel/Netlify).

## Known Issues
- Currently, no major bugs are tracked. The user recently requested adjustments to the CTA/contact layout in the final section, which was resolved by centering the elements and adjusting the flex layout.

## Evolution of Project Decisions
1. **React to Vanilla TS:** Started as a React app, but the virtual DOM update cycle proved too heavy when syncing a Canvas draw call to high-frequency scroll events. Migrated to Vanilla TS for raw performance.
2. **Fake Black Box to Transparent Intro:** Initially used a fake black `<div>` for the intro to hide the loading canvas. Replaced this with a transparent intro sequence that overlays perfectly onto `frame_000000.webp` (which is naturally black), creating a much smoother transition.
3. **Contrast Adjustments:** Evolved from using `mix-blend-mode: difference` for all text to selectively using dark Glassmorphism (`backdrop-filter`) for feature cards, as the raw blend mode failed to provide legibility when the watch frame behind it contained chaotic, bright gears.
