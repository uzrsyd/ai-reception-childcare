## What I Built

I built a mobile-first BrightPath AI Front Desk prototype for a fictional childcare center. The app includes a parent-facing chat experience and an operator dashboard that turns unanswered or uncertain questions into operational work. The system is intentionally grounded in a policy library rather than a generic chatbot interaction.

## Key Product Decisions

I optimized for trust, clarity, and failure visibility instead of flashy AI theatrics. Parents get a simple question-and-answer experience with suggested prompts, policy-based answers, and a clear escalation flow when the answer cannot be verified. Operators can review recent questions, identify low-confidence or escalated items, and update the policies that drive future answers.

## AI & Trust Strategy

The model is not the source of truth. The center’s policy database is. The LLM is used to interpret the parent’s question and communicate the relevant policy naturally. That distinction is the heart of the product: the system should be transparent about answers, cite their source, and avoid guessing when the policy set does not cover the question.

I also optimized for failure visibility rather than pretending every AI interaction succeeds. Unanswered questions become actionable work for the operator. This is the difference between a polished demo and a product a real child-care center could trust.

## Architecture

The app is built with Next.js App Router and a small structured knowledge base. Parent questions are routed through a simple retrieval step that chooses the most relevant active policies, then the answer is generated with a policy-safe prompt and a deterministic fallback when no external model is configured. Interaction history is stored in a minimal data model designed to align with Supabase tables, while the prototype can run in local demo mode without a live database connection.

## Tradeoffs

I intentionally did not build a sophisticated vector RAG stack, production authentication, or multi-center SaaS complexity. For a small center-specific policy corpus, deterministic retrieval is cheaper, easier to inspect, and easier for operators to trust. Embeddings and semantic retrieval will matter later as the knowledge base and volume grow.

## What I’d Do Next

The next step is production-grade operator access and policy governance. After that, I would add better handbook ingestion, hybrid retrieval, evaluation testing, and a real human escalation workflow. The key principle would remain the same: treat the policy database as the authority and use AI to interpret and communicate, not to invent center policy.
