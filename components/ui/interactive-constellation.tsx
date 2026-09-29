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

        const draw = () => {
            animationFrameId = requestAnimationFrame(draw);
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

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
