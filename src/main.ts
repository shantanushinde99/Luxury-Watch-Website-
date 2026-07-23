import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// CONFIGURATION
// ==========================================
const config = {
  numVideos: 12,
  framesPerVideo: 240,
  padSize: 6,
  urlPrefix: 'https://ik.imagekit.io/AniketJoshi/Luxary%20Watch%20Frames/video ',
  urlSuffix: '.webp'
};

function getFrameUrl(videoIndex: number, frameIndex: number) {
  let s = frameIndex + "";
  while (s.length < config.padSize) s = "0" + s;
  return `https://ik.imagekit.io/AniketJoshi/Luxary%20Watch%20Frames/video%20${videoIndex}/frame_${s}${config.urlSuffix}`;
}

// ==========================================
// STATE & DOM
// ==========================================
const canvas = document.getElementById('watch-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const videoCache: { [key: number]: HTMLImageElement[] } = {};
const loadedStatus: { [key: number]: boolean } = {};

let currentVideo = 1;
let currentFrame = 0;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render(currentVideo, currentFrame);
}
window.addEventListener('resize', resize);
resize();

// ==========================================
// RENDER ENGINE
// ==========================================
function render(videoId: number, frameId: number) {
  currentVideo = videoId;
  currentFrame = frameId;

  if (!ctx || !videoCache[videoId] || !videoCache[videoId][frameId]) return;
  
  const img = videoCache[videoId][frameId];
  if (!img.complete || img.naturalWidth === 0) return;
  
  const canvasRatio = canvas.width / canvas.height;
  const imgRatio = img.width / img.height;
  
  let drawWidth = canvas.width;
  let drawHeight = canvas.height;
  let offsetX = 0;
  let offsetY = 0;
  
  if (canvasRatio > imgRatio) {
    drawHeight = canvas.width / imgRatio;
    offsetY = (canvas.height - drawHeight) / 2;
  } else {
    drawWidth = canvas.height * imgRatio;
    offsetX = (canvas.width - drawWidth) / 2;
  }
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}

// ==========================================
// LAZY LOAD LOGIC
// ==========================================
function preloadVideo(videoId: number, onComplete?: () => void, onProgress?: (p: number) => void) {
  if (loadedStatus[videoId]) {
    if (onComplete) onComplete();
    return;
  }
  
  console.log(`Preloading Video ${videoId}...`);
  loadedStatus[videoId] = true;
  videoCache[videoId] = [];
  
  let loadedCount = 0;
  
  for (let i = 0; i < config.framesPerVideo; i++) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = getFrameUrl(videoId, i);
    
    img.onload = () => {
      loadedCount++;
      if (onProgress) onProgress((loadedCount / config.framesPerVideo) * 100);
      
      if (i === 0 && currentVideo === videoId) {
        render(videoId, 0);
        gsap.to(canvas, { opacity: 1, duration: 1 });
      }

      if (loadedCount === config.framesPerVideo && onComplete) {
        console.log(`Video ${videoId} Loaded!`);
        onComplete();
      }
    };
    
    img.onerror = () => {
      loadedCount++;
      if (loadedCount === config.framesPerVideo && onComplete) onComplete();
    };
    
    videoCache[videoId][i] = img;
  }
}

// ==========================================
// INITIAL PRELOAD (VIDEO 1 ONLY)
// ==========================================
const preloader = document.querySelector('.preloader') as HTMLElement;
const preloaderBar = document.querySelector('.preloader-bar') as HTMLElement;

preloadVideo(1, () => {
  initAnimations();
}, (progress) => {
  preloaderBar.style.width = `${progress}%`;
});

// ==========================================
// ANIMATIONS INIT
// ==========================================
function initAnimations() {
  // Hide preloader
  gsap.to(preloader, {
    yPercent: -100,
    duration: 1.5,
    ease: "power4.inOut",
    onComplete: () => preloader.remove()
  });

  // Setup Lenis Smooth Scroll
  const lenis = new Lenis({
    lerp: 0.05,
    wheelMultiplier: 1,
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // ==========================================
  // AUTOPLAY FILM LOGIC
  // ==========================================
  const autoplayBtn = document.getElementById('autoplay-btn');
  let isAutoplaying = false;

  if (autoplayBtn) {
    const playIcon = autoplayBtn.querySelector('.play-icon');
    const btnText = autoplayBtn.querySelector('.btn-text');

    autoplayBtn.addEventListener('click', () => {
      if (isAutoplaying) {
        // Stop autoplay
        lenis.stop();
        isAutoplaying = false;
        if (playIcon) playIcon.textContent = "▶";
        if (btnText) btnText.textContent = "AUTOPLAY";
        // Restart lenis manual scrolling after a brief delay
        setTimeout(() => lenis.start(), 100);
      } else {
        // Start autoplay
        isAutoplaying = true;
        if (playIcon) playIcon.textContent = "⏸";
        if (btnText) btnText.textContent = "PAUSE";
        
        // Calculate remaining distance to scroll
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        const remainingDistance = scrollMax - currentScroll;
        
        // Dynamic duration based on how much is left (assume 80s for full page)
        const duration = (remainingDistance / scrollMax) * 80;
        
        lenis.scrollTo(scrollMax, { 
          duration: duration,
          easing: (t) => t, // Linear scroll for a film-like pace
          onComplete: () => {
            isAutoplaying = false;
            if (playIcon) playIcon.textContent = "▶";
            if (btnText) btnText.textContent = "AUTOPLAY";
          }
        });
      }
    });

    // Pause autoplay if user manually uses wheel
    window.addEventListener('wheel', () => {
      if (isAutoplaying) {
        lenis.stop();
        isAutoplaying = false;
        if (playIcon) playIcon.textContent = "▶";
        if (btnText) btnText.textContent = "AUTOPLAY";
        setTimeout(() => lenis.start(), 100);
      }
    });
  }

  // ==========================================
  // #1 — SCROLL PROGRESS INDICATOR
  // ==========================================
  const scrollProgress = document.querySelector('.scroll-progress') as HTMLElement;
  const scrollFill = document.querySelector('.scroll-progress-fill') as HTMLElement;
  const sceneNumber = document.querySelector('.scene-number') as HTMLElement;

  // Show scroll progress after preloader
  gsap.to(scrollProgress, { opacity: 1, duration: 1, delay: 2 });

  // Track scroll progress and current scene
  ScrollTrigger.create({
    trigger: "#smooth-content",
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      if (scrollFill) scrollFill.style.height = `${self.progress * 100}%`;
      // Determine current scene (1–12)
      const sceneIdx = Math.min(12, Math.max(1, Math.ceil(self.progress * 12)));
      if (sceneNumber) sceneNumber.textContent = sceneIdx.toString().padStart(2, '0');
    }
  });

  // ==========================================
  // INTRO BRAND ANIMATION
  // ==========================================
  const introContent = document.querySelector('.intro-content') as HTMLElement;
  const introSection = document.querySelector('.intro-section') as HTMLElement;

  if (introContent && introSection) {
    gsap.to(introContent, {
      opacity: 1,
      duration: 1.5,
      delay: 1.2,
      ease: "power2.out"
    });

    gsap.to(introSection, {
      opacity: 0,
      scrollTrigger: {
        trigger: introSection,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });
  }

  // ==========================================
  // MULTI-SEQUENCE SCROLL LOGIC
  // ==========================================
  const sections = document.querySelectorAll('.video-section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const vidIndex = parseInt(entry.target.getAttribute('data-video') || "1", 10);
        preloadVideo(vidIndex);
        if (vidIndex < config.numVideos) preloadVideo(vidIndex + 1);
      }
    });
  }, { rootMargin: "1000px 0px" });

  sections.forEach((section) => {
    observer.observe(section);
    const vidIndex = parseInt(section.getAttribute('data-video') || "1", 10);
    const stickyEl = section.querySelector('.sticky-content');
    
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        let frameIndex = Math.floor(self.progress * (config.framesPerVideo - 1));
        frameIndex = Math.max(0, Math.min(frameIndex, config.framesPerVideo - 1));
        render(vidIndex, frameIndex);
      }
    });

    // VISIBILITY TOGGLE
    if (stickyEl) {
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => stickyEl.classList.add('is-active'),
        onLeave: () => stickyEl.classList.remove('is-active'),
        onEnterBack: () => stickyEl.classList.add('is-active'),
        onLeaveBack: () => stickyEl.classList.remove('is-active'),
      });
    }
  });

  // ==========================================
  // #3 — FLOATING ANNOTATIONS (parallax drift)
  // ==========================================
  const annotations = document.querySelectorAll('.floating-annotation');
  annotations.forEach((ann) => {
    gsap.to(ann, {
      scrollTrigger: {
        trigger: ann.closest('.video-section'),
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play reverse play reverse",
      },
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    });

    // Subtle parallax drift on scroll
    gsap.to(ann, {
      y: -30,
      scrollTrigger: {
        trigger: ann.closest('.video-section'),
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  });

  // ==========================================
  // CHAR-BY-CHAR BLUR-TO-SHARP + GOLD GLOW
  // ==========================================
  const lineInners = document.querySelectorAll('.line-inner');
  lineInners.forEach(el => {
    new SplitType(el as HTMLElement, { types: 'chars' });
  });

  const sectionsHtml = document.querySelectorAll('.video-section');

  sectionsHtml.forEach((section, index) => {
    const isHero = index === 0;

    const tlText = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
        toggleActions: isHero ? "play none none none" : "play reverse play reverse",
      }
    });

    const lines = section.querySelectorAll('.line-inner');
    if (lines.length > 0) {
      tlText.to(lines, {
        y: "0%",
        rotateZ: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power4.out"
      });
    }

    lines.forEach((line, lineIdx) => {
      const chars = line.querySelectorAll('.char');
      if (chars.length > 0) {
        tlText.to(chars, {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          rotateZ: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: "power3.out"
        }, lineIdx === 0 ? "-=0.6" : "-=0.4");
      }

      if (line.classList.contains('gold-text')) {
        tlText.to(line, {
          textShadow: "0 0 20px rgba(201,168,76,0.6), 0 0 40px rgba(201,168,76,0.3), 0 0 80px rgba(201,168,76,0.1)",
          duration: 1.2,
          ease: "power2.inOut"
        }, "-=0.3");
      }
    });

    const fades = section.querySelectorAll('.fade-up');
    if (fades.length > 0) {
      tlText.to(fades, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.6");
    }

    const specs = section.querySelectorAll('.spec-fade');
    if (specs.length > 0) {
      tlText.to(specs, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.6");
    }
  });

  // ==========================================
  // #2 — STAT COUNTER ANIMATION
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach((stat) => {
    const target = parseInt(stat.getAttribute('data-target') || "0", 10);
    const el = stat as HTMLElement;
    
    ScrollTrigger.create({
      trigger: el.closest('.video-section'),
      start: "top 50%",
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: function() {
            el.textContent = Math.round(this.targets()[0].val).toLocaleString();
          }
        });
      },
      once: true // Only fires once
    });
  });

  // Features Section (Scene 08)
  const features = document.querySelectorAll('.feature-item');
  features.forEach((feature) => {
    gsap.to(feature, {
      scrollTrigger: {
        trigger: feature,
        start: "top 80%",
        end: "top 30%",
        scrub: true,
      },
      opacity: 1,
      y: 0,
    });
  });

  // ==========================================
  // #10 — PAGE TRANSITION WIPE
  // ==========================================
  const pageWipe = document.querySelector('.page-wipe') as HTMLElement;
  const wipeTriggers = document.querySelectorAll('.page-wipe-trigger');

  wipeTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const href = (trigger as HTMLAnchorElement).href;
      
      gsap.to(pageWipe, {
        y: 0,
        duration: 0.8,
        ease: "power4.inOut",
        onStart: () => {
          pageWipe.style.transform = "translateY(100%)";
        },
        onComplete: () => {
          window.open(href, '_blank');
          // Wipe back down after opening
          gsap.to(pageWipe, {
            y: "100%",
            duration: 0.6,
            delay: 0.3,
            ease: "power4.inOut"
          });
        }
      });
    });
  });

  // ==========================================
  // #11 — EASTER EGG (Konami Code)
  // ==========================================
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        konamiIndex = 0;
        triggerEasterEgg();
      }
    } else {
      konamiIndex = 0;
    }
  });

  function triggerEasterEgg() {
    // Create flash element
    const flash = document.createElement('div');
    flash.classList.add('easter-egg-flash');
    document.body.appendChild(flash);

    // Gold flash
    gsap.to(flash, { opacity: 0.8, duration: 0.15, ease: "power4.in" });
    gsap.to(flash, { opacity: 0, duration: 0.8, delay: 0.15, ease: "power4.out", onComplete: () => flash.remove() });

    // Spin the canvas wildly
    gsap.to(canvas, {
      rotation: 720,
      scale: 1.3,
      duration: 2,
      ease: "power4.out"
    });
    gsap.to(canvas, {
      rotation: 0,
      scale: 1,
      duration: 1.5,
      delay: 2,
      ease: "elastic.out(1, 0.4)"
    });

    // Rapid frame scrub
    let frame = 0;
    const rapidInterval = setInterval(() => {
      frame += 3;
      if (frame >= config.framesPerVideo) {
        frame = 0;
      }
      render(currentVideo, frame);
    }, 16);

    setTimeout(() => clearInterval(rapidInterval), 3000);

    console.log('🎉 EASTER EGG ACTIVATED! You found the Konami Code!');
  }

  // Magnetic Buttons
  setupMagneticElements();
}

function setupMagneticElements() {
  const magnets = document.querySelectorAll('.magnetic');
  magnets.forEach((magnet) => {
    const el = magnet as HTMLElement;
    el.addEventListener('mousemove', (e) => {
      const position = el.getBoundingClientRect();
      const x = e.clientX - position.left - position.width / 2;
      const y = e.clientY - position.top - position.height / 2;
      gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: "power3.out" });
    });
    
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    });
  });
}
