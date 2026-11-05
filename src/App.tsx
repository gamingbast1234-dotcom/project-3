/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { TechSuperpowerMachine } from './components/TechSuperpowerMachine';
import { CyberMusicStudio } from './components/CyberMusicStudio';
import { LearningJourney } from './components/LearningJourney';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { PersonalInfoModal } from './components/PersonalInfoModal';
import { AmplifyGuideModal } from './components/AmplifyGuideModal';

import {
  initialPersonalInfo,
  skillsData,
  projectsData,
  superpowersData,
  journeyMilestones,
} from './data/portfolioData';
import { PersonalInfo } from './types/portfolio';

export default function App() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    try {
      const saved = localStorage.getItem('jayverse_personal_info');
      if (saved) {
        return { ...initialPersonalInfo, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return initialPersonalInfo;
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAmplifyModalOpen, setIsAmplifyModalOpen] = useState(false);

  const handleSaveInfo = (updated: PersonalInfo) => {
    setPersonalInfo(updated);
    try {
      localStorage.setItem('jayverse_personal_info', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleResetInfo = () => {
    setPersonalInfo(initialPersonalInfo);
    try {
      localStorage.removeItem('jayverse_personal_info');
    } catch {
      // ignore
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#060b18] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Bar Navigation */}
      <Navbar onOpenEditModal={() => setIsEditModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Section 2: Homepage Hero */}
        <Hero
          info={personalInfo}
          onExploreProjects={() => scrollToSection('projects')}
          onContactMe={() => scrollToSection('contact')}
        />

        {/* Section 3: About Me */}
        <About info={personalInfo} />

        {/* Section 4: My Technical Skills */}
        <Skills skills={skillsData} />

        {/* Section 5: My Projects */}
        <Projects projects={projectsData} />

        {/* Section 6: Tech Superpower Machine */}
        <TechSuperpowerMachine superpowers={superpowersData} />

        {/* AI Music Studio: Powered by lyria-3-clip-preview */}
        <CyberMusicStudio />

        {/* Section 7: My Learning Journey */}
        <LearningJourney milestones={journeyMilestones} />

        {/* Section 8: Contact Me */}
        <Contact
          info={personalInfo}
          onOpenAmplifyGuide={() => setIsAmplifyModalOpen(true)}
        />
      </main>

      {/* Professional Footer */}
      <Footer
        info={personalInfo}
        onOpenEditModal={() => setIsEditModalOpen(true)}
      />

      {/* Helper Modals */}
      <PersonalInfoModal
        currentInfo={personalInfo}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveInfo}
        onReset={handleResetInfo}
      />

      <AmplifyGuideModal
        isOpen={isAmplifyModalOpen}
        onClose={() => setIsAmplifyModalOpen(false)}
      />
    </div>
  );
}
