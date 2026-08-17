/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";

import { ReviewGrid } from "@/components/reviews/review-grid";
import { ButtonLink } from "@/components/ui/button";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { isDatabaseConfigured } from "@/lib/env";
import { getGigReviews } from "@/lib/demo-features";
import { formatCurrency } from "@/lib/utils";
import { getGigById } from "@/lib/services/gig-service";

export const dynamic = "force-dynamic";

export default async function GigDetailsPage({
  params,
}: {
  params: { gigId: string };
}) {
  const isDemoMode = !isDatabaseConfigured();
  const gig = await getGigById(params.gigId);

  if (!gig) {
    notFound();
  }

  const reviews = getGigReviews(gig._id);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-6">
        {isDemoMode ? (
          <div className="surface border-amber-300/25 bg-amber-300/10 px-5 py-4 text-sm text-amber-50">
            This gig is being shown from demo data until MongoDB is configured.
          </div>
        ) : null}
        {gig.videoIntroUrl ? (
          <div className="surface space-y-4 p-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
                Freelancer Intro Video
              </p>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-white">
                Meet the freelancer before you decide
              </h2>
            </div>
            <video
              src={gig.videoIntroUrl}
              controls
              className="w-full rounded-2xl border border-white/10 bg-black"
            />
            <ButtonLink href={`/messages?gigId=${gig._id}`} variant="secondary">
              Contact Freelancer
            </ButtonLink>
          </div>
        ) : null}
        <div className="grid gap-4 sm:grid-cols-2">
          {gig.images?.map((image: string, index: number) => (
            <div key={`${image}-${index}`} className="surface relative h-72 overflow-hidden">
              <img
                src={image}
                alt={`${gig.title} preview ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="surface space-y-5 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
              {gig.category}
            </span>
            <span className="text-sm text-amber-200">
              {gig.rating?.toFixed(1) ?? "0.0"} average rating
            </span>
          </div>
          <h1 className="font-heading text-4xl font-semibold text-white">{gig.title}</h1>
          <p className="text-base leading-8 text-slate-300">{gig.description}</p>
        </div>
        <div className="space-y-6">
          <div className="surface space-y-3 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Client Reviews</p>
            <h2 className="font-heading text-3xl font-semibold text-white">
              Recent feedback for this gig
            </h2>
            <p className="text-sm leading-7 text-slate-300">
              Demo-only review content to show credibility before the live order and review pipeline is connected.
            </p>
          </div>
          <ReviewGrid
            reviews={reviews}
            emptyMessage="This gig does not have demo reviews yet. You can still use the reviews page to present marketplace trust signals."
          />
        </div>
      </section>

      <aside className="space-y-6">
        <div className="surface space-y-5 p-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Pricing</p>
            <p className="mt-3 text-4xl font-semibold text-white">
              {formatCurrency(gig.price)}
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Delivery in {gig.deliveryTime} days
            </p>
          </div>
          <div className="border-t border-white/10 pt-5">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Freelancer</p>
            <p className="mt-3 text-xl font-semibold text-white">
              {gig.freelancerId?.name ?? "Freelancer"}
            </p>
            <p className="mt-2 text-sm text-slate-300">
              {gig.freelancerId?.bio ?? "This freelancer is ready to collaborate."}
            </p>
            {gig.freelancerId?.isVerified ? <VerifiedBadge className="mt-4" /> : null}
            {gig.freelancerId?._id ? (
              <Link
                href={`/freelancers/${gig.freelancerId._id}`}
                className="mt-4 block text-sm font-semibold text-cyan-100"
              >
                View freelancer profile and availability
              </Link>
            ) : null}
          </div>
          <div className="grid gap-3 pt-3">
            <ButtonLink href={`/messages?gigId=${gig._id}`}>Open messaging demo</ButtonLink>
            <ButtonLink href="/availability" variant="secondary">
              See availability demo
            </ButtonLink>
            <ButtonLink href="/gigs" variant="secondary">
              Back to marketplace
            </ButtonLink>
          </div>
        </div>
      </aside>
    </div>
  );
}
