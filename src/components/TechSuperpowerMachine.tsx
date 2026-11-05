import React, { useState } from 'react';
import { Zap, RotateCcw, Volume2, VolumeX, Sparkles, Coffee, Bot, Layout, Rocket, ShieldCheck, Activity, Award } from 'lucide-react';
import { Superpower } from '../types/portfolio';
import { soundFx } from '../utils/audio';

interface TechSuperpowerMachineProps {
  superpowers: Superpower[];
}

export const TechSuperpowerMachine: React.FC<TechSuperpowerMachineProps> = ({ superpowers }) => {
  const [activePower, setActivePower] = useState<Superpower | null>(null);
  const [isCharging, setIsCharging] = useState(false);
  const [chargeProgress, setChargeProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(soundFx.getIsMuted());
  const [discoveredHistory, setDiscoveredHistory] = useState<string[]>([]);
  const [selectedCodexPower, setSelectedCodexPower] = useState<Superpower | null>(null);

  const toggleSound = () => {
    const next = !isMuted;
    soundFx.setMuted(next);
    setIsMuted(next);
    if (!next) {
      soundFx.playClick();
    }
  };

  const handleDiscoverSuperpower = () => {
    if (isCharging) return;

    soundFx.playCharging();
    setIsCharging(true);
    setChargeProgress(0);

    // Animate charge progress over 1.2s
    const startTime = Date.now();
    const duration = 1200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(Math.round((elapsed / duration) * 100), 100);
      setChargeProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          // Select a random superpower (preferably different from current if multiple tries)
          let nextPower: Superpower;
          if (activePower && superpowers.length > 1) {
            const others = superpowers.filter((p) => p.id !== activePower.id);
            nextPower = others[Math.floor(Math.random() * others.length)];
          } else {
            nextPower = superpowers[Math.floor(Math.random() * superpowers.length)];
          }

          setActivePower(nextPower);
          setIsCharging(false);
          soundFx.playPowerUnlocked();

          setDiscoveredHistory((prev) => {
            if (!prev.includes(nextPower.id)) {
              return [...prev, nextPower.id];
            }
            return prev;
          });
        }, 150);
      }
    }, 30);
  };

  const handleResetMachine = () => {
    soundFx.playReset();
    setActivePower(null);
    setIsCharging(false);
    setChargeProgress(0);
  };

  const getPowerIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee className="w-8 h-8 text-cyan-400" />;
      case 'Bot':
        return <Bot className="w-8 h-8 text-purple-400" />;
      case 'Sparkles':
        return <Sparkles className="w-8 h-8 text-amber-400" />;
      case 'Layout':
        return <Layout className="w-8 h-8 text-emerald-400" />;
      case 'Rocket':
        return <Rocket className="w-8 h-8 text-sky-400" />;
      default:
        return <Zap className="w-8 h-8 text-cyan-400" />;
    }
  };

  return (
    <section id="superpower" className="py-24 relative bg-[#060b18] cyber-grid overflow-hidden border-t border-slate-800/80">
      
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-purple-600/10 to-transparent rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-cyan-400" />
            <span>04. Unique Interactive Feature</span>
            <span className="w-6 h-px bg-cyan-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            My Tech Superpower Machine
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            A futuristic neon synthesizer revealing the unique engineering dimensions, curiosity drivers, and hidden coding superpowers I bring to the table.
          </p>

          {/* Visible Hint requested by user */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-medium shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse shrink-0" />
            <span>Curious about my hidden skills? Click the machine!</span>
          </div>
        </div>

        {/* The Futuristic Console Chassis */}
        <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#091126] to-[#060b18] border-2 border-cyan-500/30 shadow-[0_0_60px_rgba(0,229,255,0.15)] relative">
          
          {/* Machine Header Controls */}
          <div className="flex items-center justify-between pb-6 border-b border-cyan-500/20 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                QUANTUM_CORE // v3.0 NEON MATRIX
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Sound Toggle Button */}
              <button
                onClick={toggleSound}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
                title={isMuted ? 'Unmute Futuristic Sounds' : 'Mute Sounds'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-500" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{isMuted ? 'SOUND: OFF' : 'SOUND: ON'}</span>
              </button>

              {/* Working Reset Button */}
              {activePower && (
                <button
                  onClick={handleResetMachine}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-red-400 text-slate-300 hover:text-red-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-red-400" />
                  <span>RESET MACHINE</span>
                </button>
              )}
            </div>
          </div>

          {/* Machine Interactive Center */}
          {!activePower && !isCharging && (
            <div className="text-center py-12 px-4 max-w-xl mx-auto">
              
              {/* Standby Pulse Orb */}
              <div className="relative w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-spin" style={{ animationDuration: '8s' }} />
                <div className="absolute inset-2 rounded-full border border-purple-500/40 animate-spin" style={{ animationDuration: '5s', animationDirection: 'reverse' }} />
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_35px_rgba(0,229,255,0.4)]">
                  <Zap className="w-10 h-10 text-white animate-pulse" />
                </div>
              </div>

              {/* Machine Status */}
              <div className="text-sm font-mono text-slate-400 mb-6">
                SYSTEM STATUS: <span className="text-cyan-400 font-semibold">ONLINE &amp; CALIBRATED</span>
              </div>

              {/* Central Trigger Button */}
              <button
                onClick={handleDiscoverSuperpower}
                className="w-full sm:w-auto px-8 py-5 rounded-2xl font-display font-bold text-lg sm:text-xl text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 hover:from-cyan-300 hover:to-purple-300 shadow-[0_0_35px_rgba(0,229,255,0.5)] hover:shadow-[0_0_50px_rgba(168,85,247,0.7)] transition-all transform active:scale-95 flex items-center justify-center gap-3 mx-auto focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300 cursor-pointer"
              >
                <Zap className="w-6 h-6 fill-slate-950" />
                <span>⚡ Discover My Tech Superpower</span>
              </button>

              <p className="mt-4 text-xs font-mono text-slate-500">
                Randomizes across 5 specialized developer superpower archetypes
              </p>
            </div>
          )}

          {/* Charging / Scanning State */}
          {isCharging && (
            <div className="text-center py-14 px-4 max-w-md mx-auto">
              <div className="relative w-36 h-36 mx-auto mb-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-cyan-400/20 border-t-cyan-400 animate-spin" style={{ animationDuration: '0.6s' }} />
                <div className="absolute inset-3 rounded-full border-2 border-purple-400/20 border-b-purple-400 animate-spin" style={{ animationDuration: '0.4s', animationDirection: 'reverse' }} />
                <div className="text-2xl font-mono font-extrabold text-cyan-300 tabular-nums">
                  {chargeProgress}%
                </div>
              </div>

              <div className="text-lg font-bold text-white font-display mb-2">
                Scanning Neural Code Frequency...
              </div>
              <div className="text-xs font-mono text-cyan-400 tracking-wider mb-6">
                SYNTHESIZING JAVA LOGIC // AI AGENT PROMPTS // CLOUD ARCHITECTURE
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-cyan-500/30">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full transition-all duration-75 shadow-[0_0_15px_rgba(0,229,255,0.8)]"
                  style={{ width: `${chargeProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Revealed Superpower State */}
          {activePower && !isCharging && (
            <div className="animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Badge & Codename */}
                <div className="lg:col-span-5 text-center lg:text-left flex flex-col items-center lg:items-start">
                  <div className="w-24 h-24 rounded-3xl bg-slate-900 border-2 border-cyan-400/50 flex items-center justify-center mb-4 shadow-[0_0_35px_rgba(0,229,255,0.35)]">
                    {getPowerIcon(activePower.iconName)}
                  </div>

                  <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-1">
                    SUPERPOWER UNLOCKED // {activePower.codename}
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-display mb-2">
                    {activePower.title}
                  </h3>

                  <p className="text-sm font-medium text-purple-300 mb-4">
                    {activePower.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {activePower.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleDiscoverSuperpower}
                      className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all flex items-center gap-2 active:scale-95"
                    >
                      <Zap className="w-4 h-4 fill-slate-950" />
                      <span>⚡ Spin Again</span>
                    </button>

                    <button
                      onClick={handleResetMachine}
                      className="px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all flex items-center gap-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>

                {/* Right: Perks & Stat Gauges */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Superpower Perks */}
                  <div className="p-6 rounded-2xl bg-[#0e1733] border border-cyan-500/20">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4 text-cyan-400" />
                      <span>Special Ability Perks</span>
                    </h4>
                    <div className="space-y-2.5">
                      {activePower.perks.map((perk) => (
                        <div key={perk} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4 Diagnostic Stat Bars */}
                  <div className="p-6 rounded-2xl bg-[#0e1733] border border-purple-500/20">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold mb-4 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-purple-400" />
                      <span>Attribute Diagnostic Matrix</span>
                    </h4>

                    <div className="space-y-3.5">
                      <div>
                        <div className="flex justify-between text-xs font-mono mb-1">
                          <span className="text-slate-300">Algorithmic &amp; OOP Logic</span>
                          <span className="text-cyan-400 font-bold tabular-nums">{activePower.stats.logic}/100</span>
                        </div>
                        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-cyan-400 rounded-full transition-all duration-700"
                            style={{ width: `${activePower.stats.logic}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-mono mb-1">
                          <span className="text-slate-300">Creative Innovation &amp; Agents</span>
                          <span className="text-purple-400 font-bold tabular-nums">{activePower.stats.creativity}/100</span>
                        </div>
                        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-400 rounded-full transition-all duration-700"
                            style={{ width: `${activePower.stats.creativity}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-mono mb-1">
                          <span className="text-slate-300">Development Velocity</span>
                          <span className="text-blue-400 font-bold tabular-nums">{activePower.stats.speed}/100</span>
                        </div>
                        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-400 rounded-full transition-all duration-700"
                            style={{ width: `${activePower.stats.speed}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-mono mb-1">
                          <span className="text-slate-300">Curiosity &amp; Tech Appetite</span>
                          <span className="text-amber-400 font-bold tabular-nums">{activePower.stats.curiosity}/100</span>
                        </div>
                        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full transition-all duration-700"
                            style={{ width: `${activePower.stats.curiosity}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* Superpower Codex / Collection Bar at bottom */}
          <div className="mt-8 pt-6 border-t border-slate-800/80">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-slate-400">
                Superpowers Codex ({discoveredHistory.length}/5 Unlocked):
              </span>
              <div className="flex flex-wrap gap-2">
                {superpowers.map((p) => {
                  const isUnlocked = discoveredHistory.includes(p.id) || (activePower && activePower.id === p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        soundFx.playClick();
                        setActivePower(p);
                      }}
                      className={`px-3 py-1 text-[11px] font-mono rounded-lg transition-all ${
                        activePower?.id === p.id
                          ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                          : isUnlocked
                          ? 'bg-slate-900 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400'
                          : 'bg-slate-900/60 text-slate-500 border border-slate-800 hover:text-slate-300'
                      }`}
                    >
                      {p.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
