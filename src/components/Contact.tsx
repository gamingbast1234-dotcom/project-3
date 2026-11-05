import React, { useState } from 'react';
import { Mail, Github, Linkedin, MapPin, Send, Copy, Check, ExternalLink, Cloud, Globe, Instagram, Twitter } from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';
import { soundFx } from '../utils/audio';

interface ContactProps {
  info: PersonalInfo;
  onOpenAmplifyGuide: () => void;
}

export const Contact: React.FC<ContactProps> = ({ info, onOpenAmplifyGuide }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleCopyEmail = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(info.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundFx.playCharging();
    setIsSubmitting(true);

    // Simulate sending with realistic feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      soundFx.playPowerUnlocked();

      // Trigger mailto fallback window after brief confirmation
      const mailtoUrl = `mailto:${encodeURIComponent(info.email)}?subject=${encodeURIComponent(
        formData.subject || `Message from ${formData.name} via JAYVERSE Portfolio`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      setTimeout(() => {
        try {
          window.location.href = mailtoUrl;
        } catch {
          // ignore
        }
      }, 800);
    }, 900);
  };

  return (
    <section id="contact" className="py-24 relative bg-[#060b18] cyber-grid border-t border-slate-800/80">
      
      {/* Background radial glow */}
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 flex items-center gap-2">
            <span className="w-6 h-px bg-cyan-400" />
            <span>06. Connect &amp; Collaborate</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            Contact Me
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Open for software development internships, AI agent collaborations, and hackathon teams. Let&apos;s connect!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Card with Copy Affordance */}
            <div className="p-6 rounded-2xl bg-[#0a122c] border border-cyan-500/20 glow-card">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-cyan-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                Direct Inquiries
              </div>
              <a
                href={`mailto:${info.email}`}
                className="text-base sm:text-lg font-bold text-white hover:text-cyan-300 transition-colors font-mono break-all"
              >
                {info.email}
              </a>
              <p className="text-xs text-slate-400 mt-2">
                Usually responds within 24 hours.
              </p>
            </div>

            {/* Location & Academic Base */}
            <div className="p-6 rounded-2xl bg-[#0a122c] border border-slate-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Location
                  </div>
                  <div className="text-base font-bold text-white font-display">
                    {info.location}
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Available for on-site internships across Ahmedabad and remote opportunities globally.
              </p>
            </div>

            {/* Social & Code Profiles - GitHub, Instagram, X, LinkedIn */}
            <div className="p-6 rounded-2xl bg-[#0a122c] border border-slate-800">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
                Official Profiles &amp; Handles
              </div>
              <div className="space-y-3">
                
                {/* GitHub */}
                <a
                  href={info.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-200 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-sm font-semibold text-white">GitHub</div>
                      <div className="text-xs text-cyan-300 font-mono truncate max-w-[200px]">
                        github.com/gamingbast1234-dotcom
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </a>

                {/* Instagram */}
                <a
                  href={info.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-pink-500/40 text-slate-200 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Instagram className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-sm font-semibold text-white">Instagram</div>
                      <div className="text-xs text-pink-300 font-mono truncate max-w-[200px]">
                        @jayg17205
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-pink-400 transition-colors" />
                </a>

                {/* X (Twitter) */}
                <a
                  href={info.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-sky-400/40 text-slate-200 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Twitter className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-sm font-semibold text-white">X (Twitter)</div>
                      <div className="text-xs text-sky-300 font-mono truncate max-w-[200px]">
                        @games_jay86698
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition-colors" />
                </a>

                {/* LinkedIn */}
                <a
                  href={info.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/40 text-slate-200 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-sm font-semibold text-white">LinkedIn</div>
                      <div className="text-xs text-purple-300 font-mono truncate max-w-[200px]">
                        linkedin.com/in/jay-developer-ahmedabad
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
                </a>

              </div>
            </div>

            {/* AWS Amplify Hosting Guide Trigger */}
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenAmplifyGuide();
              }}
              className="w-full p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-purple-950/60 border border-blue-500/30 hover:border-cyan-400/50 flex items-center justify-between text-left transition-all group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-400/30 text-cyan-300">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-display">
                    AWS Amplify Hosting Guide
                  </div>
                  <div className="text-xs text-slate-400">
                    Step-by-step instructions to deploy JAYVERSE
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl p-6 sm:p-8 bg-[#0a122c] border border-cyan-500/20 glow-card">
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Fill in your project inquiry or collaboration details below.
              </p>

              {submittedSuccess ? (
                <div className="p-6 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-display">
                    Message Dispatched Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Thank you, {formData.name}. Your inquiry has been processed and your mail client has been opened to finalize transmission to {info.email}.
                  </p>
                  <button
                    onClick={() => {
                      setSubmittedSuccess(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rahul@example.com"
                        className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Internship opportunity / AI Project / Hackathon"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Jay, I checked out your portfolio and would love to discuss..."
                      className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-display font-semibold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-[0_0_25px_rgba(0,229,255,0.35)] hover:shadow-[0_0_35px_rgba(0,229,255,0.55)] flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message to Jay</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
