import Image from "next/image"
import Link from "next/link"
import { Calendar, ExternalLink, Github, Linkedin, Mail, Phone, Twitter, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern"
import { cn } from "@/lib/utils"
import ContactForm from "./contact-form"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "About Me",
    description: "Learn more about me and what I do.",
    openGraph: {
      title: "About Me",
      description: "Learn more about me and what I do.",
      images: [
        {
          url: "/api/og?title=About%20Me",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "About Me",
      description: "Learn more about me and what I do.",
      images: ["/api/og?title=About%20Me"],
    },
  };
  

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

type ContactMethod = {
    type: string
    value: string
    icon: LucideIcon
    url?: string
    label?: string
}

type ContactInfo = {
    email: string
    linkedin: string
    phone: string
    availability: string
    methods: ContactMethod[]
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
        name: "Hasbi Assidiqi",
        title: "Full Stack Developer",
        imageSrc: "/avatar.jpeg",
        bio: [
            "Hello! I'm Hasbi, a passionate full-stack developer with over 5 years of experience building web applications. I specialize in creating responsive, user-friendly interfaces and robust backend systems.",
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
        phone: "+1 (555) 123-4567",
        availability: "Available for freelance work",
        methods: [
            {
                type: "Email",
                value: "contact@example.com",
                icon: Mail,
                url: "mailto:contact@example.com",
                label: "Send an email",
            },
            {
                type: "LinkedIn",
                value: "linkedin.com/in/johndoe",
                icon: Linkedin,
                url: "https://linkedin.com/in/johndoe",
                label: "Connect on LinkedIn",
            },
            {
                type: "Phone",
                value: "+1 (555) 123-4567",
                icon: Phone,
                url: "tel:+15551234567",
                label: "Call me",
            }
        ],
    },
}

export default function AboutPage() {
    const data = pageData

    return (
        <main className="my-24 px-4 mx-auto max-w-(--breakpoint-xl)">
            <div
                className={cn(
                    "fixed inset-0 -z-1 size-[700px] opacity-60",
                    "[background-size:20px_20px]",
                    "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                    "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
                )}
            >
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] "></div>
            </div>
            <h1 className="text-4xl font-bold text-center">About Me</h1>
            <p className="text-center text-sm text-muted-foreground mt-4 mb-12">
                Get to know more about my background, skills, and professional journey in web development.
            </p>

            {/* Profile Section */}
            <Card className="mb-12 overflow-hidden">
                <div className="md:flex">
                    <div className="relative p-8 flex flex-col items-center justify-center md:w-1/3">
                        <AnimatedGridPattern
                            numSquares={15}
                            maxOpacity={0.1}
                            duration={3}
                            repeatDelay={1}
                            strokeDasharray={"4 2"}
                            className={cn(
                                "[mask-image:linear-gradient(to_bottom_right,white,transparent)]",
                                "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                            )}
                        />
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
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Get In Touch</CardTitle>
                                <CardDescription>
                                    I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your
                                    vision.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {data.contact.methods.map((method, index) => {
                                        const Icon = method.icon
                                        return (
                                            <div key={index} className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                                <div className="space-y-0.5">
                                                    <p className="text-sm font-medium">{method.type}</p>
                                                    {method.url ? (
                                                        <Link
                                                            href={method.url}
                                                            className="text-sm text-muted-foreground hover:underline flex items-center gap-1"
                                                            target={method.url.startsWith("http") ? "_blank" : undefined}
                                                        >
                                                            {method.value}
                                                            {method.label && (
                                                                <span className="text-xs text-primary flex items-center">
                                                                    {method.label} <ExternalLink className="h-3 w-3 ml-1" />
                                                                </span>
                                                            )}
                                                        </Link>
                                                    ) : (
                                                        <p className="text-sm text-muted-foreground">{method.value}</p>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="w-full">
                                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                                        <Calendar className="h-4 w-4 inline mr-1" />
                                        <span>{data.contact.availability}</span>
                                    </p>
                                    <div className="flex gap-2">
                                        {data.profile.socialLinks.map((link) => {
                                            const Icon = link.icon
                                            return (
                                                <Button key={link.platform} variant="outline" size="sm" asChild>
                                                    <Link href={link.url} target="_blank">
                                                        <Icon className="h-4 w-4 mr-2" /> {link.platform}
                                                    </Link>
                                                </Button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Send Me a Message</CardTitle>
                                <CardDescription>Fill out the form below and I&apos;ll get back to you as soon as possible.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ContactForm />
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>
        </main>
    )
}

