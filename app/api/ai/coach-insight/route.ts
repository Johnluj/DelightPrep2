import { NextResponse } from 'next/server';
import { generateStudyCoachInsight } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studentName, targetExam, scoreHistory, daysRemaining } = body;

    const insight = await generateStudyCoachInsight({
      studentName: studentName || 'Student',
      targetExam: targetExam || 'JAMB/UTME',
      scoreHistory: scoreHistory || [],
      daysRemaining: daysRemaining || 60
    });

    return NextResponse.json({ insight });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}
