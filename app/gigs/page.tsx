import { GigCard } from "@/components/gigs/gig-card-demo";
import { GigFilters } from "@/components/gigs/gig-filters";
import { SectionHeading } from "@/components/layout/section-heading";
import { isDatabaseConfigured } from "@/lib/env";
import { getGigs } from "@/lib/services/gig-service";

export const dynamic = "force-dynamic";

export default async function GigsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const isDemoMode = !isDatabaseConfigured();
  const gigs = await getGigs({
    category: typeof searchParams.category === "string" ? searchParams.category : undefined,
    minPrice: typeof searchParams.minPrice === "string" ? searchParams.minPrice : undefined,
    maxPrice: typeof searchParams.maxPrice === "string" ? searchParams.maxPrice : undefined,
    rating: typeof searchParams.rating === "string" ? searchParams.rating : undefined,
  });
  const verifiedCount = gigs.filter((gig) => gig.freelancerId?.isVerified).length;
  const averagePrice =
    gigs.length > 0
      ? Math.round(gigs.reduce((total, gig) => total + gig.price, 0) / gigs.length)
      : 0;
  const fastestDelivery =
    gigs.length > 0 ? Math.min(...gigs.map((gig) => gig.deliveryTime)) : 0;

  return (
    <div className="space-y-8">
      {isDemoMode ? (
        <div className="surface border-amber-300/25 bg-amber-300/10 px-5 py-4 text-sm text-amber-50">
          You are browsing demo gigs because MongoDB is not connected yet.
        </div>
      ) : null}
      <SectionHeading
        eyebrow="Marketplace"
        title="Browse gigs by category, price, and rating"
        description="The core marketplace slice is live, with filters and freelancer-managed listings."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="surface p-5">
          <p className="text-sm text-slate-300">Available gigs</p>
          <p className="mt-2 text-3xl font-semibold text-white">{gigs.length}</p>
        </div>
        <div className="surface p-5">
          <p className="text-sm text-slate-300">Verified freelancer offers</p>
          <p className="mt-2 text-3xl font-semibold text-white">{verifiedCount}</p>
        </div>
        <div className="surface p-5">
          <p className="text-sm text-slate-300">Average starting price</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(averagePrice)}
          </p>
          {fastestDelivery ? (
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
              Fastest delivery: {fastestDelivery} days
            </p>
          ) : null}
        </div>
      </div>
      <GigFilters searchParams={searchParams} />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {gigs.map((gig) => (
          <GigCard key={gig._id} gig={gig} />
        ))}
      </div>
      {gigs.length === 0 ? (
        <div className="surface px-6 py-10 text-center text-slate-300">
          No gigs match your filters yet.
        </div>
      ) : null}
    </div>
  );
}
