import type { LucideProps } from "lucide-react";
import type { JSX, ReactNode } from "react";

export type RouteType = "f-resources" | "h-navbar" | "f-legal";
export type Theme = "dark" | "light" | "system";
export type Tier = "free" | "pro" | "pro+";
export type DemoLabel = "FREE" | "PRO" | "PRO+";
export type ButtonVariant = "default" | "secondary" | "outline";
export type ProjectType = "Computer Vision" | "Chatbot" | "Agent" | "Generative AI" | "Full Stack" | "Blockchain" | "Other";
export type DemoInputType = "text" | "image" | "video" | "mesh" | "pdf" | "audio" | "other";
export type DemoOutputType = "text" | "image" | "audio" | "video" | "mesh";
export type DemoCategory = "Image Generation" | "Audio Generation" | "Video Generation" | "3D Generation" | "Large Language Model" | "Vision Language Model" | "Computer Vision";
export type MachineType = "CPU" | "GPU";
export type TierType = "centralized" | "decentralized";

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
    none: Route[],
    auth: Route[]
}

export interface SocialLink {
    name: string,
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
    href: string,
    color: string
}

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

export interface ShowcaseURLButton {
    url: string,
    label: string,
    variant: ButtonVariant,
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
    disabled?: boolean
}

export interface ShowcaseItem {
    id: number | string,
    title: string,
    card: ReactNode,
    description: string,
    buttons?: ShowcaseURLButton[]
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

export interface TierConfigButton {
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
    label: string,
    variant: ButtonVariant,
    disabled?: boolean,
    type?: TierType
}

export interface TierConfig {
    label: DemoLabel,
    color: string,
    buttons: TierConfigButton[]
}

export interface Price {
    centralized: string,
    decentralized?: string
}

export interface DemoItem {
    id: number | string,
    title: string,
    description: string,
    image: string,
    url: string,
    tier: Tier,
    config: TierConfig,
    category: DemoCategory,
    inputs: DemoInput[],
    outputs: DemoOutput[],
    machine_type: MachineType,
    vram_usage?: string,
    price: Price,
    created_at: Date,
    updated_at: Date
}

export interface DemoInput {
    name: string,
    type: DemoInputType,
    default?: string,
    placeholder?: string,
    required?: boolean
}

export interface DemoOutput {
    name: string,
    type: DemoOutputType,
    placeholder?: string
}