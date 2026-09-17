import { NextRequest, NextResponse } from 'next/server';
import { generateEnhancedExplanation } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { questionText, options, subjectName, topicName } = await req.json();

    if (!questionText || !options) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const explanation = await generateEnhancedExplanation(
      questionText,
      options,
      subjectName || 'General Subject',
      topicName || 'General Topic'
    );

    return NextResponse.json(explanation);
  } catch (error) {
    console.error('API /api/ai/explanation error:', error);
    return NextResponse.json({ 
      deepExplanation: 'Official syllabus solution available in study review.',
      keyRule: 'Review core definitions and formulas.',
      commonMistake: 'Watch out for tricky distractor answers.',
      memoryHook: 'Practice repeatedly to lock in retention.'
    });
  }
}
