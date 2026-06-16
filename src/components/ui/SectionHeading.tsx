export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      <div className="mt-3 h-px w-16 bg-gradient-to-r from-indigo-500 to-cyan-500" />
      {subtitle && <p className="mt-3 text-sm text-white/50">{subtitle}</p>}
    </div>
  );
}
