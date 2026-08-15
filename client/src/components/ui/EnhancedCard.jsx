import { Link } from "react-router-dom";

// Standard Card - Clean professional design
export function Card({ children, className = "", ...props }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 ${className}`} {...props}>
      {children}
    </div>
  );
}

// Feature Card - Clean professional design
export function FeatureCard({ icon, title, description, className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 ${className}`}>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-sm">
            <span className="text-white text-lg">{icon}</span>
          </div>
        </div>
        <h3 className="text-lg font-extrabold text-slate-900 leading-tight mb-3">{title}</h3>
        <p className="text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </div>
  );
}

// Service Card - Clean professional design
export function ServiceCard({ icon, title, description, link, className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 ${className}`}>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-sm">
            <span className="text-white text-lg">{icon}</span>
          </div>
        </div>
        <h3 className="text-lg font-extrabold text-slate-900 leading-tight mb-3">{title}</h3>
        <p className="text-sm leading-6 text-slate-600 mb-4">{description}</p>
        {link && (
          <Link to={link} className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-600 hover:text-blue-700 transition-colors">
            Learn more <span className="text-lg">→</span>
          </Link>
        )}
      </div>
    </div>
  );
}

// Stat Card - Clean professional design
export function StatCard({ number, label, icon, className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 ${className}`}>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-sm">
            <span className="text-white text-lg">{icon}</span>
          </div>
        </div>
        <div className="text-4xl font-extrabold text-slate-900 mb-2">{number}</div>
        <p className="text-sm font-semibold text-slate-600">{label}</p>
      </div>
    </div>
  );
}

// Image Card - Clean professional design
export function ImageCard({ image, title, description, link, className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 ${className}`}>
      <div className="relative z-10">
        <div className="relative h-48 rounded-xl overflow-hidden mb-4">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-extrabold text-slate-900 leading-tight mb-3">{title}</h3>
          <p className="text-sm leading-6 text-slate-600 mb-4">{description}</p>
          {link && (
            <Link to={link} className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-600 hover:text-blue-700 transition-colors">
              Learn more <span className="text-lg">→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// Card Grid - Better card positioning in grid
export function CardGrid({ children, className = "" }) {
  return (
    <div className={`grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {children}
    </div>
  );
}
