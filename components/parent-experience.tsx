"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Mic, MessageSquareText, ShieldCheck, Sparkles, TriangleAlert } from "lucide-react";
import { suggestedQuestions, type GroundedAnswer } from "@/lib/brightpath";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  status?: GroundedAnswer["status"];
  confidence?: GroundedAnswer["confidence"];
  sources?: Array<{ policyId: string; title: string }>;
  operatorNote?: string;
};

export function ParentExperience() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I can answer questions about BrightPath’s center policies, hours, meals, tours, pickup, and illness guidance. Please do not share private medical details here.",
      status: "answered",
      confidence: "high",
      sources: [{ policyId: "pol-012", title: "Parent Communication" }],
      operatorNote: "Welcome message uses general policy guidance as context.",
    },
  ]);
  type BrowserSpeechRecognition = {
    lang?: string;
    interimResults?: boolean;
    continuous?: boolean;
    onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
    start: () => void;
    stop: () => void;
  };

  type BrowserSpeechRecognitionCtor = new () => BrowserSpeechRecognition;

  const supportsVoice =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);

  useEffect(() => {
    if (!supportsVoice || typeof window === "undefined") {
      return;
    }

    const SpeechRecognitionCtor =
      (window as typeof window & {
        SpeechRecognition?: BrowserSpeechRecognitionCtor;
        webkitSpeechRecognition?: BrowserSpeechRecognitionCtor;
      }).SpeechRecognition ??
      (window as typeof window & {
        SpeechRecognition?: BrowserSpeechRecognitionCtor;
        webkitSpeechRecognition?: BrowserSpeechRecognitionCtor;
      }).webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) {
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? "")
        .join(" ")
        .trim();
      if (transcript) {
        setInput(transcript);
      }
    };

    recognitionRef.current = recognition;
  }, [supportsVoice]);

  const handleSubmit = async (questionOverride?: string) => {
    const question = (questionOverride ?? input).trim();
    if (!question || isLoading) return;

    setInput("");
    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: "user", content: question },
      { id: crypto.randomUUID(), role: "assistant", content: "Checking BrightPath’s current policies…", status: "uncertain", confidence: "low", sources: [] },
    ]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const payload = (await response.json()) as GroundedAnswer & { answer?: string; article?: string };

      setMessages((current) => {
        const withoutLoading = current.filter((message) => message.content !== "Checking BrightPath’s current policies…");
        return [
          ...withoutLoading,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: payload.answer ?? "I couldn’t verify that from the current policy set.",
            status: payload.status ?? "uncertain",
            confidence: payload.confidence ?? "low",
            sources: payload.sources ?? [],
            operatorNote: payload.operatorNote ?? "Answered using current policy content.",
          },
        ];
      });
    } catch {
      setMessages((current) => {
        const withoutLoading = current.filter((message) => message.content !== "Checking BrightPath’s current policies…");
        return [
          ...withoutLoading,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "I couldn’t complete that check right now. Please contact the center so staff can confirm.",
            status: "uncertain",
            confidence: "low",
            sources: [{ policyId: "pol-014", title: "Center Contact" }],
            operatorNote: "System error during answer generation; recommend staff review.",
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const triggerVoice = () => {
    if (!recognitionRef.current) {
      return;
    }

    recognitionRef.current.start();
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-12 pt-6 sm:px-6 lg:px-8">
      <header className="mb-6 rounded-[28px] border border-stone-200 bg-white/90 p-4 shadow-sm backdrop-blur sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200">
              <ShieldCheck className="mr-1 h-3.5 w-3.5" />
              BrightPath Early Learning
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
              AI Front Desk
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-600">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Answers are based on BrightPath&apos;s current center policies.
            </div>
            <Link href="/admin" className="rounded-full border border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-700 transition hover:bg-stone-50">
              Operator dashboard
            </Link>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-sm text-stone-600 sm:text-base">
          Ask about hours, policies, meals, enrollment, tours and more.
        </p>
      </header>

      <main className="grid flex-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="flex min-h-[620px] flex-col rounded-[28px] border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-stone-700">
              <MessageSquareText className="h-4 w-4 text-amber-600" />
              Parent questions
            </div>
            <div className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-[11px] font-medium text-stone-600">
              Demo mode
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3 overflow-hidden rounded-2xl bg-stone-50 p-3 sm:p-4">
            <div className="flex max-h-[440px] flex-1 flex-col gap-3 overflow-y-auto pr-1">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[88%] rounded-2xl px-3 py-3 text-sm leading-6 shadow-sm ${
                    message.role === "user"
                      ? "ml-auto bg-sky-600 text-white"
                      : "bg-white text-stone-700 ring-1 ring-stone-200"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>

                  {message.role === "assistant" && message.status && (
                    <div className="mt-3 space-y-2 border-t border-stone-200 pt-3 text-[11px] text-stone-600">
                      <div className="flex items-center gap-2">
                        {message.status === "answered" ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <TriangleAlert className="h-4 w-4 text-amber-600" />
                        )}
                        <span>
                          {message.status === "answered"
                            ? "✓ Answered from center policy"
                            : message.status === "uncertain"
                              ? "⚠️ I couldn’t verify this from the center’s current policies."
                              : "⚠️ Escalated for staff review"}
                        </span>
                      </div>

                      {message.sources && message.sources.length > 0 && (
                        <div>
                          <span className="font-medium text-stone-700">Source:</span>{" "}
                          {message.sources.map((source) => source.title).join(", ")}
                        </div>
                      )}

                      {message.operatorNote && (
                        <div className="rounded-xl bg-stone-50 px-2 py-1.5 text-[10px] text-stone-500">
                          {message.operatorNote}
                        </div>
                      )}

                      <div className="flex items-center gap-2 pt-1">
                        <button type="button" className="rounded-full border border-stone-200 bg-white px-2 py-1 text-[10px] font-medium text-stone-600">
                          👍 Helpful
                        </button>
                        <button type="button" className="rounded-full border border-stone-200 bg-white px-2 py-1 text-[10px] font-medium text-stone-600">
                          👎 Needs work
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {messages.length > 1 && (
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setInput("")}
                  className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700"
                >
                  Ask another question
                </button>
              </div>
            )}

            <form
              onSubmit={(event) => {
                event.preventDefault();
                void handleSubmit();
              }}
              className="mt-4 space-y-3"
            >
              <div className="flex items-end gap-2 rounded-2xl border border-stone-200 bg-white p-2 shadow-sm">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about hours, pickup, illness, meals, or enrollment..."
                  rows={3}
                  className="max-h-28 min-h-[84px] flex-1 resize-none border-0 bg-transparent px-2 py-2 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none"
                />
                {supportsVoice && (
                  <button
                    type="button"
                    onClick={triggerVoice}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-stone-50 text-stone-700 transition hover:bg-stone-100"
                    aria-label="Use voice input"
                  >
                    <Mic className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="flex h-11 items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-300"
                >
                  <span>Ask</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-stone-700">
              <Sparkles className="h-4 w-4 text-violet-600" />
              Suggested questions
            </div>
            <div className="space-y-2">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => void handleSubmit(question)}
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2 text-left text-sm text-stone-700 transition hover:border-stone-300 hover:bg-stone-100"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-stone-200 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-stone-800">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Trust & safety
            </div>
            <ul className="space-y-2 text-sm text-stone-600">
              <li>• Answers are grounded only in BrightPath&apos;s policy set.</li>
              <li>• The AI does not diagnose medical conditions.</li>
              <li>• Sensitive questions are routed to staff.</li>
              <li>• If a policy is missing, the system escalates instead of guessing.</li>
            </ul>
          </div>

          <div className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm">
            <div className="mb-3 text-sm font-medium text-stone-700">Quick tips</div>
            <div className="space-y-2 text-sm text-stone-600">
              <p>• Share only the information needed to answer the question.</p>
              <p>• Ask about hours, tuition, pickup, meals, and illness policies.</p>
              <p>• For emergencies, contact emergency services immediately.</p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
