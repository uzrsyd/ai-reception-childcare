import { defaultGroundedAnswer, findRelevantPolicies, seedPolicies, type GroundedAnswer, type Policy } from "@/lib/brightpath";
import { saveInteraction } from "@/lib/store";
import { supabase } from "@/lib/supabase";

const systemPrompt = `You are the BrightPath AI Front Desk assistant. Answer only from the center's policy information given to you. Never invent center-specific details. Keep answers short, warm, and parent-friendly. Cite the relevant policy title in the response when available. If the answer is not in the supplied policy set, clearly say you cannot verify it and recommend contacting center staff. Never provide medical diagnoses or individualized medical advice. For emergencies, instruct the user to contact emergency services. Never claim an action occurred unless it actually occurred.`;

export const selectRelevantPolicies = (question: string, policies: Policy[] = seedPolicies) => findRelevantPolicies(question, policies);

export async function generateGroundedAnswer(question: string) {
  const relevantPolicies = selectRelevantPolicies(question);

  if (process.env.LLM_API_KEY) {
    try {
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.LLM_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          input: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: `Question: ${question}\n\nRelevant policies:\n${relevantPolicies
                .map((policy) => `- ${policy.title}: ${policy.content}`)
                .join("\n")}`,
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "student_liaison_answer",
              schema: {
                type: "object",
                properties: {
                  answer: { type: "string" },
                  confidence: { type: "string", enum: ["high", "medium", "low"] },
                  status: { type: "string", enum: ["answered", "uncertain", "escalated"] },
                  sources: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        policyId: { type: "string" },
                        title: { type: "string" },
                      },
                      required: ["policyId", "title"],
                      additionalProperties: false,
                    },
                  },
                  operatorNote: { type: "string" },
                },
                required: ["answer", "confidence", "status", "sources", "operatorNote"],
                additionalProperties: false,
              },
            },
          },
        }),
      });

      if (response.ok) {
        const payload = (await response.json()) as {
          output?: Array<{ content?: Array<{ type?: string; text?: string }> }>; 
        };

        const text = payload.output
          ?.flatMap((item) => item.content ?? [])
          .filter((content) => content.type === "output_text")
          .map((content) => content.text ?? "")
          .join("\n") ?? "";

        if (text) {
          try {
            const parsed = JSON.parse(text) as GroundedAnswer;
            if (parsed.answer) {
              return parsed;
            }
          } catch {
            // Fall back to deterministic answer if parsing fails.
          }
        }
      }
    } catch {
      // Ignore external failure and continue with the deterministic policy engine.
    }
  }

  return defaultGroundedAnswer(question);
}

export async function logInteraction(interaction: {
  question: string;
  answer: string;
  status: GroundedAnswer["status"];
  confidence: GroundedAnswer["confidence"];
  operator_note: string;
  category: string;
  sources: GroundedAnswer["sources"];
}) {
  const timestamp = new Date().toISOString();
  const record = {
    id: `int-${Date.now()}`,
    center_id: "center-001",
    question: interaction.question,
    answer: interaction.answer,
    status: interaction.status,
    confidence: interaction.confidence,
    operator_note: interaction.operator_note,
    category: interaction.category,
    created_at: timestamp,
    sources: interaction.sources,
    feedback: null,
  };

  saveInteraction(record);

  if (supabase) {
    try {
      await supabase.from("interactions").insert({
        id: record.id,
        center_id: record.center_id,
        question: record.question,
        answer: record.answer,
        status: record.status,
        confidence: record.confidence,
        operator_note: record.operator_note,
        category: record.category,
        created_at: record.created_at,
      });
    } catch {
      // Keep demo mode fully functional even without Supabase connection.
    }
  }

  return record;
}
