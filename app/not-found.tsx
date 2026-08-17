import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="surface max-w-xl space-y-4 px-6 py-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
          Missing page
        </p>
        <h2 className="font-heading text-3xl font-semibold text-white">
          The page you asked for could not be found.
        </h2>
        <p className="text-sm text-slate-300">
          Try heading back to the marketplace home page.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
