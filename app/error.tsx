"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="surface max-w-xl space-y-4 px-6 py-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-rose-200">
          Something broke
        </p>
        <h2 className="font-heading text-3xl font-semibold text-white">
          We hit an unexpected error.
        </h2>
        <p className="text-sm text-slate-300">{error.message}</p>
        <button
          onClick={reset}
          className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
