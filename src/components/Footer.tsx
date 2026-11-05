import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart, Sparkles, Terminal, Instagram, Twitter } from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';
import { soundFx } from '../utils/audio';

interface FooterProps {
  info: PersonalInfo;
  onOpenEditModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ info, onOpenEditModal }) => {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Tech Superpower', href: '#superpower' },
    { label: 'Music Studio', href: '#music-studio' },
    { label: 'Learning Journey', href: '#journey' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#050914] border-t border-cyan-500/15 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center p-0.5 shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                <div className="w-full h-full bg-[#060b18] rounded-[6px] flex items-center justify-center">
                  <span className="font-mono text-cyan-400 font-extrabold text-sm">J</span>
                </div>
              </div>
              <span className="font-display tracking-widest text-xl font-bold text-white">
                JAYVERSE
              </span>
            </div>

            <p className="text-sm font-medium text-cyan-400 font-mono">
              {info.tagline}
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Personal developer portfolio of {info.name}, a BCA student learning Java fundamentals, basic HTML5 &amp; CSS3, AI concepts, and AWS cloud engineering.
            </p>

            {/* Social handles: GitHub, Instagram, X, LinkedIn, Email */}
            <div className="flex items-center gap-2.5 pt-2 flex-wrap">
              <a
                href={info.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                aria-label="GitHub Profile"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 hover:text-cyan-400 text-slate-300 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={info.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                aria-label="Instagram Profile"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-400 hover:text-pink-400 text-slate-300 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={info.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                aria-label="X Profile"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-400 hover:text-sky-400 text-slate-300 transition-colors"
                title="X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </a>

              <a
                href={info.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-400 hover:text-purple-400 text-slate-300 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${info.email}`}
                onClick={() => soundFx.playClick()}
                aria-label="Send Email"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 hover:text-cyan-400 text-slate-300 transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
              Portfolio Index
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => soundFx.playClick()}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic & Goal Overview */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
              Developer Profile
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Degree:</span>
                <span className="text-white font-medium">{info.education} ({info.semester})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Location:</span>
                <span className="text-white font-medium">{info.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Skill Level:</span>
                <span className="text-cyan-300 font-medium">Basic Java, HTML5 &amp; CSS3</span>
              </div>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                onOpenEditModal();
              }}
              className="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1.5 pt-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Customize Personal Info</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} JAYVERSE · Built with code, curiosity &amp; innovation by Jay.
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-slate-400">Ahmedabad, Gujarat, India</span>
            
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-xs font-mono">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
