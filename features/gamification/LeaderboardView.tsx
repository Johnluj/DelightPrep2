'use client';

import React, { useState } from 'react';
import { 
  Trophy, 
  Flame, 
  Medal, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  Star,
  Users
} from 'lucide-react';

export const LeaderboardView: React.FC = () => {
  const [scope, setScope] = useState<'national' | 'state' | 'school'>('national');

  const leaders = [
    { rank: 1, name: 'Chukwudi Eze', school: 'King\'s College', state: 'Lagos', xp: 2450, streak: 28, badge: 'JAMB 340+ Aspirant' },
    { rank: 2, name: 'Fatima Abdullahi', school: 'Federal Government Academy', state: 'Suleja / FCT', xp: 2180, streak: 21, badge: 'WAEC 9-As' },
    { rank: 3, name: 'Babatunde Adeleke', school: 'Loyola Jesuit College', state: 'Abuja', xp: 1950, streak: 19, badge: 'Physics Prodigy' },
    { rank: 4, name: 'David Adeyemi (You)', school: 'Kings College', state: 'Lagos', xp: 1480, streak: 4, badge: 'Rising Contender', isUser: true },
    { rank: 5, name: 'Ngozi Okafor', school: 'Queen\'s College', state: 'Lagos', xp: 1390, streak: 14, badge: 'English Maestro' },
    { rank: 6, name: 'Ibrahim Danladi', school: 'Barewa College', state: 'Kaduna', xp: 1220, streak: 10, badge: 'Math Champion' },
    { rank: 7, name: 'Blessing Udoh', school: 'Topfaith International', state: 'Akwa Ibom', xp: 1140, streak: 9, badge: 'Chemistry Whiz' },
    { rank: 8, name: 'Tariere Briggs', school: 'Archdeacon Brown', state: 'Rivers', xp: 1050, streak: 7, badge: 'Biology Star' }
  ];

  const badges = [
    { id: 'b1', name: '7-Day Streak', desc: 'Maintained continuous practice for one whole week', unlocked: false, icon: Flame, color: 'text-amber-500 bg-amber-50' },
    { id: 'b2', name: 'CBT Velocity', desc: 'Completed a 180-question mock exam under 110 minutes', unlocked: true, icon: Trophy, color: 'text-blue-500 bg-blue-50' },
    { id: 'b3', name: 'Distinction Pioneer', desc: 'Achieved 85%+ accuracy on General Mathematics', unlocked: true, icon: Award, color: 'text-emerald-500 bg-emerald-50' },
    { id: 'b4', name: 'Curriculum Conqueror', desc: 'Mastered all 10 topics in SSS2 Chemistry', unlocked: false, icon: Star, color: 'text-purple-500 bg-purple-50' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded">
            National Academic Standings
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Student Leaderboard & Achievements
          </h1>
          <p className="text-xs text-slate-500">
            Compete constructively with ambitious secondary school and exam candidates across all 36 states.
          </p>
        </div>

        {/* Scope Tabs */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto text-xs font-bold">
          <button
            onClick={() => setScope('national')}
            className={`px-3 py-1.5 rounded-lg transition ${scope === 'national' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
          >
            National
          </button>
          <button
            onClick={() => setScope('state')}
            className={`px-3 py-1.5 rounded-lg transition ${scope === 'state' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
          >
            Lagos State
          </button>
          <button
            onClick={() => setScope('school')}
            className={`px-3 py-1.5 rounded-lg transition ${scope === 'school' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
          >
            My School
          </button>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        {/* Silver */}
        <div className="order-2 sm:order-1 bg-white rounded-2xl border border-slate-200 p-5 text-center shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 font-black text-sm flex items-center justify-center mx-auto mb-2 border border-slate-300">
              #2
            </div>
            <h3 className="font-bold text-sm text-slate-900">{leaders[1].name}</h3>
            <p className="text-xs text-slate-500">{leaders[1].school}, {leaders[1].state}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-3 text-xs">
            <span className="font-black text-blue-600">{leaders[1].xp} XP</span>
            <span className="text-slate-400">•</span>
            <span className="font-bold text-amber-600">{leaders[1].streak}d Streak 🔥</span>
          </div>
        </div>

        {/* Gold */}
        <div className="order-1 sm:order-2 bg-gradient-to-b from-amber-50 to-white rounded-2xl border-2 border-amber-400 p-6 text-center shadow-md flex flex-col justify-between relative sm:-translate-y-2">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-full shadow-xs">
            National #1
          </div>
          <div>
            <div className="w-12 h-12 rounded-full bg-amber-400 text-amber-950 font-black text-base flex items-center justify-center mx-auto mb-2 shadow-inner">
              👑
            </div>
            <h3 className="font-black text-base text-slate-900">{leaders[0].name}</h3>
            <p className="text-xs text-slate-600">{leaders[0].school}, {leaders[0].state}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-amber-200 flex items-center justify-center gap-3 text-xs">
            <span className="font-black text-blue-700">{leaders[0].xp} XP</span>
            <span className="text-slate-400">•</span>
            <span className="font-bold text-amber-600">{leaders[0].streak}d Streak 🔥</span>
          </div>
        </div>

        {/* Bronze */}
        <div className="order-3 bg-white rounded-2xl border border-slate-200 p-5 text-center shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center mx-auto mb-2 border border-amber-300">
              #3
            </div>
            <h3 className="font-bold text-sm text-slate-900">{leaders[2].name}</h3>
            <p className="text-xs text-slate-500">{leaders[2].school}, {leaders[2].state}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-3 text-xs">
            <span className="font-black text-blue-600">{leaders[2].xp} XP</span>
            <span className="text-slate-400">•</span>
            <span className="font-bold text-amber-600">{leaders[2].streak}d Streak 🔥</span>
          </div>
        </div>
      </div>

      {/* Leaderboard Table List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="divide-y divide-slate-100">
          {leaders.map(student => (
            <div
              key={student.rank}
              className={`p-4 flex items-center justify-between text-xs transition ${
                student.isUser ? 'bg-blue-50/80 font-semibold' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span className={`w-6 text-center font-bold ${student.rank <= 3 ? 'text-amber-600' : 'text-slate-400'}`}>
                  #{student.rank}
                </span>
                <div>
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <span>{student.name}</span>
                    {student.isUser && (
                      <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-bold">You</span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {student.school} • {student.state}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden sm:block text-right">
                  <div className="text-[11px] text-slate-400">{student.badge}</div>
                  <div className="text-slate-600 font-bold">{student.streak}d streak</div>
                </div>
                <div className="text-right">
                  <span className="font-black text-sm text-blue-600">{student.xp}</span>
                  <span className="text-[10px] text-slate-400 ml-1">XP</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges Cabinet */}
      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" />
          <span>My Badges Cabinet</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map(b => {
            const Icon = b.icon;
            return (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                  b.unlocked
                    ? 'bg-white border-slate-200 shadow-xs'
                    : 'bg-slate-50/70 border-slate-200/60 opacity-60'
                }`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${b.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">{b.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{b.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] font-bold">
                  {b.unlocked ? (
                    <span className="text-emerald-600">✓ Unlocked</span>
                  ) : (
                    <span className="text-slate-400">Locked • Keep Practicing</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
