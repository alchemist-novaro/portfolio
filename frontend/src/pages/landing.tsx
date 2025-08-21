import HeroSection from "@/components/home/hero-section";
import SkillsShowcase from "@/components/home/skills-showcase";
import ExperienceSection from "@/components/home/experience-section";
import PortfolioShowcase from "@/components/home/portfolio-showcase";

export default function Landing() {
  return (
    <>
      <HeroSection />
      <SkillsShowcase />
      <ExperienceSection />
      <PortfolioShowcase />
      {/*<DemoShowcase />
      <Testimonials /> */}
    </>
  );
}
