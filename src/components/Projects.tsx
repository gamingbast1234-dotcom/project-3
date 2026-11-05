import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles, Bot, GraduationCap, Coffee, Check, ArrowRight, Activity, Send } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { soundFx } from '../utils/audio';

interface ProjectsProps {
  projects: ProjectItem[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  
  // MediAssist AI live interactive simulation state
  const [mediAssistInput, setMediAssistInput] = useState('');
  const [mediAssistMessages, setMediAssistMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; time: string }>>([
    {
      sender: 'assistant',
      text: 'Namaste! I am MediAssist AI, your hospital guidance assistant. How can I assist your visit today? You can ask about OPD timings, emergency care, specialist departments, or admission guidelines.',
      time: 'Just now',
    },
  ]);

  const samplePrompts = [
    'What are the Cardiology OPD timings?',
    'Emergency admission procedure',
    'Where is the Radiology & MRI wing?',
    'What documents to bring for admission?',
  ];

  const handleSendMediAssist = (queryText?: string) => {
    const textToSend = queryText || mediAssistInput;
    if (!textToSend.trim()) return;

    soundFx.playClick();
    const userMsg = {
      sender: 'user' as const,
      text: textToSend,
      time: 'Just now',
    };

    setMediAssistMessages((prev) => [...prev, userMsg]);
    setMediAssistInput('');

    // Generate intelligent contextual response
    setTimeout(() => {
      let reply = '';
      const lower = textToSend.toLowerCase();

      if (lower.includes('cardio') || lower.includes('heart')) {
        reply = 'Cardiology OPD operates Monday to Saturday from 9:00 AM – 2:00 PM in Block B, 2nd Floor. Senior cardiologist Dr. S. Patel is available Mon, Wed & Fri. Emergency cardiac care is operational 24/7 in Ground Floor ER.';
      } else if (lower.includes('emergency') || lower.includes('casualty') || lower.includes('urgent')) {
        reply = 'EMERGENCY PROTOCOL: The 24/7 Trauma & Emergency Center is located directly at Gate 1 with ambulance ramp access. Dedicated triage nurses evaluate vitals immediately upon arrival. Emergency direct line: +91 79 2600 0000.';
      } else if (lower.includes('radiology') || lower.includes('mri') || lower.includes('x-ray') || lower.includes('wing')) {
        reply = 'Radiology and Imaging (MRI, 128-Slice CT Scan, Ultrasound, Digital X-Ray) is located on Level -1, Diagnostic Pavilion. Routine scans require prior token booking; emergency scans are prioritized 24/7.';
      } else if (lower.includes('document') || lower.includes('admission') || lower.includes('admit')) {
        reply = 'For planned inpatient admission: Please bring (1) Doctor’s admission advice slip, (2) Government photo ID (Aadhaar / Voter ID), (3) Insurance TPA health card / corporate cashless letter, and (4) Prior medical test history.';
      } else {
        reply = `Thank you for asking about "${textToSend}". In our hospital system, general enquiries are handled at the central reception desk in Main Atrium (Gate 2). OPD registrations open at 8:00 AM daily. Is there a specific specialist or department you would like to reach?`;
      }

      setMediAssistMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: reply,
          time: 'Just now',
        },
      ]);
    }, 450);
  };

  const getProjectIcon = (id: string) => {
    if (id === 'mediassist-ai') return <Bot className="w-5 h-5 text-cyan-400" />;
    if (id === 'exam-management-system') return <GraduationCap className="w-5 h-5 text-purple-400" />;
    return <Coffee className="w-5 h-5 text-cyan-400" />;
  };

  return (
    <section id="projects" className="py-24 relative bg-[#070d1e] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 flex items-center gap-2">
            <span className="w-6 h-px bg-cyan-400" />
            <span>03. Featured Portfolio Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            My Projects
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Real implementations solving genuine problems across healthcare assistance, academic administration, and core Java engineering.
          </p>
        </div>

        {/* 3 Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="rounded-2xl bg-[#0a122c] border border-cyan-500/15 hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group glow-card"
            >
              <div>
                {/* Visual Header / Thumbnail */}
                <div className="aspect-[16/10] overflow-hidden relative bg-slate-900 border-b border-slate-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a122c] via-[#0a122c]/40 to-transparent pointer-events-none" />

                  {/* Top-Right Category Ribbon */}
                  <div className="absolute top-3 right-3 text-[11px] font-mono px-2.5 py-1 rounded bg-black/75 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                    Project 0{index + 1}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Category unboxed text */}
                  <div className="text-xs font-mono text-purple-400 mb-2 font-medium">
                    {project.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white font-display mb-1.5 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs text-slate-400 mb-3 font-medium">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-slate-300/90 leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Unboxed tech metadata list (§1.A Zero-Pill) */}
                  <div className="pt-4 border-t border-slate-800/80 mb-4">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Technologies
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-300">
                      {project.technologies.map((tech, i) => (
                        <React.Fragment key={tech}>
                          <span className="text-cyan-300/90 hover:text-white transition-colors">{tech}</span>
                          {i < project.technologies.length - 1 && (
                            <span className="text-slate-600" aria-hidden="true">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 mt-auto flex items-center justify-between gap-3 border-t border-slate-800/60 pt-4">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedProject(project);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group-hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
                >
                  <span>Project Overview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Live Interactive MediAssist AI Spotlight Simulator */}
        <div id="mediassist-interactive-demo" className="mt-16 rounded-3xl p-6 sm:p-8 bg-[#091126] border border-cyan-500/30 relative overflow-hidden glow-card">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-8 pb-6 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 flex items-center gap-2">
                <Bot className="w-4 h-4" />
                <span>INTERACTIVE LIVE PREVIEW // MEDIASSIST AI</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Try MediAssist AI Hospital Guidance Live
              </h3>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                Experience the patient guidance dialogue logic directly in your browser. Ask questions to simulate hospital service inquiries.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start">
              <span className="text-xs font-mono text-cyan-400 px-3 py-1 rounded bg-cyan-950/80 border border-cyan-500/30">
                Agent Status: Active Simulation
              </span>
            </div>
          </div>

          {/* Quick prompt suggestions */}
          <div className="mb-4">
            <span className="text-xs font-mono text-slate-400 block mb-2">Try sample patient inquiries:</span>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => handleSendMediAssist(p)}
                  className="px-3 py-1 text-xs text-slate-300 hover:text-cyan-300 bg-slate-900/80 hover:bg-cyan-950/40 border border-slate-700 hover:border-cyan-500/40 rounded-lg transition-colors text-left"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="rounded-2xl bg-[#060b18] border border-slate-800 p-4 sm:p-6 mb-4 max-h-80 overflow-y-auto space-y-3.5">
            {mediAssistMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 text-xs sm:text-sm ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-cyan-400" />
                  </div>
                )}
                <div
                  className={`max-w-md sm:max-w-xl p-3.5 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none'
                      : 'bg-[#0e1733] border border-slate-800 text-slate-200 rounded-bl-none leading-relaxed'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="block text-[10px] text-slate-400 mt-1 font-mono text-right">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMediAssist();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={mediAssistInput}
              onChange={(e) => setMediAssistInput(e.target.value)}
              placeholder="Ask MediAssist AI about hospital services, doctors, OPD, or admission..."
              className="flex-1 bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-semibold text-sm hover:from-cyan-300 hover:to-blue-400 transition-all flex items-center gap-1.5 active:scale-95 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Full Project Detail Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#091126] border border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_60px_rgba(0,229,255,0.25)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center">
                    {getProjectIcon(selectedProject.id)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-display">
                      {selectedProject.title}
                    </h3>
                    <div className="text-xs font-mono text-cyan-400">
                      {selectedProject.category}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6 text-sm text-slate-300">
                <p className="leading-relaxed text-base text-slate-200">
                  {selectedProject.extendedDescription}
                </p>

                {/* Key Features */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-3">
                    Key Architectural Features
                  </h4>
                  <div className="space-y-2">
                    {selectedProject.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Architecture Notes */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs font-mono text-purple-300 uppercase tracking-wider mb-1.5 font-semibold">
                    Technical Architecture
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedProject.architectureNotes}
                  </p>
                </div>

                {/* Metrics */}
                {selectedProject.metrics && (
                  <div className="grid grid-cols-3 gap-3">
                    {selectedProject.metrics.map((m) => (
                      <div key={m.label} className="p-3 rounded-xl bg-[#0b142d] border border-cyan-500/15 text-center">
                        <div className="text-lg font-bold text-white font-display tabular-nums">
                          {m.value}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
