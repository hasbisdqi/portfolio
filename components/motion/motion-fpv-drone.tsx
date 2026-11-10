"use client";

import React, { useEffect, useRef } from "react";

interface MotionFpvDroneProps {
  className?: string;
  width?: number;
  height?: number;
}

export const MotionFpvDrone: React.FC<MotionFpvDroneProps> = ({
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
    const cycle = 9.4; // 9.4s full cycle per motion-prompt #035
    const forwardSpeed = 14; // 14 m/s (50 km/h)
    const treeSpacing = 8; // trees stand every 8m

    const render = (now: number) => {
      const u = (now - startTime) / 1000;
      const progressCycle = (u % cycle) / cycle;
      const T = (u * 2 * Math.PI) / 4.7; // Two swings per 4.7s

      // Camera coordinates from motion spec #035
      const camZ = u * forwardSpeed;
      const camX = 0.6 * Math.sin(2 * T - 0.4);
      const camY = 1.4 + 0.5 * Math.sin(2 * T);
      const roll = 0.22 * Math.sin(2 * T + 0.6); // ~ ±12.6°
      const yaw = 0.05 * Math.sin(2 * T);        // ~ ±2.9°

      ctx.clearRect(0, 0, width, height);

      // Background Sky / Ground Horizon
      ctx.save();
      // Apply Camera Bank (Roll) & Yaw translation
      ctx.translate(width / 2, height / 2);
      ctx.rotate(roll);

      const fov = 260; // focal length perspective
      const horizonY = (camY - 1.4) * 35;

      // Sky
      const skyGrad = ctx.createLinearGradient(0, -height, 0, horizonY);
      skyGrad.addColorStop(0, "#030712");
      skyGrad.addColorStop(1, "#1e293b");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(-width, -height, width * 2, height + horizonY);

      // Ground
      const groundGrad = ctx.createLinearGradient(0, horizonY, 0, height);
      groundGrad.addColorStop(0, "#064e3b");
      groundGrad.addColorStop(1, "#022c22");
      ctx.fillStyle = groundGrad;
      ctx.fillRect(-width, horizonY, width * 2, height);

      // Draw Center Runway / Path grid
      ctx.strokeStyle = "rgba(45, 212, 191, 0.25)";
      ctx.lineWidth = 1;
      for (let gx = -16; gx <= 16; gx += 4) {
        ctx.beginPath();
        const screenNearX = (gx - camX) * (fov / 2);
        const screenFarX = (gx - camX) * (fov / 40);
        ctx.moveTo(screenFarX + yaw * fov, horizonY);
        ctx.lineTo(screenNearX + yaw * fov, height);
        ctx.stroke();
      }

      // Draw 3D Tree Rows (Left & Right offset)
      const baseZ = Math.floor(camZ / treeSpacing) * treeSpacing;
      const visibleCount = 14;

      for (let i = visibleCount; i >= 1; i--) {
        const rowZ = baseZ + i * treeSpacing;
        const relZ = rowZ - camZ;
        if (relZ <= 0.8) continue;

        const scale = fov / relZ;
        const projY = horizonY + (camY * scale * 0.4);

        // Left Row of trees (-3.6m side)
        const leftX = (-3.6 - camX) * scale + yaw * fov;
        const treeH = 4.2 * scale;
        const treeW = 1.8 * scale;

        ctx.fillStyle = `rgba(16, 185, 129, ${Math.min(1, 40 / relZ)})`;
        ctx.beginPath();
        ctx.moveTo(leftX, projY - treeH);
        ctx.lineTo(leftX - treeW / 2, projY);
        ctx.lineTo(leftX + treeW / 2, projY);
        ctx.closePath();
        ctx.fill();

        // Right Row of trees (+3.6m side, offset by 4m)
        const rightRowZ = rowZ + treeSpacing / 2;
        const rightRelZ = rightRowZ - camZ;
        if (rightRelZ > 0.8) {
          const rScale = fov / rightRelZ;
          const rProjY = horizonY + (camY * rScale * 0.4);
          const rightX = (3.6 - camX) * rScale + yaw * fov;
          const rTreeH = 4.2 * rScale;
          const rTreeW = 1.8 * rScale;

          ctx.fillStyle = `rgba(59, 130, 246, ${Math.min(1, 40 / rightRelZ)})`;
          ctx.beginPath();
          ctx.moveTo(rightX, rProjY - rTreeH);
          ctx.lineTo(rightX - rTreeW / 2, rProjY);
          ctx.lineTo(rightX + rTreeW / 2, rProjY);
          ctx.closePath();
          ctx.fill();
        }
      }

      // Speed lines rushing outwards
      ctx.strokeStyle = "rgba(226, 232, 240, 0.45)";
      ctx.lineWidth = 1.5;
      for (let j = 0; j < 10; j++) {
        const angle = (j / 10) * Math.PI * 2 + 0.3;
        const phase = ((u * 2.2 + j * 0.37) % 1);
        const r0 = 80 + phase * 160;
        const len = 35 + phase * 45;

        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * r0 * 1.8, Math.sin(angle) * r0 * 0.9);
        ctx.lineTo(Math.cos(angle) * (r0 + len) * 1.8, Math.sin(angle) * (r0 + len) * 0.9);
        ctx.stroke();
      }

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [width, height]);

  return (
    <div className={`relative overflow-hidden rounded-xl border border-border/70 shadow-lg ${className}`}>
      <div className="absolute top-2 left-3 z-10 flex items-center gap-2 font-mono text-[10px] text-white/80 bg-black/50 px-2 py-0.5 rounded backdrop-blur">
        <span className="text-primary font-bold">#035 FPV DRONE</span>
        <span className="text-sky-400">• 50 KM/H</span>
        <span className="text-emerald-400">BANK: ±12.6°</span>
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
export default MotionFpvDrone;
