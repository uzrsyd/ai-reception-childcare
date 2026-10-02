"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { AlertTriangle, ArrowUpRight, BadgeCheck, CalendarClock, ChartColumn, Clock3, MessageSquareText, ShieldAlert } from "lucide-react";

export type AdminData = {
  questionsToday: number;
  answered: number;
  needsAttention: number;
  answerRate: number;
  recentQuestions: Array<{
    id: string;
    question: string;
    category: string;
    status: "answered" | "uncertain" | "escalated";
    confidence: "high" | "medium" | "low";
    created_at: string;
  }>;
  needsAttentionItems: Array<{
    id: string;
    question: string;
    operator_note: string;
    status: "answered" | "uncertain" | "escalated";
    confidence: "high" | "medium" | "low";
    feedback?: "positive" | "negative" | null;
  }>;
  policies: Array<{
    id: string;
    title: string;
    category: string;
    active: boolean;
    content: string;
  }>;
};

const statusClasses = {
  answered: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  uncertain: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  escalated: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
};

export function AdminDashboard() {
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetch("/api/admin")
      .then((res) => res.json())
      .then((json) => setData(json))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="rounded-3xl border border-stone-200 bg-white p-8 text-sm text-stone-600 shadow-sm">
        Loading admin dashboard…
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-stone-500">Operations</p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-900">BrightPath Front Desk Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50">
            Parent view
          </Link>
          <Link href="/admin/policies" className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50">
            Policies
          </Link>
          <div className="rounded-full border border-dashed border-stone-300 bg-stone-50 px-3 py-1.5 text-xs text-stone-600">
            Demo data
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Questions today" value={String(data.questionsToday)} icon={<CalendarClock className="h-4 w-4" />} />
        <StatCard label="Answered" value={String(data.answered)} icon={<BadgeCheck className="h-4 w-4" />} />
        <StatCard label="Needs attention" value={String(data.needsAttention)} icon={<ShieldAlert className="h-4 w-4" />} />
        <StatCard label="Answer rate" value={`${data.answerRate}%`} icon={<ChartColumn className="h-4 w-4" />} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <section className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-stone-700">
            <MessageSquareText className="h-4 w-4 text-sky-600" />
            Recent questions
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500">
                  <th className="pb-3 pr-4 font-medium">Question</th>
                  <th className="pb-3 pr-4 font-medium">Category</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                  <th className="pb-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {data.recentQuestions.map((question) => (
                  <tr key={question.id} className="border-b border-stone-100 last:border-b-0">
                    <td className="py-3 pr-4 text-stone-700">{question.question}</td>
                    <td className="py-3 pr-4 text-stone-600">{question.category}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${statusClasses[question.status]}`}>
                        {question.status}
                      </span>
                    </td>
                    <td className="py-3 text-stone-500">
                      {new Date(question.created_at).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-[28px] border border-rose-200 bg-rose-50 p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-rose-700">
            <AlertTriangle className="h-4 w-4" />
            Needs attention
          </div>

          <div className="space-y-3">
            {data.needsAttentionItems.length === 0 ? (
              <div className="rounded-2xl bg-white px-3 py-4 text-sm text-stone-600 shadow-sm">
                No unresolved issues at the moment.
              </div>
            ) : (
              data.needsAttentionItems.map((item) => (
                <div key={item.id} className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-rose-100">
                  <p className="text-sm font-medium text-stone-800">{item.question}</p>
                  <p className="mt-2 text-xs text-stone-600">{item.operator_note}</p>
                  <div className="mt-3 flex items-center justify-between gap-2 text-[11px]">
                    <span className={`rounded-full px-2 py-1 font-medium ${statusClasses[item.status]}`}>
                      {item.status}
                    </span>
                    <span className="text-stone-500">Operator action: Add policy</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <section className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-stone-700">
          <Clock3 className="h-4 w-4 text-violet-600" />
          Useful operator insight
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Illness", "34%"],
            ["Hours", "22%"],
            ["Meals", "18%"],
            ["Enrollment", "14%"],
          ].map(([label, percent]) => (
            <div key={label} className="rounded-2xl border border-stone-200 bg-stone-50 px-3 py-4">
              <div className="text-xs uppercase tracking-[0.12em] text-stone-500">{label}</div>
              <div className="mt-2 text-2xl font-semibold text-stone-800">{percent}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="rounded-[24px] border border-stone-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="rounded-xl bg-stone-100 p-2 text-stone-700">{icon}</div>
        <ArrowUpRight className="h-4 w-4 text-stone-400" />
      </div>
      <div className="mt-5 text-2xl font-semibold text-stone-900">{value}</div>
      <div className="mt-1 text-sm text-stone-500">{label}</div>
    </div>
  );
}
