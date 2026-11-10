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
  depthLayer: number; // 0: far (0.1x), 1: mid (0.45x), 2: foreground (1.1x)
}

interface SpeedStreak {
  angle: number;
  phase: number;
  baseRadius: number;
  length: number;
}

const CHARS = ["0", "1", "<", ">", "/", "{", "}", ";", "*", "+", "λ", "x", "y", "z", "π", "42", "::", "=>", "~", "&"];

export const InteractiveConstellation = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, vx: 0, vy: 0, lastX: -1000, lastY: -1000, radius: 140 };

    // FPV Speed streaks (from #035 motion spec)
    const streaks: SpeedStreak[] = Array.from({ length: 12 }, (_, i) => ({
      angle: (i / 12) * Math.PI * 2 + 0.35,
      phase: (i * 0.28) % 1,
      baseRadius: 100 + (i % 4) * 35,
      length: 40 + (i % 3) * 25,
    }));

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
      const density = Math.floor((window.innerWidth * window.innerHeight) / 9500);
      const count = Math.min(Math.max(density, 70), 160);

      for (let i = 0; i < count; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        // Assign parallax depth layer (0: background stars 0.1x, 1: mid 0.45x, 2: foreground 1.1x)
        const depthLayer = i % 3;
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: depthLayer === 2 ? 3 : depthLayer === 1 ? 2 : 1.4,
          char: CHARS[Math.floor(Math.random() * CHARS.length)],
          color: depthLayer === 2 
            ? "hsl(47.9, 95.8%, 53.1%)" 
            : depthLayer === 1 
            ? "rgba(180, 180, 190, 0.45)" 
            : "rgba(120, 120, 130, 0.20)",
          depthLayer,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      if (mouse.lastX !== -1000) {
        mouse.vx = e.clientX - mouse.lastX;
        mouse.vy = e.clientY - mouse.lastY;
      }
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.lastX = -1000;
      mouse.lastY = -1000;
      mouse.vx = 0;
      mouse.vy = 0;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const startTime = performance.now();

    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const now = performance.now();
      const u = (now - startTime) / 1000;

      // -------------------------------------------------------------
      // #016 PARALLAX KINEMATICS
      // Pan wave: ±108px per 4.7s cycle
      // Depth multiplier: Layer 0 (0.1x), Layer 1 (0.45x), Layer 2 (1.1x)
      // Plus scroll offset parallax
      // -------------------------------------------------------------
      const cycleTime = 4.7;
      const panBase = 108 * Math.sin((u / cycleTime) * Math.PI * 2);
      const scrollY = window.scrollY || 0;

      // -------------------------------------------------------------
      // #035 FPV DRONE KINEMATICS
      // Weave T = 2π * u / 4.7s
      // Banking roll: 0.22 * sin(2T + 0.6) rad (~ ±12.6°)
      // Yaw sway: 0.05 * sin(2T) rad (~ ±2.9°)
      // -------------------------------------------------------------
      const T = (u * 2 * Math.PI) / cycleTime;
      const rollAngle = 0.035 * Math.sin(2 * T + 0.6); // subtle organic canvas banking
      const yawOffset = 18 * Math.sin(2 * T);          // slight lateral yaw drift

      ctx.save();
      // Apply gentle FPV drone banking around viewport center
      ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
      ctx.rotate(rollAngle);
      ctx.translate(-window.innerWidth / 2, -window.innerHeight / 2);

      // Render FPV dynamic speed streaks rushing from depth
      ctx.save();
      ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
      ctx.lineWidth = 1;

      for (let s = 0; s < streaks.length; s++) {
        const streak = streaks[s];
        streak.phase = (streak.phase + 0.012) % 1; // forward rush
        const curR = streak.baseRadius + streak.phase * 180;
        const curLen = streak.length * (0.6 + streak.phase * 0.8);
        const alpha = Math.sin(streak.phase * Math.PI) * 0.22;

        ctx.strokeStyle = `hsla(47.9, 95.8%, 53.1%, ${alpha})`;
        ctx.beginPath();
        const startX = Math.cos(streak.angle) * curR * 1.5;
        const startY = Math.sin(streak.angle) * curR * 0.85;
        const endX = Math.cos(streak.angle) * (curR + curLen) * 1.5;
        const endY = Math.sin(streak.angle) * (curR + curLen) * 0.85;
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
      ctx.restore();

      // Render Parallax Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Float drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.x < -40) p.x = window.innerWidth + 40;
        if (p.x > window.innerWidth + 40) p.x = -40;
        if (p.y < -40) p.y = window.innerHeight + 40;
        if (p.y > window.innerHeight + 40) p.y = -40;

        // Parallax factor per layer
        const factor = p.depthLayer === 2 ? 1.1 : p.depthLayer === 1 ? 0.45 : 0.1;
        const renderX = p.x + (panBase + yawOffset) * factor;
        const renderY = p.y - (scrollY * factor * 0.2);

        // Interactive mouse magnetic repel
        const dx = mouse.x - renderX;
        const dy = mouse.y - renderY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= Math.cos(angle) * force * 4.5 * factor;
          p.y -= Math.sin(angle) * force * 4.5 * factor;
        }

        // Draw character
        ctx.font = `${p.size * 3.4}px "Geist Mono", monospace`;
        ctx.fillStyle = p.color;
        ctx.fillText(p.char, renderX, renderY);

        // Constellation connections within same/adjacent depth layers
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (Math.abs(p.depthLayer - p2.depthLayer) > 1) continue;

          const f2 = p2.depthLayer === 2 ? 1.1 : p2.depthLayer === 1 ? 0.45 : 0.1;
          const r2X = p2.x + (panBase + yawOffset) * f2;
          const r2Y = p2.y - (scrollY * f2 * 0.2);

          const cdx = renderX - r2X;
          const cdy = renderY - r2Y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < 100) {
            const alpha = (1 - cdist / 100) * (p.depthLayer === 2 ? 0.25 : 0.12);
            ctx.strokeStyle = `rgba(150, 150, 160, ${alpha})`;
            ctx.lineWidth = p.depthLayer === 2 ? 0.8 : 0.5;
            ctx.beginPath();
            ctx.moveTo(renderX, renderY);
            ctx.lineTo(r2X, r2Y);
            ctx.stroke();
          }
        }
      }

      ctx.restore();
    };

    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "fixed inset-0 pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)]",
        className
      )}
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};
