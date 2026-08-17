export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">{eyebrow}</p>
      <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="max-w-2xl text-slate-300">{description}</p> : null}
    </div>
  );
}
