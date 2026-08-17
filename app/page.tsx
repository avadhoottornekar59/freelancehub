import Link from "next/link";

import { GigCard } from "@/components/gigs/gig-card-demo";
import { SectionHeading } from "@/components/layout/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { isDatabaseConfigured } from "@/lib/env";
import { getHomePageData } from "@/lib/services/home-service";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

const highlights = [
  "Role-based dashboards for clients, freelancers, and admins",
  "Freelancer-owned gig publishing, editing, and deletion",
  "Marketplace browsing with category, price, and rating filters",
  "Demo reviews, messaging, and moderation flows without MongoDB",
];

const demoTools = [
  {
    href: "/skill-test",
    title: "Skill verification demo",
    description: "Take a browser-stored MCQ test and preview a verified freelancer state.",
  },
  {
    href: "/availability",
    title: "Availability calendar demo",
    description: "Explore freelancer calendars and try an interactive planning workflow.",
  },
  {
    href: "/estimator",
    title: "Scope estimator demo",
    description: "Generate a local scope, budget, and timeline estimate before posting work.",
  },
  {
    href: "/messages",
    title: "Messaging demo",
    description: "Preview client-freelancer chat threads and send local demo replies.",
  },
  {
    href: "/reviews",
    title: "Reviews demo",
    description: "Show ratings and client feedback without connecting order completion.",
  },
  {
    href: "/admin-demo",
    title: "Admin moderation demo",
    description: "Ban or unban users, manage gigs, and advance order states from a mock control panel.",
  },
];

export default async function Home() {
  const isDemoMode = !isDatabaseConfigured();
  const { featuredGigs, stats } = await getHomePageData();

  return (
    <div className="space-y-16">
      {isDemoMode ? (
        <div className="surface border-amber-300/25 bg-amber-300/10 px-5 py-4 text-sm text-amber-50">
          Demo mode is active. You can browse sample gigs now, and connect MongoDB later to enable live data and account features.
        </div>
      ) : null}
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
            FreelanceHub brings role-based access and marketplace discovery into one polished starting point.
          </div>
          <div className="space-y-5">
            <h1 className="max-w-3xl font-heading text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Build, hire, and deliver with a marketplace designed for momentum.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Browse curated gigs, filter by price and category, and let freelancers
              manage their storefronts from tailored dashboards.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/gigs">Explore Gigs</ButtonLink>
            <ButtonLink href="/estimator" variant="secondary">
              Try Estimator
            </ButtonLink>
          </div>
          <ul className="grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
              Platform snapshot
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
              <div>
                <p className="text-3xl font-semibold text-white">
                  {stats.totalOrders}
                </p>
                <p className="mt-1 text-sm text-slate-300">Orders completed</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-white">
                  {formatCurrency(stats.revenue)}
                </p>
                <p className="mt-1 text-sm text-slate-300">Marketplace value</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-white">
                  {stats.activeGigs}
                </p>
                <p className="mt-1 text-sm text-slate-300">Active gigs</p>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] border border-amber-300/20 bg-amber-300/10 p-6 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-100">
              What makes this different
            </p>
            <p className="mt-5 text-lg leading-8 text-slate-100">
              Clients can compare curated talent and transparent pricing, while
              freelancers shape their storefront with a focused publishing workflow.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Featured Work"
          title="Popular gigs clients are booking right now"
          description="Fresh talent, transparent pricing, and strong delivery timelines."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredGigs.map((gig) => (
            <GigCard key={gig._id} gig={gig} />
          ))}
        </div>
        {featuredGigs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 px-6 py-10 text-center text-slate-300">
            No gigs yet. Register as a freelancer and publish the first one.
          </div>
        ) : null}
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Demo Features"
          title="Explore the next product flows without a backend dependency"
          description="These routes are intentionally database-free so you can review the experience now and connect the real services later."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {demoTools.map((tool) => (
            <article key={tool.href} className="surface space-y-4 p-6">
              <h3 className="font-heading text-2xl font-semibold text-white">{tool.title}</h3>
              <p className="text-sm leading-7 text-slate-300">{tool.description}</p>
              <ButtonLink href={tool.href} variant="secondary">
                Open feature
              </ButtonLink>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
              Ready to get started
            </p>
            <h2 className="font-heading text-3xl font-semibold text-white">
              Pick your side of the marketplace and jump in.
            </h2>
            <p className="max-w-2xl text-slate-300">
              Create a client account to hire faster, or join as a freelancer to
              showcase gigs and build your marketplace presence.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/auth/register"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
            >
              Create account
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-100"
            >
              Open dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
