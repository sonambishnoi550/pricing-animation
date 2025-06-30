"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const PARTICLES = [
    "/assets/images/webp/img-1.webp",
    "/assets/images/webp/img-2.webp",
    "/assets/images/webp/img-3.webp",
    "/assets/images/webp/img-4.webp",
    "/assets/images/webp/img-5.webp",
    "/assets/images/webp/img-6.webp",
    "/assets/images/webp/img-7.webp",
    "/assets/images/webp/img-8.webp"
];

const Pricing = () => {
    const containerRef = useRef(null);
    const helloRefs = useRef([]);
    const sonamRef = useRef(null);
    const isDragging = useRef(false);
    const trail = useRef([]);
    const flowerRef = useRef(null);
    const lineRef = useRef(null);

    const random = gsap.utils.random;

    const createParticle = (x, y) => {
        const el = document.createElement("span");
        Object.assign(el.style, {
            position: "fixed",
            left: `${x}px`,
            top: `${y}px`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 9999,
        });

        const img = document.createElement("img");
        img.src = PARTICLES[Math.floor(Math.random() * PARTICLES.length)];
        img.style.width = `${random(40, 60)}px`;
        img.style.height = `${random(40, 60)}px`;
        el.appendChild(img);

        document.body.appendChild(el);
        gsap.to(el, {
            x: random(-window.innerWidth / 2, window.innerWidth / 2),
            y: random(-window.innerHeight / 2, window.innerHeight / 2),
            scale: random(0.8, 1.6),
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
            onComplete: () => el.remove()
        });
    };

    const handleStart = (e) => {
        isDragging.current = true;
        const x = e.clientX || e.touches?.[0]?.clientX;
        const y = e.clientY || e.touches?.[0]?.clientY;
        trail.current = [{ x, y }];

        const flower = document.createElement("span");
        flower.className = "fixed pointer-events-none";
        Object.assign(flower.style, {
            fontSize: "170px",
            left: `${x}px`,
            top: `${y}px`,
            transform: "translate(-50%, -50%)",
            zIndex: 9999
        });

        const img = document.createElement("img");
        img.src = PARTICLES[Math.floor(Math.random() * PARTICLES.length)];
        img.style.width = "100px";
        img.style.height = "100px";
        flower.appendChild(img);

        document.body.appendChild(flower);
        flowerRef.current = flower;

        const svgLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        svgLine.setAttribute("stroke", "pink");
        svgLine.setAttribute("stroke-width", "3");
        svgLine.setAttribute("stroke-dasharray", "8");
        svgLine.setAttribute("x1", x);
        svgLine.setAttribute("y1", y);
        svgLine.setAttribute("x2", x);
        svgLine.setAttribute("y2", y);

        let svg = document.getElementById("drag-svg");
        if (!svg) {
            svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("id", "drag-svg");
            svg.style.cssText = "pointer-events:none;position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9998;";
            document.body.appendChild(svg);
        }
        svg.appendChild(svgLine);
        lineRef.current = svgLine;
    };

    const handleMove = (e) => {
        if (!isDragging.current) return;
        const x = e.clientX || e.touches?.[0]?.clientX;
        const y = e.clientY || e.touches?.[0]?.clientY;
        trail.current.push({ x, y });
        lineRef.current?.setAttribute("x2", x);
        lineRef.current?.setAttribute("y2", y);
    };

    const handleEnd = () => {
        if (!isDragging.current) return;
        isDragging.current = false;
        const { x, y } = trail.current[0] || {};
        if (flowerRef.current) {
            gsap.to(flowerRef.current, {
                scale: 1.6,
                opacity: 0,
                duration: 0.4,
                ease: "back.in(1.7)",
                onComplete: () => {
                    flowerRef.current?.remove();
                    flowerRef.current = null;
                    if (x && y) for (let i = 0; i < 160; i++) createParticle(x + random(-10, 10), y + random(-10, 10));
                }
            });
        }
        lineRef.current?.remove();
        lineRef.current = null;
        trail.current = [];
    };

    useEffect(() => {
        const container = containerRef.current;
        let hasBurst = false;

        gsap.timeline()
            .to(helloRefs.current, {
                y: 0,
                opacity: 1,
                ease: "bounce.out",
                stagger: 0.2,
                duration: 1
            })
            .to(helloRefs.current, {
                y: () => random(500, 800),
                rotation: () => random(-15, 15),
                opacity: 0,
                duration: 1.5,
                ease: "power2.inOut",
                stagger: 0.2,
                onUpdate: () => {
                    if (!hasBurst) {
                        hasBurst = true;
                        const centerX = window.innerWidth / 2;
                        const centerY = window.innerHeight / 2;
                        for (let i = 0; i < 40; i++) createParticle(centerX + random(-50, 50), centerY + random(-50, 50));
                    }
                }
            }, "+=0.5")
            .fromTo(sonamRef.current, { y: -400, opacity: 0, scale: 0.5 }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1
            });

        const events = [
            ["mousedown", handleStart], ["mousemove", handleMove], ["mouseup", handleEnd],
            ["mouseleave", handleEnd], ["touchstart", handleStart], ["touchmove", handleMove], ["touchend", handleEnd],
        ];
        events.forEach(([evt, fn]) => container.addEventListener(evt, fn));
        return () => events.forEach(([evt, fn]) => container.removeEventListener(evt, fn));
    }, []);

    return (
        <div ref={containerRef} className="bg-black min-h-screen flex justify-center items-center overflow-hidden select-none px-4">
            <div className="relative h-full w-fit">
                <div className="text-center flex space-x-4 text-sky-300 lg:text-[300px] md:text-[150px] text-7xl font-bold">
                    {["S", "o", "n", "a", "m"].map((char, i) => (
                        <span key={i} ref={(el) => (helloRefs.current[i] = el)}>{char}</span>
                    ))}
                </div>
                <div ref={sonamRef} className="absolute inset-0 flex justify-center items-center text-center text-sky-300 md:text-[80px] text-6xl font-bold opacity-0">
                    Frontend Developer
                </div>
            </div>
        </div>
    );
};

export default Pricing;
