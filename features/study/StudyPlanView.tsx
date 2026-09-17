'use client';

import React, { useState } from 'react';
import { StudyPlanItem } from '@/types/database';
import { getStoredStudyPlan, saveStoredStudyPlan } from '@/lib/storage';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Flame, 
  Sparkles, 
  ChevronRight,
  BookOpen
} from 'lucide-react';

export const StudyPlanView: React.FC<{ onStartPractice: (subjectId: string) => void }> = ({ onStartPractice }) => {
  const [items, setItems] = useState<StudyPlanItem[]>(() => getStoredStudyPlan());
  const [newSubject, setNewSubject] = useState('s-phy');
  const [newTopic, setNewTopic] = useState('');
  const [newMinutes, setNewMinutes] = useState(30);
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleComplete = (id: string) => {
    const updated = items.map(item =>
      item.id === id ? { ...item, is_completed: !item.is_completed } : item
    );
    setItems(updated);
    saveStoredStudyPlan(updated);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic) return;

    const newItem: StudyPlanItem = {
      id: `plan-${Date.now()}`,
      user_id: 'std-user',
      day_of_week: 'Tuesday',
      subject_id: newSubject,
      subject_name: newSubject === 's-phy' ? 'Physics' : newSubject === 's-chm' ? 'Chemistry' : 'Mathematics',
      topic_name: newTopic,
      target_questions: 15,
      estimated_minutes: Number(newMinutes),
      is_completed: false
    };

    const updated = [...items, newItem];
    setItems(updated);
    saveStoredStudyPlan(updated);
    setNewTopic('');
    setShowAddForm(false);
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const completedCount = items.filter(i => i.is_completed).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded">
            Personalized Study Velocity
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Weekly Revision Schedule
          </h1>
          <p className="text-xs text-slate-500">
            Smart daily milestones aligned with your target Nigerian syllabus and exam date.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Study Goal</span>
        </button>
      </div>

      {/* Overview Metric Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Goals Completed</div>
            <div className="text-lg font-black text-slate-900">{completedCount} of {items.length}</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Planned Velocity</div>
            <div className="text-lg font-black text-slate-900">45 Mins / Day</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Active Streak</div>
            <div className="text-lg font-black text-slate-900">4 Days Protected</div>
          </div>
        </div>
      </div>

      {/* Add Task Form Drawer */}
      {showAddForm && (
        <form onSubmit={handleAddItem} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Add New Syllabus Study Goal</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Subject</label>
              <select
                value={newSubject}
                onChange={e => setNewSubject(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2 text-xs bg-white"
              >
                <option value="s-mth">General Mathematics</option>
                <option value="s-eng">English Language</option>
                <option value="s-phy">Physics</option>
                <option value="s-chm">Chemistry</option>
                <option value="s-bio">Biology</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Topic Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Electric Fields & Coulombs Law"
                value={newTopic}
                onChange={e => setNewTopic(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2 text-xs bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Estimated Duration</label>
              <select
                value={newMinutes}
                onChange={e => setNewMinutes(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 p-2 text-xs bg-white"
              >
                <option value={20}>20 Minutes</option>
                <option value={30}>30 Minutes</option>
                <option value={45}>45 Minutes</option>
                <option value={60}>60 Minutes</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded-lg border text-xs font-semibold text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-500"
            >
              Save Goal
            </button>
          </div>
        </form>
      )}

      {/* Week Day Breakdown */}
      <div className="space-y-4">
        {daysOfWeek.map(day => {
          const dayItems = items.filter(i => i.day_of_week === day);
          if (dayItems.length === 0) return null;

          return (
            <div key={day} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>{day}</span>
                </h3>
                <span className="text-[11px] font-semibold text-slate-500">
                  {dayItems.filter(i => i.is_completed).length} / {dayItems.length} Done
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dayItems.map(item => (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-xl border transition flex items-center justify-between gap-3 ${
                      item.is_completed
                        ? 'bg-slate-50 border-slate-200 text-slate-400'
                        : 'bg-white border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div 
                      onClick={() => toggleComplete(item.id)}
                      className="flex items-start gap-3 cursor-pointer flex-1"
                    >
                      <div className="mt-0.5">
                        {item.is_completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-300 hover:border-blue-600" />
                        )}
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${item.is_completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                          {item.subject_name}: {item.topic_name}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {item.target_questions} Qs • {item.estimated_minutes} mins
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onStartPractice(item.subject_id)}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-700 shrink-0 flex items-center gap-1"
                    >
                      <span>Drill</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
