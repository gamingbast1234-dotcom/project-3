import React, { useState } from 'react';
import { CheckCircle2, Clock, Calendar, ArrowRight, BookOpen, Compass, Code, Bot, Cloud, Trophy } from 'lucide-react';
import { JourneyMilestone } from '../types/portfolio';
import { soundFx } from '../utils/audio';

interface LearningJourneyProps {
  milestones: JourneyMilestone[];
}

export const LearningJourney: React.FC<LearningJourneyProps> = ({ milestones }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1:
        return <BookOpen className="w-4 h-4 text-cyan-400" />;
      case 2:
        return <Code className="w-4 h-4 text-sky-400" />;
      case 3:
        return <Compass className="w-4 h-4 text-purple-400" />;
      case 4:
        return <Bot className="w-4 h-4 text-cyan-400" />;
      case 5:
        return <Cloud className="w-4 h-4 text-indigo-400" />;
      case 6:
        return <Trophy className="w-4 h-4 text-amber-400" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getStatusBadge = (status: JourneyMilestone['status']) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Mastered</span>
          </span>
        );
      case 'In Progress':
        return (
          <span className="text-[11px] font-mono text-purple-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
            <span>Active Focus</span>
          </span>
        );
      case 'Upcoming':
        return (
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Roadmap</span>
          </span>
        );
    }
  };

  return (
    <section id="journey" className="py-24 relative bg-[#070d1e] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 flex items-center gap-2">
            <span className="w-6 h-px bg-cyan-400" />
            <span>05. Evolution as a Developer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            My Learning Journey
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            From first lines of code in BCA semester 1 to architecting AI agents and preparing for cloud hackathons.
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="relative border-l-2 border-cyan-500/20 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {milestones.map((milestone) => {
            const isExpanded = activeStep === milestone.step;
            return (
              <div
                key={milestone.step}
                className="relative group"
              >
                {/* Timeline node icon */}
                <div
                  className={`absolute -left-[35px] sm:-left-[51px] top-1.5 w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                    milestone.status === 'Completed'
                      ? 'bg-slate-950 border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                      : milestone.status === 'In Progress'
                      ? 'bg-slate-950 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                      : 'bg-slate-950 border-slate-700'
                  }`}
                >
                  {getStepIcon(milestone.step)}
                </div>

                {/* Milestone Card */}
                <div
                  onClick={() => {
                    soundFx.playClick();
                    setActiveStep(isExpanded ? null : milestone.step);
                  }}
                  className={`rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
                    milestone.status === 'In Progress'
                      ? 'bg-[#0a1433] border border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.15)]'
                      : 'bg-[#0a122c] border border-cyan-500/15 hover:border-cyan-400/40 glow-card'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-cyan-400 font-bold">
                        PHASE 0{milestone.step}
                      </span>
                      <span className="text-slate-600" aria-hidden="true">·</span>
                      <span className="text-xs font-mono text-slate-300">
                        {milestone.period}
                      </span>
                    </div>
                    {getStatusBadge(milestone.status)}
                  </div>

                  <h3 className="text-xl font-bold text-white font-display mb-2 group-hover:text-cyan-300 transition-colors">
                    {milestone.title}
                  </h3>

                  <p className="text-sm text-slate-300/90 leading-relaxed mb-4">
                    {milestone.summary}
                  </p>

                  {/* Bullet details */}
                  <div className="space-y-2 mb-4 pt-3 border-t border-slate-800/80">
                    {milestone.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-cyan-400 mt-0.5">›</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Clean unboxed technologies */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400 pt-3 border-t border-slate-800/60">
                    <span className="font-mono text-[11px] text-slate-500">Toolkit:</span>
                    {milestone.technologies.map((t, i) => (
                      <React.Fragment key={t}>
                        <span className="text-slate-300">{t}</span>
                        {i < milestone.technologies.length - 1 && (
                          <span className="text-slate-600" aria-hidden="true">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
