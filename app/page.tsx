import HeroSection from '@/components/home/HeroSection'
import LogoMarquee from '@/components/home/LogoMarquee'
import WhatWeDo from '@/components/home/WhatWeDo'
import HelloNailsCase from '@/components/home/HelloNailsCase'
import HowItWorks from '@/components/home/HowItWorks'
import Features from '@/components/home/Features'
import Testimonials from '@/components/home/Testimonials'
import FinalCTA from '@/components/home/FinalCTA'

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogoMarquee />
      <WhatWeDo />
      <HelloNailsCase />
      <HowItWorks />
      <Features />
      <Testimonials />
      <FinalCTA />
    </>
  )
}
