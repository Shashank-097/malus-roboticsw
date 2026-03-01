import IntroReveal from "@/components/IntroReveal";
import Hero from "@/components/sections/hero";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import LookbookSection from "@/components/sections/LookbookSection";
import SystemNarrative from "@/components/SystemNarrative";



export default function Home() {
  return (
    <>
      <IntroReveal />
       <SystemNarrative />
      
      <AboutSection />
      <ServicesSection/>
      <LookbookSection/>
       
    </>
  );
}