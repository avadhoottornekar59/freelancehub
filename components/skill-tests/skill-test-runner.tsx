"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { DemoSkillTest } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { VerifiedBadge } from "@/components/ui/verified-badge";

interface SavedAttempt {
  score: number;
  passed: boolean;
  completedAt: string;
}

export function SkillTestRunner({ test }: { test: DemoSkillTest }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<SavedAttempt | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(`freelancehub-skill-test:${test.slug}`);

    if (saved) {
      setResult(JSON.parse(saved) as SavedAttempt);
    }
  }, [test.slug]);

  function submitTest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const correct = test.questions.filter(
      (question) => answers[question.id] === question.correctAnswer,
    ).length;

    const score = Math.round((correct / test.questions.length) * 100);
    const passed = score >= test.passingScore;
    const nextResult = {
      score,
      passed,
      completedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(
      `freelancehub-skill-test:${test.slug}`,
      JSON.stringify(nextResult),
    );

    setResult(nextResult);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <form onSubmit={submitTest} className="space-y-5">
        {test.questions.map((question, index) => (
          <fieldset key={question.id} className="surface space-y-4 p-6">
            <legend className="text-sm uppercase tracking-[0.3em] text-cyan-200">
              Question {index + 1}
            </legend>
            <p className="text-xl font-semibold text-white">{question.question}</p>
            <div className="grid gap-3">
              {question.options.map((option, optionIndex) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-4 text-sm text-slate-200 transition hover:border-cyan-300/40"
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={optionIndex}
                    checked={answers[question.id] === optionIndex}
                    onChange={() =>
                      setAnswers((current) => ({ ...current, [question.id]: optionIndex }))
                    }
                    className="mt-1 h-4 w-4 accent-cyan-300"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}

        <Button type="submit" className="w-full sm:w-auto">
          Submit test
        </Button>
      </form>

      <aside className="space-y-5">
        <div className="surface space-y-4 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Verification rules</p>
          <h2 className="font-heading text-3xl font-semibold text-white">{test.title}</h2>
          <p className="text-slate-300">{test.summary}</p>
          <ul className="space-y-3 text-sm text-slate-200">
            <li>Pass score: {test.passingScore}%</li>
            <li>Questions: {test.questions.length}</li>
            <li>Result is stored only in this browser for demo mode.</li>
          </ul>
        </div>

        <div className="surface space-y-4 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Your result</p>
          {result ? (
            <>
              <div className="flex items-center gap-3">
                <p className="text-4xl font-semibold text-white">{result.score}%</p>
                {result.passed ? <VerifiedBadge label="Verified badge earned" /> : null}
              </div>
              <p className="text-sm text-slate-300">
                {result.passed
                  ? "You passed the demo verification and can now showcase a verified state in the UI."
                  : "You did not reach the passing score yet. Review the questions and try again."}
              </p>
              <p className="text-xs text-slate-400">
                Last completed: {new Date(result.completedAt).toLocaleString("en-IN")}
              </p>
            </>
          ) : (
            <p className="text-sm text-slate-300">
              No attempt saved yet. Submit the test to see your score.
            </p>
          )}
        </div>

        <div className="surface space-y-4 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Next move</p>
          <p className="text-sm text-slate-300">
            Once the database layer is enabled later, we can persist scores and surface the badge automatically on freelancer profiles.
          </p>
          <Link href="/gigs" className="text-sm font-semibold text-cyan-100">
            Back to marketplace
          </Link>
        </div>
      </aside>
    </div>
  );
}
