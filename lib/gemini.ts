import { GoogleGenAI } from '@google/genai';

// Initialize Gemini client server-side only
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

export interface AIEnhancedExplanation {
  deepExplanation: string;
  keyRule: string;
  commonMistake: string;
  memoryHook: string;
}

export async function generateEnhancedExplanation(
  questionText: string,
  options: { id: string; text: string; isCorrect: boolean }[],
  subjectName: string,
  topicName?: string
): Promise<AIEnhancedExplanation> {
  const client = getGeminiClient();
  const correctOption = options.find(o => o.isCorrect);

  // Fallback if AI key is missing or offline
  const defaultFallback: AIEnhancedExplanation = {
    deepExplanation: `In ${subjectName}, this question assesses understanding of fundamental principles. The correct option is "${correctOption?.text}".`,
    keyRule: `Always verify given values and eliminate options that violate dimensional or grammatical consistency.`,
    commonMistake: `Rushing without noting key modifiers or negative qualifiers.`,
    memoryHook: `Associate key formulas or grammar rules with real-world examples.`
  };

  if (!client) {
    return defaultFallback;
  }

  try {
    const prompt = `You are an expert Nigerian academic tutor for WAEC/JAMB/BECE candidates preparing on DelightPrep.
Subject: ${subjectName}
Topic: ${topicName || 'General'}
Question: "${questionText}"
Options:
${options.map((o, idx) => `${String.fromCharCode(65 + idx)}. ${o.text} ${o.isCorrect ? '(CORRECT)' : ''}`).join('\n')}

Provide a structured, encouraging, highly educational breakdown in valid JSON format:
{
  "deepExplanation": "2-3 clear sentences explaining why the correct option is right and why distractors are wrong",
  "keyRule": "The fundamental concept, theorem, or grammar rule to memorize",
  "commonMistake": "The common trap that confuses students in this specific question",
  "memoryHook": "A quick mnemonic, tip, or mental formula to remember in the exam hall"
}`;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text;
    if (!text) return defaultFallback;

    const parsed = JSON.parse(text);
    return {
      deepExplanation: parsed.deepExplanation || defaultFallback.deepExplanation,
      keyRule: parsed.keyRule || defaultFallback.keyRule,
      commonMistake: parsed.commonMistake || defaultFallback.commonMistake,
      memoryHook: parsed.memoryHook || defaultFallback.memoryHook
    };
  } catch (error) {
    console.error('Gemini explanation error:', error);
    return defaultFallback;
  }
}

export async function generateAIQuestionDrafts(params: {
  subject: string;
  topic: string;
  classLevel: string;
  difficulty: string;
  count: number;
}): Promise<any[]> {
  const client = getGeminiClient();
  if (!client) {
    return [
      {
        question_text: `[Sample AI Draft] What is the primary characteristic of ${params.topic} in ${params.subject}?`,
        options: [
          { text: 'Option A (Correct standard definition)', is_correct: true },
          { text: 'Option B (Common distractor misconception)', is_correct: false },
          { text: 'Option C (Inverted parameter)', is_correct: false },
          { text: 'Option D (Unrelated concept)', is_correct: false }
        ],
        explanation: `This tests the core syllabus principle of ${params.topic}. Option A correctly reflects the Nigerian NERDC curriculum definition.`,
        difficulty: params.difficulty,
        source_type: 'ai_draft',
        license_status: 'demo_data',
        review_status: 'draft'
      }
    ];
  }

  try {
    const prompt = `You are DelightPrep's Senior Examination Content Architect.
Generate ${Math.min(params.count, 5)} Nigerian curriculum-aligned multiple-choice questions for:
Subject: ${params.subject}
Class: ${params.classLevel}
Topic: ${params.topic}
Difficulty: ${params.difficulty}

Return ONLY a JSON array of objects with the exact schema:
[
  {
    "question_text": "string",
    "options": [
      {"text": "string", "is_correct": true},
      {"text": "string", "is_correct": false},
      {"text": "string", "is_correct": false},
      {"text": "string", "is_correct": false}
    ],
    "explanation": "Detailed step-by-step educational solution",
    "difficulty": "${params.difficulty}"
  }
]`;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error('Gemini Question Generator error:', error);
    return [];
  }
}

export async function generateStudyCoachInsight(params: {
  studentName: string;
  targetExam: string;
  scoreHistory: { subject: string; score: number; topic?: string }[];
  daysRemaining: number;
}): Promise<string> {
  const client = getGeminiClient();
  const defaultInsight = `Great persistence, ${params.studentName}! You are building steady exam stamina. Focus on reviewing your mistakes immediately after each practice set to turn weak spots into your highest scoring areas before your ${params.targetExam}.`;

  if (!client) return defaultInsight;

  try {
    const prompt = `You are the friendly, intelligent, motivating Study Coach at DelightPrep Nigeria.
Student Name: ${params.studentName}
Target Exam: ${params.targetExam} (${params.daysRemaining} days remaining)
Recent Performance: ${JSON.stringify(params.scoreHistory)}

Write a concise 2-sentence encouraging learning insight and tactical recommendation. Do NOT say "As an AI". Speak as a warm, knowledgeable Nigerian mentor (e.g. "You've made good strides in... next, dedicate 20 minutes to...").`;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || defaultInsight;
  } catch (e) {
    return defaultInsight;
  }
}
