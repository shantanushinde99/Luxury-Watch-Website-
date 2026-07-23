# Product Context

## Why This Project Exists
This project serves as a cutting-edge portfolio piece for Shantanu, demonstrating advanced frontend engineering, 3D digital experiences, and AI-driven website creation. It bridges the gap between static web design and cinematic video production.

## Problems Solved
- **Heavy Asset Loading:** Rendering a full 3D video sequence on the web is traditionally slow. This project solves it by extracting video frames (WebP) and rendering them sequentially onto an HTML5 Canvas, driven by scroll position.
- **Scroll Hijacking Overwhelm:** By implementing Lenis smooth scrolling and carefully staggering text animations, the user feels in control despite the heavily directed nature of the site.

## How It Should Work
- The user lands on a pure black intro with the brand name.
- Scrolling down fades in the watch and begins a 12-chapter visual journey.
- Text sections alternate left/right to keep the central 3D model unobstructed.
- An "Autoplay" button allows users to sit back and watch the site animate itself like a short film.

## User Experience Goals
- **Premium Feel:** Every interaction (magnetic buttons, custom selection colors, film grain) must feel intentional and expensive.
- **Readability:** Technical annotations and feature descriptions must remain legible regardless of the busy 3D mechanical background (solved via glassmorphism).
