import React from 'react';
import { ArrowRight, Sparkles, Terminal, Mail, Code, MapPin, GraduationCap } from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';
import { soundFx } from '../utils/audio';

interface HeroProps {
  info: PersonalInfo;
  onExploreProjects: () => void;
  onContactMe: () => void;
}

export const Hero: React.FC<HeroProps> = ({ info, onExploreProjects, onContactMe }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 cyber-grid">
      {/* Ambient background glow orbs */}
      <div
        className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-40 -right-20 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Top Tagline & Location */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-cyan-400 font-mono mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>JAYVERSE // PORTFOLIO</span>
              </span>
              <span className="text-slate-500">·</span>
              <span className="inline-flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{info.location}</span>
              </span>
              <span className="text-slate-500">·</span>
              <span className="inline-flex items-center gap-1 text-slate-300">
                <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                <span>{info.education} ({info.semester})</span>
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display mb-4 leading-[1.1] text-balance">
              Hello, I&apos;m{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 text-glow-cyan">
                {info.name}
              </span>
              .
            </h1>

            {/* Subtitle */}
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-200 mb-6 font-display flex items-center gap-2">
              <span>Aspiring Software Developer</span>
              <span className="text-cyan-400">&amp;</span>
              <span className="text-purple-300">AI Enthusiast</span>
            </h2>

            {/* Coding Journey Description */}
            <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl mb-8 font-normal">
              {info.introduction}
            </p>

            {/* Career Goal Card Highlight */}
            <div className="mb-8 p-4 rounded-xl bg-slate-900/70 border border-purple-500/20 backdrop-blur-sm relative group hover:border-purple-500/40 transition-all">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold mb-1">
                    Primary Goal
                  </div>
                  <div className="text-sm sm:text-base font-medium text-slate-100">
                    &ldquo;{info.goal}&rdquo;
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  soundFx.playClick();
                  onExploreProjects();
                }}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-[0_0_25px_rgba(0,229,255,0.35)] hover:shadow-[0_0_35px_rgba(0,229,255,0.55)] transition-all flex items-center gap-2.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                <span>Explore My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onContactMe();
                }}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700 hover:border-cyan-400/50 transition-all flex items-center gap-2.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 shadow-sm"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Me</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Profile Photo Container */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-3xl p-1 bg-gradient-to-b from-cyan-500/40 via-purple-500/30 to-blue-500/10 shadow-[0_0_50px_rgba(0,229,255,0.2)] group transition-all duration-300 hover:shadow-[0_0_70px_rgba(168,85,247,0.35)]">
              {/* Inner container */}
              <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-[#0a1126] border border-cyan-500/20">
                <img
                  src={info.heroPhoto}
                  alt="Jay - Aspiring Software Developer & AI Developer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-100 group-hover:scale-102 transition-transform duration-500"
                />

                {/* Subtle dark neon gradient scrim at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060b18] via-[#060b18]/20 to-transparent pointer-events-none" />

                {/* Cyber badge overlay at bottom */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#091126]/90 backdrop-blur-md border border-cyan-500/30 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-cyan-400 font-semibold tracking-wide flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5" />
                      <span>DEVELOPER STATUS</span>
                    </div>
                    <div className="text-sm font-bold text-white font-display">
                      BCA 3rd Sem · Ahmedabad
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[11px] font-mono text-slate-400">Specialization</span>
                    <span className="text-xs font-semibold text-purple-300">Java &amp; AI Agents</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width metadata & proof metrics strip below split (§2.B) */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display tabular-nums">
              3rd Sem
            </div>
            <div className="text-xs text-slate-400 mt-1 font-mono">BCA Degree Coursework</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-display tabular-nums">
              8+
            </div>
            <div className="text-xs text-slate-400 mt-1 font-mono">Core Tech Skills Active</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-display tabular-nums">
              3 Key
            </div>
            <div className="text-xs text-slate-400 mt-1 font-mono">Featured Projects</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-display tabular-nums">
              AWS Ready
            </div>
            <div className="text-xs text-slate-400 mt-1 font-mono">Cloud Hosting Prepared</div>
          </div>
        </div>

      </div>
    </section>
  );
};
