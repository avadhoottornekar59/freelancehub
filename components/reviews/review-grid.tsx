import type { DemoReview } from "@/lib/demo-features";
import { cn, formatDate } from "@/lib/utils";

export function ReviewGrid({
  reviews,
  emptyMessage = "No reviews available yet.",
  className,
}: {
  reviews: DemoReview[];
  emptyMessage?: string;
  className?: string;
}) {
  if (reviews.length === 0) {
    return (
      <div className={cn("surface p-6 text-sm leading-7 text-slate-300", className)}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-4 md:grid-cols-2", className)}>
      {reviews.map((review) => (
        <article key={review.id} className="surface space-y-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-semibold text-white">{review.clientName}</p>
              <p className="text-sm text-slate-400">{review.clientCompany}</p>
            </div>
            <div className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
              {review.rating}/5
            </div>
          </div>
          <p className="text-sm uppercase tracking-[0.2em] text-amber-200">{review.projectLabel}</p>
          <p className="text-sm leading-7 text-slate-300">{review.comment}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Delivered review on {formatDate(review.createdAt)}
          </p>
        </article>
      ))}
    </div>
  );
}
