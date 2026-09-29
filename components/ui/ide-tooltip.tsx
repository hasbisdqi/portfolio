"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface IDETooltipProps {
    children: React.ReactNode;
    keyword: string;
    typeDef: string;
    description: string;
}

export const IDETooltip = ({ children, keyword, typeDef, description }: IDETooltipProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <span 
            className="relative inline-block cursor-help border-b border-dashed border-primary/50 text-primary transition-colors hover:text-primary/80"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
            <AnimatePresence>
                {isHovered && (
                    <motion.span
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className={cn(
                            "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 z-50 block",
                            "p-3 rounded-lg border border-primary/30 shadow-xl backdrop-blur-xl",
                            "bg-background/95 text-left font-mono text-xs overflow-hidden"
                        )}
                        style={{ pointerEvents: 'none' }}
                    >
                        {/* IDE Header */}
                        <span className="flex items-center gap-2 mb-2 pb-2 border-b border-border/50 text-muted-foreground">
                            <span className="flex size-2 rounded-full bg-primary/80"></span>
                            <span>intellisense</span>
                        </span>
                        
                        {/* IDE Content */}
                        <span className="block">
                            <span className="block text-primary font-bold mb-1">
                                <span className="text-muted-foreground">type</span> {keyword} <span className="text-muted-foreground">=</span> {typeDef};
                            </span>
                            <span className="block text-muted-foreground leading-relaxed">
                                {description}
                            </span>
                        </span>
                    </motion.span>
                )}
            </AnimatePresence>
        </span>
    );
};
