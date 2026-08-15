function CategoryCard({ category }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-700 via-sky-400 to-orange-400" />
      <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${category.color}`}><span className="text-sm font-black tracking-wider text-blue-800">{category.icon}</span></div>
      <h3 className="text-xl font-extrabold text-slate-900">{category.name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
      <a href="#inquiry" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-orange-500">Request details <span aria-hidden="true">&rarr;</span></a>
    </article>
  );
}

export default CategoryCard;
