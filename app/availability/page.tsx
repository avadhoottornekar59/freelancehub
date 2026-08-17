import Link from "next/link";

import { AvailabilityBoard } from "@/components/availability/availability-board";
import { SectionHeading } from "@/components/layout/section-heading";
import { demoAvailabilityProfiles } from "@/lib/demo-data";

export default function AvailabilityPage() {
  const defaultProfile = demoAvailabilityProfiles[0];

  return (
    <div className="space-y-8">
      <div className="surface border-amber-300/25 bg-amber-300/10 px-5 py-4 text-sm text-amber-50">
        Demo mode: this planner stores changes in your browser only so you can test the workflow without a database.
      </div>

      <SectionHeading
        eyebrow="Availability"
        title="Preview and plan freelancer working dates"
        description="Clients can inspect a freelancer schedule, and freelancers can rehearse how they would manage availability before live persistence is added."
      />

      <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <AvailabilityBoard
          freelancerName={defaultProfile.name}
          subtitle="Interactive demo planner for the current month."
          initialDates={defaultProfile.availableDates}
          editable
          storageKey="freelancehub-demo-availability"
        />

        <div className="space-y-4">
          {demoAvailabilityProfiles.map((profile) => (
            <article key={profile.userId} className="surface space-y-3 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">{profile.timezone}</p>
              <h2 className="font-heading text-2xl font-semibold text-white">{profile.name}</h2>
              <p className="text-sm text-slate-300">{profile.title}</p>
              <p className="text-sm leading-7 text-slate-300">{profile.summary}</p>
              <Link
                href={`/freelancers/${profile.userId}`}
                className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-100"
              >
                View profile
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
