// src/App.tsx - Update component imports and add EducationSection

import { Navbar } from './components/layout/Navbar'
import { HeroSection } from './components/sections/HeroSection'
import { Footer } from './components/layout/Footer'
import { ExperienceSection } from './components/sections/ExperienceSection'
import { AboutSection } from './components/sections/AboutSection'
import { SkillsSection } from './components/sections/SkillsSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { ContactSection } from './components/sections/ContactSection'
import { EducationSection } from './components/sections/Education'
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
        <EducationSection /> {/* Add this line */}
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
        <ScrollToTop />
      </main>
      <Footer />
    </div>
  )
}

export default App