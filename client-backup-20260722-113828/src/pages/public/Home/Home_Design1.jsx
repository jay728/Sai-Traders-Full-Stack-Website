import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../layouts/MainLayout';

const applications = [
  { name: 'Home and Decorative Products', section: 'section-home-decorative', image: '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM.jpeg' },
  { name: 'Hair & Fashion Accessories', section: 'section-hair-accessories', image: '/Hair Accessories/1.jpeg' },
  { name: 'Cosmetic Caps & Closures', section: 'section-cosmetic', image: null },
  { name: 'Automotive Components', section: 'section-automotive', image: null },
  { name: 'Electrical Parts', section: 'section-electrical', image: null },
  { name: 'Gift & Promotional Items', section: 'section-gift', image: null },
];

const temporarySlides = [
  { title: 'Chrome Finish for Plastic Components', text: 'Professional vacuum metallising for PP and ABS molded products.', image: '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM.jpeg' },
  { title: 'Rainbow Iridescent Effects', text: 'Multi-color surface finishing for decorative plastic components.', image: '/Hair Accessories/1.jpeg' },
  { title: 'Custom Job-Work Solutions', text: 'Tailored coating solutions for your manufacturing requirements.', image: '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.42 PM.jpeg' },
];

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = temporarySlides[activeSlide];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % temporarySlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <MainLayout>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 px-4 py-10 sm:py-16 text-white sm:px-6 lg:px-8">
        <div className="absolute right-[-6rem] top-[-5rem] h-80 w-80 rounded-full border-[34px] border-cyan-500/30 animate-pulse" />
        <div className="absolute left-[-4rem] bottom-[-3rem] h-64 w-64 rounded-full border-[28px] border-purple-500/30" />
        <div className="absolute top-[20%] left-[10%] h-40 w-40 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-8 lg:gap-10 lg:grid-cols-[350px_minmax(0,1fr)]">
          <ApplicationsPanel />

          <div className="min-w-0">
            <HeroShowcase
              slide={slide}
              activeSlide={activeSlide}
              onSlideChange={setActiveSlide}
              slides={temporarySlides}
            />

            <div className="mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2">
              <RequirementCard />
              <JobWorkCard />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-800 via-blue-900/50 to-purple-900/30 px-4 py-10 sm:py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 sm:gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[.18em] text-cyan-400">B2B Manufacturing Service</p>
              <h2 className="mt-2 text-lg sm:text-3xl font-extrabold text-white leading-tight">Our job-work process.</h2>
            </div>
            <Link to="/contact" className="text-xs sm:text-sm font-extrabold text-white hover:text-cyan-400">Request Quote →</Link>
          </div>

          <div className="mt-6 sm:mt-10 grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-3">
            <ProcessStep number="01" title="Share your component" text="Tell us the material, component type, quantity, and preferred finish." />
            <ProcessStep number="02" title="Confirm the finish" text="We discuss chrome, rainbow, or custom coating solutions." />
            <ProcessStep number="03" title="Coating & dispatch" text="You supply the molded parts; we complete job work and arrange dispatch." />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

function ApplicationsPanel() {
  return (
    <aside className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm p-5 sm:p-8 text-white border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 sm:p-10">
      <div className="absolute -right-8 -top-8 h-24 w-24 sm:-right-10 sm:-top-10 sm:h-32 sm:w-32 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-400/30 blur-xl" />
      <div className="absolute -left-6 -bottom-6 h-20 w-20 sm:-left-8 sm:-bottom-8 sm:h-28 sm:w-28 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 blur-xl" />
      <div className="absolute top-[30%] right-[20%] h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-400/20 blur-2xl" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-xl shadow-cyan-400/50">
            <span className="text-white text-sm">🏭</span>
          </div>
          <p className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[.16em] text-cyan-300">INDUSTRIES</p>
        </div>
        <h2 className="mt-2 sm:mt-3 text-lg sm:text-3xl font-extrabold text-white leading-tight">INDUSTRIES WE SERVE</h2>
        
        <nav className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-4" aria-label="Applications">
          {applications.map((application, index) => (
            <Link key={application.name} to={`/products#${application.section}`} className="group flex sm:hidden flex-col items-center rounded-2xl bg-white/10 backdrop-blur-sm p-3 transition-all duration-300 hover:bg-white/20 border border-cyan-500/30 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30">
              {application.image ? (
                <div className="relative w-32 h-32 rounded-xl overflow-hidden mb-2">
                  <img 
                    src={application.image} 
                    alt={application.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative w-32 h-32 rounded-xl overflow-hidden mb-2 bg-white/10 flex items-center justify-center">
                  <span className="text-white/90 font-bold text-xl">{String(index + 1).padStart(2, '0')}</span>
                </div>
              )}
              <span className="text-xs font-extrabold text-white leading-tight line-clamp-2 text-center">{application.name}</span>
            </Link>
          ))}
          {applications.map((application, index) => (
            <Link key={`${application.name}-desktop`} to={`/products#${application.section}`} className="hidden sm:flex group items-center gap-3 rounded-xl px-4 py-3 text-sm font-extrabold text-white transition-all duration-300 hover:bg-white/20 border border-cyan-500/30 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-xs font-extrabold text-white flex-shrink-0 shadow-xl shadow-cyan-400/50">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="truncate group-hover:text-cyan-300 transition-colors flex-1 leading-tight">{application.name}</span>
            </Link>
          ))}
        </nav>
        <Link to="/products" className="mt-5 sm:mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-extrabold text-white transition-all duration-300 hover:shadow-xl hover:shadow-cyan-400/60 hover:scale-110 hover:-translate-y-0.5">
          View all industries <span className="text-lg">→</span>
        </Link>
      </div>
    </aside>
  );
}

function HeroShowcase({ slide, activeSlide, onSlideChange, slides }) {
  return (
    <section className="relative min-h-[320px] sm:min-h-[490px] overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-purple-900 shadow-2xl shadow-cyan-500/20 border border-cyan-500/30">
      <img src={slide.image} alt={slide.title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/75 to-purple-900/65" />

      <div className="relative z-10 flex min-h-[320px] sm:min-h-[490px] flex-col justify-between p-6 sm:p-8 lg:p-12">
        <div>
          <p className="inline-block rounded-full border border-cyan-500/50 bg-slate-900/80 backdrop-blur-sm px-4 py-2 text-xs font-extrabold tracking-wider text-cyan-400 shadow-xl shadow-cyan-500/30">
            SAI TRADER · VACUUM METALLISING
          </p>
        </div>
        <div className="mt-auto">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4">{slide.title}</h2>
          <p className="text-sm sm:text-base lg:text-lg text-cyan-100 leading-relaxed mb-6 max-w-2xl">{slide.text}</p>
          <div className="flex flex-row gap-3">
            <Link to="/contact" className="flex-1 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 px-4 py-3 sm:px-6 sm:py-3.5 text-sm font-extrabold text-white transition-all duration-300 hover:shadow-xl hover:shadow-cyan-400/60 hover:scale-110 hover:-translate-y-0.5 text-center">
              Request Quote
            </Link>
            <Link to="/products" className="flex-1 rounded-lg bg-white/95 backdrop-blur-sm px-4 py-3 sm:px-6 sm:py-3.5 text-sm font-extrabold text-slate-900 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-black/20 hover:scale-110 text-center">
              View Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function RequirementCard() {
  return (
    <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 p-4 sm:p-6 shadow-2xl shadow-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 hover:scale-110 hover:-translate-y-1">
      <div className="absolute -right-3 -top-3 h-12 w-12 sm:-right-4 sm:-top-4 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-400/30 blur-xl" />
      <div className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-lg" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-xl shadow-cyan-400/50">
            <span className="text-white text-xs sm:text-sm font-extrabold">📦</span>
          </div>
          <p className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[.16em] text-cyan-300">For your component</p>
        </div>
        <h2 className="text-lg sm:text-xl font-extrabold text-white leading-tight mb-3">Need coating services?</h2>
        <p className="text-xs sm:text-sm leading-5 sm:leading-6 text-cyan-100 mb-4">Share your material, quantity, component type, and desired finish with us.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-extrabold text-white transition-all duration-300 hover:shadow-xl hover:shadow-cyan-400/60 hover:scale-110 hover:-translate-y-0.5">
          Request Quote <span className="text-lg">→</span>
        </Link>
      </div>
    </article>
  );
}

function JobWorkCard() {
  return (
    <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20 backdrop-blur-sm border border-purple-500/30 p-4 sm:p-6 text-white shadow-2xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:scale-110 hover:-translate-y-1">
      <div className="absolute -right-3 -top-3 h-12 w-12 sm:-right-4 sm:-top-4 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 blur-xl" />
      <div className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-400/20 blur-lg" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-xl shadow-purple-400/50">
            <span className="text-white text-xs sm:text-sm font-extrabold">🔧</span>
          </div>
          <p className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[.16em] text-purple-300">Job-work service</p>
        </div>
        <h2 className="text-lg sm:text-xl font-extrabold text-white leading-tight mb-3">Professional coating solutions.</h2>
        <p className="text-xs sm:text-sm leading-5 sm:leading-6 text-purple-100 mb-4">You supply the molded product; we provide decorative coating and dispatch support.</p>
        <Link to="/about" className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-extrabold text-slate-900 transition-all duration-300 hover:bg-slate-100 hover:shadow-xl hover:shadow-black/20 hover:scale-110 hover:-translate-y-0.5">
          Learn more <span className="text-lg">→</span>
        </Link>
      </div>
    </article>
  );
}

function ProcessStep({ number, title, text }) {
  return (
    <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 p-4 sm:p-6 shadow-2xl shadow-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 hover:scale-110 hover:-translate-y-1">
      <div className="absolute -right-3 -top-3 h-12 w-12 sm:-right-4 sm:-top-4 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-400/30 blur-xl" />
      <div className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-lg" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-xl shadow-cyan-400/50">
            <span className="text-white text-xs sm:text-sm font-extrabold">{number}</span>
          </div>
        </div>
        <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight mb-3">{title}</h3>
        <p className="text-xs sm:text-sm leading-5 sm:leading-6 text-cyan-100">{text}</p>
      </div>
    </article>
  );
}

export default Home;
