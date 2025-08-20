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
import type { Routes } from "@/types/constants";

export const routes: Routes = {
    unauthorized: [
        {
            type: ["h-logo", "f-resources"],
            name: "Home",
            path: "/",
            component: null // Landing
        },
    ],
    authorized: [
        {
            type: ["h-logo", "f-resources"],
            name: "Home",
            path: "/",
            component: null // Home
        },
        {
            type: ["h-navbar", "f-resources"],
            name: "Projects",
            path: "/projects",
            component: null // Projects
        },
        {
            type: ["h-navbar"],
            name: "Subscription",
            path: "subscription",
            component: null // Subscription
        },
        {
            type: ["h-icon"],
            name: "Alerts",
            path: "alerts",
            component: null // Alerts
        }
    ],
    admin: [
        {
            type: ["h-navbar"],
            name: "Admin",
            path: "/admin",
            component: null // Admin
        }
    ],
    default: [
        {
            type: ["h-navbar", "f-resources"],
            name: "Portfolio",
            path: "/portfolio",
            component: null // Portfolio
        },
        {
            type: ["h-navbar", "f-resources"],
            name: "Demos",
            path: "/demos",
            component: null // Demos
        },
        {
            type: ["h-navbar", "f-resources"],
            name: "Contact",
            path: "/contact",
            component: null // Contact
        },
        {
            type: ["f-legal"],
            name: "Privacy Policy",
            path: "/privacy-policy",
            component: null // PrivacyPolicy
        },
        {
            type: ["f-legal"],
            name: "Terms of Service",
            path: "/terms-of-service",
            component: null // TermsOfService
        },
        {
            type: ["f-legal"],
            name: "GDPR Compliance",
            path: "/gdpr-compliance",
            component: null // GDPRCompliance
        },
        {
            type: ["f-legal"],
            name: "Cookie Policy",
            path: "/cookie-policy",
            component: null // CookiePolicy
        }
    ],
    none: [
        {
            type: ["not-found"],
            name: "Not Found",
            path: "/404",
            component: NotFound
        }
    ]
}