import Link from "next/link";
import { notFound } from "next/navigation";

import { AvailabilityBoard } from "@/components/availability/availability-board";
import { GigCard } from "@/components/gigs/gig-card-demo";
import { SectionHeading } from "@/components/layout/section-heading";
import { ReviewGrid } from "@/components/reviews/review-grid";
import { ButtonLink } from "@/components/ui/button";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { demoAvailabilityProfiles, demoGigs } from "@/lib/demo-data";
import { getAverageRating, getFreelancerReviews } from "@/lib/demo-features";

export default function FreelancerProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const availability = demoAvailabilityProfiles.find((profile) => profile.userId === params.userId);
  const gigs = demoGigs.filter((gig) => gig.freelancerId?._id === params.userId);
  const freelancer = gigs[0]?.freelancerId;
  const reviews = getFreelancerReviews(params.userId);
  const averageRating = getAverageRating(reviews);

  if (!availability || !freelancer) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <section className="surface grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">{availability.title}</p>
          <h1 className="font-heading text-4xl font-semibold text-white">{availability.name}</h1>
          <p className="max-w-2xl text-slate-300">
            {freelancer.bio ?? availability.summary}
          </p>
          <div className="flex flex-wrap gap-3">
            {freelancer.isVerified ? <VerifiedBadge /> : null}
            <span className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white">
              {averageRating ? `${averageRating}/5 from ${reviews.length} reviews` : "New freelancer profile"}
            </span>
            <ButtonLink href={gigs[0] ? `/messages?gigId=${gigs[0]._id}` : "/messages"} variant="secondary">
              Contact in messaging demo
            </ButtonLink>
            <Link
              href="/skill-test"
              className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-100"
            >
              Explore skill tests
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {(freelancer.skills ?? []).map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <AvailabilityBoard
          freelancerName={availability.name}
          subtitle={`Public availability preview for ${availability.timezone}.`}
          initialDates={availability.availableDates}
        />
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Published Gigs"
          title={`Offers by ${availability.name}`}
          description="Clients can compare these services and review availability before they decide to hire."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {gigs.map((gig) => (
            <GigCard key={gig._id} gig={gig} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Reviews"
          title={`How clients describe working with ${availability.name}`}
          description="These demo reviews help present the trust layer while the real order-completion review flow stays offline."
        />
        <ReviewGrid
          reviews={reviews}
          emptyMessage="This freelancer does not have demo reviews yet."
        />
      </section>
    </div>
  );
}
