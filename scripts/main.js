import { createPreloader, hidePreloaderOnLoad } from './modules/preloader.js';
import { initAOS } from './modules/aos-config.js';
import { initTextAnimations } from './modules/animation.js';
import { initBackground } from './modules/background.js';
import { initCursorEffect } from './modules/cursor-effect.js';
import { initGlassEffect } from './modules/glass.js';
import { initHamburgerMenu } from './modules/hamburger.js';
import { initProjectCards } from './modules/project-cards.js';
import { initImageReveal } from './modules/reveal.js';
import { initScrollProgress } from './modules/scroll-progress.js';
import { initSkills } from './modules/skills.js';
import { initTiltEffect } from './modules/tilt.js';
import { initTypography } from './modules/typography.js';

// Preloader runs first to be visible during page load
createPreloader();
hidePreloaderOnLoad();

// Initialize all other modules after the page's HTML is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAOS();
    initTextAnimations();
    initBackground();
//    initCursorEffect();
    initGlassEffect();
    initHamburgerMenu();
    initProjectCards();
    initImageReveal();
    initScrollProgress();
    initSkills();
    initTiltEffect();
    initTypography();
});