import React from 'react';
import { GraduationCap, MapPin, Target, Sparkles, BookOpen, Laptop, Cloud, Terminal } from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';

interface AboutProps {
  info: PersonalInfo;
}

export const About: React.FC<AboutProps> = ({ info }) => {
  return (
    <section id="about" className="py-24 relative bg-[#070d1e] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 flex items-center gap-2">
            <span className="w-6 h-px bg-cyan-400" />
            <span>01. Personal Story &amp; Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            About Me
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            A look into my academic journey, passion for software craftsmanship, and long-term vision.
          </p>
        </div>

        {/* Main 2-Column Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left Column: Narrative & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0b142d] border border-cyan-500/15 glow-card">
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-4 flex items-center gap-2.5">
                <Laptop className="w-5 h-5 text-cyan-400" />
                <span>My Programming Journey</span>
              </h3>
              <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
                <p>
                  My journey in computer science began with curiosity about how software powers everyday digital experiences. As a Bachelor of Computer Applications (BCA) student currently in my 3rd semester in Ahmedabad, Gujarat, I have channeled that curiosity into structured programming and real-world implementation.
                </p>
                <p>
                  I started by mastering core programming fundamentals and transitioning into Object-Oriented Programming (OOP) in Java. Understanding concepts like encapsulation, inheritance, and clean abstraction fundamentally changed how I think about building software—from writing loose scripts to designing robust, reusable architectures.
                </p>
                <p>
                  Today, I actively develop responsive web applications using HTML5, CSS3, and JavaScript, while diving deep into the next technological frontier: Artificial Intelligence agents and cloud infrastructure on AWS.
                </p>
              </div>
            </div>

            {/* Academic & Career Goal Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[#091126] border border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>CURRENT EDUCATION</span>
                </div>
                <div className="text-base font-bold text-white font-display">
                  {info.education}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {info.semester} · Ahmedabad, Gujarat
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#091126] border border-slate-800">
                <div className="flex items-center gap-2 text-purple-400 text-xs font-mono mb-2">
                  <Target className="w-4 h-4" />
                  <span>LONG-TERM GOAL</span>
                </div>
                <div className="text-base font-bold text-white font-display">
                  Software &amp; AI Engineer
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Building intelligent, scalable software
                </div>
              </div>
            </div>

            {/* Areas of Interest Bento Strip */}
            <div className="p-6 rounded-2xl bg-[#091126] border border-slate-800">
              <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>Core Engineering Interests</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-200">
                  <strong className="text-white block font-medium mb-0.5">Object-Oriented Design</strong>
                  Structured Java applications, clean class hierarchies, and scalable logic.
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-200">
                  <strong className="text-white block font-medium mb-0.5">AI Agents &amp; Workflows</strong>
                  Intent classification, healthcare triage, and contextual assistance (MediAssist AI).
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-200">
                  <strong className="text-white block font-medium mb-0.5">Modern Web Development</strong>
                  Responsive interfaces, semantic HTML5, modern CSS3 layouts, and dynamic JS.
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-200">
                  <strong className="text-white block font-medium mb-0.5">Cloud Fundamentals (AWS)</strong>
                  Amplify deployment, static hosting, and scalable backend integrations.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase using Jay's Real Photos */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual 1: Night workstation developer photo */}
            <div className="rounded-2xl overflow-hidden bg-[#091126] border border-cyan-500/20 group relative shadow-[0_0_30px_rgba(0,0,0,0.4)]">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={info.workspacePhoto}
                  alt="Jay at his dual-monitor coding workstation at night"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091126] via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
                  <span>AT THE WORKSTATION</span>
                  <span className="text-slate-400">Night Coding Sessions</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  Deep in focused practice—writing clean Java code, testing web components, and reading computing literature.
                </p>
              </div>
            </div>

            {/* Visual 2: Professional Suit Photo */}
            <div className="rounded-2xl overflow-hidden bg-[#091126] border border-purple-500/20 group relative shadow-[0_0_30px_rgba(0,0,0,0.4)]">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={info.spotlightPhoto}
                  alt="Jay professional portrait with warm backdrop"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091126] via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between text-xs font-mono text-purple-400 mb-1">
                  <span>PROFESSIONAL VISION</span>
                  <span className="text-slate-400">Ahmedabad, Gujarat</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  Ready to contribute energy, solid fundamentals, and relentless curiosity to forward-thinking software teams.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
