"use client";
import React, { useState, useRef } from "react";
import { gsap } from "gsap";

const phases = [
    {
        num: "01",
        label: "PHASE 01",
        title: "Assessment",
        desc: "A 360 analysis of the day and time you were born",
    },
    {
        num: "02",
        label: "PHASE 02",
        title: "Development",
        desc: "Guided steps to reach your true potential.",
    },
];

const ANGLE_STEP = 15 / phases.length;

export default function PhaseSection() {
    const [active, setActive] = useState(0);
    const arcRef = useRef(null);
    const textRef = useRef(null);

    const rotateTo = (index) => {
        if (index === active) return;

        const angle = -ANGLE_STEP * index;

        gsap.to(arcRef.current, {
            rotateZ: angle,
            duration: 1.2,
            ease: "power2.inOut",
        });

        gsap.to(textRef.current, {
            opacity: 0,
            y: 30,
            duration: 0.4,
            onComplete: () => {
                setActive(index);
                gsap.fromTo(
                    textRef.current,
                    { opacity: 0, y: -30 },
                    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
                );
            },
        });
    };

    const left = active === 0 ? "00" : "01";
    const center = phases[active].num;
    const right = active === 0 ? "02" : "";

    return (
        <div className="bg-[#0f0e0d] min-h-screen w-full flex items-center justify-center relative overflow-hidden">
            <div className="relative w-full max-w-[1400px] h-[800px] text-white flex flex-col items-center justify-end pb-16">
                <div
                    ref={arcRef}
                    className="absolute top-[50px] left-1/2 -translate-x-1/2 rotate-0"
                >
                    <div className="flex items-center justify-center relative">
                        <div
                            className="w-[900px] h-[900px] rounded-full border border-white/20"
                            style={{ clipPath: "inset(0 0 50% 0)" }}
                        ></div>
                        <div
                            className="absolute w-[750px] h-[750px] bottom-[5%] rounded-full border border-white/10"
                            style={{ clipPath: "inset(0 0 50% 0)" }}
                        ></div>
                        <div
                            className="absolute w-[600px] h-[600px] bottom-[8%] rounded-full border border-white/5"
                            style={{ clipPath: "inset(0 0 50% 0)" }}
                        ></div>
                    </div>
                    <div
                        onClick={() => rotateTo(0)}
                        className="absolute top-[180px] left-[calc(54%-460px)] text-white/30 text-[72px] -rotate-[30deg] cursor-pointer"
                    >
                        {left}
                    </div>
                    <div
                        onClick={() => rotateTo(1)}
                        className="absolute top-[180px] right-[calc(54%-460px)] text-white/80 text-[72px] rotate-[30deg] cursor-pointer"
                    >
                        {right}
                    </div>
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 text-[120px] font-light cursor-pointer leading-none"
                        onClick={() => rotateTo((active + 1) % phases.length)}
                    >
                        {center}
                    </div>
                </div>
                <div className="absolute top-[150px] left-1/2 -translate-x-1/2 h-[200px] w-[1px] bg-white/40"></div>
                <div className="absolute top-[150px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white"></div>
                <div ref={textRef} className="text-center mt-[160px] px-4 max-w-[600px]">
                    <p className="text-xs tracking-widest text-white/60 mb-2">
                        {phases[active].label}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-light">
                        {phases[active].title}
                    </h2>
                    <p className="text-sm mt-3 text-white/60">{phases[active].desc}</p>
                </div>
            </div>
        </div>
    );
}
