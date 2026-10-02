import { seedInteractions, seedPolicies, type Policy, type QuestionInteraction } from "@/lib/brightpath";

export type StoreState = {
  policies: Policy[];
  interactions: QuestionInteraction[];
};

const state: StoreState = {
  policies: [...seedPolicies],
  interactions: [...seedInteractions],
};

export const getStoreState = () => ({
  policies: [...state.policies],
  interactions: [...state.interactions],
});

export const getActivePolicies = () => state.policies.filter((policy) => policy.active);

export const getInteractions = () => [...state.interactions].sort(
  (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
);

export const saveInteraction = (interaction: QuestionInteraction) => {
  state.interactions.unshift(interaction);
  return interaction;
};

export const upsertPolicy = (input: Partial<Policy> & Pick<Policy, "id" | "category" | "title" | "content" | "active">) => {
  const existingIndex = state.policies.findIndex((policy) => policy.id === input.id);

  const nextPolicy: Policy = {
    id: input.id,
    center_id: input.center_id ?? "center-001",
    category: input.category,
    title: input.title,
    content: input.content,
    active: input.active,
    created_at: input.created_at ?? new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    state.policies[existingIndex] = { ...state.policies[existingIndex], ...nextPolicy };
    return state.policies[existingIndex];
  }

  state.policies.unshift(nextPolicy);
  return nextPolicy;
};

export const getAdminSnapshot = () => {
  const interactions = getInteractions();
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const questionsToday = interactions.filter(
    (item) => new Date(item.created_at) >= todayStart,
  ).length;

  const answered = interactions.filter((item) => item.status === "answered").length;
  const needsAttention = interactions.filter(
    (item) => item.confidence === "low" || item.status === "escalated" || item.feedback === "negative",
  ).length;
  const answerRate = interactions.length ? Math.round((answered / interactions.length) * 100) : 0;

  const categoryCounts = interactions.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});

  return {
    questionsToday,
    answered,
    needsAttention,
    answerRate,
    recentQuestions: interactions.slice(0, 8),
    categoryCounts,
    needsAttentionItems: interactions.filter(
      (item) => item.confidence === "low" || item.status === "escalated" || item.feedback === "negative",
    ),
    policies: [...state.policies],
  };
};
