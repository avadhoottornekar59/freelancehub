export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="surface flex items-center gap-3 px-6 py-4 text-sm text-slate-200">
        <span className="h-3 w-3 animate-pulse rounded-full bg-cyan-300" />
        Loading FreelanceHub...
      </div>
    </div>
  );
}
