import Hero from "@/components/sections/Hero";
import ProofBar from "@/components/sections/ProofBar";
import Capabilities from "@/components/sections/Capabilities";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Process from "@/components/sections/Process";
import TechStack from "@/components/sections/TechStack";
import AboutPreview from "@/components/sections/AboutPreview";
import Testimonials from "@/components/sections/Testimonials";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofBar />
      <Capabilities />
      <FeaturedWork />
      <Process />
      <TechStack />
      <AboutPreview />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
