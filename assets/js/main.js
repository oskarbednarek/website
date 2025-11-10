import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

// =============================================================================
// APP STATE & CONFIG
// =============================================================================
const state = {
    mouse: { x: 0, y: 0 },
    scroll: { current: 0, target: 0 },
    sizes: { width: window.innerWidth, height: window.innerHeight }
};

const config = {
    isMobile: window.innerWidth < 768,
    debrisCount: window.innerWidth < 768 ? 10 : 25,
    particleCount: 1500
};

// =============================================================================
// INITIALIZATION SEQUENCER
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initThreeJS();
    initCursor();
    initScrollAnimations();
});

// =============================================================================
// SMOOTH SCROLL (LENIS)
// =============================================================================
let lenis;
function initSmoothScroll() {
    lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease out
        orientation: 'vertical',
        smoothWheel: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
}

// =============================================================================
// THREE.JS SCENE
// =============================================================================
function initThreeJS() {
    const canvas = document.querySelector('#webgl');
    const loadingManager = new THREE.LoadingManager();
    let scene, camera, renderer, textMesh, debrisGroup, particlesMesh;

    // --- LOADERS & PROGRESS ---
    const progressEl = document.getElementById('progress');
    const loaderEl = document.getElementById('loader');

    loadingManager.onProgress = (url, loaded, total) => {
        const percent = Math.round((loaded / total) * 100);
        progressEl.textContent = `${percent}%`;
    };

    loadingManager.onLoad = () => {
        revealSite();
    };

    function revealSite() {
        gsap.to(loaderEl, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => { loaderEl.style.visibility = 'hidden'; }
        });

        // Staggered entrance animations
        const tl = gsap.timeline({ delay: 0.5 });
        tl.to('.js-nav', { opacity: 1, duration: 1, ease: 'power2.out' }, 0)
            .to('.js-hero-text', { opacity: 1, transform: 'translateY(0)', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1, ease: 'power4.out' }, 0.3)
            .fromTo(textMesh.scale, { x: 0.8, y: 0.8, z: 0.8 }, { x: 1, y: 1, z: 1, duration: 2, ease: 'elastic.out(1, 0.5)' }, 0.5)
            .to('.js-scroll-indicator', { opacity: 1, duration: 1 }, 1.5);
    }

    // --- SCENE SETUP ---
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog('#050505', 20, 100);

    camera = new THREE.PerspectiveCamera(35, state.sizes.width / state.sizes.height, 0.1, 500);
    camera.position.z = config.isMobile ? 50 : 35;
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(state.sizes.width, state.sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, config.isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // --- ENVIRONMENT & MATERIALS ---
    const rgbeLoader = new RGBELoader(loadingManager);
    rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/st_fagans_interior_1k.hdr', (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff, metalness: 0.1, roughness: 0.05, transmission: 1, ior: 1.5,
        thickness: 2, specularIntensity: 1, envMapIntensity: 2.5, clearcoat: 1
    });

    // --- OBJECTS ---
    // 1. Floating Debris
    debrisGroup = new THREE.Group();
    const debrisGeometry = new THREE.IcosahedronGeometry(1, 0);
    for (let i = 0; i < config.debrisCount; i++) {
        const mesh = new THREE.Mesh(debrisGeometry, glassMaterial);
        randomizeDebris(mesh);
        debrisGroup.add(mesh);
    }
    scene.add(debrisGroup);

    function randomizeDebris(mesh) {
        mesh.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50 - 20);
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        const scale = Math.random() * 1.2 + 0.5;
        mesh.scale.set(scale, scale, scale);
        mesh.userData = { rotateSpeed: (Math.random() - 0.5) * 0.01, floatSpeed: Math.random() * 0.02 + 0.005, initialY: mesh.position.y };
    }

    // 2. Main 3D Text
    const fontLoader = new FontLoader(loadingManager);
    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', (font) => {
        const textGeometry = new TextGeometry('OSKAR\nBEDNAREK', {
            font: font, size: 3.5, height: 0.8, curveSegments: 12, // Reduced segments for performance
            bevelEnabled: true, bevelThickness: 0.15, bevelSize: 0.08, bevelOffset: 0, bevelSegments: 5
        });
        textGeometry.center();
        textMesh = new THREE.Mesh(textGeometry, glassMaterial);
        textMesh.scale.set(0, 0, 0); // Start hidden for entrance animation
        scene.add(textMesh);
    });

    // 3. Ambient Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(config.particleCount * 3);
    for (let i = 0; i < config.particleCount * 3; i++) posArray[i] = (Math.random() - 0.5) * 150;
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesMesh = new THREE.Points(particlesGeometry, new THREE.PointsMaterial({
        size: 0.05, color: 0x66aaff, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false
    }));
    scene.add(particlesMesh);

    // --- EVENTS & ANIMATION LOOP ---
    window.addEventListener('mousemove', (e) => {
        state.mouse.x = (e.clientX / state.sizes.width) * 2 - 1;
        state.mouse.y = -(e.clientY / state.sizes.height) * 2 + 1;
    });

    window.addEventListener('resize', () => {
        state.sizes.width = window.innerWidth;
        state.sizes.height = window.innerHeight;
        config.isMobile = state.sizes.width < 768;

        camera.aspect = state.sizes.width / state.sizes.height;
        camera.updateProjectionMatrix();
        camera.position.z = config.isMobile ? 50 : 35;

        renderer.setSize(state.sizes.width, state.sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, config.isMobile ? 1.5 : 2));
    });

    const clock = new THREE.Clock();
    function tick() {
        const elapsedTime = clock.getElapsedTime();
        const currentScroll = lenis ? lenis.animatedScroll : window.scrollY;

        if (textMesh) {
            // Parallax & subtle constant motion
            textMesh.rotation.x = THREE.MathUtils.lerp(textMesh.rotation.x, state.mouse.y * 0.1 + Math.sin(elapsedTime * 0.5) * 0.02, 0.05);
            textMesh.rotation.y = THREE.MathUtils.lerp(textMesh.rotation.y, state.mouse.x * 0.15, 0.05);
            // Scroll Away effect
            textMesh.position.y = -currentScroll * 0.025;
            textMesh.position.z = -currentScroll * 0.01;
        }

        if (debrisGroup) {
            debrisGroup.position.y = currentScroll * 0.015;
            debrisGroup.children.forEach(child => {
                child.rotation.x += child.userData.rotateSpeed;
                child.rotation.y += child.userData.rotateSpeed;
                child.position.y = child.userData.initialY + Math.sin(elapsedTime + child.position.x) * (child.userData.floatSpeed * 10);
            });
        }

        if (particlesMesh) {
            particlesMesh.rotation.y = elapsedTime * 0.02;
            particlesMesh.position.y = -currentScroll * 0.05;
        }

        renderer.render(scene, camera);
        window.requestAnimationFrame(tick);
    }
    tick();
}

// =============================================================================
// CUSTOM CURSOR & MAGNETIC EFFECTS
// =============================================================================
function initCursor() {
    const cursor = document.querySelector('#cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    let cx = 0, cy = 0;

    // Smooth follow
    gsap.ticker.add(() => {
        cx += (state.mouse.x * state.sizes.width * 0.5 + state.sizes.width * 0.5 - cx) * 0.15;
        cy += (-state.mouse.y * state.sizes.height * 0.5 + state.sizes.height * 0.5 - cy) * 0.15;
        gsap.set(cursor, { x: cx, y: cy });
    });

    // Magnetic elements
    document.querySelectorAll('.magnetic').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const strength = el.getAttribute('data-strength') || 20;
            gsap.to(el, {
                x: ((e.clientX - rect.left) / rect.width - 0.5) * strength,
                y: ((e.clientY - rect.top) / rect.height - 0.5) * strength,
                duration: 0.3, ease: 'power2.out'
            });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        });
    });

    // Hover states
    document.querySelectorAll('.hover-trigger, a, button').forEach(t => {
        t.addEventListener('mouseenter', () => gsap.to(cursorDot, { scale: 3, duration: 0.3 }));
        t.addEventListener('mouseleave', () => gsap.to(cursorDot, { scale: 1, duration: 0.3 }));
    });
}

// =============================================================================
// SCROLL ANIMATIONS (GSAP)
// =============================================================================
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Text Reveals
    document.querySelectorAll('.reveal-trigger').forEach(text => {
        // Wrap in a hidden container for the reveal effect
        let wrapper = document.createElement('div');
        wrapper.style.overflow = 'hidden';
        text.parentNode.insertBefore(wrapper, text);
        wrapper.appendChild(text);

        gsap.fromTo(text, { y: '110%', rotate: 2, opacity: 0 }, {
            y: '0%', rotate: 0, opacity: 1,
            duration: 1.2, ease: 'power4.out',
            scrollTrigger: {
                trigger: wrapper,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Image Parallax
    document.querySelectorAll('.bg-parallax').forEach(img => {
        gsap.to(img, {
            backgroundPosition: `50% ${window.innerHeight / 2}px`,
            ease: "none",
            scrollTrigger: {
                trigger: img,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
}

// Fetch and render projects dynamically
fetch('assets/js/projects.json') // Adjust the path as needed
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(projects => {
        console.log('Projects loaded:', projects);
        const workSection = document.querySelector('#work .flex.flex-col');
        if (!workSection) {
            console.error('Work section container not found!');
            return;
        }

        projects.forEach(project => {
            const projectHTML = `
        <article class="project-item group relative md:flex items-center justify-between gap-10">
          <div class="md:w-2/5 mb-10 md:mb-0 z-10 pointer-events-none mix-blend-difference">
            <h3 class="text-6xl md:text-8xl font-black tracking-tighter leading-none magnetic" data-strength="30">${project.title}</h3>
            <ul class="flex gap-4 mt-6 text-sm uppercase tracking-widest text-neutral-400" aria-label="Technologies used">
              ${project.technologies.map(tech => `<li>${tech}</li>`).join('<li>•</li>')}
            </ul>
            <p class="mt-6 text-neutral-400 text-lg max-w-md">${project.description}</p>
          </div>
          <div class="md:w-3/5 aspect-video bg-neutral-900 overflow-hidden rounded-lg relative hover-trigger">
            <div role="img" aria-label="${project.alt}" class="w-full h-full bg-[url('${project.image}')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 bg-parallax"></div>
          </div>
        </article>
      `;
            workSection.innerHTML += projectHTML;
        });
    })
    .catch(error => console.error('Error loading projects:', error));