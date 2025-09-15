import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Mail, Clock, MessageCircle, Linkedin, Github, Twitter, Facebook, Send, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { contactSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ContactPacket } from "@/types/packets";
import type { ProjectType, SocialLink } from "@/types/constants";
import { apiRequest } from "@/lib/query-client";

const projectTypes: ProjectType[] = [
    "Computer Vision",
    "Chatbot",
    "Agent",
    "Generative AI",
    "Full Stack",
    "Blockchain",
    "Other"
]

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

export function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const { toast } = useToast();

    const form = useForm<ContactPacket>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            project_type: "Generative AI",
            message: "",
        },
    });

    const mutation = useMutation({
        mutationFn: async (data: ContactPacket) => {
            await apiRequest("POST", "/api/contact", {
                data: data
            });
        },
        onSuccess: () => {
            setSubmitted(true);
            form.reset();
            toast({
                title: "Message sent successfully!",
                description: "Thank you for your inquiry. I'll get back to you soon.",
            });
        },
        onError: (_) => {
            toast({
                title: "Failed to send message",
                description: "Please try again later or contact me directly.",
                variant: "destructive",
            });
        },
    });

    const onSubmit = (data: ContactPacket) => {
        mutation.mutate(data);
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl mx-auto text-center"
            >
                <Card className="shadow-lg">
                    <CardContent className="pt-6">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="mb-4"
                        >
                            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                        </motion.div>
                        <h3 className="text-2xl font-bold mb-2">Message Sent Successfully!</h3>
                        <p className="text-muted-foreground mb-6">
                            Thank you for reaching out. I'll review your message and get back to you within 24 hours.
                        </p>
                        <Button
                            onClick={() => setSubmitted(false)}
                            variant="outline"
                            data-testid="send-another-message"
                        >
                            Send Another Message
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
        >
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Start Your AI Journey</CardTitle>
                    <CardDescription>
                        Fill out the form below and I'll get back to you within 24 hours.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <motion.div variants={itemVariants}>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Your full name"
                                                    {...field}
                                                    data-testid="contact-form-name"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="your.email@example.com"
                                                    {...field}
                                                    data-testid="contact-form-email"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <FormField
                                    control={form.control}
                                    name="project_type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger data-testid="contact-form-project-type">
                                                        <SelectValue placeholder="Select a project type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {projectTypes.map((type) => (
                                                        <SelectItem key={type} value={type}>
                                                            {type}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Message</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell me about your project requirements, timeline, and goals..."
                                                    rows={5}
                                                    {...field}
                                                    data-testid="contact-form-message"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full font-medium"
                                    disabled={mutation.isPending}
                                    data-testid="contact-form-submit"
                                >
                                    {mutation.isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export function Contact() {
    const contactInfo = [
        {
            icon: Mail,
            title: "Email",
            details: import.meta.env.VITE_EMAIL_ADDRESS,
            description: "Send me an email anytime",
        },
        {
            icon: MapPin,
            title: "Location",
            details: import.meta.env.VITE_LOCATION,
            description: "Available for remote work worldwide",
        },
        {
            icon: Clock,
            title: "Response Time",
            details: "Within 24 hours",
            description: "I typically respond quickly",
        },
    ];

    const socialLinks: SocialLink[] = [
        {
            name: "GitHub",
            icon: Github,
            href: import.meta.env.VITE_GITHUB
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            href: import.meta.env.VITE_LINKEDIN
        },
        {
            name: "Twitter",
            icon: Twitter,
            href: import.meta.env.VITE_TWITTER
        },
        {
            name: "Facebook",
            icon: Facebook,
            href: import.meta.env.VITE_FACEBOOK
        }
    ].filter((link): link is SocialLink => Boolean(link));

    return (
        <section className="py-32 bg-background">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">
                        Let's work together!!!
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Ready to transform your business with cutting-edge AI solutions?
                        I'm here to help you navigate the future of technology and turn your ideas into reality.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-1 space-y-8"
                    >
                        {/* Contact Details */}
                        <div className="space-y-6">
                            {contactInfo.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    >
                                        <Card className="p-4 hover:shadow-lg transition-shadow duration-300">
                                            <CardContent className="p-0">
                                                <div className="flex items-start space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                                            <Icon className="h-6 w-6 text-bright-primary" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-lg">{item.title}</h3>
                                                        <p className="text-bright-primary font-medium">{item.details}</p>
                                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
                            <div className="flex space-x-4">
                                {socialLinks.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <motion.a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-12 h-12 rounded-lg bg-background border border-border hover:border-primary/50 flex items-center justify-center transition-colors duration-300 hover:text-bright-primary"
                                            data-testid={`social-link-${social.name.toLowerCase()}`}
                                        >
                                            <Icon className="h-6 w-6" />
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-2"
                    >
                        <ContactForm />
                    </motion.div>
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="text-center mt-20"
                >
                    <Card className="bg-gradient-to-r from-primary/5 to-blue-600/5 border-primary/20">
                        <CardContent className="p-8">
                            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                                From machine learning models to custom AI solutions, I'm here to help you
                                harness the power of artificial intelligence for your business success.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2" />
                                    Quick Response
                                </span>
                                <span className="flex items-center">
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Free Consultation
                                </span>
                                <span className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    Remote Friendly
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}

export default Contact;