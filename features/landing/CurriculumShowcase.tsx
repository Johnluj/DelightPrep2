'use client';

import React, { useState } from 'react';
import { 
  JUNIOR_CURRICULUM_SUBJECTS, 
  SENIOR_CURRICULUM_SUBJECTS,
  POPULAR_JAMB_COURSES 
} from '@/types/curriculum';
import { BookOpen, CheckCircle, GraduationCap, ArrowRight } from 'lucide-react';

export const CurriculumShowcase: React.FC<{ onSelectCurriculum?: () => void }> = ({ onSelectCurriculum }) => {
  const [activeWorld, setActiveWorld] = useState<'junior' | 'senior'>('senior');
  const [activeSeniorDepartment, setActiveSeniorDepartment] = useState<'science' | 'commercial' | 'arts'>('science');

  return (
    <section className="py-20 bg-white border-b border-slate-200" id="curriculum">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              National Curriculum Coverage
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
              Two Distinct Learning Worlds
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
              DelightPrep separates Junior and Senior secondary pathways so students always train with age-appropriate and syllabus-exact content.
            </p>
          </div>

          {/* World Switcher Tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setActiveWorld('senior')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                activeWorld === 'senior'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Senior World (SSS & JAMB)</span>
            </button>
            <button
              onClick={() => setActiveWorld('junior')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                activeWorld === 'junior'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Junior World (JSS & BECE)</span>
            </button>
          </div>
        </div>

        {/* SENIOR WORLD CONTENT */}
        {activeWorld === 'senior' && (
          <div className="space-y-8">
            {/* Senior Department Selector */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 mr-2">Department:</span>
              {(['science', 'commercial', 'arts'] as const).map(dept => (
                <button
                  key={dept}
                  onClick={() => setActiveSeniorDepartment(dept)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold capitalize transition ${
                    activeSeniorDepartment === dept
                      ? 'bg-[#0A192F] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {dept} Department
                </button>
              ))}
            </div>

            {/* Senior Subjects Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
              {SENIOR_CURRICULUM_SUBJECTS.filter(s => 
                s.is_compulsory || s.department === activeSeniorDepartment
              ).map(subj => (
                <div 
                  key={subj.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-xs transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-black text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded">
                      {subj.code}
                    </span>
                    {subj.is_compulsory && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded">
                        Compulsory
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{subj.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{subj.description || 'Senior curriculum aligned'}</p>
                </div>
              ))}
            </div>

            {/* Popular JAMB Course Combinations */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-[#0A192F] text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">Official JAMB UTME Subject Mapping</h3>
                  <p className="text-xs text-blue-200">DelightPrep automatically calibrates the mandatory 4-subject combination for your dream university faculty</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {POPULAR_JAMB_COURSES.slice(0, 6).map(course => (
                  <div key={course.course_name} className="p-3.5 rounded-xl bg-white/10 border border-white/10">
                    <div className="text-xs font-bold text-white">{course.course_name}</div>
                    <div className="text-[11px] text-emerald-300 font-semibold mt-1">
                      JAMB: {course.compulsory_jamb_subjects.join(' • ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* JUNIOR WORLD CONTENT */}
        {activeWorld === 'junior' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
              Junior Secondary covers JSS1 through JSS3, preparing candidates for the National BECE (NECO) and State Ministry of Education Junior WAEC certificates.
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
              {JUNIOR_CURRICULUM_SUBJECTS.map(subj => (
                <div 
                  key={subj.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 hover:shadow-xs transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {subj.code}
                    </span>
                    {subj.is_compulsory && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-200/60 px-1.5 py-0.5 rounded">
                        Compulsory
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{subj.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1">{subj.description || 'Junior curriculum foundation'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
