"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
    Terminal, 
    FileCode, 
    FolderGit2, 
    Award, 
    Send, 
    Sparkles, 
    Copy, 
    Check, 
    ExternalLink, 
    Github, 
    Linkedin, 
    Twitter, 
    Mail, 
    ArrowRight,
    CornerDownLeft
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ContactForm from "./contact-form";

type TabKey = "overview.ts" | "skills.json" | "experience.log" | "trophies.md" | "contact.sh";

interface CommandLog {
    command: string;
    output: React.ReactNode;
}

import TerminalAbout from "@/components/terminal-about";

export default function TerminalAboutPage() {
    return (
        <main className="mx-auto max-w-5xl px-4 py-12 min-h-screen">
            <TerminalAbout />
        </main>
    );
}
