import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import MainLayout from '../../../layouts/MainLayout';

const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, [options]);

  return [ref, isVisible];
};

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

  const [aboutSectionRef, isAboutSectionVisible] = useIntersectionObserver();

  return (
    <MainLayout>

      {/* About Section - Enhanced Design */}
      <section ref={aboutSectionRef} className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-3 py-4 sm:py-6 lg:py-12 sm:px-4 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM.jpeg')] bg-cover bg-center opacity-10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 mx-auto max-w-screen-2xl">
          <div className="mb-3 sm:mb-4 lg:mb-8 text-center">
            <p className="text-[8px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-red-400 mb-1.5 sm:mb-3">About Us</p>
            <h2 className="text-xs sm:text-base lg:text-2xl font-extrabold text-white">Leading Manufacturer of Premium Plastic Products</h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mt-2 sm:mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className={`space-y-4 sm:space-y-6 ${isAboutSectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '100ms', transitionDuration: '700ms' }}>
              <p className="text-xs sm:text-sm lg:text-base text-gray-300 leading-relaxed">
                We are a leading manufacturer specializing in vacuum metallising and decorative coating solutions for plastic components. With over 15 years of experience, we deliver premium quality products to clients across various industries.
              </p>
              <p className="text-xs sm:text-sm lg:text-base text-gray-300 leading-relaxed">
                Our state-of-the-art facility is equipped with advanced machinery and technology to ensure consistent quality and precision in every product we manufacture. From hair accessories to automotive parts, we cater to diverse B2B needs.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
                {[
                  { icon: '🏭', label: 'Advanced Machinery' },
                  { icon: '✨', label: 'Premium Quality' },
                  { icon: '🌍', label: 'Global Reach' },
                  { icon: '⚡', label: 'Fast Delivery' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3">
                    <span className="text-lg sm:text-xl">{feature.icon}</span>
                    <span className="text-[10px] sm:text-xs font-semibold text-white">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`grid grid-cols-2 gap-3 sm:gap-4 ${isAboutSectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '200ms', transitionDuration: '700ms' }}>
              {[
                { number: '15+', label: 'Years Experience', color: 'from-red-500 to-red-600' },
                { number: '500+', label: 'Happy Clients', color: 'from-blue-500 to-blue-600' },
                { number: '1000+', label: 'Projects Done', color: 'from-green-500 to-green-600' },
                { number: '50+', label: 'Categories', color: 'from-purple-500 to-purple-600' }
              ].map((stat, index) => (
                <div key={index} className={`bg-gradient-to-br ${stat.color} rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mb-1">{stat.number}</div>
                  <div className="text-[8px] sm:text-xs font-semibold text-white/90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Logistics Section */}
          <div className={`mt-8 sm:mt-10 lg:mt-12 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 ${isAboutSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms', transitionDuration: '700ms' }}>
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <span className="text-2xl sm:text-3xl">🚚</span>
              <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-white">Delivery & Logistics</h3>
            </div>
            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-300">
              <p className="leading-relaxed">
                As a job work service provider, customers supply their own raw or molded plastic products for metallizing and decorative coating.
              </p>
              <p className="leading-relaxed">
                Finished products are dispatched through trusted logistics partners such as Porter or other transport services, based on customer preference and order requirements.
              </p>
              <div className="bg-white/10 rounded-lg p-3 sm:p-4">
                <p className="font-semibold text-white mb-2 sm:mb-3">Transportation charges are determined mutually before dispatch:</p>
                <ul className="space-y-1.5 sm:space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>Paid by the customer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>Paid by our company</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>Shared between both parties as mutually agreed</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-400 italic">
                The final delivery method and transportation cost will be confirmed prior to dispatch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section - Enhanced Design */}
      <section className="bg-gradient-to-br from-gray-100 via-white to-gray-100 px-4 py-6 sm:py-12 lg:py-20 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-4 sm:mb-6 lg:mb-10 text-center">
            <p className="text-[8px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-blue-600 mb-1.5 sm:mb-3">Our Expertise</p>
            <h2 className="text-base sm:text-xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-1.5 sm:mb-3">Precision Coating for Plastic Components</h2>
            <p className="text-[9px] sm:text-xs lg:text-base text-gray-600 max-w-lg lg:max-w-3xl mx-auto">We work with customer-supplied molded plastic components and tailor the decorative coating according to material, appearance, and order requirement.</p>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-2 sm:mt-3 rounded-full" />
          </div>

          <div className="grid gap-2 sm:gap-4 lg:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {expertise.map((item, index) => (
              <div key={index} className="group relative">
                <div className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 p-2 sm:p-4 lg:p-6 hover:-translate-y-1">
                  <div className="relative z-10">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-14 lg:w-14 rounded-md sm:rounded-xl lg:rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-1.5 sm:mb-3 lg:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-sm sm:text-base lg:text-2xl">{item.icon}</span>
                    </div>
                    <h3 className="text-[10px] sm:text-sm lg:text-lg font-extrabold text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors leading-tight">{item.title}</h3>
                    <p className="text-[8px] sm:text-[10px] lg:text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Enhanced Design */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-white px-4 py-6 sm:py-12 lg:py-20 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-4 sm:mb-6 lg:mb-10 text-center">
            <p className="text-[8px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-amber-600 mb-1.5 sm:mb-3">Job Work Process</p>
            <h2 className="text-base sm:text-xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-1.5 sm:mb-3">Your Components. Our Coating Expertise. Reliable Delivery.</h2>
            <p className="text-[9px] sm:text-xs lg:text-base text-gray-600 max-w-lg lg:max-w-3xl mx-auto">Simple three-step process to get your components coated professionally.</p>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-600 mx-auto mt-2 sm:mt-3 rounded-full" />
          </div>

          <div className="grid gap-2 sm:gap-4 lg:gap-8 grid-cols-1 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <div key={step.title} className="group relative">
                <div className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 p-2 sm:p-4 lg:p-8 hover:-translate-y-1">
                  <div className="relative z-10">
                    <div className="h-6 w-6 sm:h-8 sm:w-8 lg:h-16 lg:w-16 rounded-md sm:rounded-lg lg:rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-1.5 sm:mb-3 lg:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-sm sm:text-base lg:text-3xl">{step.icon}</span>
                    </div>
                    <div className="text-lg sm:text-2xl lg:text-4xl font-extrabold text-amber-600 mb-1 sm:mb-2 lg:mb-3 opacity-30">0{index + 1}</div>
                    <h3 className="text-[10px] sm:text-sm lg:text-xl font-extrabold text-gray-900 mb-1 sm:mb-2 lg:mb-3 group-hover:text-amber-600 transition-colors leading-tight">{step.title}</h3>
                    <p className="text-[8px] sm:text-[10px] lg:text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced Design */}
      <section className="bg-gradient-to-br from-gray-100 via-white to-gray-100 px-4 py-5 sm:py-10 lg:py-16 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-2 sm:gap-4 lg:gap-8 grid-cols-2 md:grid-cols-4">
            <div className="text-center group">
              <div className="text-lg sm:text-2xl lg:text-5xl font-extrabold text-blue-600 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">15+</div>
              <div className="text-[8px] sm:text-[10px] lg:text-sm font-semibold text-gray-600">Years Experience</div>
            </div>
            <div className="text-center group">
              <div className="text-lg sm:text-2xl lg:text-5xl font-extrabold text-amber-500 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
              <div className="text-[8px] sm:text-[10px] lg:text-sm font-semibold text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center group">
              <div className="text-lg sm:text-2xl lg:text-5xl font-extrabold text-blue-600 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">10K+</div>
              <div className="text-[8px] sm:text-[10px] lg:text-sm font-semibold text-gray-600">Components Coated</div>
            </div>
            <div className="text-center group">
              <div className="text-lg sm:text-2xl lg:text-5xl font-extrabold text-amber-500 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">99%</div>
              <div className="text-[8px] sm:text-[10px] lg:text-sm font-semibold text-gray-600">Quality Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced Design */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-6 sm:py-12 lg:py-20 text-white sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM.jpeg')] bg-cover bg-center opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4 lg:mb-6">
            <span className="text-2xl sm:text-3xl">✨</span>
            <span className="text-[8px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-amber-400">Get Started</span>
          </div>
          <h2 className="text-base sm:text-xl lg:text-4xl font-extrabold text-white leading-tight mb-1.5 sm:mb-4 lg:mb-6">
            Ready to Discuss Your Coating Requirements?
          </h2>
          <p className="text-[10px] sm:text-sm lg:text-lg text-gray-300 leading-relaxed mb-3 sm:mb-5 lg:mb-8 max-w-xl lg:max-w-2xl mx-auto">
            Contact us today to learn more about our vacuum metallising services and get a competitive quote for your project.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-3 sm:px-6 lg:px-10 py-1.5 sm:py-2.5 lg:py-4 text-[9px] sm:text-xs lg:text-base font-extrabold text-white shadow-xl hover:shadow-2xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 hover:scale-105">
            Request Quote <span className="text-[9px] sm:text-sm lg:text-lg">→</span>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}

export default About;
