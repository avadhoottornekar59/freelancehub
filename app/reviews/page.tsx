import { ReviewGrid } from "@/components/reviews/review-grid";
import { SectionHeading } from "@/components/layout/section-heading";
import { demoReviews, getAverageRating } from "@/lib/demo-features";

export default function ReviewsPage() {
  const averageRating = getAverageRating(demoReviews);

  return (
    <div className="space-y-8">
      <section className="surface space-y-4 p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Reviews Demo</p>
        <h1 className="font-heading text-4xl font-semibold text-white">
          Marketplace proof from recent demo projects
        </h1>
        <p className="max-w-3xl text-slate-300">
          These reviews are hardcoded so you can present trust signals, ratings, and delivery quality before connecting the real order pipeline.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-300">Total reviews</p>
            <p className="mt-2 text-3xl font-semibold text-white">{demoReviews.length}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-300">Average rating</p>
            <p className="mt-2 text-3xl font-semibold text-white">{averageRating}/5</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-300">Covered categories</p>
            <p className="mt-2 text-3xl font-semibold text-white">5</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Client Feedback"
          title="What recent projects are saying"
          description="Use this page as a demo trust layer while the real review submission flow stays offline."
        />
        <ReviewGrid reviews={demoReviews} />
      </section>
    </div>
  );
}
