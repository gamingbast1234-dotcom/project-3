import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, RefreshCw, Sparkles, Volume2, Download, AlertCircle, Headphones, Radio } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const CyberMusicStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('30-second cyber synthwave coding soundtrack with neon arpeggios and pulsating bass');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lyrics, setLyrics] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const presets = [
    {
      label: 'Cyber Synthwave',
      description: 'Pulsing 80s neon bassline & driving synth arpeggios',
      prompt: '30-second cyber synthwave coding soundtrack with neon arpeggios and pulsating bass',
    },
    {
      label: 'Lo-Fi Java Study Beats',
      description: 'Mellow vinyl crackle & warm Rhodes chords for late-night coding',
      prompt: 'Chill lo-fi study beats for late-night Java programming with soft vinyl texture and gentle chords',
    },
    {
      label: '8-Bit Retro Arcade',
      description: 'Nostalgic chiptune melody and driving energetic tempo',
      prompt: 'Energetic retro 8-bit electronic gaming battle theme for hackathon programming sprints',
    },
    {
      label: 'Deep Focus Ambient',
      description: 'Atmospheric pad sweeps and calming binaural hum',
      prompt: 'Deep ambient space soundscape with futuristic pads for focused software development',
    },
  ];

  const handleGenerateMusic = async () => {
    if (!prompt.trim() || isGenerating) return;

    soundFx.playCharging();
    setIsGenerating(true);
    setErrorMessage(null);
    setStatusMessage('Connecting to Lyria 3 Clip Preview model...');

    try {
      const res = await fetch('/api/generate-music', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate music');
      }

      setGeneratedAudioUrl(data.audioDataUrl);
      setLyrics(data.lyrics);
      setStatusMessage('Music generated successfully with Lyria AI!');
      soundFx.playPowerUnlocked();

      // Auto play generated track
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }, 300);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || 'Music generation model requires a paid API key or encountered quota limits. Try again shortly.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    soundFx.playClick();
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <section id="music-studio" className="py-20 relative bg-[#060b18] cyber-grid border-t border-slate-800/80">
      
      {/* Background radial glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400" />
            <span>AI MUSIC GENERATOR // LYRIA 3 CLIP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            Cyber Coding Beats Studio
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Generate customized 30-second AI coding soundtracks powered by Google&apos;s <strong className="text-cyan-300 font-medium">lyria-3-clip-preview</strong>. Perfect for background focus during deep Java and web programming sessions.
          </p>
        </div>

        {/* Studio Chassis */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#091126] border border-cyan-500/25 shadow-[0_0_50px_rgba(0,229,255,0.12)]">
          
          {/* Preset Buttons */}
          <div className="mb-6">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Quick Sound Presets:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    soundFx.playClick();
                    setPrompt(preset.prompt);
                  }}
                  className={`p-3.5 rounded-xl text-left border transition-all ${
                    prompt === preset.prompt
                      ? 'bg-cyan-950/70 border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Music className={`w-3.5 h-3.5 ${prompt === preset.prompt ? 'text-cyan-400' : 'text-purple-400'}`} />
                    <span className="text-xs font-bold text-white font-display">{preset.label}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    {preset.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Prompt Input */}
          <div className="mb-6">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Music Prompt (Style, Instruments, Mood, Tempo):
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your ideal 30-second coding background music..."
                className="flex-1 bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
              />

              <button
                onClick={handleGenerateMusic}
                disabled={isGenerating}
                className="px-6 py-3 rounded-xl font-display font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 hover:from-cyan-300 hover:to-purple-300 transition-all shadow-[0_0_20px_rgba(0,229,255,0.35)] flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer shrink-0"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Composing Track...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-slate-950" />
                    <span>Generate Track (Lyria AI)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Status and Error Banners */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-200 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-medium mb-0.5">Model Notice:</strong>
                {errorMessage}
              </div>
            </div>
          )}

          {statusMessage && !errorMessage && (
            <div className="mb-6 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 flex items-center gap-2">
              <Headphones className="w-4 h-4 text-cyan-400" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Audio Player Card */}
          {generatedAudioUrl ? (
            <div className="p-6 rounded-2xl bg-[#060b18] border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 glow-card">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button
                  onClick={togglePlayPause}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-slate-950" /> : <Play className="w-6 h-6 fill-slate-950 ml-0.5" />}
                </button>

                <div>
                  <div className="text-xs font-mono text-cyan-400 font-semibold mb-0.5">
                    LYRIA CLIP // 30-SECOND TRACK
                  </div>
                  <h4 className="text-base font-bold text-white font-display line-clamp-1 max-w-sm">
                    {prompt}
                  </h4>
                  {lyrics && lyrics !== 'Instrumental Track' && (
                    <p className="text-xs text-slate-400 italic line-clamp-1">
                      Lyrics: {lyrics}
                    </p>
                  )}
                </div>
              </div>

              {/* Animated Waveform Equalizer */}
              <div className="flex items-center gap-1.5 h-8">
                {[40, 75, 55, 90, 60, 85, 45, 100, 70, 80, 50, 95].map((height, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-gradient-to-t from-cyan-500 to-purple-400 rounded-full transition-all duration-300"
                    style={{
                      height: isPlaying ? `${Math.max(15, (height * (i % 2 === 0 ? 0.9 : 1.1)))}%` : '20%',
                    }}
                  />
                ))}
              </div>

              {/* Download Button */}
              <div className="flex items-center gap-3">
                <a
                  href={generatedAudioUrl}
                  download="jayverse-lyria-track.mp3"
                  className="px-4 py-2 rounded-xl text-xs font-mono font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-700 hover:border-cyan-400 flex items-center gap-2 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download MP3</span>
                </a>
              </div>

              {/* Native Hidden Audio Element */}
              <audio
                ref={audioRef}
                src={generatedAudioUrl}
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
              />
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-[#060b18]/60 border border-slate-800 text-center text-xs text-slate-400">
              <Headphones className="w-8 h-8 text-cyan-400/60 mx-auto mb-2" />
              <span>Select a preset above and click &ldquo;Generate Track (Lyria AI)&rdquo; to synthesize an original 30s coding background track.</span>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
