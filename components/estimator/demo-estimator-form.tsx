"use client";

import { useState } from "react";

import { estimateProjectScope, type EstimatorOutput } from "@/lib/demo-estimator";
import { Button } from "@/components/ui/button";

const projectTypes = [
  { value: "website", label: "Marketing Website" },
  { value: "web-app", label: "Web App" },
  { value: "mobile-app", label: "Mobile App" },
  { value: "branding", label: "Brand Identity" },
  { value: "marketing", label: "Marketing Campaign" },
  { value: "writing", label: "Writing Project" },
];

export function DemoEstimatorForm() {
  const [result, setResult] = useState<EstimatorOutput | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nextResult = estimateProjectScope({
      projectType: String(formData.get("projectType") ?? "website"),
      features: String(formData.get("features") ?? ""),
      deadline: String(formData.get("deadline") ?? "1-2 months"),
      collaborationMode: String(formData.get("collaborationMode") ?? "collaborative"),
    });

    setResult(nextResult);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
      <form onSubmit={handleSubmit} className="surface space-y-5 p-6 sm:p-8">
        <label className="block space-y-2">
          <span className="text-sm text-slate-200">Project type</span>
          <select
            name="projectType"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
          >
            {projectTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm text-slate-200">Key features or deliverables</span>
          <textarea
            name="features"
            rows={7}
            placeholder="Example: landing page, CMS setup, blog, contact form, analytics dashboard"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm text-slate-200">Deadline</span>
            <select
              name="deadline"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
            >
              <option value="1-2 weeks">1 to 2 weeks</option>
              <option value="3-4 weeks">3 to 4 weeks</option>
              <option value="1-2 months">1 to 2 months</option>
              <option value="flexible">Flexible</option>
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-slate-200">Collaboration mode</span>
            <select
              name="collaborationMode"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
            >
              <option value="collaborative">Collaborative with client feedback</option>
              <option value="full-service">Full-service freelancer-led delivery</option>
            </select>
          </label>
        </div>

        <Button type="submit">Estimate scope</Button>
      </form>

      <div className="surface space-y-5 p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Estimator output</p>
        {result ? (
          <>
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <p className="text-sm text-slate-300">Complexity</p>
                <p className="text-3xl font-semibold text-white">{result.complexity}</p>
              </div>
              <div>
                <p className="text-sm text-slate-300">Budget</p>
                <p className="text-2xl font-semibold text-white">{result.suggestedBudget}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-lg font-semibold text-white">Scope summary</p>
              <p className="text-sm leading-7 text-slate-300">{result.scopeSummary}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                <p className="text-sm text-slate-300">Suggested timeline</p>
                <p className="mt-2 text-xl font-semibold text-white">{result.timeline}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                <p className="text-sm text-slate-300">Recommended team</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {result.recommendedTeam.join(", ")}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-lg font-semibold text-white">Delivery notes</p>
              <ul className="space-y-2 text-sm text-slate-300">
                {result.deliveryNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p className="text-sm text-slate-300">
            Fill the form to generate a local demo estimate. This is a front-end placeholder for the future AI API integration.
          </p>
        )}
      </div>
    </div>
  );
}
