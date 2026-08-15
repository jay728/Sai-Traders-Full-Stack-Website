import { Link } from "react-router-dom";

// Hero Section - Clean professional design
export function HeroSection({ title, subtitle, description, primaryLink, secondaryLink, image, primaryButtonText = "Get Started", secondaryButtonText = "Learn More", onPrimaryClick, className = "" }) {
  const handlePrimaryClick = (e) => {
    if (onPrimaryClick) {
      onPrimaryClick(e);
    } else if (primaryLink && primaryLink.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(primaryLink.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br from-blue-50 to-slate-50 px-4 py-12 sm:py-16 lg:py-24 sm:px-6 lg:px-8 ${className}`}>
      
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-8 lg:gap-12 grid-cols-1 lg:grid-cols-2 items-center">
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            {subtitle && (
              <p className="inline-block rounded-full border border-blue-600 bg-blue-50 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-extrabold tracking-wider text-blue-600">
                {subtitle}
              </p>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-tight">
              {title}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl">
              {description}
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {primaryLink && (
                <Link to={primaryLink.startsWith('#') ? primaryLink : primaryLink} onClick={handlePrimaryClick} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-extrabold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
                  {primaryButtonText} <span className="text-base sm:text-lg">→</span>
                </Link>
              )}
              {secondaryLink && (
                <Link to={secondaryLink} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border-2 border-slate-200 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-extrabold text-slate-700 shadow-sm transition-all duration-300 hover:border-blue-600 hover:text-blue-600">
                  {secondaryButtonText}
                </Link>
              )}
            </div>
          </div>
          {image && (
            <div className="relative order-1 lg:order-2">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                <img src={image} alt={title} className="h-full w-full object-cover" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Content Section - Clean professional design
export function ContentSection({ title, description, children, className = "" }) {
  return (
    <section className={`bg-white px-4 py-16 sm:py-24 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600 mb-3">Section</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}

// Feature Section - Clean professional design
export function FeatureSection({ title, description, features, className = "" }) {
  return (
    <section className={`bg-slate-50 px-4 py-16 sm:py-24 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600 mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-sm">
                    <span className="text-white text-lg">{feature.icon}</span>
                  </div>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 leading-tight mb-3">{feature.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section - Clean professional design
export function CTASection({ title, description, buttonText, buttonLink, className = "" }) {
  return (
    <section className={`relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-16 sm:py-24 text-white sm:px-6 lg:px-8 ${className}`}>
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
          {title}
        </h2>
        <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <Link to={buttonLink} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-extrabold text-slate-900 shadow-md transition-all duration-300 hover:bg-slate-50 hover:shadow-lg hover:scale-105">
          {buttonText} <span className="text-lg">→</span>
        </Link>
      </div>
    </section>
  );
}

// Stats Section - Clean professional design
export function StatsSection({ stats, className = "" }) {
  return (
    <section className={`bg-gradient-to-br from-blue-50 via-white to-amber-50 px-4 py-12 sm:py-16 lg:py-24 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 sm:gap-8 grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-600 mb-2">
                {stat.number}
              </div>
              <p className="text-xs sm:text-sm lg:text-base font-semibold text-slate-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonial Section - Clean professional design
export function TestimonialSection({ title, testimonials, className = "" }) {
  return (
    <section className={`bg-slate-50 px-4 py-16 sm:py-24 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600 mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            {title}
          </h2>
        </div>
        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-extrabold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
