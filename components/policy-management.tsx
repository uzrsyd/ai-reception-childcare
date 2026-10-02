"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PencilLine, Plus, ToggleLeft, ToggleRight } from "lucide-react";

type Policy = {
  id: string;
  title: string;
  category: string;
  content: string;
  active: boolean;
};

const blankPolicy = {
  id: "new",
  title: "",
  category: "General",
  content: "",
  active: true,
};

export function PolicyManagement() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [draft, setDraft] = useState<Policy>(blankPolicy);
  const [loading, setLoading] = useState(true);

  const fetchPolicies = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin");
      const json = (await response.json()) as { policies?: Policy[] };
      setPolicies(json.policies ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/admin");
        const json = (await response.json()) as { policies?: Policy[] };
        if (active) {
          setPolicies(json.policies ?? []);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, []);

  const groupedPolicies = useMemo(() => {
    const groups = new Map<string, Policy[]>();
    for (const policy of policies) {
      const bucket = groups.get(policy.category) ?? [];
      bucket.push(policy);
      groups.set(policy.category, bucket);
    }
    return groups;
  }, [policies]);

  const handleSave = async () => {
    const body = {
      ...draft,
      id: draft.id === "new" ? crypto.randomUUID() : draft.id,
    };

    const response = await fetch("/api/admin/policies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      setDraft(blankPolicy);
      await fetchPolicies();
    }
  };

  const handleToggle = async (policy: Policy) => {
    await fetch("/api/admin/policies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...policy, active: !policy.active }),
    });
    await fetchPolicies();
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-stone-500">Knowledge base</p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-900">Policy management</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin" className="rounded-full border border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50">
            Dashboard
          </Link>
          <button
            type="button"
            onClick={() => setDraft(blankPolicy)}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white"
          >
            <Plus className="h-4 w-4" />
            Add policy
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm">
          <div className="mb-4 text-sm font-medium text-stone-700">Policy form</div>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-[0.12em] text-stone-500">Category</label>
              <select
                value={draft.category}
                onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))}
                className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm text-stone-700 outline-none"
              >
                {[
                  "Hours",
                  "Tuition",
                  "Illness",
                  "Meals",
                  "Enrollment",
                  "Tours",
                  "Pickup",
                  "Medication",
                  "Closures",
                  "General",
                ].map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-[0.12em] text-stone-500">Title</label>
              <input
                value={draft.title}
                onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
                className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm text-stone-700 outline-none"
                placeholder="Hours of Operation"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-[0.12em] text-stone-500">Content</label>
              <textarea
                value={draft.content}
                onChange={(event) => setDraft((current) => ({ ...current, content: event.target.value }))}
                rows={8}
                className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm text-stone-700 outline-none"
                placeholder="Write the center policy in plain language..."
              />
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2">
              <span className="text-sm text-stone-700">Active</span>
              <button
                type="button"
                onClick={() => setDraft((current) => ({ ...current, active: !current.active }))}
                className="text-stone-500"
              >
                {draft.active ? <ToggleRight className="h-8 w-8 text-emerald-600" /> : <ToggleLeft className="h-8 w-8 text-stone-400" />}
              </button>
            </div>

            <button
              type="button"
              onClick={() => void handleSave()}
              className="w-full rounded-full bg-sky-600 px-4 py-2.5 text-sm font-medium text-white"
            >
              Save policy
            </button>
          </div>
        </div>

        <div className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm">
          <div className="mb-4 text-sm font-medium text-stone-700">Current policies</div>

          {loading ? (
            <div className="text-sm text-stone-500">Loading policy library…</div>
          ) : (
            <div className="space-y-5">
              {[...groupedPolicies.entries()].map(([category, items]) => (
                <div key={category} className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">{category}</div>
                  {items.map((policy) => (
                    <div key={policy.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-medium text-stone-800">{policy.title}</div>
                          <div className="mt-1 text-[11px] text-stone-500">{policy.active ? "Active" : "Inactive"}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setDraft(policy)}
                            className="rounded-full border border-stone-200 bg-white p-2 text-stone-600"
                            aria-label={`Edit ${policy.title}`}
                          >
                            <PencilLine className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleToggle(policy)}
                            className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-[11px] font-medium text-stone-700"
                          >
                            {policy.active ? "Deactivate" : "Activate"}
                          </button>
                        </div>
                      </div>
                      <p className="text-sm leading-6 text-stone-600">{policy.content}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
