"use client";

import Link from "next/link";
import { useEffect } from "react";

import { ButtonLink } from "@/components/ui/button";

export function VideoPlayerModal({
  videoUrl,
  onClose,
  freelancerName = "Freelancer",
  gigTitle = "Project intro",
  requestHref = "/auth/login",
}: {
  videoUrl: string;
  onClose: () => void;
  freelancerName?: string;
  gigTitle?: string;
  requestHref?: string;
}) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-[2rem] border border-white/10 bg-slate-950 p-5 shadow-glow sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl text-white transition hover:border-cyan-300 hover:text-cyan-100"
          aria-label="Close video modal"
        >
          ×
        </button>

        <div className="space-y-5 pr-12">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">{freelancerName}</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-white">{gigTitle}</h2>
          </div>

          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full rounded-xl border border-white/10 bg-black"
          />

          <div className="flex flex-wrap items-center gap-4">
            <ButtonLink href={requestHref}>Request Project</ButtonLink>
            <Link
              href={requestHref}
              className="text-sm font-semibold text-cyan-100 transition hover:text-cyan-50"
            >
              Continue to hire/chat flow
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
