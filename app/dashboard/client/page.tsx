import { GigCard } from "@/components/gigs/gig-card-demo";
import { SectionHeading } from "@/components/layout/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { requireUser } from "@/lib/access";
import { getGigs } from "@/lib/services/gig-service";

export const dynamic = "force-dynamic";

export default async function ClientDashboardPage() {
  const user = await requireUser(["client"]);
  const gigs = await getGigs();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8">
      <section className="surface space-y-4 p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Client dashboard</p>
        <h1 className="font-heading text-4xl font-semibold text-white">
          Hire faster, {user.name.split(" ")[0]}.
        </h1>
        <p className="max-w-3xl text-slate-300">
          Today’s build includes the core marketplace flow, so you can browse live gigs and shortlist talent.
        </p>
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="/gigs">Browse all gigs</ButtonLink>
          <ButtonLink href="/estimator" variant="secondary">
            Open estimator
          </ButtonLink>
          <ButtonLink href="/availability" variant="secondary">
            View availability
          </ButtonLink>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Fresh Listings"
          title="New gigs worth checking out"
          description="Use the marketplace view to compare pricing, category, and delivery speed."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {gigs.slice(0, 6).map((gig) => (
            <GigCard key={gig._id} gig={gig} />
          ))}
        </div>
      </section>
    </div>
  );
}
