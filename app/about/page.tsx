"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
    Award,
    Briefcase,
    Calendar,
    Check,
    Copy,
    Cpu,
    Download,
    ExternalLink,
    FileText,
    Github,
    GraduationCap,
    HeartHandshake,
    Linkedin,
    Mail,
    MapPin,
    ShieldCheck,
    Sparkles,
    Terminal,
    Trophy,
    Twitter,
    type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern"
import { cn } from "@/lib/utils"
import ContactForm from "./contact-form"

type SocialLink = {
    platform: string
    url: string
    icon: LucideIcon
    username: string
}

type SkillItem = {
    name: string
    category: "frontend" | "backend" | "devops" | "tools"
    level: "core" | "proficient" | "familiar"
}

type Experience = {
    title: string
    company: string
    period: string
    roleType: string
    description: string
    tags?: string[]
}

type Achievement = {
    title: string
    category: "cybersecurity" | "olympiad" | "leadership"
    period: string
    rank: string
}

type Education = {
    degree: string
    institution: string
    period: string
    status: string
}

const skillsData: SkillItem[] = [
    { name: "React", category: "frontend", level: "core" },
    { name: "Next.js", category: "frontend", level: "core" },
    { name: "TypeScript", category: "frontend", level: "core" },
    { name: "Tailwind CSS", category: "frontend", level: "core" },
    { name: "JavaScript", category: "frontend", level: "core" },
    { name: "HTML/CSS", category: "frontend", level: "core" },
    { name: "Node.js", category: "backend", level: "proficient" },
    { name: "Express", category: "backend", level: "proficient" },
    { name: "PostgreSQL", category: "backend", level: "proficient" },
    { name: "MongoDB", category: "backend", level: "proficient" },
    { name: "GraphQL", category: "backend", level: "familiar" },
    { name: "Docker", category: "devops", level: "familiar" },
    { name: "AWS", category: "devops", level: "familiar" },
    { name: "Firebase", category: "devops", level: "familiar" },
    { name: "Git", category: "tools", level: "core" },
    { name: "VS Code", category: "tools", level: "core" },
    { name: "Figma", category: "tools", level: "proficient" },
    { name: "Jest / Cypress", category: "tools", level: "familiar" },
]

const achievementsData: Achievement[] = [
    {
        title: "National Informatics Olympiad (Olympicad)",
        period: "2021",
        rank: "Gold Medal",
        category: "olympiad",
    },
    {
        title: "Cyber Security - LKS DIY",
        period: "2021",
        rank: "2nd Place",
        category: "cybersecurity",
    },
    {
        title: "Provincial Informatics Olympiad",
        period: "2021",
        rank: "1st Place",
        category: "olympiad",
    },
    {
        title: "Web Technology LKS Mentor",
        period: "2022",
        rank: "3rd Place",
        category: "leadership",
    },
    {
        title: "President of Technopark Musaba Community",
        period: "2020 - 2022",
        rank: "Community Lead",
        category: "leadership",
    },
    {
        title: "Jogja Cyber Security Member",
        period: "2023 - Present",
        rank: "Active Contributor",
        category: "cybersecurity",
    },
]

const experiencesData: Experience[] = [
    {
        title: "Freelance Full Stack Developer",
        company: "Self-employed",
        period: "2021 - Present",
        roleType: "Freelance",
        description: "Membangun web app modern berorientasi performa dan UI responsif dengan React, Next.js, dan Node.js untuk berbagai klien.",
        tags: ["Next.js", "React", "Node.js", "Tailwind CSS"],
    },
    {
        title: "Web Developer Intern",
        company: "PT Global Intermedia",
        period: "2022",
        roleType: "Internship",
        description: "Mengembangkan dan memelihara aplikasi web skala enterprise, kolaborasi frontend-backend tim industri nyata.",
        tags: ["Web Dev", "Full Stack", "Enterprise App"],
    },
    {
        title: "Cybersecurity Intern",
        company: "PT Gmedia",
        period: "2022",
        roleType: "Internship",
        description: "Monitoring keamanan jaringan dan vulnerability assessment sesuai best practice IT security.",
        tags: ["Cybersecurity", "Network Sec", "Vulnerability Assessment"],
    },
    {
        title: "Software Engineering Student",
        company: "SMK Muhammadiyah 1 Bantul",
        period: "2021 - 2024",
        roleType: "Education & Projects",
        description: "Fokus rekayasa perangkat lunak, aktif memimpin komunitas teknologi dan mewakili sekolah di kompetisi nasional.",
        tags: ["RPL", "Algorithms", "Web Tech"],
    },
]

const educationData: Education[] = [
    {
        degree: "Bachelor of Information Systems",
        institution: "UPN Veteran Yogyakarta",
        period: "2024 - Present",
        status: "Ongoing",
    },
    {
        degree: "Vocational High School (Rekayasa Perangkat Lunak)",
        institution: "SMK Muhammadiyah 1 Bantul",
        period: "2021 - 2024",
        status: "Graduated",
    },
]

const socialLinks: SocialLink[] = [
    {
        platform: "GitHub",
        url: "https://github.com/hasbisdqi",
        icon: Github,
        username: "hasbisdqi",
    },
    {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/rnghbt",
        icon: Linkedin,
        username: "rnghbt",
    },
    {
        platform: "Twitter",
        url: "https://twitter.com/rnghbt",
        icon: Twitter,
        username: "@rnghbt",
    },
    {
        platform: "Email",
        url: "mailto:muhhasbiassidiqi18@gmail.com",
        icon: Mail,
        username: "muhhasbiassidiqi18@gmail.com",
    },
]

export default function AboutPage() {
    const [copied, setCopied] = useState(false)
    const [skillFilter, setSkillFilter] = useState<"all" | "frontend" | "backend" | "devops" | "tools">("all")
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
    const email = "muhhasbiassidiqi18@gmail.com"
    const resumeUrl = "https://docs.google.com/document/d/1UwrlveA4pVUxMA6qjox0oxS13XjNRRVGGS5H_K5DDZ8/edit?usp=sharing"

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(email)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            const textarea = document.createElement("textarea")
            textarea.value = email
            document.body.appendChild(textarea)
            textarea.select()
            document.execCommand("copy")
            document.body.removeChild(textarea)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const filteredSkills = skillFilter === "all"
        ? skillsData
        : skillsData.filter((skill) => skill.category === skillFilter)

    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
            {/* Background grid */}
            <div
                className={cn(
                    "fixed inset-0 -z-1 size-[700px] opacity-50 pointer-events-none",
                    "[background-size:20px_20px]",
                    "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                    "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
                )}
            >
                <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            </div>

            {/* Header */}
            <header className="mb-10 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-3">
                    <Sparkles className="size-3.5" />
                    <span>Full Stack Developer & Security Enthusiast</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">About & Highlights</h1>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
                    Rekayasa perangkat lunak modern, fondasi cybersecurity kuat, dan pengalaman merakit produk web cepat & reliabel.
                </p>
            </header>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
                
                {/* 1. Hero / Profile Bento Card (Col span 2, Row span 2) */}
                <Card className="md:col-span-2 lg:col-span-2 relative overflow-hidden border border-border/80 bg-card/60 backdrop-blur-sm flex flex-col justify-between p-6 sm:p-8">
                    <AnimatedGridPattern
                        numSquares={16}
                        maxOpacity={0.08}
                        duration={3}
                        repeatDelay={1}
                        strokeDasharray={"4 2"}
                        className={cn(
                            "[mask-image:linear-gradient(to_bottom_right,white,transparent)]",
                            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                        )}
                    />
                    
                    <div className="relative z-10">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                            <div className="relative size-20 sm:size-24 rounded-2xl overflow-hidden ring-2 ring-primary/40 shadow-lg shrink-0">
                                <Image
                                    src="/avatar.jpeg"
                                    alt="Hasbi Assidiqi"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">Hasbi Assidiqi</h2>
                                <p className="text-sm font-medium text-primary flex items-center gap-1.5 mt-0.5">
                                    <MapPin className="size-3.5" /> Yogyakarta, Indonesia
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                    </span>
                                    <span className="text-xs text-muted-foreground font-medium">Available for freelance & projects</span>
                                </div>
                            </div>
                        </div>

                        {/* Punchy Value Props */}
                        <div className="space-y-2.5 my-4">
                            <div className="rounded-lg border border-border/60 bg-muted/40 p-3 text-xs sm:text-sm leading-relaxed text-foreground/90">
                                🚀 <strong className="text-foreground">Modern Web Architecture:</strong> Spesialisasi React & Next.js ecosystem dengan penekanan pada UI modular, speed, dan clean codebase.
                            </div>
                            <div className="rounded-lg border border-border/60 bg-muted/40 p-3 text-xs sm:text-sm leading-relaxed text-foreground/90">
                                🛡️ <strong className="text-foreground">Security-Minded:</strong> Berakar dari background cybersecurity & olimpiade informatika nasional — memprioritaskan best practice keamanan sistem.
                            </div>
                            <div className="rounded-lg border border-border/60 bg-muted/40 p-3 text-xs sm:text-sm leading-relaxed text-foreground/90">
                                🎓 <strong className="text-foreground">Information Systems:</strong> Menggabungkan pemikiran strategis proses bisnis dengan eksekusi teknis tingkat kode.
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 flex flex-wrap items-center gap-2.5 pt-4 border-t border-border/60">
                        <Button size="sm" asChild className="font-medium gap-1.5 shadow-sm">
                            <Link href={resumeUrl} target="_blank">
                                <FileText className="size-4" /> Resume / CV <Download className="size-3" />
                            </Link>
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCopyEmail}
                            className="font-medium gap-1.5"
                        >
                            {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
                            {copied ? "Email Copied!" : "Quick Copy Email"}
                        </Button>
                        <div className="flex gap-1 ml-auto">
                            {socialLinks.map((item) => {
                                const Icon = item.icon
                                return (
                                    <Button key={item.platform} variant="ghost" size="icon" asChild className="size-8">
                                        <Link href={item.url} target="_blank" aria-label={item.platform}>
                                            <Icon className="size-4" />
                                        </Link>
                                    </Button>
                                )
                            })}
                        </div>
                    </div>
                </Card>

                {/* 2. Visual Stat Cards (1 col each) */}
                <Card className="relative overflow-hidden border border-border/80 bg-card/60 backdrop-blur-sm p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-muted-foreground">
                        <span className="text-xs uppercase font-semibold tracking-wider">Pengalaman</span>
                        <Briefcase className="size-4 text-primary" />
                    </div>
                    <div className="my-4">
                        <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">4+</div>
                        <p className="text-xs text-muted-foreground mt-1">Tahun building web software & real-world projects</p>
                    </div>
                    <div className="text-xs text-muted-foreground border-t border-border/50 pt-2 flex items-center justify-between">
                        <span>Sejak SMK RPL</span>
                        <span className="font-medium text-foreground">2021 — Sekarang</span>
                    </div>
                </Card>

                <Card className="relative overflow-hidden border border-border/80 bg-card/60 backdrop-blur-sm p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-muted-foreground">
                        <span className="text-xs uppercase font-semibold tracking-wider">Trophy & Honors</span>
                        <Trophy className="size-4 text-yellow-500" />
                    </div>
                    <div className="my-4">
                        <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-yellow-500">6+</div>
                        <p className="text-xs text-muted-foreground mt-1">Penghargaan Olimpiade & Lomba Cybersecurity</p>
                    </div>
                    <div className="text-xs text-muted-foreground border-t border-border/50 pt-2 flex items-center justify-between">
                        <span>Tingkat</span>
                        <span className="font-medium text-foreground">Nasional & Provinsi</span>
                    </div>
                </Card>

                {/* 3. Core Focus Stack Stat Card */}
                <Card className="relative overflow-hidden border border-border/80 bg-card/60 backdrop-blur-sm p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-muted-foreground">
                        <span className="text-xs uppercase font-semibold tracking-wider">Primary Stack</span>
                        <Cpu className="size-4 text-primary" />
                    </div>
                    <div className="my-3 space-y-1.5">
                        <div className="text-2xl font-bold tracking-tight text-foreground">React • Next.js</div>
                        <p className="text-xs text-muted-foreground">TypeScript, Tailwind CSS, Node.js, PostgreSQL</p>
                    </div>
                    <div className="flex gap-1.5 flex-wrap pt-2 border-t border-border/50">
                        <Badge variant="outline" className="text-[10px] py-0 px-2">Production Ready</Badge>
                        <Badge variant="outline" className="text-[10px] py-0 px-2">Type-Safe</Badge>
                    </div>
                </Card>

                {/* 4. Contact Fast Action Bento Card */}
                <Card className="relative overflow-hidden border border-border/80 bg-gradient-to-br from-card/80 to-primary/5 p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-muted-foreground">
                        <span className="text-xs uppercase font-semibold tracking-wider">Fast Contact</span>
                        <HeartHandshake className="size-4 text-primary" />
                    </div>
                    <div className="my-3">
                        <h3 className="font-semibold text-sm">Ada ide proyek menarik?</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">Mari diskusi kolaborasi freelance atau full-time.</p>
                    </div>
                    <div className="space-y-2 pt-2 border-t border-border/50">
                        <Button size="sm" className="w-full text-xs font-medium" asChild>
                            <Link href="#contact-section">
                                Kirim Pesan Langsung
                            </Link>
                        </Button>
                        <Button size="sm" variant="outline" className="w-full text-xs font-medium truncate" onClick={handleCopyEmail}>
                            {copied ? "Tersalin ke clipboard" : email}
                        </Button>
                    </div>
                </Card>

            </div>

            {/* Interactive Tech Stack Filter Section */}
            <section className="mb-12">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
                            <Terminal className="size-5 text-primary" />
                            Tech Stack & Toolkit
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground">Teknologi dan tools yang saya gunakan sehari-hari.</p>
                    </div>

                    {/* Filter buttons */}
                    <div className="flex flex-wrap items-center gap-1.5 p-1 bg-muted/60 rounded-lg border border-border/60">
                        {(["all", "frontend", "backend", "devops", "tools"] as const).map((filterKey) => (
                            <button
                                key={filterKey}
                                onClick={() => setSkillFilter(filterKey)}
                                className={cn(
                                    "px-2.5 py-1 rounded-md text-xs font-medium transition-colors capitalize",
                                    skillFilter === filterKey
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {filterKey}
                            </button>
                        ))}
                    </div>
                </div>

                <Card className="border border-border/80 bg-card/60 backdrop-blur-sm p-5 sm:p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                        {filteredSkills.map((skill) => {
                            const isHovered = hoveredSkill === skill.name
                            return (
                                <div
                                    key={skill.name}
                                    onMouseEnter={() => setHoveredSkill(skill.name)}
                                    onMouseLeave={() => setHoveredSkill(null)}
                                    className={cn(
                                        "group relative flex flex-col justify-between p-3 rounded-xl border transition-all duration-200 cursor-default",
                                        isHovered
                                            ? "border-primary/60 bg-primary/5 shadow-sm translate-y-[-2px]"
                                            : "border-border/60 bg-muted/20 hover:border-border"
                                    )}
                                >
                                    <div className="flex items-center justify-between gap-1 mb-2">
                                        <span className="font-semibold text-xs sm:text-sm">{skill.name}</span>
                                        <span
                                            className={cn(
                                                "size-1.5 rounded-full",
                                                skill.level === "core" ? "bg-emerald-500" : skill.level === "proficient" ? "bg-blue-500" : "bg-amber-500"
                                            )}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between text-[10px] text-muted-foreground uppercase tracking-wider">
                                        <span>{skill.category}</span>
                                        <span className="capitalize">{skill.level}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between flex-wrap gap-2 text-[11px] text-muted-foreground">
                        <div className="flex items-center gap-4">
                            <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-emerald-500" /> Core / Primary</span>
                            <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-blue-500" /> Proficient</span>
                            <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-amber-500" /> Familiar</span>
                        </div>
                        <span>Menampilkan {filteredSkills.length} dari {skillsData.length} skills</span>
                    </div>
                </Card>
            </section>

            {/* Trophy Case: Cybersecurity & Olympiad */}
            <section className="mb-12">
                <div className="mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Award className="size-5 text-yellow-500" />
                        Trophy Case & Honors
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">Rekam jejak kompetisi informatika, cybersecurity, dan kepemimpinan.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {achievementsData.map((item, idx) => (
                        <Card
                            key={idx}
                            className="border border-border/80 bg-card/60 backdrop-blur-sm p-4 relative overflow-hidden group hover:border-yellow-500/50 transition-colors"
                        >
                            <div className="flex items-start justify-between gap-2 mb-2">
                                <span className={cn(
                                    "px-2 py-0.5 rounded-full text-[11px] font-semibold border flex items-center gap-1",
                                    item.category === "cybersecurity"
                                        ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
                                        : item.category === "olympiad"
                                        ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-500"
                                        : "border-purple-500/30 bg-purple-500/10 text-purple-400"
                                )}>
                                    {item.category === "cybersecurity" && <ShieldCheck className="size-3" />}
                                    {item.category === "olympiad" && <Trophy className="size-3" />}
                                    {item.category === "leadership" && <Sparkles className="size-3" />}
                                    {item.rank}
                                </span>
                                <span className="text-xs text-muted-foreground font-mono">{item.period}</span>
                            </div>
                            <h3 className="font-semibold text-sm leading-snug">{item.title}</h3>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Experience & Education 2-Column Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                {/* Experience (Col span 2) */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Briefcase className="size-5 text-primary" />
                        Work Experience
                    </h2>
                    <div className="space-y-3">
                        {experiencesData.map((exp, index) => (
                            <Card key={index} className="border border-border/80 bg-card/60 backdrop-blur-sm p-4 sm:p-5">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                                    <div>
                                        <h3 className="font-bold text-sm sm:text-base text-foreground">{exp.title}</h3>
                                        <p className="text-xs sm:text-sm font-medium text-primary">{exp.company}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-[10px]">{exp.roleType}</Badge>
                                        <span className="text-xs text-muted-foreground font-mono">{exp.period}</span>
                                    </div>
                                </div>
                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                                    {exp.description}
                                </p>
                                {exp.tags && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {exp.tags.map((t) => (
                                            <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/40">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Education (Col span 1) */}
                <div className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
                        <GraduationCap className="size-5 text-primary" />
                        Education
                    </h2>
                    <div className="space-y-3">
                        {educationData.map((edu, index) => (
                            <Card key={index} className="border border-border/80 bg-card/60 backdrop-blur-sm p-4 sm:p-5 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <Badge variant="secondary" className="text-[10px]">{edu.status}</Badge>
                                        <span className="text-xs text-muted-foreground font-mono">{edu.period}</span>
                                    </div>
                                    <h3 className="font-bold text-sm text-foreground mt-2">{edu.degree}</h3>
                                    <p className="text-xs text-muted-foreground mt-1">{edu.institution}</p>
                                </div>
                            </Card>
                        ))}

                        {/* Resume Direct Card */}
                        <Card className="border border-primary/40 bg-primary/5 p-4 sm:p-5 flex flex-col justify-between">
                            <div>
                                <h3 className="font-semibold text-sm">Download Complete CV</h3>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Versi dokumen lengkap berisi riwayat proyek detail & kontak referensi.
                                </p>
                            </div>
                            <Button size="sm" asChild className="mt-4 w-full gap-1.5">
                                <Link href={resumeUrl} target="_blank">
                                    <ExternalLink className="size-3.5" /> Buka Google Docs Resume
                                </Link>
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <section id="contact-section" className="mb-12">
                <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Mail className="size-5 text-primary" />
                        Get In Touch
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">Hubungi saya untuk diskusi project, kolaborasi, atau sekadar bertukar ide teknologi.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left: Contact Info */}
                    <Card className="border border-border/80 bg-card/60 backdrop-blur-sm p-6 flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                                    <Mail className="size-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase">Email</p>
                                    <div className="flex items-center gap-2">
                                        <a href={`mailto:${email}`} className="text-sm font-medium hover:underline text-foreground">
                                            {email}
                                        </a>
                                        <button
                                            onClick={handleCopyEmail}
                                            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                                            title="Copy email"
                                        >
                                            {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                                    <Linkedin className="size-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase">LinkedIn</p>
                                    <Link
                                        href="https://linkedin.com/in/rnghbt"
                                        target="_blank"
                                        className="text-sm font-medium hover:underline text-foreground flex items-center gap-1"
                                    >
                                        linkedin.com/in/rnghbt <ExternalLink className="size-3 text-muted-foreground" />
                                    </Link>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                                    <Calendar className="size-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase">Status</p>
                                    <p className="text-sm font-medium text-emerald-500">Available for freelance work</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 mt-6 border-t border-border/50">
                            <p className="text-xs text-muted-foreground mb-3 font-medium">Social Channels</p>
                            <div className="flex flex-wrap gap-2">
                                {socialLinks.map((link) => {
                                    const Icon = link.icon
                                    return (
                                        <Button key={link.platform} variant="outline" size="sm" asChild className="gap-1.5 text-xs">
                                            <Link href={link.url} target="_blank">
                                                <Icon className="size-3.5" /> {link.platform}
                                            </Link>
                                        </Button>
                                    )
                                })}
                            </div>
                        </div>
                    </Card>

                    {/* Right: Message Form */}
                    <Card className="border border-border/80 bg-card/60 backdrop-blur-sm p-6">
                        <h3 className="font-semibold text-base mb-1">Send a Message</h3>
                        <p className="text-xs text-muted-foreground mb-4">Pesan akan diteruskan langsung ke email saya.</p>
                        <ContactForm />
                    </Card>
                </div>
            </section>
        </main>
    )
}
