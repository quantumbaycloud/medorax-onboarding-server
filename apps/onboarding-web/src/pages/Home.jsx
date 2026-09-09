import Hero from "../components/sections/Hero";
import Stats from "../components/sections/Stats";
import About from "../components/sections/About";
import Products from "../components/sections/Products";
import AISection from "../components/sections/AISection";
import Network from "../components/sections/Network";
import WhyMedorax from "../components/sections/WhyMedorax";
import Solutions from "../components/sections/Solutions";
import CTA from "../components/sections/CTA";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>MEDORAX - Digital Pharmacy Infrastructure</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="India's next-generation pharmacy operating system. AI-powered ERP and procurement ecosystem for pharmacies." />
      </Helmet>
      <Hero />
      <Stats />
      <About />
      <Products />
      <AISection />
      <Network />
      <WhyMedorax />
      <Solutions />
      <CTA />
    </>
  );
}