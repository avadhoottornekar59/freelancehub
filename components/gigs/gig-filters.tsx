import { GIG_CATEGORIES } from "@/lib/constants";

export function GigFilters({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <form className="surface grid gap-4 p-5 md:grid-cols-4">
      <label className="space-y-2 text-sm text-slate-200">
        <span>Category</span>
        <select
          name="category"
          defaultValue={typeof searchParams.category === "string" ? searchParams.category : ""}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
        >
          <option value="">All categories</option>
          {GIG_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2 text-sm text-slate-200">
        <span>Min price</span>
        <input
          name="minPrice"
          type="number"
          min="0"
          defaultValue={typeof searchParams.minPrice === "string" ? searchParams.minPrice : ""}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
        />
      </label>

      <label className="space-y-2 text-sm text-slate-200">
        <span>Max price</span>
        <input
          name="maxPrice"
          type="number"
          min="0"
          defaultValue={typeof searchParams.maxPrice === "string" ? searchParams.maxPrice : ""}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
        />
      </label>

      <label className="space-y-2 text-sm text-slate-200">
        <span>Minimum rating</span>
        <div className="flex gap-2">
          <select
            name="rating"
            defaultValue={typeof searchParams.rating === "string" ? searchParams.rating : ""}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
          >
            <option value="">Any</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="4.5">4.5+</option>
          </select>
          <button className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950">
            Apply
          </button>
        </div>
      </label>
    </form>
  );
}
