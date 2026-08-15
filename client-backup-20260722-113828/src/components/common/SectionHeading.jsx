function SectionHeading({ eyebrow, title, description, centered = true }) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className={centered ? "mx-auto mb-4 flex w-fit items-center gap-3" : "mb-4 flex w-fit items-center gap-3"}><span className="h-px w-8 bg-orange-400" /><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-600">{eyebrow}</p><span className="h-px w-8 bg-orange-400" /></div>
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      <p className="mt-5 leading-7 text-slate-600">{description}</p>
    </div>
  );
}

export default SectionHeading;
