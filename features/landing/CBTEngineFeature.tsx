'use client';

import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  Flag, 
  Calculator, 
  ShieldAlert, 
  Save, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const CBTEngineFeature: React.FC<{ onTryCBT?: () => void }> = ({ onTryCBT }) => {
  // Mini interactive state to let the user experience the feel right on the landing page
  const [selectedOption, setSelectedOption] = useState<string>('A');
  const [isFlagged, setIsFlagged] = useState<boolean>(false);
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [calcInput, setCalcInput] = useState<string>('25 * 4');

  return (
    <section className="py-20 bg-slate-900 text-white overflow-hidden relative" id="cbt-engine">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-900/50 px-3 py-1 rounded-full border border-blue-700/50">
            Official Exam Simulator
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-3">
            Real Nigerian CBT Experience. Zero Surprises.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3">
            Engineered specifically for JAMB/UTME, WAEC, and BECE candidates. Train under identical timer constraints, autosave resilience, and interface controls.
          </p>
        </div>

        {/* Interactive CBT Preview Container */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-slate-700 bg-slate-800/90 shadow-2xl overflow-hidden">
          
          {/* Top CBT System Bar */}
          <div className="bg-[#0A192F] px-4 py-3 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-bold text-white uppercase tracking-wide">JAMB UTME Simulation</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-300">Subject: <strong>General Mathematics</strong></span>
            </div>

            <div className="flex items-center gap-4">
              {/* Autosave badge */}
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                <Save className="w-3.5 h-3.5" />
                <span>Autosaved</span>
              </div>

              {/* Countdown Timer */}
              <div className="flex items-center gap-1.5 rounded-lg bg-red-950/80 border border-red-500/40 px-3 py-1 text-red-300 font-mono font-bold text-xs">
                <Clock className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                <span>01:42:19</span>
              </div>

              {/* Calculator Toggle */}
              <button
                onClick={() => setShowCalculator(!showCalculator)}
                className={`p-1.5 rounded-lg border transition ${
                  showCalculator 
                    ? 'bg-blue-600 border-blue-400 text-white' 
                    : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700'
                }`}
                title="Toggle CBT Calculator"
              >
                <Calculator className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left: Active Question Area */}
            <div className="md:col-span-2 space-y-5">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-700 pb-2">
                <span>Question <strong>14</strong> of 40</span>
                <button
                  onClick={() => setIsFlagged(!isFlagged)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition ${
                    isFlagged 
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300' 
                      : 'border-slate-600 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{isFlagged ? 'Flagged for Review' : 'Flag Question'}</span>
                </button>
              </div>

              <div className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed">
                A cylinder has a radius of 7 cm and a height of 10 cm. Using π = 22/7, calculate the curved surface area of the cylinder.
              </div>

              {/* Radio Options */}
              <div className="space-y-2.5 pt-2">
                {[
                  { id: 'A', text: '440 cm²' },
                  { id: 'B', text: '220 cm²' },
                  { id: 'C', text: '748 cm²' },
                  { id: 'D', text: '880 cm²' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedOption(opt.id)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition flex items-center gap-3 ${
                      selectedOption === opt.id
                        ? 'bg-blue-600/20 border-blue-500 text-white font-bold ring-1 ring-blue-500'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      selectedOption === opt.id ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300'
                    }`}>
                      {opt.id}
                    </span>
                    <span>{opt.text}</span>
                  </button>
                ))}
              </div>

              {/* Question Action Navigation */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-700">
                <button className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-600 text-xs font-semibold text-slate-300 hover:bg-slate-700 flex items-center gap-1">
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button className="px-5 py-2 rounded-xl bg-blue-600 text-xs font-bold text-white hover:bg-blue-500 flex items-center gap-1 shadow-sm">
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Question Navigator Grid & Calculator */}
            <div className="space-y-4">
              {showCalculator && (
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 flex items-center justify-between">
                    <span>On-Screen Calculator</span>
                    <button onClick={() => setShowCalculator(false)} className="text-slate-500 hover:text-white">✕</button>
                  </div>
                  <div className="bg-slate-800 p-2 rounded text-right font-mono text-xs font-bold text-emerald-400">
                    {calcInput} = 100
                  </div>
                </div>
              )}

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700">
                <div className="text-xs font-bold text-slate-300 mb-3">Question Navigator</div>
                
                {/* 20 Questions sample grid */}
                <div className="grid grid-cols-5 gap-1.5">
                  {Array.from({ length: 20 }).map((_, i) => {
                    const qNum = i + 1;
                    const isCurrent = qNum === 14;
                    const isAnswered = qNum < 14;
                    const isFlaggedItem = qNum === 8 || (qNum === 14 && isFlagged);

                    let bgClass = 'bg-slate-800 text-slate-400 border border-slate-700';
                    if (isCurrent) {
                      bgClass = 'bg-blue-600 text-white font-bold ring-2 ring-blue-400';
                    } else if (isFlaggedItem) {
                      bgClass = 'bg-amber-600 text-white font-bold';
                    } else if (isAnswered) {
                      bgClass = 'bg-emerald-600 text-white font-semibold';
                    }

                    return (
                      <div
                        key={qNum}
                        className={`h-7 rounded text-[11px] flex items-center justify-center cursor-pointer transition ${bgClass}`}
                      >
                        {qNum}
                      </div>
                    );
                  })}
                </div>

                {/* Status Legend */}
                <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    <span>Answered (13)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-600" />
                    <span>Unanswered (6)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                    <span>Flagged (1)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    <span>Current (1)</span>
                  </div>
                </div>
              </div>

              {/* Anti-cheat banner */}
              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-700 flex items-start gap-2 text-[11px] text-slate-400">
                <ShieldAlert className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Background interruption guard detects window-switching and securely logs exam integrity.</span>
              </div>
            </div>

          </div>

          {/* Bottom Launch Bar */}
          <div className="bg-[#0A192F] px-6 py-4 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-300 text-center sm:text-left">
              Want to practice with authentic past questions and full timing?
            </span>
            <button
              onClick={onTryCBT}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition active:scale-95 shadow-md flex items-center justify-center gap-2"
            >
              <span>Launch Full CBT Simulation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
