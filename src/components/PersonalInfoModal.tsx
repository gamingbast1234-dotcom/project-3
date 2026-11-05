import React, { useState } from 'react';
import { X, Save, RotateCcw, Download, Check, User, Mail, Github, Linkedin, Globe, MapPin, Briefcase, Instagram, Twitter } from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';
import { soundFx } from '../utils/audio';

interface PersonalInfoModalProps {
  currentInfo: PersonalInfo;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: PersonalInfo) => void;
  onReset: () => void;
}

export const PersonalInfoModal: React.FC<PersonalInfoModalProps> = ({
  currentInfo,
  isOpen,
  onClose,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<PersonalInfo>(currentInfo);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playPowerUnlocked();
    onSave(formData);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 900);
  };

  const handleExportJSON = () => {
    soundFx.playClick();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'jayverse-portfolio-config.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#091126] border border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_60px_rgba(0,229,255,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-1">
              PORTFOLIO CUSTOMIZER
            </div>
            <h3 className="text-2xl font-bold text-white font-display">
              Edit Personal Info &amp; Handles
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Update your GitHub, Instagram, X (Twitter), LinkedIn, email, or bio anytime.
            </p>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-cyan-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus-visible:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                Professional Title
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-purple-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={formData.professionalTitle}
                  onChange={(e) => handleChange('professionalTitle', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus-visible:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                Contact Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-cyan-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus-visible:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-purple-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus-visible:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                GitHub Profile URL
              </label>
              <div className="relative">
                <Github className="w-4 h-4 text-cyan-400 absolute left-3 top-3.5" />
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => handleChange('githubUrl', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus-visible:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                  Instagram Profile URL
                </label>
                <div className="relative">
                  <Instagram className="w-4 h-4 text-pink-400 absolute left-3 top-3.5" />
                  <input
                    type="url"
                    value={formData.instagramUrl}
                    onChange={(e) => handleChange('instagramUrl', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus-visible:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                  X (Twitter) Profile URL
                </label>
                <div className="relative">
                  <Twitter className="w-4 h-4 text-sky-400 absolute left-3 top-3.5" />
                  <input
                    type="url"
                    value={formData.xUrl}
                    onChange={(e) => handleChange('xUrl', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus-visible:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                LinkedIn Profile URL
              </label>
              <div className="relative">
                <Linkedin className="w-4 h-4 text-purple-400 absolute left-3 top-3.5" />
                <input
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus-visible:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                Portfolio Web URL
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-sky-400 absolute left-3 top-3.5" />
                <input
                  type="url"
                  value={formData.portfolioUrl}
                  onChange={(e) => handleChange('portfolioUrl', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus-visible:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
              Introduction Bio
            </label>
            <textarea
              rows={3}
              value={formData.introduction}
              onChange={(e) => handleChange('introduction', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl p-3 text-sm text-white focus-visible:outline-none resize-none"
            />
          </div>

          <div className="pt-2">
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
              Career Goal
            </label>
            <input
              type="text"
              value={formData.goal}
              onChange={(e) => handleChange('goal', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus-visible:outline-none"
            />
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundFx.playReset();
                  onReset();
                  setFormData(currentInfo);
                }}
                className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>

              <button
                type="button"
                onClick={handleExportJSON}
                className="px-3 py-2 text-xs font-medium text-cyan-300 hover:text-cyan-200 bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-lg transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,229,255,0.4)]"
              >
                {savedNotice ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
