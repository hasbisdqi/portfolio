"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    vx: number;
    vy: number;
    size: number;
    char: string;
    color: string;
}

interface GlassImpact {
    x: number;
    y: number;
    scale: number;
    char: string;
    life: number;
    maxLife: number;
}

interface IncomingMeteor {
    startX: number;
    startY: number;
    targetX: number;
    targetY: number;
    progress: number; // 0 to 1
    speed: number;
    char: string;
    trail: { x: number; y: number; alpha: number }[];
}

const CHARS = ["0", "1", "<", ">", "/", "{", "}", ";", "*", "+", "λ", "x", "y", "z", "π", "42", "::", "=>", "~", "&"];

export const InteractiveConstellation = ({ className }: { className?: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let impacts: GlassImpact[] = [];
        let meteors: IncomingMeteor[] = [];
        let lastMeteorTime = Date.now();
        const mouse = { x: -1000, y: -1000, radius: 140 };

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.resetTransform();
            ctx.scale(dpr, dpr);
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const density = Math.floor((window.innerWidth * window.innerHeight) / 10000);
            const count = Math.min(Math.max(density, 60), 140);

            for (let i = 0; i < count; i++) {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                particles.push({
                    x,
                    y,
                    originX: x,
                    originY: y,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    size: Math.random() * 2 + 1.5,
                    char: CHARS[Math.floor(Math.random() * CHARS.length)],
                    color: Math.random() > 0.85 ? "hsl(47.9, 95.8%, 53.1%)" : "rgba(150, 150, 150, 0.25)",
                });
            }
        };

        resize();
        window.addEventListener("resize", resize);

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const onMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseleave", onMouseLeave);

        const spawnImpact = (x: number, y: number, char: string) => {
            impacts.push({
                x,
                y,
                scale: 1,
                char,
                life: 1,
                maxLife: 80,
            });

            // SCREEN SHAKE & GLITCH EFFECT ON THE WHOLE PAGE
            const pageBody = document.body;
            if (pageBody) {
                const shakeKeyframes = [
                    { transform: "translate(0, 0) rotate(0deg)" },
                    { transform: `translate(${(Math.random() - 0.5) * 18}px, ${(Math.random() - 0.5) * 18}px) rotate(${(Math.random() - 0.5) * 1.5}deg)` },
                    { transform: `translate(${(Math.random() - 0.5) * 12}px, ${(Math.random() - 0.5) * 12}px) rotate(${(Math.random() - 0.5) * 1}deg)` },
                    { transform: `translate(${(Math.random() - 0.5) * 6}px, ${(Math.random() - 0.5) * 6}px) rotate(0deg)` },
                    { transform: "translate(0, 0) rotate(0deg)" }
                ];
                pageBody.animate(shakeKeyframes, {
                    duration: 350,
                    easing: "cubic-bezier(0.36, 0.07, 0.19, 0.97)"
                });
            }
        };

        const launchMeteor = () => {
            const targetX = Math.random() * (window.innerWidth - 200) + 100;
            const targetY = Math.random() * (window.innerHeight - 200) + 100;

            // Spawn from depth + distant offset
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 200 + 150;
            const startX = targetX + Math.cos(angle) * distance;
            const startY = targetY + Math.sin(angle) * distance;

            meteors.push({
                startX,
                startY,
                targetX,
                targetY,
                progress: 0,
                speed: Math.random() * 0.03 + 0.045, // fast zoom
                char: CHARS[Math.floor(Math.random() * CHARS.length)],
                trail: []
            });
        };

        const draw = () => {
            animationFrameId = requestAnimationFrame(draw);
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            // Launch incoming meteor every 3.5 - 7 seconds
            const now = Date.now();
            if (now - lastMeteorTime > (Math.random() * 3500 + 3500)) {
                launchMeteor();
                lastMeteorTime = now;
            }

            // Update & draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Natural slow float
                p.x += p.vx;
                p.y += p.vy;

                // Bounce at edges
                if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
                if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

                // Mouse interaction (repel with magnetic shockwave effect)
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (mouse.radius - dist) / mouse.radius;
                    p.x -= Math.cos(angle) * force * 5;
                    p.y -= Math.sin(angle) * force * 5;
                }

                // Draw character
                ctx.font = `${p.size * 3.5}px "Geist Mono", monospace`;
                ctx.fillStyle = p.color;
                ctx.fillText(p.char, p.x, p.y);

                // Connect particles within proximity
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const djx = p.x - p2.x;
                    const djy = p.y - p2.y;
                    const distance = Math.sqrt(djx * djx + djy * djy);

                    if (distance < 110) {
                        const alpha = (1 - distance / 110) * 0.15;
                        ctx.strokeStyle = `rgba(150, 150, 150, ${alpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                // Connect particle to mouse if nearby
                if (dist < mouse.radius) {
                    const alpha = (1 - dist / mouse.radius) * 0.35;
                    ctx.strokeStyle = `hsla(47.9, 95.8%, 53.1%, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }

            // Draw and update incoming meteors from deep space
            for (let m = meteors.length - 1; m >= 0; m--) {
                const met = meteors[m];
                met.progress += met.speed;

                // Ease in quad for perspective acceleration
                const easeProg = met.progress * met.progress;
                const currentX = met.startX + (met.targetX - met.startX) * easeProg;
                const currentY = met.startY + (met.targetY - met.startY) * easeProg;

                met.trail.push({ x: currentX, y: currentY, alpha: 1 });
                if (met.trail.length > 8) met.trail.shift();

                // Draw fiery meteor trail
                ctx.save();
                for (let t = 0; t < met.trail.length; t++) {
                    const pt = met.trail[t];
                    const trailAlpha = (t / met.trail.length) * (0.3 + easeProg * 0.5);
                    const trailSize = 2 + (t / met.trail.length) * (easeProg * 12);
                    ctx.beginPath();
                    ctx.arc(pt.x, pt.y, trailSize, 0, Math.PI * 2);
                    ctx.fillStyle = `hsla(47.9, 95.8%, 53.1%, ${trailAlpha})`;
                    ctx.shadowColor = "hsl(47.9, 95.8%, 53.1%)";
                    ctx.shadowBlur = 10;
                    ctx.fill();
                }

                // Draw zooming symbol
                const currentFontSize = 4 + easeProg * 24; // grows from 4px in distance to 28px on impact
                ctx.font = `bold ${currentFontSize}px "Geist Mono", monospace`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = `hsl(47.9, 95.8%, 53.1%)`;
                ctx.shadowColor = "hsl(47.9, 95.8%, 53.1%)";
                ctx.shadowBlur = 12 * easeProg;
                ctx.fillText(met.char, currentX, currentY);
                ctx.restore();

                // Impact trigger when hitting screen plane
                if (met.progress >= 1) {
                    spawnImpact(met.targetX, met.targetY, met.char);
                    meteors.splice(m, 1);
                }
            }

            // Draw and update screen impacts (slam against glass)
            for (let k = impacts.length - 1; k >= 0; k--) {
                const imp = impacts[k];
                const progress = imp.life / imp.maxLife; // 0 to 1
                const alpha = Math.sin((1 - progress) * Math.PI); // Peak at start, fade out

                ctx.save();

                // 1. Initial screen-wide flash on impact
                if (imp.life < 8) {
                    const flashAlpha = (1 - imp.life / 8) * 0.18;
                    ctx.fillStyle = `hsla(47.9, 95.8%, 53.1%, ${flashAlpha})`;
                    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
                }

                // 2. Huge expanding shockwave blast rings
                const blastRadius = progress * 140;
                ctx.beginPath();
                ctx.arc(imp.x, imp.y, blastRadius, 0, Math.PI * 2);
                ctx.strokeStyle = `hsla(47.9, 95.8%, 53.1%, ${(1 - progress) * 0.7})`;
                ctx.lineWidth = 2.5 * (1 - progress);
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(imp.x, imp.y, blastRadius * 0.6, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - progress) * 0.5})`;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                // 3. Large Smashed Glowing Code Character
                const charSize = 36 + (1 - progress) * 14;
                ctx.font = `900 ${charSize}px "Geist Mono", monospace`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = `hsla(47.9, 95.8%, 53.1%, ${alpha})`;
                ctx.shadowColor = "hsl(47.9, 95.8%, 53.1%)";
                ctx.shadowBlur = 25;
                ctx.fillText(imp.char, imp.x, imp.y);

                ctx.restore();

                imp.life++;
                if (imp.life >= imp.maxLife) {
                    impacts.splice(k, 1);
                }
            }
        };

        animationFrameId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseleave", onMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={cn(
                "fixed inset-0 pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]",
                className
            )}
            style={{ width: "100vw", height: "100vh" }}
        />
    );
};
