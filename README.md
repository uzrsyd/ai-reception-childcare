# AI Front Desk

This product treats the center’s policy records as the trusted source of truth and uses AI to interpret the parent’s question, communicate clearly, and escalate uncertainty rather than pretending it knows more than it does.

## Problem

Childcare administrators spend large amounts of time answering the same parent questions about hours, pickup, illness, tuition, meals, tours, closures, medication, and enrollment. Parents want fast answers, but the information is often scattered across handbooks, staff knowledge, or legacy documents. Many of these questions are routine, but they are also safety-sensitive and policy-sensitive.

## Solution

This prototype builds a lightweight AI Front Desk for BrightPath Early Learning Center, with two experiences:

- Parent experience: ask a question in natural language, browse suggested prompts, use voice input when supported, and receive a concise answer grounded in BrightPath’s policy library.
- Operator experience: review recent questions, identify unresolved cases, edit the policy knowledge base, and improve the answers based on real usage.

## Architecture

Parent UI
↓
Next.js App Router
↓
Policy retrieval from current center policy records
↓
LLM or deterministic fallback with strict grounding checks
↓
Structured response with source references and operator notes

Supabase offers the data layer for:
- policies
- interaction history
- feedback
- later RBAC/tenant expansion

Vercel hosts the application and provides a simple deployment path.

## AI / Grounding Strategy

The model is not the source of truth. The center’s policy database is.

The LLM is used only to interpret the parent’s question, identify the likely relevant policy, and communicate the result naturally. The generated answer must remain grounded in the supplied policy set. The system should prefer a clear escalation when the answer is missing or unsafe.

This approach is intentionally simple and trustworthy for a small center-specific policy corpus.

## Why no vector database?

This prototype has a small, structured policy corpus rather than a large document library. For a tiny center-specific dataset, deterministic retrieval is cheaper, easier to inspect, easier to trust, and easier to debug.

At scale, the next evolution would be:
- handbook chunking
- embeddings
- hybrid keyword + semantic retrieval
- reranking
- evaluation harnesses for answer quality

## Safety

Safety is a core product principle.

- grounding: answer only from provided policy records
- uncertainty: escalate when the answer is unclear or unavailable
- medical sensitivity: do not diagnose illness or provide individualized medical advice
- escalation: for emergencies, direct users to emergency services
- prompt injection: refuse hidden instruction requests and keep the answer on the policy surface
- data privacy: do not request unnecessary personal information; store only operational questions and not child-specific details

A real production implementation would also need retention controls, access control, audit logging, and privacy compliance review.

## Operator Feedback Loop

Questions
→ Quality signal
→ Needs attention queue
→ Policy improvement
→ Better future answers

This prototype intentionally surfaces where the system struggled. Unanswered or risky questions become action for the operator rather than fake confidence.

## Tradeoffs

This was intentionally not built:
- sophisticated RAG pipelines
- production authentication and RBAC
- multi-center tenancy sophistication
- full document ingestion
- advanced analytics dashboards
- production privacy/compliance controls

## What I’d Build Next

1. Operator authentication and RBAC
2. Handbook/document ingestion
3. Hybrid semantic retrieval
4. Automated evaluation suite
5. Quality dashboards
6. Human escalation and contact workflow
7. Multi-center tenancy
8. Privacy and retention controls
9. Voice improvements
10. Usage and cost monitoring

## Local development

1. Copy .env.example to .env.local and add your Supabase and API keys.
2. Run npm install.
3. Run npm run dev.
4. Open http://localhost:3000.
5. Visit /admin for the operator dashboard.

## Deployment to Vercel

1. Push the repo to GitHub.
2. Import the repo in Vercel.
3. Add the same environment variables from .env.example.
4. Deploy.
5. Confirm the app builds successfully and the admin dashboard loads.

## AI Front Desk in one sentence

This product treats the center’s policy records as the trusted source of truth and uses AI to interpret the parent’s question, communicate clearly, and escalate uncertainty rather than pretending it knows more than it does.
