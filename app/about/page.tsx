import Image from "next/image"
import Link from "next/link"
import { Calendar, ExternalLink, Github, Linkedin, Mail, Twitter, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern"
import { cn, getOgImageUrl } from "@/lib/utils"
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
                url: getOgImageUrl('About Me'),
                width: 1200,
                height: 630,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Me",
        description: "Learn more about me and what I do.",
        images: [getOgImageUrl('About Me')],
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

type Achievement = {
    title: string
    period: string
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
    availability: string
    methods: ContactMethod[]
}

// Define the complete page data structure
type AboutPageData = {
    profile: ProfileData
    skillCategories: SkillCategory[]
    experiences: Experience[]
    achievements: Achievement[]
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
            "Hello! I'm Hasbi, a passionate full-stack developer with around 4 years of experience in software development through academic studies, personal projects, and continuous learning.",
            "My journey began in vocational high school majoring in Software Engineering (RPL), where I developed a strong foundation in web development. Now, as an Information Systems student, I continue to sharpen my skills by building real-world projects using modern technologies like React, Node.js, and more."
        ],
        resumeUrl: "https://docs.google.com/document/d/1UwrlveA4pVUxMA6qjox0oxS13XjNRRVGGS5H_K5DDZ8/edit?usp=sharing",
        email: "contact@example.com",
        socialLinks: [
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
                username: "linkedin.com/in/rnghbt",
            },
            {
                platform: "Twitter",
                url: "https://twitter.com/rnghbt",
                icon: Twitter,
                username: "@rnghbt",
            },
            {
                platform: "Email",
                url: "mailto:muhhasbiassidqi18@gmail.com",
                icon: Mail,
                username: "muhhasbiassidqi18@gmail.com",
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
                { name: "Responsive Design" },
            ],
        },
    ],
    experiences: [
        {
            title: "Freelance Full Stack Developer",
            company: "Self-employed",
            period: "2021 - Present",
            description:
                "Worked on various freelance projects for clients, focusing on building responsive and dynamic web apps using React, Next.js, and Node.js.",
        },
        {
            title: "Web Developer Intern",
            company: "PT Global Intermedia",
            period: "2022",
            description:
                "Assisted in developing and maintaining web-based applications. Gained experience in frontend and backend technologies in a real work environment.",
        },
        {
            title: "Cybersecurity Intern",
            company: "PT Gmedia",
            period: "2022",
            description:
                "Worked with the cybersecurity team to monitor and improve network security. Learned best practices in IT security and vulnerability assessment.",
        },
        {
            title: "Software Development Student",
            company: "SMK Muhammadiyah 1 Bantul (Software Engineering)",
            period: "2021 - 2024",
            description:
                "Completed various school projects and participated in competitions related to web development and cybersecurity.",
        },
    ],
    achievements: [
        {
            title: "2nd Place Cyber Security - LKS DIY",
            period: "2021",
        },
        {
            title: "1st Place Provincial Informatics Olympiad Olympicad",
            period: "2021",
        },
        {
            title: "Gold Medal National Informatics Olympiad Olympicad",
            period: "2021",
        },
        {
            title: "Web Technology LKS Mentor (3rd Place)",
            period: "2022",
        },
        {
            title: "President of Technopark Musaba School Community",
            period: "2020 - 2022",
        },
        {
            title: "Member of Jogja Cyber Security",
            period: "2023 - Present",
        },
    ],
    education: [
        {
            degree: "Bachelor of Information Systems (Ongoing)",
            institution: "UPN Veteran Yogyakarta",
            period: "2024 - Present",
        },
        {
            degree: "Vocational High School (Rekayasa Perangkat Lunak)",
            institution: "SMK Muhammadiyah 1 Bantul",
            period: "2021 - 2024",
        },
    ],
    contact: {
        email: "muhhasbiassidiqi18@gmail.com",
        linkedin: "linkedin.com/in/rnghbt",
        availability: "Available for freelance work",
        methods: [
            {
                type: "Email",
                value: "muhhasbiassidiqi18@gmail.com",
                icon: Mail,
                url: "mailto:muhhasbiassidiqi18@gmail.com",
                label: "Send an email",
            },
            {
                type: "LinkedIn",
                value: "linkedin.com/in/rnghbt",
                icon: Linkedin,
                url: "https://linkedin.com/in/rnghbt",
                label: "Connect on LinkedIn",
            }
        ],
    },
}

export default function AboutPage() {
    const data = pageData

    return (
        <main className="mx-auto max-w-7xl sm:px-4 overflow-hidden px-2 min-h-screen">
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
            <h1 className="text-4xl font-bold text-center mt-12 sm:mt-24">About Me</h1>
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

            <div className="space-y-12 mb-12">
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

                {/* Achievements Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Achievements</h2>
                    <div className="space-y-6">
                        {data.achievements.map((achievement, index) => (
                            <div key={index} className="border-l-2 border-yellow-500/50 pl-4 pb-2">
                                <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                                    <h3 className="font-semibold">{achievement.title}</h3>
                                    <span className="text-sm text-muted-foreground">{achievement.period}</span>
                                </div>
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
                <section id="contact">
                    <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
                    <div className="md:grid space-y-6 md:gap-6 md:grid-cols-2 ">
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
                                                            className="text-sm text-muted-foreground hover:underline flex sm:flex-row flex-col sm:justify-start justify-center sm:items-center gap-1"
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
                                    <div className="flex gap-2 flex-wrap">
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

