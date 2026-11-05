import React, { useState } from 'react';
import { X, Cloud, Copy, Check, Terminal, ExternalLink, ShieldCheck } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface AmplifyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AmplifyGuideModal: React.FC<AmplifyGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedYml, setCopiedYml] = useState(false);

  if (!isOpen) return null;

  const amplifyYamlContent = `version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
`;

  const handleCopyYaml = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(amplifyYamlContent);
    setCopiedYml(true);
    setTimeout(() => setCopiedYml(false), 2500);
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
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-400/30 flex items-center justify-center">
              <Cloud className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-0.5">
                DEPLOYMENT READINESS
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                AWS Amplify Hosting Guide
              </h3>
            </div>
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

        <div className="space-y-6 text-sm text-slate-300">
          <p className="leading-relaxed">
            The JAYVERSE portfolio is pre-configured for instant static hosting on <strong className="text-white">AWS Amplify</strong> with zero configuration drift. Follow these 4 simple steps to deploy live:
          </p>

          {/* Steps */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold mb-1">
                <span>STEP 01</span>
                <span className="text-slate-600">·</span>
                <span>Push Code to GitHub</span>
              </div>
              <p className="text-xs text-slate-300">
                Commit this repository to your GitHub account (e.g. <code className="text-cyan-300">github.com/jayverse-dev/portfolio</code>).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold mb-1">
                <span>STEP 02</span>
                <span className="text-slate-600">·</span>
                <span>Connect in AWS Management Console</span>
              </div>
              <p className="text-xs text-slate-300">
                Open <strong className="text-white">AWS Amplify Console</strong> &gt; Click <em>&ldquo;Host web app&rdquo;</em> &gt; Choose <em>GitHub</em> &gt; Select your repository and the <code className="text-cyan-300">main</code> branch.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold">
                  <span>STEP 03</span>
                  <span className="text-slate-600">·</span>
                  <span>Amplify Build Specification (amplify.yml)</span>
                </div>
                <button
                  onClick={handleCopyYaml}
                  className="px-2 py-1 text-xs font-mono rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition-colors"
                >
                  {copiedYml ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-cyan-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy amplify.yml</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 rounded-lg bg-black/60 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
                {amplifyYamlContent}
              </pre>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold mb-1">
                <span>STEP 04</span>
                <span className="text-slate-600">·</span>
                <span>Automatic Continuous Deployment (CI/CD)</span>
              </div>
              <p className="text-xs text-slate-300">
                Amplify will automatically build into the <code className="text-cyan-300">dist/</code> folder and distribute via Amazon CloudFront CDN worldwide with free SSL encryption.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
            <div className="text-xs text-slate-200">
              <strong className="text-white block font-medium">Hackathon &amp; Recruiter Friendly:</strong>
              Provides sub-second global latency, responsive mobile performance, and 99.99% uptime for judges and recruiters.
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
