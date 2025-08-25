import HeroSection from "@/components/home/hero-section";
import SkillsShowcase from "@/components/home/skills-showcase";
import ExperienceSection from "@/components/home/experience-section";
import PortfolioShowcase from "@/components/home/portfolio-showcase";
import DemosShowcase from "@/components/home/demos-showcase";
import TestimonialsShowcase from "@/components/home/testimonials-showcase";

export function Landing() {
  return (
    <>
      <HeroSection />
      <SkillsShowcase />
      <ExperienceSection />
      <PortfolioShowcase />
      <DemosShowcase />
      <TestimonialsShowcase />
    </>
  );
}

export default Landing;