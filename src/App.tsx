// src/App.tsx
import { Navbar } from './components/layout/Navbar'
import { HeroSection } from './components/sections/HeroSection'
import { Footer } from './components/layout/Footer'
import { ExperienceSection } from './components/sections/ExperienceSection'
import { AboutSection } from './components/sections/AboutSection'
import { SkillsSection } from './components/sections/SkillsSection'
import { EducationSection } from './components/sections/Education'
import { EnhancedProjectsSection } from './components/sections/EnhancedProjectSection'
import { ContactSection } from './components/sections/ContactSection'
import { GitHubSection } from './components/sections/GithubSection'
import { ScrollToTop } from './components/ScrollToTop'
import GalaxyBackground from './components/GalaxyBackground'

const App = () => {
  return (
    <div className="min-h-screen transition-colors">
      <GalaxyBackground />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ExperienceSection />
        <EnhancedProjectsSection />
        <GitHubSection />
        <ContactSection />
        <ScrollToTop />
      </main>
      <Footer />
    </div>
  )
}

export default App