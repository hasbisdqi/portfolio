"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const SNIPPETS = [
    "function() {", "return true;", "const x = 42;", 
    "<div>", "import React", "export default", 
    "=>", "{ ...props }", "class='flex'", 
    "useEffect()", "useState()", "console.log()",
    "hsl(47.9, 95.8%, 53.1%)", "await fetch()", 
    ".map(item =>)", "interface Props", "type User"
];

export const CodeCascade = ({ className }: { className?: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let columns: number[] = [];
        const fontSize = 14;

        const resize = () => {
            // High DPI support
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);
            
            const numColumns = Math.floor(window.innerWidth / (fontSize * 1.5));
            columns = Array.from({ length: numColumns }).fill(canvas.height) as number[];
        };

        resize();
        window.addEventListener("resize", resize);

        // We want a very subtle, transparent look. Most text is very dim.
        // Occasional highlights in Doofus Yellow.
        ctx.font = `${fontSize}px "Geist Mono", monospace`;
        
        let lastTime = 0;
        const fps = 24; // Lower FPS to emulate terminal/matrix aesthetic
        const interval = 1000 / fps;

        const draw = (time: number) => {
            animationFrameId = requestAnimationFrame(draw);
            
            const delta = time - lastTime;
            if (delta < interval) return;
            lastTime = time - (delta % interval);

            // Fade the background slowly to create trails
            ctx.fillStyle = "rgba(10, 10, 10, 0.1)"; // Very subtle fade, assuming a dark theme or light theme. 
            // We should use a responsive fade color. We can clearrect and draw text with alpha trails instead, but simple is better:
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            // Actually, for a clean architectural look, let's just drop lines of code that fade out organically rather than classic matrix trails.
            ctx.fillStyle = "rgba(150, 150, 150, 0.15)";
            
            for (let i = 0; i < columns.length; i++) {
                const text = SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)];
                
                const isHighlight = Math.random() > 0.98;
                if (isHighlight) {
                    ctx.fillStyle = "hsl(47.9, 95.8%, 53.1%)"; // Doofus Yellow
                } else {
                    ctx.fillStyle = "rgba(150, 150, 150, 0.08)";
                }

                ctx.fillText(text, i * fontSize * 1.5, columns[i] * fontSize);

                if (columns[i] * fontSize > window.innerHeight && Math.random() > 0.975) {
                    columns[i] = 0;
                }
                columns[i]++;
            }
        };

        animationFrameId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={cn(
                "fixed inset-0 pointer-events-none -z-10 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]",
                className
            )}
            style={{ width: '100vw', height: '100vh' }}
        />
    );
};
