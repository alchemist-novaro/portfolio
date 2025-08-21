import type { LucideProps } from "lucide-react";
import type { JSX, ReactNode } from "react";

export type RouteType = "f-resources" | "h-navbar" | "f-legal";
export type Theme = "dark" | "light" | "system";
export type Tier = "free" | "pro" | "pro+";
export type DemoLabel = "FREE" | "PRO" | "PRO+";
export type ButtonVariant = "default" | "secondary" | "outline";

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
    url_icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
    url_label?: string,
    url_variant?: ButtonVariant,
    url_disabled?: boolean
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

export interface DemoConfig {
    label: DemoLabel,
    color: string,
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
    button_text: string,
    button_variant: ButtonVariant,
    disabled?: boolean
}

export interface DemoItem {
  id: number,
  title: string,
  description: string,
  image: string,
  url: string,
  tier: Tier,
  config: DemoConfig,
  category: string,
  created_at: Date,
  updated_at: Date
}