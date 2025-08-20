import type { LucideProps } from "lucide-react";
import type { JSX } from "react";

export type RouteType = "f-resources" | "h-navbar" | "f-legal";

export interface Route {
    type: RouteType[],
    name: string,
    path: string,
    component: (() => JSX.Element) | null,
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