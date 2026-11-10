"use client";

import React, { useEffect, useRef } from "react";

interface MotionParallaxProps {
  className?: string;
  width?: number;
  height?: number;
}

export const MotionParallax: React.FC<MotionParallaxProps> = ({
  className = "",
  width = 540,
  height = 210,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const startTime = performance.now();
    const cycle = 4.7; // 4.7s cycle time per motion-prompt #016

    // Pre-calculate mountains / stars
    const stars = Array.from({ length: 24 }, (_, i) => ({
      x: ((i * 37) % (width + 120)) - 60,
      y: 12 + ((i * 19) % (height * 0.45)),
      r: 1 + (i % 3) * 0.7,
    }));

    const render = (now: number) => {
      const u = ((now - startTime) / 1000) % cycle;
      const pan = 108 * Math.sin((u / cycle) * Math.PI * 2);

      ctx.clearRect(0, 0, width, height);

      // 1. Sky Gradient Background
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, "#080c1a");
      skyGrad.addColorStop(1, "#182a57");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Stars Layer (Factor: 0.05)
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x - pan * 0.05, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Moon Layer (Factor: 0.10)
      ctx.fillStyle = "#f6e05e";
      ctx.shadowColor = "rgba(246, 224, 94, 0.4)";
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(width * 0.78 - pan * 0.1, 48, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // 4. Far Ridge (Factor: 0.28)
      ctx.fillStyle = "#223567";
      ctx.beginPath();
      ctx.moveTo(-100, height);
      for (let x = -100; x <= width + 100; x += 40) {
        const y = height * 0.62 + Math.sin(x * 0.015) * 22;
        ctx.lineTo(x - pan * 0.28, y);
      }
      ctx.lineTo(width + 100, height);
      ctx.closePath();
      ctx.fill();

      // 5. Middle Ridge (Factor: 0.60)
      ctx.fillStyle = "#1e40af";
      ctx.beginPath();
      ctx.moveTo(-150, height);
      for (let x = -150; x <= width + 150; x += 30) {
        const y = height * 0.75 + Math.sin(x * 0.025 + 1.2) * 26;
        ctx.lineTo(x - pan * 0.6, y);
      }
      ctx.lineTo(width + 150, height);
      ctx.closePath();
      ctx.fill();

      // 6. Foreground Hills & Pine Trees (Factor: 1.25)
      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.moveTo(-200, height);
      for (let x = -200; x <= width + 200; x += 25) {
        const y = height * 0.88 + Math.sin(x * 0.035 + 2.5) * 16;
        ctx.lineTo(x - pan * 1.25, y);
      }
      ctx.lineTo(width + 200, height);
      ctx.closePath();
      ctx.fill();

      // Foreground Trees
      for (let i = 0; i < 7; i++) {
        const treeBaseX = i * 110 - pan * 1.25;
        const treeBaseY = height * 0.9;
        ctx.fillStyle = "#065f46";
        ctx.beginPath();
        ctx.moveTo(treeBaseX, treeBaseY - 34);
        ctx.lineTo(treeBaseX - 12, treeBaseY);
        ctx.lineTo(treeBaseX + 12, treeBaseY);
        ctx.closePath();
        ctx.fill();
      }

      // 7. Nearest Dark Silhouettes along bottom (Factor: 2.10)
      ctx.fillStyle = "#030712";
      ctx.beginPath();
      ctx.moveTo(-300, height);
      for (let x = -300; x <= width + 300; x += 50) {
        const y = height * 0.94 + Math.sin(x * 0.04 + 4) * 12;
        ctx.lineTo(x - pan * 2.1, y);
      }
      ctx.lineTo(width + 300, height);
      ctx.closePath();
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [width, height]);

  return (
    <div className={`relative overflow-hidden rounded-xl border border-border/70 shadow-lg ${className}`}>
      <div className="absolute top-2 left-3 z-10 flex items-center gap-1.5 font-mono text-[10px] text-white/70 bg-black/40 px-2 py-0.5 rounded backdrop-blur">
        <span>#016 PARALLAX</span>
        <span className="text-emerald-400">• 4.7s Loop</span>
      </div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-auto block"
      />
    </div>
  );
};
export default MotionParallax;
