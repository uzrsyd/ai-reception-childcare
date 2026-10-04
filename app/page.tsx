import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock3, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { ParentExperience } from "@/components/parent-experience";

const trustPoints = [
  "Grounded in center policy",
  "Escalates missing answers",
  "Safe for medical and emergency issues",
];

const valuePillars = [
  {
    title: "Faster parent answers",
    description: "Reduce repetitive questions and keep families informed without tying up staff.",
    icon: Clock3,
  },
  {
    title: "Safer by design",
    description: "The system only answers from policy and escalates when information is uncertain or sensitive.",
    icon: ShieldCheck,
  },
  {
    title: "Warm family experience",
    description: "Friendly communication that feels reassuring and professional for busy childcare families.",
    icon: HeartHandshake,
  },
];

export default function HomePage() {
  return (
    <div className="page-shell">
      <section className="brand-hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <Sparkles className="h-4 w-4" />
            BrightPath Family Support
          </div>
          <h1>Answers parents faster, without sacrificing trust.</h1>
          <p>
            BrightPath helps families get quick answers about hours, meals, pickup, tours, and illness guidance,
            while keeping staff focused on the questions that truly need human attention.
          </p>

          <div className="hero-actions">
            <a href="#front-desk" className="primary-action">
              Ask a question
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/admin" className="secondary-action">
              View staff dashboard
            </Link>
          </div>

          <div className="trust-bar" aria-label="Trust indicators">
            {trustPoints.map((point) => (
              <span key={point} className="trust-chip">
                <BadgeCheck className="h-4 w-4" />
                {point}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-card">
          <div className="metric-card highlight">
            <span className="metric-label">Response quality</span>
            <strong>Grounded</strong>
            <small>Policy-backed and reviewed</small>
          </div>
          <div className="metric-card">
            <span className="metric-label">Typical asks</span>
            <strong>Hours, pickup, meals</strong>
            <small>Carefully answered in context</small>
          </div>
          <div className="metric-card">
            <span className="metric-label">Safety model</span>
            <strong>Escalates early</strong>
            <small>Never guesses on medical issues</small>
          </div>
        </div>
      </section>

      <section className="value-grid" aria-label="Product value highlights">
        {valuePillars.map(({ title, description, icon: Icon }) => (
          <article key={title} className="value-card">
            <div className="icon-wrap">
              <Icon className="h-5 w-5" />
            </div>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </section>

      <div id="front-desk">
        <ParentExperience />
      </div>
    </div>
  );
}
