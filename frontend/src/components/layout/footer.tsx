import { motion } from "framer-motion";
import { Link } from "wouter";
import { Code, Linkedin, Github } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { routes } from "@/routes";
import type { SocialLink, FooterLinks } from "@/types/constants";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
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
            duration: 0.6,
        },
    },
};

export default function Footer() {
    const { isAuthenticated } = useAuth();

    const socialLinks: SocialLink[] = [
        {
            name: "GitHub",
            icon: Github,
            href: ""
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            href: ""
        }
    ].filter((link): link is SocialLink => Boolean(link));

    const footerLinks: FooterLinks = {
        services: [
            { name: "Chatbots" },
            { name: "Computer Vision" },
            { name: "AI Agents" },
            { name: "Generative AI" },
        ],
        resources: [
            ...(isAuthenticated ?
                routes.authorized.filter(route => route.type.includes("f-resources")) :
                routes.unauthorized.filter(route => route.type.includes("f-resources"))),
            ...routes.default.filter(route => route.type.includes("f-resources"))
        ],
        legal: [
            ...routes.default.filter(route => route.type.includes("f-legal"))
        ],
    };

    return (
        <>
            {/* Main Footer */}
            <footer className="bg-secondary text-secondary-foreground">
                <div className="container mx-auto px-6 py-16">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-4 gap-8"
                    >
                        {/* Brand Section */}
                        <motion.div variants={itemVariants} className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Code className="h-6 w-6" />
                                <span className="text-xl font-bold">
                                    Alchemist Novaro
                                </span>
                            </div>
                            <p className="text-secondary-foreground/80 text-sm leading-relaxed">
                                AI Solutions Architect specializing in traditional ML, computer vision, generative AI, chatbots, and AI agents — building centralized and decentralized AI systems that power scalable applications and business transformation
                            </p>
                            <div className="flex space-x-4">
                                {socialLinks.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <motion.a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            className={`text-secondary-foreground/60 hover:text-bright-primary transition-colors duration-200`}
                                            data-testid={`social-link-${social.name.toLowerCase()}`}
                                        >
                                            <Icon className="h-5 w-5" />
                                            <span className="sr-only">{social.name}</span>
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Services */}
                        <motion.div variants={itemVariants}>
                            <h3 className="text-lg font-semibold mb-4 text-secondary-foreground">
                                Services
                            </h3>
                            <ul className="space-y-2">
                                {footerLinks.services.map((link) => (
                                    <li key={link.name}>
                                        <motion.div
                                            className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors duration-200 text-sm"
                                            data-testid={`footer-service-${link.name.toLowerCase().replace(" ", "-")}`}
                                        >
                                            {link.name}
                                        </motion.div>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Resources */}
                        <motion.div variants={itemVariants}>
                            <h3 className="text-lg font-semibold mb-4 text-secondary-foreground">
                                Resources
                            </h3>
                            <ul className="space-y-2">
                                {footerLinks.resources.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.path}>
                                            <motion.div
                                                whileHover={{ x: 4 }} 
                                                className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors duration-200 text-sm" 
                                                data-testid={`footer-resource-${link.name.toLowerCase().replace(" ", "-")}`}
                                            > 
                                                {link.name} 
                                            </motion.div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Legal */}
                        <motion.div variants={itemVariants}>
                            <h3 className="text-lg font-semibold mb-4 text-secondary-foreground">
                                Legal
                            </h3>
                            <ul className="space-y-2">
                                {footerLinks.legal.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.path}>
                                            <motion.div
                                                whileHover={{ x: 4 }}
                                                className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors duration-200 text-sm"
                                                data-testid={`footer-legal-${link.name.toLowerCase().replace(" ", "-")}`}
                                            >
                                                {link.name}
                                            </motion.div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>

                    {/* Bottom Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="border-t border-secondary-foreground/20 mt-12 pt-8 text-center"
                    >
                        <p className="text-secondary-foreground/60 text-sm">
                            &copy; 2025 Alchemist Novaro. All rights reserved.
                        </p>
                    </motion.div>
                </div>
            </footer>
        </>
    );
}
