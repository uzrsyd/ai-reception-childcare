export type Policy = {
  id: string;
  center_id: string;
  category: string;
  title: string;
  content: string;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type InteractionStatus = "answered" | "uncertain" | "escalated";
export type Confidence = "high" | "medium" | "low";

export type PolicyReference = {
  policyId: string;
  title: string;
};

export type GroundedAnswer = {
  answer: string;
  confidence: Confidence;
  status: InteractionStatus;
  sources: PolicyReference[];
  operatorNote: string;
};

export type QuestionInteraction = {
  id: string;
  center_id: string;
  question: string;
  answer: string;
  status: InteractionStatus;
  confidence: Confidence;
  operator_note: string;
  category: string;
  created_at: string;
  sources: PolicyReference[];
  feedback?: "positive" | "negative" | null;
};

export const centerName = "BrightPath Early Learning Center";

export const seedPolicies: Policy[] = [
  {
    id: "pol-001",
    center_id: "center-001",
    category: "Hours",
    title: "Hours of Operation",
    content:
      "BrightPath Early Learning Center is open Monday through Friday from 7:00 AM to 6:00 PM. Parents should plan to pick up children by 6:00 PM. The center follows its published annual holiday calendar and may close for recognized holidays.",
    active: true,
    created_at: "2025-01-15T08:00:00.000Z",
    updated_at: "2025-09-12T08:00:00.000Z",
  },
  {
    id: "pol-002",
    center_id: "center-001",
    category: "Pickup",
    title: "Late Pickup",
    content:
      "Pickup after 6:00 PM incurs a $15 fee for each 10-minute interval after closing time. Late pickup charges are intended to cover staffing and operational costs. Families should contact the center as soon as possible if they will be late.",
    active: true,
    created_at: "2025-01-15T08:00:00.000Z",
    updated_at: "2025-09-12T08:00:00.000Z",
  },
  {
    id: "pol-003",
    center_id: "center-001",
    category: "Tuition",
    title: "Tuition and Fees",
    content:
      "Tuition varies by age group, classroom, and program. BrightPath does not publish a single flat rate online. Families should contact the center for current tuition and fee information for the appropriate classroom or program.",
    active: true,
    created_at: "2025-01-15T08:00:00.000Z",
    updated_at: "2025-09-12T08:00:00.000Z",
  },
  {
    id: "pol-004",
    center_id: "center-001",
    category: "Illness",
    title: "Illness & Wellness Policy",
    content:
      "A child must stay home if they have a fever of 100.4°F or higher, vomiting, diarrhea, or a contagious illness. A child may return after being symptom-free for 24 hours without fever-reducing medication, unless otherwise directed by a healthcare professional. Staff may require additional documentation or guidance depending on the health concern.",
    active: true,
    created_at: "2025-02-02T08:30:00.000Z",
    updated_at: "2025-09-13T08:30:00.000Z",
  },
  {
    id: "pol-005",
    center_id: "center-001",
    category: "Medication",
    title: "Medication Administration",
    content:
      "Medication must be delivered in the original labeled container and accompanied by parent authorization. Medication is administered according to center procedures and staff guidance. The center does not provide medical diagnoses or individualized medical recommendations.",
    active: true,
    created_at: "2025-02-02T08:30:00.000Z",
    updated_at: "2025-09-13T08:30:00.000Z",
  },
  {
    id: "pol-006",
    center_id: "center-001",
    category: "Meals",
    title: "Meals and Snacks",
    content:
      "BrightPath provides a morning snack, lunch, and an afternoon snack each day. The center follows a menu that supports healthy eating and considers dietary needs. Families should notify staff of allergies or dietary restrictions so the center can coordinate safe meal planning.",
    active: true,
    created_at: "2025-02-10T08:45:00.000Z",
    updated_at: "2025-09-14T08:45:00.000Z",
  },
  {
    id: "pol-007",
    center_id: "center-001",
    category: "Meals",
    title: "Allergy and Dietary Support",
    content:
      "Families must inform BrightPath of any known allergies, dietary restrictions, or medical nutrition needs before enrollment or when the need arises. Staff will work with families to support a safe plan, but the center does not manage medical diagnosis or treatment plans outside of the center's policy and procedures.",
    active: true,
    created_at: "2025-02-10T08:45:00.000Z",
    updated_at: "2025-09-14T08:45:00.000Z",
  },
  {
    id: "pol-008",
    center_id: "center-001",
    category: "Tours",
    title: "Center Tours",
    content:
      "Tours are offered Monday through Friday. Parents may request a tour by contacting the center or completing a tour request through the main office. Tour availability depends on staff scheduling and classroom activity.",
    active: true,
    created_at: "2025-02-20T09:00:00.000Z",
    updated_at: "2025-09-15T09:00:00.000Z",
  },
  {
    id: "pol-009",
    center_id: "center-001",
    category: "Enrollment",
    title: "Enrollment and Classroom Availability",
    content:
      "Enrollment is based on classroom availability, age fit, and center capacity. Families may inquire about openings, waitlists, and start dates by contacting the center. A classroom placement is not guaranteed until the center confirms enrollment.",
    active: true,
    created_at: "2025-02-20T09:00:00.000Z",
    updated_at: "2025-09-15T09:00:00.000Z",
  },
  {
    id: "pol-010",
    center_id: "center-001",
    category: "Pickup",
    title: "Authorized Pickup Policy",
    content:
      "Only authorized individuals may pick up a child from BrightPath. Parents should keep pickup authorization current. Photo identification may be requested before releasing a child to an authorized pickup person.",
    active: true,
    created_at: "2025-03-05T09:15:00.000Z",
    updated_at: "2025-09-15T09:15:00.000Z",
  },
  {
    id: "pol-011",
    center_id: "center-001",
    category: "Closures",
    title: "Weather and Holiday Closures",
    content:
      "BrightPath follows the published annual holiday calendar for scheduled closures. Weather-related closures are communicated directly to families by the center. Families should check direct center communication for closure updates.",
    active: true,
    created_at: "2025-03-05T09:15:00.000Z",
    updated_at: "2025-09-15T09:15:00.000Z",
  },
  {
    id: "pol-012",
    center_id: "center-001",
    category: "General",
    title: "Parent Communication",
    content:
      "Parents should contact center staff for account-specific questions, enrollment questions, account updates, tuition, and questions that require a staff decision. The AI Front Desk is designed to answer general questions using current center policies and may direct families to staff when the answer is not clear.",
    active: true,
    created_at: "2025-03-16T10:00:00.000Z",
    updated_at: "2025-09-16T10:00:00.000Z",
  },
  {
    id: "pol-013",
    center_id: "center-001",
    category: "General",
    title: "Safety and Escalation",
    content:
      "The AI Front Desk cannot provide emergency medical guidance, diagnose illness, or provide individualized safety advice. For emergencies, families should contact emergency services immediately and notify center staff as appropriate. Sensitive family or medical questions should be reviewed by staff.",
    active: true,
    created_at: "2025-03-16T10:00:00.000Z",
    updated_at: "2025-09-16T10:00:00.000Z",
  },
  {
    id: "pol-014",
    center_id: "center-001",
    category: "General",
    title: "Center Contact",
    content:
      "Families may contact the BrightPath main office to confirm center hours, tuition, enrollment, pickup authorization, closures, and other center-specific policies. Staff are the best source for account-specific or situation-specific guidance.",
    active: true,
    created_at: "2025-03-20T11:00:00.000Z",
    updated_at: "2025-09-17T11:00:00.000Z",
  },
];

export const suggestedQuestions = [
  "What are your hours?",
  "When can my child return after a fever?",
  "Are meals provided?",
  "How do I schedule a tour?",
  "Who can pick up my child?",
];

export const seedInteractions: QuestionInteraction[] = [
  {
    id: "int-001",
    center_id: "center-001",
    question: "What time do you close?",
    answer: "BrightPath is open Monday through Friday from 7:00 AM to 6:00 PM. The center closes at 6:00 PM.",
    status: "answered",
    confidence: "high",
    operator_note: "Directly answered by Hours of Operation policy.",
    category: "Hours",
    created_at: "2026-10-01T09:00:00.000Z",
    sources: [{ policyId: "pol-001", title: "Hours of Operation" }],
    feedback: "positive",
  },
  {
    id: "int-002",
    center_id: "center-001",
    question: "My daughter had a fever this morning. Can she come tomorrow?",
    answer:
      "Children may return after being symptom-free for 24 hours without fever-reducing medication, unless a healthcare professional directs otherwise.",
    status: "answered",
    confidence: "high",
    operator_note: "Policy clearly covers symptom-free return period after fever.",
    category: "Illness",
    created_at: "2026-10-01T10:05:00.000Z",
    sources: [{ policyId: "pol-004", title: "Illness & Wellness Policy" }],
    feedback: "positive",
  },
  {
    id: "int-003",
    center_id: "center-001",
    question: "Do you offer sibling discounts?",
    answer:
      "I couldn’t find a reliable answer to that in BrightPath’s current policies. Please contact the center so staff can confirm.",
    status: "escalated",
    confidence: "low",
    operator_note: "No policy currently covers sibling discounts. Operator action: add policy or clarify tuition guidance.",
    category: "Tuition",
    created_at: "2026-10-01T11:10:00.000Z",
    sources: [{ policyId: "pol-003", title: "Tuition and Fees" }],
    feedback: "negative",
  },
  {
    id: "int-004",
    center_id: "center-001",
    question: "Are meals included?",
    answer: "BrightPath provides a morning snack, lunch, and an afternoon snack each day.",
    status: "answered",
    confidence: "high",
    operator_note: "Meals policy answered the question directly.",
    category: "Meals",
    created_at: "2026-10-01T12:00:00.000Z",
    sources: [{ policyId: "pol-006", title: "Meals and Snacks" }],
    feedback: "positive",
  },
  {
    id: "int-005",
    center_id: "center-001",
    question: "My child has a rash. What disease does she have?",
    answer:
      "I can’t diagnose medical conditions or tell you what illness a child may have. Please contact a healthcare professional and the center for guidance.",
    status: "escalated",
    confidence: "low",
    operator_note: "Medical diagnosis request should not be answered by the AI Front Desk. Recommend medical professional and staff contact.",
    category: "General",
    created_at: "2026-10-01T13:15:00.000Z",
    sources: [{ policyId: "pol-013", title: "Safety and Escalation" }],
    feedback: "negative",
  },
  {
    id: "int-006",
    center_id: "center-001",
    question: "My child is having trouble breathing. What should I do?",
    answer: "This is an emergency. Please call emergency services immediately and seek urgent medical care right away.",
    status: "escalated",
    confidence: "low",
    operator_note: "Emergency response should never rely on center policy. Safety escalation required.",
    category: "General",
    created_at: "2026-10-01T14:20:00.000Z",
    sources: [{ policyId: "pol-013", title: "Safety and Escalation" }],
    feedback: "negative",
  },
  {
    id: "int-007",
    center_id: "center-001",
    question: "Who can pick up my child?",
    answer: "Only authorized individuals may pick up a child. Photo identification may be requested before release.",
    status: "answered",
    confidence: "high",
    operator_note: "Pickup policy directly answered this question.",
    category: "Pickup",
    created_at: "2026-10-01T15:35:00.000Z",
    sources: [{ policyId: "pol-010", title: "Authorized Pickup Policy" }],
    feedback: "positive",
  },
  {
    id: "int-008",
    center_id: "center-001",
    question: "Are you open on Fridays?",
    answer: "BrightPath is open Monday through Friday from 7:00 AM to 6:00 PM.",
    status: "answered",
    confidence: "high",
    operator_note: "Hours policy covers opening days and times.",
    category: "Hours",
    created_at: "2026-10-01T16:00:00.000Z",
    sources: [{ policyId: "pol-001", title: "Hours of Operation" }],
    feedback: "positive",
  },
  {
    id: "int-009",
    center_id: "center-001",
    question: "Can I get a tour this week?",
    answer: "Tours are offered Monday through Friday, and parents may request a tour by contacting the center.",
    status: "answered",
    confidence: "medium",
    operator_note: "Relevant tour policy exists, but final scheduling depends on staff availability.",
    category: "Tours",
    created_at: "2026-10-02T08:30:00.000Z",
    sources: [{ policyId: "pol-008", title: "Center Tours" }],
    feedback: "positive",
  },
  {
    id: "int-010",
    center_id: "center-001",
    question: "What is the tuition for the infant room?",
    answer:
      "Tuition varies by age group, classroom, and program. Please contact the center for current pricing for the appropriate room or program.",
    status: "answered",
    confidence: "high",
    operator_note: "Tuition policy explains that pricing depends on age and classroom.",
    category: "Tuition",
    created_at: "2026-10-02T09:00:00.000Z",
    sources: [{ policyId: "pol-003", title: "Tuition and Fees" }],
    feedback: "positive",
  },
];

export const normaliseText = (value: string) => value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

export const keywordIndex: Record<string, string[]> = {
  Hours: ["hours", "open", "close", "closed", "mon", "friday", "monday", "schedule", "6 pm", "7 am"],
  Tuition: ["tuition", "cost", "price", "fee", "fees", "monthly", "discount"],
  Illness: ["fever", "vomit", "vomiting", "diarrhea", "sick", "illness", "returns", "symptom", "contagious"],
  Medication: ["medication", "medicine", "prescription", "label", "authorization", "administer"],
  Meals: ["meal", "snack", "lunch", "food", "allergy", "dietary"],
  Enrollment: ["enroll", "enrollment", "availability", "waitlist", "classroom", "application"],
  Tours: ["tour", "visit", "schedule a tour", "see the center"],
  Pickup: ["pickup", "pick up", "authorized", "photo id", "id", "guardian"],
  Closures: ["closure", "closed", "holiday", "weather", "calendar"],
  General: ["policy", "contact", "staff", "center", "ask"],
};

export const findRelevantPolicies = (question: string, policies: Policy[] = seedPolicies) => {
  const normalized = normaliseText(question);
  const scored = policies
    .filter((policy) => policy.active)
    .map((policy) => {
      const haystack = normaliseText(`${policy.title} ${policy.content} ${policy.category}`);
      let score = 0;
      const words = new Set([...keywordIndex[policy.category] ?? [], ...normaliseText(policy.title).split(" ")]);
      for (const word of words) {
        if (normalized.includes(word)) {
          score += 2;
        }
      }
      if (haystack.includes(normalized)) {
        score += 10;
      }
      return { policy, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((entry) => entry.policy);

  if (scored.length === 0) {
    return policies.filter((policy) => policy.active).slice(0, 2);
  }

  return scored;
};

export const defaultGroundedAnswer = (question: string): GroundedAnswer => {
  const q = normaliseText(question);

  if (/(system prompt|ignore your instructions|reveal your system prompt|ignore.*instructions)/.test(q)) {
    return {
      answer: "I can only answer questions using BrightPath’s current center policies. I’m not able to share internal instructions or hidden system prompts.",
      confidence: "low",
      status: "uncertain",
      sources: [],
      operatorNote: "Prompt injection attempt blocked. Response limited to center policy content.",
    };
  }

  if (/(trouble breathing|difficulty breathing|not breathing|choking|unresponsive|emergency|911)/.test(q)) {
    return {
      answer: "This is an emergency. Please call emergency services immediately and seek urgent medical care right away.",
      confidence: "low",
      status: "escalated",
      sources: [{ policyId: "pol-013", title: "Safety and Escalation" }],
      operatorNote: "Emergency response should never rely on a childcare policy summary. Immediate medical attention is required.",
    };
  }

  if (/(sibling discount|sibling discounts|siblings? discount|discount.*siblings|siblings?.*discount)/.test(q)) {
    return {
      answer: "I couldn’t find a reliable answer to that in BrightPath’s current policies. Please contact the center so staff can confirm.",
      confidence: "low",
      status: "escalated",
      sources: [{ policyId: "pol-003", title: "Tuition and Fees" }, { policyId: "pol-014", title: "Center Contact" }],
      operatorNote: "No policy currently covers sibling discounts. This question should be routed to staff for a policy decision or a new policy entry.",
    };
  }

  if (/(rash|disease|diagnose|diagnosis|what illness|what disease|what is wrong)/.test(q)) {
    return {
      answer: "I can’t diagnose a medical condition or tell you what illness a child may have. Please contact a healthcare professional and the center for guidance.",
      confidence: "low",
      status: "escalated",
      sources: [{ policyId: "pol-013", title: "Safety and Escalation" }],
      operatorNote: "Sensitive medical diagnosis request not suitable for AI responding. Recommend medical evaluation and staff contact.",
    };
  }

  if (/(close|closed|closing|open|hours|what time do you close|what time.*close|when.*open)/.test(q)) {
    return {
      answer: "BrightPath is open Monday through Friday from 7:00 AM to 6:00 PM. The center closes at 6:00 PM.",
      confidence: "high",
      status: "answered",
      sources: [{ policyId: "pol-001", title: "Hours of Operation" }],
      operatorNote: "Direct answer grounded in hours policy.",
    };
  }

  if (/(fever|vomit|diarrhea|return tomorrow|come tomorrow|sick|symptom free| symptom free )/.test(q)) {
    return {
      answer: "Children may return after being symptom-free for 24 hours without fever-reducing medication, unless a healthcare professional directs otherwise. A child must stay home if they have a fever of 100.4°F or higher, vomiting, diarrhea, or a contagious illness.",
      confidence: "high",
      status: "answered",
      sources: [{ policyId: "pol-004", title: "Illness & Wellness Policy" }],
      operatorNote: "Return-to-care guidance grounded in illness policy and medical caution language.",
    };
  }

  if (/(meal|meals|snack|lunch|food|allergy|dietary)/.test(q)) {
    return {
      answer: "BrightPath provides a morning snack, lunch, and an afternoon snack each day. Families should share allergies or dietary restrictions so the center can coordinate safe meal planning.",
      confidence: "high",
      status: "answered",
      sources: [
        { policyId: "pol-006", title: "Meals and Snacks" },
        { policyId: "pol-007", title: "Allergy and Dietary Support" },
      ],
      operatorNote: "Meals and dietary guidance grounded in center policies.",
    };
  }

  if (/(tour|schedule.*tour|visit the center|request a tour)/.test(q)) {
    return {
      answer: "Tours are offered Monday through Friday. Parents can request a tour by contacting the center or submitting a request through the main office.",
      confidence: "high",
      status: "answered",
      sources: [{ policyId: "pol-008", title: "Center Tours" }],
      operatorNote: "Tour scheduling answer grounded in the center tour policy.",
    };
  }

  if (/(pick up|pickup|authorized|who can pick|photo id|id)/.test(q)) {
    return {
      answer: "Only authorized individuals may pick up a child. Photo identification may be requested before release.",
      confidence: "high",
      status: "answered",
      sources: [{ policyId: "pol-010", title: "Authorized Pickup Policy" }],
      operatorNote: "Pickup policy answered this clearly.",
    };
  }

  if (/(tuition|cost|price|fee|discount)/.test(q)) {
    return {
      answer: "Tuition varies by age group, classroom, and program. BrightPath does not publish a single flat rate online, and the center can provide current pricing based on the child’s age or program.",
      confidence: "high",
      status: "answered",
      sources: [{ policyId: "pol-003", title: "Tuition and Fees" }],
      operatorNote: "Tuition policy explains pricing variability and staff follow-up requirement.",
    };
  }

  if (/(medication|medicine|prescription|label|authorization|administer)/.test(q)) {
    return {
      answer: "Medication must be in the original labeled container and accompanied by parent authorization. The center administers medication under center procedures and staff guidance.",
      confidence: "high",
      status: "answered",
      sources: [{ policyId: "pol-005", title: "Medication Administration" }],
      operatorNote: "Medication guidance grounded in policy language.",
    };
  }

  if (/(enroll|enrollment|availability|waitlist|classroom)/.test(q)) {
    return {
      answer: "Enrollment depends on classroom availability, age fit, and center capacity. Families should contact the center for openings, waitlists, and start dates.",
      confidence: "medium",
      status: "answered",
      sources: [{ policyId: "pol-009", title: "Enrollment and Classroom Availability" }],
      operatorNote: "Enrollment is policy-based but requires contact for individualized availability decisions.",
    };
  }

  if (/(closure|weather|holiday|close due to weather|closed for holiday)/.test(q)) {
    return {
      answer: "BrightPath follows the published annual holiday calendar and communicates weather-related closures directly to families.",
      confidence: "high",
      status: "answered",
      sources: [{ policyId: "pol-011", title: "Weather and Holiday Closures" }],
      operatorNote: "Closure guidance grounded in opening and closure policy.",
    };
  }

  return {
    answer: "I couldn’t find a reliable answer to that in BrightPath’s current policies. Please contact the center so staff can confirm.",
    confidence: "low",
    status: "uncertain",
    sources: [{ policyId: "pol-014", title: "Center Contact" }],
    operatorNote: "No clear policy coverage for this question. Recommend staff review and policy addition if needed.",
  };
};
