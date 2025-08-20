import NotFound from "@/pages/not-found";
// import Landing from "@/pages/landing";
// import Home from "@/pages/home";
// import Portfolio from "@/pages/portfolio";
// import Demos from "@/pages/demos";
// import Projects from "@/pages/projects";
// import Admin from "@/pages/admin";
// import Subscription from "@/pages/subscription";
// import Contact from "@/pages/contact";
// import TermsOfService from "@/pages/terms-of-service";
// import PrivacyPolicy from "@/pages/privacy-policy";
// import GDPRCompliance from "@/pages/gdpr-compliance";
// import CookiePolicy from "@/pages/cookie-policy";
// import Alerts from "@/pages/alerts";
import {
    Home,
    FolderOpen,
    Play,
    CreditCard,
    Bell,
    ShieldCheck,
    NotebookPen,
    Mails,
    Shield,
    CircleX
} from "lucide-react";
import type { Routes } from "@/types/constants";

export const routes: Routes = {
    unauthorized: [
        {
            type: ["f-resources"],
            name: "Home",
            path: "/",
            component: null, // Landing
            icon: Home
        },
    ],
    authorized: [
        {
            type: ["f-resources"],
            name: "Home",
            path: "/",
            component: null, // Home
            icon: Home
        },
        {
            type: ["h-navbar", "f-resources"],
            name: "Projects",
            path: "/projects",
            component: null, // Projects
            icon: NotebookPen
        },
        {
            type: ["h-navbar"],
            name: "Subscription",
            path: "subscription",
            component: null, // Subscription
            icon: CreditCard
        },
        {
            type: [],
            name: "Alerts",
            path: "alerts",
            component: null, // Alerts
            icon: Bell
        }
    ],
    admin: [
        {
            type: ["h-navbar"],
            name: "Admin",
            path: "/admin",
            component: null, // Admin
            icon: ShieldCheck
        }
    ],
    default: [
        {
            type: ["h-navbar", "f-resources"],
            name: "Portfolio",
            path: "/portfolio",
            component: null, // Portfolio
            icon: FolderOpen
        },
        {
            type: ["h-navbar", "f-resources"],
            name: "Demos",
            path: "/demos",
            component: null, // Demos
            icon: Play
        },
        {
            type: ["h-navbar", "f-resources"],
            name: "Contact",
            path: "/contact",
            component: null, // Contact
            icon: Mails
        },
        {
            type: ["f-legal"],
            name: "Privacy Policy",
            path: "/privacy-policy",
            component: null, // PrivacyPolicy
            icon: Shield
        },
        {
            type: ["f-legal"],
            name: "Terms of Service",
            path: "/terms-of-service",
            component: null, // TermsOfService
            icon: Shield
        },
        {
            type: ["f-legal"],
            name: "GDPR Compliance",
            path: "/gdpr-compliance",
            component: null, // GDPRCompliance
            icon: Shield
        },
        {
            type: ["f-legal"],
            name: "Cookie Policy",
            path: "/cookie-policy",
            component: null, // CookiePolicy
            icon: Shield
        }
    ],
    none: [
        {
            type: [],
            name: "Not Found",
            path: "/404",
            component: NotFound,
            icon: CircleX
        }
    ]
}