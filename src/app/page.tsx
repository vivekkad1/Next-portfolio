import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import WorkSection from "@/components/sections/WorkSection";
import SkillsSection from "@/components/sections/SkillsSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <WorkSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
