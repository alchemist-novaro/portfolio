export interface User {
  id: number,
  email: string,
  avatar: string,
  first_name: string,
  last_name: string,
  role: "admin" | "client"
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