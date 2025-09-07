import {
    Home as HomeIcon,
    FolderOpen,
    Play,
    CreditCard,
    Bell,
    ShieldCheck,
    // NotebookPen,
    Mails,
    Shield,
    CircleX,
    LogIn,
    Plus,
    KeyRound,
    UserPen
} from "lucide-react";
import {
    Login,
    // Profile,
    RePwd,
    Register,
    Verify,
    VerifyGoogle
} from "@/pages/auth";
import {
    Home
} from "@/pages/authorized";
import {
    Contact,
    Demos,
    Portfolio
} from "@/pages/default";
import {
    NotFound
} from "@/pages/none";
import {
    Landing
} from "@/pages/unauthorized";
import type { Routes } from "@/types/constants";

export const routes: Routes = {
    unauthorized: [
        {
            type: ["f-resources"],
            name: "Home",
            path: "/",
            component: Landing,
            icon: HomeIcon
        },
    ],
    authorized: [
        {
            type: ["f-resources"],
            name: "Home",
            path: "/",
            component: Home,
            icon: HomeIcon
        },
        // {
        //     type: ["h-navbar", "f-resources"],
        //     name: "Projects",
        //     path: "/projects",
        //     component: NotFound, // Projects
        //     icon: NotebookPen
        // },
        {
            type: ["h-navbar"],
            name: "Subscription",
            path: "subscription",
            component: NotFound, // Subscription
            icon: CreditCard
        },
        {
            type: [],
            name: "Alerts",
            path: "alerts",
            component: NotFound, // Alerts
            icon: Bell
        }
    ],
    admin: [
        {
            type: ["h-navbar"],
            name: "Admin",
            path: "/admin",
            component: NotFound, // Admin
            icon: ShieldCheck
        }
    ],
    default: [
        {
            type: ["h-navbar", "f-resources"],
            name: "Portfolio",
            path: "/portfolio",
            component: Portfolio,
            icon: FolderOpen
        },
        {
            type: ["h-navbar", "f-resources"],
            name: "Demos",
            path: "/demos",
            component: Demos,
            icon: Play
        },
        {
            type: ["h-navbar", "f-resources"],
            name: "Contact",
            path: "/contact",
            component: Contact,
            icon: Mails
        },
        {
            type: ["f-legal"],
            name: "Privacy Policy",
            path: "/privacy-policy",
            component: NotFound, // PrivacyPolicy
            icon: Shield
        },
        {
            type: ["f-legal"],
            name: "Terms of Service",
            path: "/terms-of-service",
            component: NotFound, // TermsOfService
            icon: Shield
        },
        {
            type: ["f-legal"],
            name: "GDPR Compliance",
            path: "/gdpr-compliance",
            component: NotFound, // GDPRCompliance
            icon: Shield
        },
        {
            type: ["f-legal"],
            name: "Cookie Policy",
            path: "/cookie-policy",
            component: NotFound, // CookiePolicy
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
    ],
    auth: [
        {
            type: [],
            name: "Login",
            path: "/login",
            component: Login,
            icon: LogIn
        },
        {
            type: [],
            name: "Register",
            path: "/register",
            component: Register,
            icon: Plus
        },
        {
            type: [],
            name: "Reset Password",
            path: "/re-pwd",
            component: RePwd,
            icon: KeyRound
        },
        {
            type: [],
            name: "Verify Email",
            path: "/verify",
            component: Verify,
            icon: ShieldCheck
        },
        {
            type: [],
            name: "Google Verify",
            path: "/verify/google",
            component: VerifyGoogle,
            icon: ShieldCheck
        },
        {
            type: [],
            name: "Profile Setup",
            path: "/profile",
            component: NotFound, // Profile
            icon: UserPen
        }
    ]
}