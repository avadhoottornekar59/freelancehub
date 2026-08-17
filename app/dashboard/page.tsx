import Link from "next/link";
import { redirect } from "next/navigation";

import { ButtonLink } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { DASHBOARD_ROUTES } from "@/lib/constants";
import { isDatabaseConfigured } from "@/lib/env";

export default async function DashboardPage() {
  const session = await auth();

  if (session?.user?.role) {
    redirect(DASHBOARD_ROUTES[session.user.role]);
  }

  const isDemoMode = !isDatabaseConfigured();

  return (
    <div className="space-y-8">
      <section className="surface space-y-4 p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Dashboard Hub</p>
        <h1 className="font-heading text-4xl font-semibold text-white">
          Explore the product roles without a database setup
        </h1>
        <p className="max-w-3xl text-slate-300">
          {isDemoMode
            ? "Demo mode is active, so the role dashboards stay private while the public demos cover messaging, reviews, moderation, and marketplace browsing."
            : "Log in to open your role dashboard, or review the public demo spaces below."}
        </p>
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="/auth/login">Log in</ButtonLink>
          <ButtonLink href="/gigs" variant="secondary">
            Browse gigs
          </ButtonLink>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <article className="surface space-y-4 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Client Demo</p>
          <h2 className="font-heading text-2xl font-semibold text-white">Messages and reviews</h2>
          <p className="text-sm leading-7 text-slate-300">
            Preview how clients compare offers, message freelancers, and evaluate feedback.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/messages" variant="secondary">
              Open messages
            </ButtonLink>
            <ButtonLink href="/reviews" variant="secondary">
              Open reviews
            </ButtonLink>
          </div>
        </article>

        <article className="surface space-y-4 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Freelancer Demo</p>
          <h2 className="font-heading text-2xl font-semibold text-white">Profile and proof</h2>
          <p className="text-sm leading-7 text-slate-300">
            Showcase intro videos, availability, skill verification, and profile-based trust signals.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/availability" variant="secondary">
              Availability
            </ButtonLink>
            <ButtonLink href="/skill-test" variant="secondary">
              Skill test
            </ButtonLink>
          </div>
        </article>

        <article className="surface space-y-4 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Admin Demo</p>
          <h2 className="font-heading text-2xl font-semibold text-white">Moderation control panel</h2>
          <p className="text-sm leading-7 text-slate-300">
            Manage users, orders, and gigs from a public demo workspace while the real backend is offline.
          </p>
          <Link
            href="/admin-demo"
            className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-100"
          >
            Open admin demo
          </Link>
        </article>
      </section>
    </div>
  );
}
