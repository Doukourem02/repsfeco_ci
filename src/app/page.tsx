"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Services from "@/components/Services";
import OurWork from "@/components/OurWork";
import About from "@/components/About";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <div className="dark:bg-black relative">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Services />
      <OurWork />
      <About />
      <ContactUs />
      <Footer />

      <CustomCursor />
    </div>
  );
}

