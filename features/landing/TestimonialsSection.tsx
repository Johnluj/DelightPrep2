import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Chinedu Okonkwo',
      role: 'JAMB 2025 Candidate (Scored 318)',
      location: 'Enugu / Lagos',
      quote: 'The 4-subject CBT simulation on DelightPrep is identical to the real JAMB center. The timer discipline and instant working explanations in Physics and Chemistry changed everything for me.',
      stars: 5,
      badge: 'Medicine & Surgery Aspirant'
    },
    {
      name: 'Aminat Bello',
      role: 'WAEC Distinction Graduate',
      location: 'Ibadan, Oyo State',
      quote: 'I used DelightPrep for my SSS3 revision. The way it grouped questions by topic helped me fix my weaknesses in Circle Geometry and Literature drama texts.',
      stars: 5,
      badge: '9 A1s & B2s'
    },
    {
      name: 'Mr. Emmanuel Danjuma',
      role: 'Senior Science Teacher',
      location: 'FCT - Abuja',
      quote: 'DelightPrep is the first Nigerian EdTech tool I wholeheartedly recommend to my students. The questions are verified, curriculum-aligned, and free of misleading answer keys.',
      stars: 5,
      badge: 'Secondary Educator'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Student Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
            Trusted by Top Scorers Across Nigeria
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Real outcomes from students who turned consistent practice into university admissions and exam distinctions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-200">
                <div className="font-bold text-sm text-slate-900">{t.name}</div>
                <div className="text-xs text-blue-600 font-medium">{t.role}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{t.location} • {t.badge}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
