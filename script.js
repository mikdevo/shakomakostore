document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with lag (using GSAP for smoothness)
        gsap.to(cursorOutline, {
            x: posX,
            y: posY,
            duration: 0.15,
            ease: "power2.out"
        });
    });

    // Cursor hover effects
    const hoverables = document.querySelectorAll('a, button, .glass-card, input, textarea');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursorOutline, { scale: 1.5, borderColor: '#fff' });
            cursorDot.style.opacity = 0;
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursorOutline, { scale: 1, borderColor: 'rgba(42, 213, 246, 0.5)' });
            cursorDot.style.opacity = 1;
        });
    });

    // 2. Initialize Vanilla-Tilt (3D Cards)
    VanillaTilt.init(document.querySelectorAll(".glass-card"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        scale: 1.02
    });

    // 3. GSAP Animations with ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animations
    const tl = gsap.timeline();
    
    tl.from(".logo", { y: -50, opacity: 0, duration: 1, ease: "power4.out" })
      .from(".nav-link", { y: -50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" }, "-=0.5")
      .from(".hero-badge", { y: 30, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.5")
      .from(".hero-title span", { y: 100, opacity: 0, duration: 1, stagger: 0.1, ease: "power4.out" }, "-=0.6")
      .from(".hero-subtitle", { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
      .from(".hero-btns", { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8");

    // Section Headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Cards Stagger Animation
    gsap.utils.toArray('.grid-section').forEach(section => {
        gsap.from(section.querySelectorAll('.glass-card'), {
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
            },
            scrollTrigger: {
                trigger: section,
                start: "top 90%", // Trigger even earlier
            },
            y: 30, // Less movement
            opacity: 0,
            duration: 0.5,
            stagger: 0.05, // Very fast stagger
            ease: "power2.out",
            clearProps: "all" // Ensure styles are cleared after animation to prevent sticking
        });
    });

});
