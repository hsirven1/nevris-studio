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
          {/* Hero almost fills the viewport; black bar peeks in as a scroll cue */}
          <div className="relative">
            <div className="relative flex min-h-[min(100dvh,44rem)] flex-col overflow-hidden md:min-h-[calc(100dvh-6.5rem)]">
              <SiteAtmosphere />
              <HeroAntigravity />
              <StatusBar />
              <Hero />
            </div>
            <SelectedWorkHeader />
          </div>

          <SelectedWork />
          <HowWeWork />
          <Contact />
          <SiteFooter />
        </div>
      </ContactProvider>
    </div>
  );
}
