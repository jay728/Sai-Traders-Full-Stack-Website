import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import { PrimaryButton, SecondaryButton, ButtonGroup } from '../../../components/ui/EnhancedButton';
import { FeatureCard, CardGrid } from '../../../components/ui/EnhancedCard';
import { HeroSection, FeatureSection, StatsSection, CTASection } from '../../../components/ui/EnhancedSection';

const expertise = [
  { icon: "⚡", title: "PP and ABS vacuum metallising", description: "Specialized coating for PP and ABS plastic components" },
  { icon: "✨", title: "Metallic chrome decorative finishes", description: "Professional chrome plating for decorative applications" },
  { icon: "🌈", title: "Rainbow iridescent colour effects", description: "Multi-color surface finishing with visual depth" },
  { icon: "🔧", title: "Custom coating for molded components", description: "Tailored solutions for your specific requirements" },
];

const processSteps = [
  { icon: "📦", title: "You provide the molded components", description: "Supply your PP or ABS plastic parts" },
  { icon: "🎨", title: "We apply the agreed coating finish", description: "Chrome, rainbow, or custom coating applied" },
  { icon: "🚚", title: "Delivery and logistics confirmed mutually", description: "Reliable delivery of finished components" },
];

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      {/* Premium Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM.jpeg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:py-12 lg:py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[8px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-amber-400 mb-1.5 sm:mb-3">About Us</p>
            <h1 className="text-lg sm:text-2xl lg:text-5xl font-extrabold text-white leading-tight mb-1.5 sm:mb-3 lg:mb-4">
              Professional Vacuum Metallising Services
            </h1>
            <p className="text-[10px] sm:text-sm lg:text-lg text-blue-100 max-w-2xl lg:max-w-3xl mx-auto mb-3 sm:mb-5 lg:mb-6">
              We provide job-work vacuum metallising and decorative coating solutions for PP and ABS plastic components. Manufacturing-grade finishing for your products.
            </p>
            <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-3 lg:gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-3 sm:px-5 lg:px-8 py-1.5 sm:py-2.5 lg:py-4 text-[9px] sm:text-xs lg:text-base font-extrabold text-white shadow-md sm:shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                Request Quote <span className="text-[9px] sm:text-sm lg:text-lg">→</span>
              </Link>
              <Link to="/products" className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl lg:rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-3 sm:px-5 lg:px-8 py-1.5 sm:py-2.5 lg:py-4 text-[9px] sm:text-xs lg:text-base font-extrabold text-white shadow-md sm:shadow-lg transition-all duration-300 hover:bg-white/20 hover:scale-105">
                View Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Expertise Section */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-6 sm:py-12 lg:py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 sm:mb-6 lg:mb-10 text-center">
            <p className="text-[8px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-blue-600 mb-1.5 sm:mb-3">Our Expertise</p>
            <h2 className="text-base sm:text-xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-1.5 sm:mb-3">Precision Coating for Plastic Components</h2>
            <p className="text-[9px] sm:text-xs lg:text-base text-slate-600 max-w-lg lg:max-w-3xl mx-auto">We work with customer-supplied molded plastic components and tailor the decorative coating according to material, appearance, and order requirement.</p>
          </div>

          <div className="grid gap-2 sm:gap-4 lg:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {expertise.map((item, index) => (
              <div key={index} className="group relative">
                <div className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-3xl bg-white shadow-sm sm:shadow-md lg:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 hover:-translate-y-0.5 sm:hover:-translate-y-2 border border-slate-200 p-2 sm:p-4 lg:p-6">
                  <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-14 lg:w-14 rounded-md sm:rounded-xl lg:rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mb-1.5 sm:mb-3 lg:mb-4 shadow-sm sm:shadow-md lg:shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-sm sm:text-base lg:text-2xl">{item.icon}</span>
                    </div>
                    <h3 className="text-[10px] sm:text-sm lg:text-lg font-extrabold text-slate-900 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors leading-tight">{item.title}</h3>
                    <p className="text-[8px] sm:text-[10px] lg:text-sm text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Process Section */}
      <section className="bg-gradient-to-br from-white via-slate-50 to-amber-50 px-4 py-6 sm:py-12 lg:py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 sm:mb-6 lg:mb-10 text-center">
            <p className="text-[8px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-blue-600 mb-1.5 sm:mb-3">Job Work Process</p>
            <h2 className="text-base sm:text-xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-1.5 sm:mb-3">Your Components. Our Coating Expertise. Reliable Delivery.</h2>
            <p className="text-[9px] sm:text-xs lg:text-base text-slate-600 max-w-lg lg:max-w-3xl mx-auto">Simple three-step process to get your components coated professionally.</p>
          </div>

          <div className="grid gap-2 sm:gap-4 lg:gap-8 grid-cols-1 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <div key={step.title} className="group relative">
                <div className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-3xl bg-white shadow-sm sm:shadow-md lg:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 hover:-translate-y-0.5 sm:hover:-translate-y-2 border border-slate-200 p-2 sm:p-4 lg:p-8">
                  <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="h-6 w-6 sm:h-8 sm:w-8 lg:h-16 lg:w-16 rounded-md sm:rounded-lg lg:rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mb-1.5 sm:mb-3 lg:mb-6 shadow-sm sm:shadow-md lg:shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-sm sm:text-base lg:text-3xl">{step.icon}</span>
                    </div>
                    <div className="text-lg sm:text-2xl lg:text-4xl font-extrabold text-blue-600 mb-1 sm:mb-2 lg:mb-3 opacity-30">0{index + 1}</div>
                    <h3 className="text-[10px] sm:text-sm lg:text-xl font-extrabold text-slate-900 mb-1 sm:mb-2 lg:mb-3 group-hover:text-blue-600 transition-colors leading-tight">{step.title}</h3>
                    <p className="text-[8px] sm:text-[10px] lg:text-sm text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Stats Section */}
      <section className="bg-white px-4 py-5 sm:py-10 lg:py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-2 sm:gap-4 lg:gap-8 grid-cols-2 md:grid-cols-4">
            <div className="text-center group">
              <div className="text-lg sm:text-2xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">15+</div>
              <div className="text-[8px] sm:text-[10px] lg:text-sm font-semibold text-slate-600">Years Experience</div>
            </div>
            <div className="text-center group">
              <div className="text-lg sm:text-2xl lg:text-5xl font-extrabold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
              <div className="text-[8px] sm:text-[10px] lg:text-sm font-semibold text-slate-600">Happy Clients</div>
            </div>
            <div className="text-center group">
              <div className="text-lg sm:text-2xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">10K+</div>
              <div className="text-[8px] sm:text-[10px] lg:text-sm font-semibold text-slate-600">Components Coated</div>
            </div>
            <div className="text-center group">
              <div className="text-lg sm:text-2xl lg:text-5xl font-extrabold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">99%</div>
              <div className="text-[8px] sm:text-[10px] lg:text-sm font-semibold text-slate-600">Quality Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-6 sm:py-12 lg:py-20 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM.jpeg')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="text-base sm:text-xl lg:text-4xl font-extrabold text-white leading-tight mb-1.5 sm:mb-4 lg:mb-6">
            Ready to Discuss Your Coating Requirements?
          </h2>
          <p className="text-[10px] sm:text-sm lg:text-lg text-blue-100 leading-relaxed mb-3 sm:mb-5 lg:mb-8 max-w-xl lg:max-w-2xl mx-auto">
            Contact us today to learn more about our vacuum metallising services and get a competitive quote for your project.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-3 sm:px-6 lg:px-10 py-1.5 sm:py-2.5 lg:py-4 text-[9px] sm:text-xs lg:text-base font-extrabold text-white shadow-md sm:shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
            Request Quote <span className="text-[9px] sm:text-sm lg:text-lg">→</span>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}

export default About;
