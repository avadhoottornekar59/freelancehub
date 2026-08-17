import Link from "next/link";

import { SectionHeading } from "@/components/layout/section-heading";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { demoSkillTests } from "@/lib/demo-data";

export default function SkillTestIndexPage() {
  return (
    <div className="space-y-8">
      <div className="surface border-amber-300/25 bg-amber-300/10 px-5 py-4 text-sm text-amber-50">
        Demo mode: test results are stored only in this browser until the database layer is added later.
      </div>

      <SectionHeading
        eyebrow="Skill Verification"
        title="Take a focused test and unlock a verified state"
        description="Choose a skill track and complete a short MCQ flow. Passing at 70% or above unlocks a demo verified badge experience."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {demoSkillTests.map((test) => (
          <article key={test.slug} className="surface space-y-4 p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Track</p>
              <VerifiedBadge label="Pass to verify" />
            </div>
            <h2 className="font-heading text-2xl font-semibold text-white">{test.title}</h2>
            <p className="text-sm leading-7 text-slate-300">{test.summary}</p>
            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-sm text-slate-300">
              <span>{test.questions.length} questions</span>
              <span>{test.passingScore}% to pass</span>
            </div>
            <Link
              href={`/skill-test/${test.slug}`}
              className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
            >
              Start test
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
