import React from 'react';
import { 
  BookOpen, 
  Lightbulb, 
  TrendingUp, 
  Clock, 
  Trophy, 
  ArrowRight 
} from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Practice',
      desc: 'Targeted topic-by-topic drills across Junior and Senior curricula with authentic Nigerian question patterns.',
      icon: BookOpen,
      color: 'blue'
    },
    {
      step: '02',
      title: 'Understand',
      desc: 'Authoritative, pedagogical explanations dissecting every working, grammatical rule, and conceptual pitfall.',
      icon: Lightbulb,
      color: 'amber'
    },
    {
      step: '03',
      title: 'Improve',
      desc: 'Smart diagnostic analytics identify your weak topics and automatically recalibrate your daily revision checklist.',
      icon: TrendingUp,
      color: 'emerald'
    },
    {
      step: '04',
      title: 'Simulate',
      desc: 'Official 180-question JAMB & WAEC CBT simulations with genuine countdown timers, autosave, and test discipline.',
      icon: Clock,
      color: 'purple'
    },
    {
      step: '05',
      title: 'Perform Better',
      desc: 'Walk into your official examination hall with rock-solid confidence, time mastery, and top-tier score readiness.',
      icon: Trophy,
      color: 'rose'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            The DelightPrep Learning Loop
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
            Practice → Understand → Improve → Simulate → Perform Better.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            DelightPrep is not a mindless question bank. Our structured five-phase cycle guides students from foundational knowledge to exam day mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.title}
                className="relative bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-slate-400">STAGE {item.step}</span>
                    <div className="p-2.5 rounded-xl bg-slate-50 text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shadow-xs">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
