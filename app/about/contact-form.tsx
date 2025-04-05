"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}
export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const { subject, message } = formData;
        const mailtoLink = `mailto:muhhasbiassidiqi18@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}&bcc=dakota@example.com`;
        window.open(mailtoLink, "_blank");
    };
    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Input id="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <Input id="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange} />
                </div>
            </div>
            <div className="space-y-2">
                <Input id="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
            </div>
            <div className="space-y-2">
                <Textarea id="message" placeholder="Your Message" className="min-h-[120px]" value={formData.message} onChange={handleChange} />
            </div>
            <Button type="submit" className="w-full">
                Send Message
            </Button>
        </form>
    )
}