import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Mail, Twitter, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Define types for all data structures
type SocialLink = {
    platform: string
    url: string
    icon: LucideIcon
    username: string
}

type ProfileData = {
    name: string
    title: string
    imageSrc: string
    bio: string[]
    resumeUrl: string
    email: string
    socialLinks: SocialLink[]
}

type Skill = {
    name: string
}

type SkillCategory = {
    name: string
    skills: Skill[]
}

type Experience = {
    title: string
    company: string
    period: string
    description: string
}

type Education = {
    degree: string
    institution: string
    period: string
}

type ContactInfo = {
    email: string
    linkedin: string
}

// Define the complete page data structure
type AboutPageData = {
    profile: ProfileData
    skillCategories: SkillCategory[]
    experiences: Experience[]
    education: Education[]
    contact: ContactInfo
}

// Internal data source
const pageData: AboutPageData = {
    profile: {
        name: "John Doe",
        title: "Full Stack Developer",
        imageSrc: "/placeholder.svg?height=400&width=400",
        bio: [
            "Hello! I'm John, a passionate full-stack developer with over 5 years of experience building web applications. I specialize in creating responsive, user-friendly interfaces and robust backend systems.",
            "My journey in software development began during my computer science studies, where I discovered my passion for creating digital solutions that solve real-world problems. Since then, I've worked with startups and established companies to deliver high-quality software products."
        ],
        resumeUrl: "/resume.pdf",
        email: "contact@example.com",
        socialLinks: [
            {
                platform: "GitHub",
                url: "https://github.com/johndoe",
                icon: Github,
                username: "johndoe",
            },
            {
                platform: "LinkedIn",
                url: "https://linkedin.com/in/johndoe",
                icon: Linkedin,
                username: "linkedin.com/in/johndoe",
            },
            {
                platform: "Twitter",
                url: "https://twitter.com/johndoe",
                icon: Twitter,
                username: "@johndoe",
            },
            {
                platform: "Email",
                url: "mailto:contact@example.com",
                icon: Mail,
                username: "contact@example.com",
            },
        ],
    },
    skillCategories: [
        {
            name: "Expert",
            skills: [
                { name: "React" },
                { name: "Next.js" },
                { name: "JavaScript" },
                { name: "Tailwind CSS" },
                { name: "HTML/CSS" },
                { name: "Git" },
            ],
        },
        {
            name: "Proficient",
            skills: [
                { name: "TypeScript" },
                { name: "Node.js" },
                { name: "Express" },
                { name: "PostgreSQL" },
                { name: "MongoDB" },
                { name: "Redux" },
            ],
        },
        {
            name: "Familiar",
            skills: [
                { name: "GraphQL" },
                { name: "Docker" },
                { name: "AWS" },
                { name: "Firebase" },
                { name: "Jest" },
                { name: "Cypress" },
            ],
        },
        {
            name: "Tools & Others",
            skills: [
                { name: "VS Code" },
                { name: "Figma" },
                { name: "Jira" },
                { name: "Responsive Design" },
                { name: "Agile/Scrum" },
                { name: "CI/CD" },
            ],
        },
    ],
    experiences: [
        {
            title: "Senior Frontend Developer",
            company: "TechCorp Inc.",
            period: "2021 - Present",
            description:
                "Led the frontend development team in building a complex SaaS platform. Implemented modern React patterns and optimized performance. Mentored junior developers and established coding standards.",
        },
        {
            title: "Full Stack Developer",
            company: "Innovate Solutions",
            period: "2018 - 2021",
            description:
                "Developed and maintained multiple client projects using React, Node.js, and MongoDB. Collaborated with designers and product managers to deliver high-quality web applications on time and within budget.",
        },
        {
            title: "Junior Web Developer",
            company: "WebDev Agency",
            period: "2016 - 2018",
            description:
                "Started as an intern and quickly progressed to a full-time role. Built responsive websites for clients across various industries. Gained experience with HTML, CSS, JavaScript, and PHP.",
        },
    ],
    education: [
        {
            degree: "Master of Computer Science",
            institution: "University of Technology",
            period: "2014 - 2016",
        },
        {
            degree: "Bachelor of Science in Computer Science",
            institution: "State University",
            period: "2010 - 2014",
        },
    ],
    contact: {
        email: "contact@example.com",
        linkedin: "linkedin.com/in/johndoe",
    },
}

export default function AboutPage() {
    // Use the internal data source
    const data = pageData

    return (
        <main className="my-24 px-4 mx-auto max-w-(--breakpoint-xl)">
            <h1 className="text-4xl font-bold text-center">About Me</h1>
            <p className="text-center text-sm text-muted-foreground mt-4 mb-12">
                Get to know more about my background, skills, and professional journey in web development.
            </p>

            {/* Profile Section */}
            <Card className="mb-12 overflow-hidden">
                <div className="md:flex">
                    <div className="bg-muted p-8 flex flex-col items-center justify-center md:w-1/3">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-background mb-4">
                            <Image
                                src={data.profile.imageSrc || "/placeholder.svg"}
                                alt={`${data.profile.name}'s profile picture`}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-center">{data.profile.name}</h2>
                        <p className="text-muted-foreground mb-4 text-center">{data.profile.title}</p>
                        <div className="flex gap-2 justify-center">
                            {data.profile.socialLinks.map((link) => {
                                const Icon = link.icon
                                return (
                                    <Button key={link.platform} variant="outline" size="icon" asChild>
                                        <Link href={link.url} target="_blank" aria-label={link.platform}>
                                            <Icon className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="p-8 md:w-2/3">
                        <div className="prose dark:prose-invert max-w-none mb-6">
                            {data.profile.bio.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                        <Button asChild>
                            <Link href={data.profile.resumeUrl} target="_blank">
                                Download Resume
                            </Link>
                        </Button>
                    </div>
                </div>
            </Card>

            <div className="grid gap-12">
                {/* Skills Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Skills</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        {data.skillCategories.map((category, index) => (
                            <Card key={index}>
                                <CardContent className="pt-6">
                                    <h3 className="font-semibold mb-4">{category.name}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {category.skills.map((skill, skillIndex) => (
                                            <Badge key={skillIndex} variant="secondary">
                                                {skill.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Experience Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Experience</h2>
                    <div className="space-y-6">
                        {data.experiences.map((experience, index) => (
                            <div key={index} className="border-l-2 border-primary/50 pl-4 pb-2">
                                <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                                    <h3 className="font-semibold">{experience.title}</h3>
                                    <span className="text-sm text-muted-foreground">{experience.period}</span>
                                </div>
                                <div className="text-muted-foreground mb-2">{experience.company}</div>
                                <p>{experience.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Education</h2>
                    <div className="space-y-6">
                        {data.education.map((edu, index) => (
                            <div key={index} className="border-l-2 border-primary/50 pl-4 pb-2">
                                <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                                    <h3 className="font-semibold">{edu.degree}</h3>
                                    <span className="text-sm text-muted-foreground">{edu.period}</span>
                                </div>
                                <div className="text-muted-foreground">{edu.institution}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
                    <p className="mb-4">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-2">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <span>{data.contact.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Linkedin className="h-5 w-5 text-muted-foreground" />
                            <span>{data.contact.linkedin}</span>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

