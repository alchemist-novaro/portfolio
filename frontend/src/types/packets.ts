export interface User {
  id: number,
  email: string,
  role: "admin" | "client"
};

export interface PortfolioData {
  domain: string,
  icon: string,
  first_name: string,
  last_name: string,
  email: string,
  location: string,
  phone: string | undefined | null,
  github: string | undefined | null,
  linkedin: string | undefined | null,
  twitter: string | undefined | null,
  instagram: string | undefined | null,
  facebook: string | undefined | null,
  whatsapp: string | undefined | null,
  discord: string | undefined | null,
  telegram: string | undefined | null
}