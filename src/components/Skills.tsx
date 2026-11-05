import React, { useState } from 'react';
import { Coffee, FileCode2, Palette, Code2, GitBranch, Brain, Bot, Cloud, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { SkillItem } from '../types/portfolio';
import { soundFx } from '../utils/audio';

interface SkillsProps {
  skills: SkillItem[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Skills (8)' },
    { id: 'programming', label: 'Java & Logic' },
    { id: 'web', label: 'Web Frontend' },
    { id: 'ai', label: 'AI & Agents' },
    { id: 'tools', label: 'DevOps & Git' },
    { id: 'cloud', label: 'AWS Cloud' },
  ];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-cyan-400" />;
      case 'FileCode2':
        return <FileCode2 className="w-5 h-5 text-sky-400" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-purple-400" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'GitBranch':
        return <GitBranch className="w-5 h-5 text-blue-400" />;
      case 'Brain':
        return <Brain className="w-5 h-5 text-purple-400" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-cyan-400" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-indigo-400" />;
      default:
        return <Code2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative bg-[#060b18] cyber-grid-dense border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 flex items-center gap-2">
              <span className="w-6 h-px bg-cyan-400" />
              <span>02. Technical Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
              Technical Skills
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Only technologies I am genuinely learning and building with in my BCA curriculum and real projects. No fluff.
            </p>
          </div>

          {/* Interactive Category Filter Buttons */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-[#0b142d] border border-slate-800 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8 Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              onClick={() => {
                soundFx.playClick();
                setSelectedSkill(skill);
              }}
              className="group relative rounded-2xl p-6 bg-[#0a122c] border border-cyan-500/15 hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between cursor-pointer glow-card"
            >
              <div>
                {/* Card Top: Icon & Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-cyan-500/20 flex items-center justify-center group-hover:scale-105 group-hover:border-cyan-400/40 transition-all">
                    {getIcon(skill.icon)}
                  </div>
                  {/* Clean unboxed category label */}
                  <span className="text-[11px] font-mono text-slate-400 group-hover:text-cyan-400 transition-colors">
                    {skill.categoryLabel}
                  </span>
                </div>

                {/* Skill Name */}
                <h3 className="text-lg font-bold text-white font-display mb-1 group-hover:text-cyan-300 transition-colors">
                  {skill.name}
                </h3>

                {/* Level / Subtitle */}
                <div className="text-xs text-purple-300/90 font-medium mb-3">
                  {skill.level}
                </div>

                {/* Short Description */}
                <p className="text-xs text-slate-300/80 leading-relaxed line-clamp-3 mb-4">
                  {skill.description}
                </p>

                {/* Highlights preview */}
                <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
                  {skill.highlights.slice(0, 2).map((h) => (
                    <div key={h} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span className="truncate">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress & Proficiency Bar */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">Mastery Progress</span>
                  <span className="text-cyan-400 font-semibold tabular-nums">{skill.proficiency}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-purple-500 rounded-full transition-all duration-700"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-cyan-300 transition-colors">
                  <span>Click for insights</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skill Details Modal */}
        {selectedSkill && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
            onClick={() => setSelectedSkill(null)}
          >
            <div
              className="relative w-full max-w-lg rounded-2xl bg-[#091126] border border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,229,255,0.25)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center">
                    {getIcon(selectedSkill.icon)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-display">
                      {selectedSkill.name}
                    </h3>
                    <div className="text-xs font-mono text-cyan-400">
                      {selectedSkill.categoryLabel} · {selectedSkill.level}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <p className="leading-relaxed">
                  {selectedSkill.description}
                </p>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs font-mono text-purple-300 uppercase tracking-wider mb-2 font-semibold">
                    Hands-On Experience Context
                  </div>
                  <div className="text-xs sm:text-sm text-slate-200">
                    {selectedSkill.experience}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2.5 font-semibold">
                    Core Concepts Mastered
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {selectedSkill.highlights.map((h) => (
                      <div key={h} className="p-2 rounded-lg bg-[#0d1838] border border-cyan-500/20 text-slate-200 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
