'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  PlusCircle, 
  FileText, 
  AlertTriangle, 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  Filter, 
  Search, 
  BookOpen, 
  ArrowLeft,
  Clock,
  Eye,
  Send
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { SEED_SUBJECTS, SEED_TOPICS } from '@/lib/seed-data';
import { Question, QuestionReviewStatus, QuestionSourceType, LicenseStatus } from '@/types/database';

interface AdminPortalProps {
  onBackToStudentView: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToStudentView }) => {
  const { 
    questions, 
    addQuestion, 
    updateQuestionStatus, 
    reports, 
    updateReportStatus 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'questions' | 'new_question' | 'ai_generator' | 'reports'>('questions');
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Form State for manual Question Creation
  const [newQForm, setNewQForm] = useState({
    subject_id: 'mat',
    topic_id: 'top_alg',
    class_level: 'SSS2' as any,
    difficulty: 'medium' as any,
    question_text: '',
    options: [
      { id: 'opt_a', text: '', is_correct: true },
      { id: 'opt_b', text: '', is_correct: false },
      { id: 'opt_c', text: '', is_correct: false },
      { id: 'opt_d', text: '', is_correct: false },
    ],
    explanation: '',
    source_type: 'delightprep_original' as QuestionSourceType,
    source_reference: 'DelightPrep Editorial Review 2026',
    license_status: 'demo_data' as LicenseStatus,
    review_status: 'approved' as QuestionReviewStatus
  });

  // AI Generator Form State
  const [aiForm, setAiForm] = useState({
    subject: 'Mathematics',
    topic: 'Sequences and Series (AP and GP)',
    classLevel: 'SSS2',
    difficulty: 'medium',
    count: 3
  });
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiDrafts, setAiDrafts] = useState<any[]>([]);

  // Filtered questions
  const filteredQuestions = questions.filter(q => {
    if (filterSubject !== 'all' && q.subject_id !== filterSubject) return false;
    if (filterStatus !== 'all' && q.review_status !== filterStatus) return false;
    if (searchQuery && !q.question_text.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleCreateQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQForm.question_text) return;

    addQuestion({
      subject_id: newQForm.subject_id,
      topic_id: newQForm.topic_id,
      class_level: newQForm.class_level,
      difficulty: newQForm.difficulty,
      question_text: newQForm.question_text,
      options: newQForm.options,
      explanation: newQForm.explanation || 'Detailed step-by-step verified explanation.',
      source_type: newQForm.source_type,
      source_reference: newQForm.source_reference,
      license_status: newQForm.license_status,
      review_status: newQForm.review_status
    });

    alert('Question successfully saved into DelightPrep Question Bank!');
    setActiveTab('questions');
  };

  const handleGenerateAiDrafts = async () => {
    setIsGeneratingAi(true);
    try {
      const res = await fetch('/api/ai/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aiForm)
      });
      const data = await res.json();
      if (data.drafts) {
        setAiDrafts(data.drafts);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleApproveAiDraft = (draft: any) => {
    addQuestion({
      subject_id: 'mat',
      topic_id: 'top_seq',
      class_level: aiForm.classLevel as any,
      difficulty: draft.difficulty as any,
      question_text: draft.question_text,
      options: draft.options.map((o: any, i: number) => ({
        id: `opt_ai_${Date.now()}_${i}`,
        text: o.text,
        is_correct: o.is_correct
      })),
      explanation: draft.explanation,
      source_type: 'ai_draft',
      source_reference: 'Generated via Gemini AI / Content Editor Review',
      license_status: 'demo_data',
      review_status: 'published'
    });
    setAiDrafts(prev => prev.filter(d => d !== draft));
    alert('AI Question approved and published to live bank!');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 animate-fadeIn">
      {/* Admin Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-5 sm:p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">DelightPrep Editorial & Question Desk</h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold uppercase">
                Content Manager
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Strict Provenance, Curriculum Alignment & Editorial Verification Workflow.
            </p>
          </div>
        </div>

        <button
          onClick={onBackToStudentView}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Student Dashboard
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('questions')}
          className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition ${
            activeTab === 'questions'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Question Bank ({questions.length})
        </button>
        <button
          onClick={() => setActiveTab('new_question')}
          className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition ${
            activeTab === 'new_question'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <PlusCircle className="w-4 h-4" /> Author New Question
        </button>
        <button
          onClick={() => setActiveTab('ai_generator')}
          className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition ${
            activeTab === 'ai_generator'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-blue-600" /> Academic Question Drafter
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition ${
            activeTab === 'reports'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-500" /> Question Reports ({reports.length})
        </button>
      </div>

      {/* TAB 1: QUESTION BANK & PROVENANCE INSPECTOR */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={filterSubject}
                onChange={e => setFilterSubject(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              >
                <option value="all">All Subjects</option>
                {SEED_SUBJECTS.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              >
                <option value="all">All Review Statuses</option>
                <option value="published">Published</option>
                <option value="under_review">Under Review</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Questions Table */}
          <div className="space-y-3">
            {filteredQuestions.map(q => {
              const subject = SEED_SUBJECTS.find(s => s.id === q.subject_id);

              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                        {subject?.name || q.subject_id.toUpperCase()}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Class: {q.class_level} • Difficulty: {q.difficulty}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-mono">
                        Source: {q.source_type}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                        q.review_status === 'published'
                          ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700'
                          : 'text-amber-700 bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700'
                      }`}>
                        {q.review_status.toUpperCase()}
                      </span>

                      <select
                        value={q.review_status}
                        onChange={e => updateQuestionStatus(q.id, e.target.value)}
                        className="text-xs py-1 px-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                      >
                        <option value="draft">Draft</option>
                        <option value="under_review">Under Review</option>
                        <option value="approved">Approved</option>
                        <option value="published">Published</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                    {q.question_text}
                  </p>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, i) => (
                      <div
                        key={opt.id}
                        className={`p-2 rounded-lg border ${
                          opt.is_correct
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-bold'
                            : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {String.fromCharCode(65 + i)}. {opt.text} {opt.is_correct && '✓'}
                      </div>
                    ))}
                  </div>

                  {/* Provenance Footer */}
                  <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span>Provenance Reference: {q.source_reference || 'DelightPrep Curated'}</span>
                    <span className="font-mono">License Tag: {q.license_status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: MANUAL QUESTION AUTHORING */}
      {activeTab === 'new_question' && (
        <form onSubmit={handleCreateQuestionSubmit} className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Author & Verify Question</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Subject</label>
              <select
                value={newQForm.subject_id}
                onChange={e => setNewQForm({ ...newQForm, subject_id: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
              >
                {SEED_SUBJECTS.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Class Level</label>
              <select
                value={newQForm.class_level}
                onChange={e => setNewQForm({ ...newQForm, class_level: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
              >
                {['JSS1', 'JSS2', 'JSS3', 'SSS1', 'SSS2', 'SSS3'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Difficulty</label>
              <select
                value={newQForm.difficulty}
                onChange={e => setNewQForm({ ...newQForm, difficulty: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Question Prompt Text</label>
            <textarea
              rows={3}
              required
              placeholder="Enter full curriculum question text..."
              value={newQForm.question_text}
              onChange={e => setNewQForm({ ...newQForm, question_text: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
            />
          </div>

          {/* 4 Options */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Answer Options (Select radio button for Correct Answer)</label>
            {newQForm.options.map((opt, i) => (
              <div key={opt.id} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="correct_opt"
                  checked={opt.is_correct}
                  onChange={() => {
                    setNewQForm({
                      ...newQForm,
                      options: newQForm.options.map((o, idx) => ({
                        ...o,
                        is_correct: idx === i
                      }))
                    });
                  }}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="font-bold text-xs w-4">{String.fromCharCode(65 + i)}</span>
                <input
                  type="text"
                  required
                  placeholder={`Option ${String.fromCharCode(65 + i)} text`}
                  value={opt.text}
                  onChange={e => {
                    const nextOpts = [...newQForm.options];
                    nextOpts[i].text = e.target.value;
                    setNewQForm({ ...newQForm, options: nextOpts });
                  }}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Step-by-Step Educational Explanation</label>
            <textarea
              rows={3}
              placeholder="Explain the mathematical theorem, formula substitution, or grammar concord rule..."
              value={newQForm.explanation}
              onChange={e => setNewQForm({ ...newQForm, explanation: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Source Type</label>
              <select
                value={newQForm.source_type}
                onChange={e => setNewQForm({ ...newQForm, source_type: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
              >
                <option value="delightprep_original">DelightPrep Original</option>
                <option value="curriculum_aligned">Curriculum-Aligned (NERDC)</option>
                <option value="licensed_past_question">Licensed Past Question</option>
                <option value="ai_draft">AI Draft (Under Review)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Editorial License Status</label>
              <select
                value={newQForm.license_status}
                onChange={e => setNewQForm({ ...newQForm, license_status: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
              >
                <option value="demo_data">Demo Data / Verification Pass</option>
                <option value="original">Original Proprietary</option>
                <option value="licensed">Verified Licensed</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30"
            >
              Publish Question to Question Bank
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: AI QUESTION DRAFTER */}
      {activeTab === 'ai_generator' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div>
            <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider mb-1">
              <GraduationCap className="w-4 h-4 text-blue-700" />
              <span>Academic Curriculum Drafting Pipeline</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Generate Nigerian Curriculum Drafts</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Drafts are created in "Draft" review status. Editorial human review is required before publishing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Subject</label>
              <input
                type="text"
                value={aiForm.subject}
                onChange={e => setAiForm({ ...aiForm, subject: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Topic</label>
              <input
                type="text"
                value={aiForm.topic}
                onChange={e => setAiForm({ ...aiForm, topic: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Difficulty</label>
              <select
                value={aiForm.difficulty}
                onChange={e => setAiForm({ ...aiForm, difficulty: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Batch Count</label>
              <select
                value={aiForm.count}
                onChange={e => setAiForm({ ...aiForm, count: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
              >
                <option value={2}>2 Questions</option>
                <option value={3}>3 Questions</option>
                <option value={5}>5 Questions</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerateAiDrafts}
            disabled={isGeneratingAi}
            className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-bold text-xs shadow-xs flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4 text-white" />
            <span>{isGeneratingAi ? 'Drafting Curriculum Questions...' : 'Draft Curriculum Questions'}</span>
          </button>

          {/* Draft Results */}
          {aiDrafts.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Review & Approve Drafts ({aiDrafts.length})
              </h3>
              {aiDrafts.map((draft, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                  <p className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {draft.question_text}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {draft.options.map((o: any, i: number) => (
                      <div key={i} className={`p-2 rounded-lg border ${o.is_correct ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 font-bold border-emerald-500' : 'border-slate-200 dark:border-slate-800'}`}>
                        {String.fromCharCode(65 + i)}. {o.text} {o.is_correct && '✓'}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-850">
                    <strong>Explanation:</strong> {draft.explanation}
                  </p>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleApproveAiDraft(draft)}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Publish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: QUESTION REPORTS QUEUE */}
      {activeTab === 'reports' && (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Student & Proctor Error Reports Queue</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Review flagged errors submitted during practice sessions.
            </p>
          </div>

          {reports.length === 0 ? (
            <div className="text-center py-10 text-xs text-slate-400">
              Zero pending reports. All questions currently pass verification!
            </div>
          ) : (
            reports.map(rep => (
              <div key={rep.id} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Question ID: {rep.question_id} • Reason: <span className="text-amber-500">{rep.reason}</span>
                  </span>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">{rep.details || 'No additional note provided.'}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full font-bold uppercase ${
                    rep.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {rep.status}
                  </span>
                  {rep.status === 'pending' && (
                    <button
                      onClick={() => updateReportStatus(rep.id, 'resolved')}
                      className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs"
                    >
                      Resolve & Correct
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
