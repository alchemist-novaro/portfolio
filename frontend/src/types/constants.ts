import type { LucideProps } from "lucide-react";
import type { JSX, ReactNode } from "react";

export type RouteType = "f-resources" | "h-navbar" | "f-legal";
export type Theme = "dark" | "light" | "system";

export interface Route {
    type: RouteType[],
    name: string,
    path: string,
    component: () => JSX.Element,
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

export interface Routes {
    unauthorized: Route[],
    authorized: Route[],
    default: Route[],
    admin: Route[],
    none: Route[]
}

export interface SocialLink {
    name: string,
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
    href: string,
    color: string
}

export type SocialLinks = SocialLink[];

export interface FooterLabel {
    name: string
}

export interface FooterLinks {
    services: FooterLabel[],
    resources: Route[],
    legal: Route[]
}

export interface ThemeProviderState {
    theme: Theme,
    setTheme: (theme: Theme) => void
}

export interface CircularShowcaseItem {
    id: number,
    title: string,
    card: ReactNode,
    description: string,
    category?: string,
    url?: string,
    url_label?: string
}

export interface PortfolioItem {
    id: number,
    title: string,
    description: string,
    image: string,
    redirect_url: string,
    skills: string[],
    featured?: boolean,
    created_at: Date,
    updated_at: Date
}

export interface ExperienceData {
    title: string,
    company: string,
    location: string,
    period: string,
    type: string,
    description: string,
    achievements: string[],
    technologies: string[]
}