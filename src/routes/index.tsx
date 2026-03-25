import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../components/LandingPage/Navbar'
import { HeroSection } from '../components/LandingPage/HeroSection'
import { DesktopListings } from '../components/LandingPage/DesktopListings'
import { MobileListings } from '../components/LandingPage/MobileListings'
import { SecurityProtocol } from '../components/LandingPage/SecurityProtocol'
import { SplitCtaSection } from '../components/LandingPage/SplitCtaSection'
import { Footer } from '../components/LandingPage/Footer'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] md:bg-white flex flex-col font-sans selection:bg-teal-200 selection:text-teal-900">
      <Navbar />
      <HeroSection />
      <DesktopListings />
      <MobileListings />
      <SecurityProtocol />
      <SplitCtaSection />
      <Footer />
    </div>
  )
}
