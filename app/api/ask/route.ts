import { NextResponse } from "next/server";
import { generateGroundedAnswer, logInteraction } from "@/lib/ai";
import { selectRelevantPolicies } from "@/lib/ai";

export async function POST(request: Request) {
  const body = (await request.json()) as { question?: string };
  const question = body.question?.trim();

  if (!question) {
    return NextResponse.json({ error: "A question is required." }, { status: 400 });
  }

  const answer = await generateGroundedAnswer(question);
  const relevantPolicies = selectRelevantPolicies(question);
  const category = relevantPolicies[0]?.category ?? "General";

  const saved = await logInteraction({
    question,
    answer: answer.answer,
    status: answer.status,
    confidence: answer.confidence,
    operator_note: answer.operatorNote,
    category,
    sources: answer.sources,
  });

  return NextResponse.json({
    ...answer,
    interactionId: saved.id,
  });
}
