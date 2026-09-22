import { SiteAtmosphere } from "@/components/atmosphere/SiteAtmosphere";
import { Contact } from "@/components/Contact";
import { ContactProvider } from "@/components/ContactProvider";
import { Founder } from "@/components/Founder";
import { Hero } from "@/components/Hero";
import { HowWeWork } from "@/components/HowWeWork";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { SelectedWork } from "@/components/SelectedWork";
import { SelectedWorkHeader } from "@/components/SelectedWorkHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DesktopNavCapsule, StatusBar } from "@/components/StatusBar";

export default function Home() {
  return (
    <div className="page-shell">
      <div className="nv-grain" aria-hidden />
      <ContactProvider>
        <div className="relative z-[4] max-md:pb-[calc(4.75rem+env(safe-area-inset-bottom))]">
          {/* Desktop: short of full viewport so Discover peeks. Mobile: content height. */}
          <div className="relative">
            <div className="relative flex flex-col overflow-x-clip md:h-[calc(100dvh-8.75rem)]">
              <SiteAtmosphere />
              <StatusBar />
              <Hero />
            </div>
            <SelectedWorkHeader />
          </div>

          <SelectedWork />
          <HowWeWork />
          <Founder />
          <Contact />
          <SiteFooter />
        </div>
        {/* Outside page stacking contexts so it stays above Discover / work */}
        <DesktopNavCapsule />
        <MobileBottomNav />
      </ContactProvider>
    </div>
  );
}
