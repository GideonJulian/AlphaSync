import FinalCTA from '../../components/landing-page/FinalCTA.jsx'
import Footer from '../../components/landing-page/Footer.jsx'
import LandingHeader from '../../components/landing-page/LandingHeader.jsx'
import HeroSection from '../../components/landing-page/HeroSection.jsx'
import HowItWorks from '../../components/landing-page/HowItWorks.jsx'
import UserTypesSection from '../../components/landing-page/UserTypesSection.jsx'

function LandingPage() {
  return (
    <div className="min-h-screen bg-alpha-white text-alpha-black">
      <LandingHeader />
      <main className="pt-16">
        <HeroSection />
        <HowItWorks />
        <UserTypesSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage
