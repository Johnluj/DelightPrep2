'use client';

import React, { useState } from 'react';
import { Question, QuestionReport, DifficultyLevel } from '@/types/database';
import { 
  getStoredQuestions, 
  saveStoredQuestion, 
  getStoredQuestionReports, 
  saveStoredQuestionReport 
} from '@/lib/storage';
import { SENIOR_CURRICULUM_SUBJECTS, JUNIOR_CURRICULUM_SUBJECTS } from '@/types/curriculum';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Search, 
  Trash2, 
  ShieldCheck,
  Check,
  X,
  FileText,
  Filter
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'questions' | 'reports' | 'ai_generator'>('questions');
  const [questions, setQuestions] = useState<Question[]>(() => getStoredQuestions());
  const [reports, setReports] = useState<QuestionReport[]>(() => getStoredQuestionReports());
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Add Question Modal State
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newSubjectId, setNewSubjectId] = useState<string>('s-mth');
  const [newQuestionText, setNewQuestionText] = useState<string>('');
  const [newOptions, setNewOptions] = useState([
    { id: 'opt-1', text: '', is_correct: true },
    { id: 'opt-2', text: '', is_correct: false },
    { id: 'opt-3', text: '', is_correct: false },
    { id: 'opt-4', text: '', is_correct: false },
  ]);
  const [newExplanation, setNewExplanation] = useState<string>('');
  const [newExamTarget, setNewExamTarget] = useState<string>('JAMB');
  const [newYear, setNewYear] = useState<number>(2025);
  const [newDifficulty, setNewDifficulty] = useState<DifficultyLevel>('medium');

  // AI Generator Form State
  const [aiSubject, setAiSubject] = useState<string>('General Mathematics');
  const [aiTopic, setAiTopic] = useState<string>('Logarithms & Indices');
  const [aiClassLevel, setAiClassLevel] = useState<string>('SSS2');
  const [aiExamType, setAiExamType] = useState<string>('JAMB');
  const [aiCount, setAiCount] = useState<number>(3);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedDrafts, setGeneratedDrafts] = useState<any[]>([]);

  const allSubjects = [...SENIOR_CURRICULUM_SUBJECTS, ...JUNIOR_CURRICULUM_SUBJECTS];

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText) return;

    const newQ: Question = {
      id: `q-adm-${Date.now()}`,
      subject_id: newSubjectId,
      topic_id: 'general',
      class_level: 'SSS2',
      difficulty: newDifficulty,
      question_text: newQuestionText,
      options: newOptions,
      explanation: newExplanation,
      exam_target: newExamTarget as any,
      year: Number(newYear),
      source_type: 'delightprep_original',
      license_status: 'demo_data',
      review_status: 'published',
      created_by: 'super_admin',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const updated = [newQ, ...questions];
    setQuestions(updated);
    saveStoredQuestion(newQ);
    setShowAddModal(false);
    setNewQuestionText('');
    setNewExplanation('');
  };

  const handleResolveReport = (reportId: string) => {
    const updated = reports.map(r => r.id === reportId ? { ...r, status: 'resolved' as const } : r);
    setReports(updated);
  };

  const handleGenerateAI = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: aiSubject,
          topic: aiTopic,
          classLevel: aiClassLevel,
          examType: aiExamType,
          count: aiCount
        })
      });

      const data = await res.json();
      if (data.success && data.questions) {
        setGeneratedDrafts(data.questions);
      }
    } catch (err) {
      console.error('Failed to generate AI questions:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApproveDraft = (draft: any) => {
    const newQ: Question = {
      id: `q-ai-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      subject_id: 's-mth',
      topic_id: 'general',
      class_level: aiClassLevel as any,
      difficulty: draft.difficulty || 'medium',
      question_text: draft.question_text,
      options: draft.options.map((opt: any, idx: number) => ({
        id: `opt-${idx}`,
        text: opt.text,
        is_correct: opt.is_correct
      })),
      explanation: draft.explanation,
      exam_target: aiExamType as any,
      year: 2026,
      source_type: 'ai_draft',
      license_status: 'demo_data',
      review_status: 'published',
      created_by: 'gemini_ai',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    saveStoredQuestion(newQ);
    setQuestions(prev => [newQ, ...prev]);
    setGeneratedDrafts(prev => prev.filter(d => d.question_text !== draft.question_text));
  };

  const filteredQuestions = questions.filter(q =>
    q.question_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.subject_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded text-xs font-bold mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>Super Administrator Workspace</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Curriculum & Question Bank Engine
          </h1>
          <p className="text-xs text-slate-500">
            Author, moderate, approve, and auto-generate authentic Nigerian past questions.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-3.5 py-1.5 rounded-lg transition ${activeTab === 'questions' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
          >
            Question Bank ({questions.length})
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'reports' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
          >
            <span>Reports</span>
            {reports.filter(r => r.status === 'pending').length > 0 && (
              <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center">
                {reports.filter(r => r.status === 'pending').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('ai_generator')}
            className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1 text-blue-700 ${activeTab === 'ai_generator' ? 'bg-white shadow-xs' : ''}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>AI Generator</span>
          </button>
        </div>
      </div>

      {/* TAB 1: QUESTION BANK */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search questions by text or subject..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-300 pl-10 pr-3.5 py-2 text-xs bg-white focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Verified Question</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="divide-y divide-slate-100">
              {filteredQuestions.map((q, idx) => (
                <div key={q.id} className="p-5 hover:bg-slate-50/80 transition space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {q.subject_id}
                      </span>
                      <span className="font-semibold text-slate-700">
                        {q.exam_target} {q.year || ''}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="capitalize text-slate-500 font-medium">
                        Difficulty: {q.difficulty}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full capitalize">
                      {q.review_status}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                    {q.question_text}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                    {q.options.map((opt, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded-lg border text-[11px] ${
                          opt.is_correct
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold'
                            : 'border-slate-200 bg-slate-50 text-slate-600'
                        }`}
                      >
                        <span className="font-bold mr-1">{['A','B','C','D'][i]}:</span>
                        <span>{opt.text}</span>
                      </div>
                    ))}
                  </div>

                  {q.explanation && (
                    <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg mt-2">
                      <strong>Working:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REPORTED QUESTIONS QUEUE */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900">
            Student-reported issues are reviewed here by subject matter experts to maintain DelightPrep's 99.8% answer-key integrity.
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="divide-y divide-slate-100">
              {reports.map(rep => (
                <div key={rep.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded capitalize">
                        {rep.reason.replace('_', ' ')}
                      </span>
                      <span className="text-slate-400">Target Question: {rep.question_id}</span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium">{rep.details || 'No additional details provided by student.'}</p>
                    <div className="text-[11px] text-slate-400">{new Date(rep.created_at).toLocaleDateString()}</div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {rep.status === 'pending' ? (
                      <button
                        onClick={() => handleResolveReport(rep.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Resolve & Update Key</span>
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Resolved</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SERVER-SIDE AI QUESTION GENERATOR */}
      {activeTab === 'ai_generator' && (
        <div className="space-y-6">
          <form onSubmit={handleGenerateAI} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm">NERDC Syllabus AI Question Generator</h3>
            </div>
            <p className="text-xs text-slate-500">
              Calls Google Gemini via server-side API to produce authentic Nigerian exam questions with 4 options and authoritative explanations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={aiSubject}
                  onChange={e => setAiSubject(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Topic</label>
                <input
                  type="text"
                  value={aiTopic}
                  onChange={e => setAiTopic(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Exam</label>
                <select
                  value={aiExamType}
                  onChange={e => setAiExamType(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2 text-xs"
                >
                  <option value="JAMB">JAMB UTME</option>
                  <option value="WAEC">WAEC WASSCE</option>
                  <option value="NECO">NECO SSCE</option>
                  <option value="BECE">BECE (Junior WAEC)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Class Level</label>
                <select
                  value={aiClassLevel}
                  onChange={e => setAiClassLevel(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2 text-xs"
                >
                  <option value="SSS3">SSS3</option>
                  <option value="SSS2">SSS2</option>
                  <option value="SSS1">SSS1</option>
                  <option value="JSS3">JSS3</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isGenerating}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center gap-2 shadow-xs disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isGenerating ? 'Generating Curriculum Questions...' : 'Generate Questions with Gemini'}</span>
              </button>
            </div>
          </form>

          {/* Generated Drafts List */}
          {generatedDrafts.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900">
                  Review & Publish Generated Questions ({generatedDrafts.length})
                </h4>
              </div>

              <div className="space-y-3">
                {generatedDrafts.map((draft, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-blue-600">{aiSubject} • {aiTopic}</span>
                      <button
                        onClick={() => handleApproveDraft(draft)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve & Publish to Bank</span>
                      </button>
                    </div>

                    <p className="text-sm font-semibold text-slate-900">{draft.question_text}</p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {draft.options.map((opt: any, i: number) => (
                        <div
                          key={i}
                          className={`p-2 rounded-lg border text-[11px] ${
                            opt.is_correct ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold' : 'border-slate-200'
                          }`}
                        >
                          <span className="font-bold mr-1">{['A','B','C','D'][i]}:</span>
                          <span>{opt.text}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border">
                      <strong>Working:</strong> {draft.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-2xl border border-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900">Add Verified Curriculum Question</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                  <select
                    value={newSubjectId}
                    onChange={e => setNewSubjectId(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-2"
                  >
                    {allSubjects.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Exam</label>
                  <input
                    type="text"
                    value={newExamTarget}
                    onChange={e => setNewExamTarget(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Year</label>
                  <input
                    type="number"
                    value={newYear}
                    onChange={e => setNewYear(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-300 p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Question Statement</label>
                <textarea
                  required
                  rows={3}
                  value={newQuestionText}
                  onChange={e => setNewQuestionText(e.target.value)}
                  placeholder="Enter syllabus question text..."
                  className="w-full rounded-xl border border-slate-300 p-2"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-slate-700">Options (Select Radio for Correct Answer)</label>
                {newOptions.map((opt, i) => (
                  <div key={opt.id} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correct_opt"
                      checked={opt.is_correct}
                      onChange={() => {
                        const updated = newOptions.map((o, idx) => ({ ...o, is_correct: idx === i }));
                        setNewOptions(updated);
                      }}
                    />
                    <span className="font-bold text-slate-600">{['A','B','C','D'][i]}:</span>
                    <input
                      type="text"
                      required
                      placeholder={`Option ${['A','B','C','D'][i]} text`}
                      value={opt.text}
                      onChange={e => {
                        const updated = [...newOptions];
                        updated[i].text = e.target.value;
                        setNewOptions(updated);
                      }}
                      className="flex-1 rounded-xl border border-slate-300 p-2"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Step-by-Step Educational Explanation</label>
                <textarea
                  required
                  rows={2}
                  value={newExplanation}
                  onChange={e => setNewExplanation(e.target.value)}
                  placeholder="Explain why the answer is correct and write the workings..."
                  className="w-full rounded-xl border border-slate-300 p-2"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg border text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-500"
                >
                  Publish Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
