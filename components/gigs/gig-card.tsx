"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";

import { VideoPlayerModal } from "@/components/VideoPlayerModal";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { formatCurrency } from "@/lib/utils";

interface GigCardProps {
  gig: {
    _id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    deliveryTime: number;
    images?: string[];
    videoIntroUrl?: string;
    rating?: number;
    freelancerId?: {
      _id?: string;
      name?: string;
      isVerified?: boolean;
      bio?: string;
      skills?: string[];
    };
  };
}

export function GigCard({ gig }: GigCardProps) {
  const [showVideoIntro, setShowVideoIntro] = useState(false);
  const image = gig.images?.[0] ?? "https://images.unsplash.com/photo-1516321318423-f06f85e504b3";

  return (
    <>
      <article className="surface overflow-hidden">
        <div className="relative h-52">
          <img src={image} alt={gig.title} className="h-full w-full object-cover" />
        {gig.videoIntroUrl ? (
          <button
            type="button"
            onClick={() => setShowVideoIntro(true)}
            className="absolute left-1/2 top-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600/90 text-white shadow-lg transition hover:scale-105 hover:bg-red-500"
            aria-label={`Play intro video for ${gig.title}`}
          >
            <span className="ml-1 text-xl">▶</span>
          </button>
        ) : null}
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
            {gig.category}
          </span>
          <span className="text-sm text-amber-200">
            {gig.rating?.toFixed(1) ?? "0.0"} rating
          </span>
        </div>
        <div>
          <Link
            href={`/gigs/${gig._id}`}
            className="font-heading text-2xl font-semibold text-white transition hover:text-cyan-100"
          >
            {gig.title}
          </Link>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-300">
            {gig.description}
          </p>
          {gig.freelancerId?.bio ? (
            <p className="mt-3 line-clamp-2 text-sm text-slate-400">
              {gig.freelancerId.bio}
            </p>
          ) : null}
        </div>
        {gig.freelancerId?.skills?.length ? (
          <div className="flex flex-wrap gap-2">
            {gig.freelancerId.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : null}
        <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-lg font-semibold text-white">{formatCurrency(gig.price)}</p>
            <p className="text-sm text-slate-300">Delivery in {gig.deliveryTime} days</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
              Starting package
            </p>
          </div>
          <div className="text-right text-sm text-slate-300">
            {gig.freelancerId?._id ? (
              <Link
                href={`/freelancers/${gig.freelancerId._id}`}
                className="font-semibold text-white transition hover:text-cyan-100"
              >
                {gig.freelancerId?.name ?? "Freelancer"}
              </Link>
            ) : (
              <p className="font-semibold text-white">{gig.freelancerId?.name ?? "Freelancer"}</p>
            )}
            {gig.freelancerId?.isVerified ? (
              <VerifiedBadge className="mt-2" />
            ) : (
              <p className="mt-2">Open profile</p>
            )}
          </div>
        </div>
      </div>
    </article>
      {showVideoIntro && gig.videoIntroUrl ? (
        <VideoPlayerModal
          videoUrl={gig.videoIntroUrl}
          onClose={() => setShowVideoIntro(false)}
          freelancerName={gig.freelancerId?.name}
          gigTitle={gig.title}
          requestHref="/auth/login"
        />
      ) : null}
    </>
  );
}
