import { SiteAtmosphere } from "@/components/atmosphere/SiteAtmosphere";
import { Contact } from "@/components/Contact";
import { ContactProvider } from "@/components/ContactProvider";
import { Hero } from "@/components/Hero";
import { HeroAntigravity } from "@/components/hero/HeroAntigravity";
import { HowWeWork } from "@/components/HowWeWork";
import { SelectedWork } from "@/components/SelectedWork";
import { SelectedWorkHeader } from "@/components/SelectedWorkHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StatusBar } from "@/components/StatusBar";

export default function Home() {
  return (
    <div className="page-shell">
      <div className="nv-grain" aria-hidden />
      <ContactProvider>
        <div className="relative z-[4]">
          {/* Hero zone — lavender + animation clip exactly at the black banner */}
          <div className="relative overflow-hidden">
            <SiteAtmosphere />
            <HeroAntigravity />
            <StatusBar />
            <Hero />
            <div
              className="h-[clamp(2.75rem,7vh,4.5rem)]"
              aria-hidden
            />
          </div>

          <SelectedWorkHeader />
          <SelectedWork />
          <HowWeWork />
          <Contact />
          <SiteFooter />
        </div>
      </ContactProvider>
    </div>
  );
}
