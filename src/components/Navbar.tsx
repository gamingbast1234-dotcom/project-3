import React, { useState } from 'react';
import { Sparkles, Menu, X, Volume2, VolumeX, Edit3, Send } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface NavbarProps {
  onOpenEditModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEditModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundFx.getIsMuted());

  const toggleSound = () => {
    const nextState = !isMuted;
    soundFx.setMuted(nextState);
    setIsMuted(nextState);
    if (!nextState) {
      soundFx.playClick();
    }
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Superpower', href: '#superpower' },
    { label: 'Music', href: '#music-studio' },
    { label: 'Journey', href: '#journey' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    soundFx.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#060b18]/85 border-b border-cyan-500/15 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single Brand Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            soundFx.playClick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-2.5 text-xl font-bold tracking-wider text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center p-0.5 shadow-[0_0_15px_rgba(0,229,255,0.4)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all">
            <div className="w-full h-full bg-[#060b18] rounded-[6px] flex items-center justify-center">
              <span className="font-mono text-cyan-400 font-extrabold text-sm">J</span>
            </div>
          </div>
          <span className="font-display tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">
            JAYVERSE
          </span>
        </a>

        {/* Zone 2: 5 single-line clean nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative py-1 hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + audio toggle & info customizer */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Unmute Futuristic Sound Effects' : 'Mute Sound Effects'}
            aria-label={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors border border-transparent hover:border-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Quick Info Personalizer button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenEditModal();
            }}
            title="Edit Portfolio Info & Social Links"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/60 hover:border-purple-500/40 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <Edit3 className="w-3.5 h-3.5 text-purple-400" />
            <span>Customize</span>
          </button>

          {/* Primary Action Button */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 rounded-lg shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] transition-all whitespace-nowrap shrink-0 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Contact Me</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => {
              soundFx.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-[#091126]/95 border-b border-cyan-500/20 backdrop-blur-2xl transition-all">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setMobileMenuOpen(false);
                  onOpenEditModal();
                }}
                className="flex items-center gap-2 text-xs text-purple-400 font-medium py-2 px-3 hover:bg-purple-500/10 rounded-lg"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Customize Portfolio Details</span>
              </button>
              <button
                onClick={toggleSound}
                className="flex items-center gap-2 text-xs text-slate-400 py-2 px-3 hover:bg-slate-800 rounded-lg"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                <span>{isMuted ? 'Muted' : 'Sound On'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
