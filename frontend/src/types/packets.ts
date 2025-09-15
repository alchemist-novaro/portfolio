import type { Tier, ProjectType, DemoCategory, DemoInput, DemoOutput, UserRole, MachineType /* , Price */ } from "./constants";

export interface UserProfile {
  avatar?: string,
  position: string,
  company: string,
  country: string
}

export interface User {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar?: string,
  role: UserRole,
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
  id: string,
  title: string,
  description: string,
  image: string,
  tier: Tier,
  category: DemoCategory,
  inputs: DemoInput[],
  outputs: DemoOutput[],
  machine_type: MachineType,
  vram_usage?: string,
  price: string, // Price,
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

export interface ContactPacket {
  name: string,
  email: string,
  project_type: ProjectType,
  message: string
}