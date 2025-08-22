import type { Tier } from "./constants";

export interface User {
  id: number,
  email: string,
  avatar: string,
  first_name: string,
  last_name: string,
  role: "admin" | "client",
  tier: Tier
};

export interface PortfolioData {
  domain: string,
  icon: string,
  first_name: string,
  last_name: string,
  email: string,
  location: string,
  avatar: string,
  phone?: string,
  github?: string,
  linkedin?: string,
  twitter?: string,
  instagram?: string,
  facebook?: string,
  whatsapp?: string,
  discord?: string,
  telegram?: string
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

export interface DemoPacket {
  id: number,
  title: string,
  description: string,
  image: string,
  url: string,
  tier: Tier,
  category: string,
  created_at: Date,
  updated_at: Date
}

export interface TestimonialItem {
  id: number,
  name: string,
  role: string,
  company: string,
  content: string,
  rating: number,
  avatar: string,
  featured?: boolean,
  created_at: Date
}