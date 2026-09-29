"use client";

import React, { useEffect, useState } from "react";

export function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateScroll = () => {
            const currentProgress = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight > 0) {
                setProgress((currentProgress / scrollHeight) * 100);
            }
        };

        window.addEventListener("scroll", updateScroll, { passive: true });
        return () => window.removeEventListener("scroll", updateScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent pointer-events-none">
            <div
                className="h-full bg-gradient-to-r from-amber-500 via-primary to-yellow-300 transition-all duration-75 ease-out shadow-sm shadow-primary/50"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
