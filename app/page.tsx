import HeroSection from '@/components/home/HeroSection'
import LogoMarquee from '@/components/home/LogoMarquee'
import StatsSection from '@/components/home/StatsSection'
import WhatWeDo from '@/components/home/WhatWeDo'
import Benefits from '@/components/home/Benefits'
import Testimonials from '@/components/home/Testimonials'
import CaseStudies from '@/components/home/CaseStudies'
import FinalCTA from '@/components/home/FinalCTA'

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogoMarquee />
      <WhatWeDo />
      <StatsSection />
      <Benefits />
      <Testimonials />
      <CaseStudies />
      <FinalCTA />
    </>
  )
}
