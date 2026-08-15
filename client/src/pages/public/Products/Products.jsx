import { useEffect, useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../layouts/MainLayout';
import { getProducts } from '../../../services/productService';
import { getCategories } from '../../../services/categoryService';
import { useLocation } from 'react-router-dom';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';
import { apiOrigin } from '../../../config/api';


const finishes = [
  { title: 'Chrome Finish', label: 'Metallic sheen', description: 'Polished metallic appearance for molded plastic components.', style: 'from-slate-300 via-white to-slate-500' },
  { title: 'Rainbow Finish', label: 'Iridescent effect', description: 'Multi-color surface effect with visual depth and character.', style: 'from-sky-200 via-violet-300 to-orange-200' }
];

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [decorativeSectionRef, isDecorativeSectionVisible] = useIntersectionObserver();
  const [hairSectionRef, isHairSectionVisible] = useIntersectionObserver();
  const [finishesSectionRef, isFinishesSectionVisible] = useIntersectionObserver();

  useEffect(() => {
    // Scroll to top is now handled by ScrollToTop component in AppRoutes
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          getProducts({ active: true }),
          getCategories({ active: true })
        ]);
        setProducts(productsResponse.data.data);
        setCategories(categoriesResponse.data.data);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1);
      console.log('Scrolling to section:', elementId);
      
      // Wait for page to fully render
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          console.log('Found element, scrolling to:', elementId);
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          console.log('Element not found:', elementId);
        }
      }, 500);
    }
  }, [location.hash]);

  const productsByCategory = useMemo(() => {
    return categories.map(category => ({
      ...category,
      products: products.filter(product => 
        product.category?._id === category._id || product.category === category._id
      )
    })).filter(cat => cat.products.length > 0 && cat.products.some(p => p.images && p.images.length > 0));
  }, [categories, products]);

  return (
    <MainLayout>
      {productsByCategory.map((category, categoryIndex) => (
        <section 
          key={category._id}
          ref={categoryIndex === 0 ? decorativeSectionRef : categoryIndex === 1 ? hairSectionRef : null}
          id={`section-${category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
          className={`bg-gradient-to-br ${categoryIndex % 2 === 0 ? 'from-gray-50 via-white to-gray-100' : 'from-white via-gray-50 to-white'} px-4 py-8 sm:py-12 lg:py-20 sm:px-6 lg:px-8 relative overflow-hidden`}
        >
          <div className={`absolute top-0 right-0 w-64 h-64 ${categoryIndex % 2 === 0 ? 'bg-blue-500/5' : 'bg-amber-500/5'} rounded-full blur-3xl`} />
          <div className={`absolute bottom-0 left-0 w-64 h-64 ${categoryIndex % 2 === 0 ? 'bg-indigo-500/5' : 'bg-orange-500/5'} rounded-full blur-3xl`} />
          <div className="relative z-10 mx-auto max-w-screen-2xl">
            <div className="mb-6 sm:mb-8 lg:mb-12 text-center">
              <p className={`text-[8px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] ${categoryIndex % 2 === 0 ? 'text-blue-600' : 'text-amber-600'} mb-1.5 sm:mb-3`}>Collection {String(categoryIndex + 1).padStart(2, '0')}</p>
              <h2 className="text-lg sm:text-2xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-2 sm:mb-3">{category.name}</h2>
              <p className="mt-1 sm:mt-2 text-xs sm:text-base lg:text-lg text-gray-600">{category.description || 'Premium quality products for your needs'}</p>
              <div className={`w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r ${categoryIndex % 2 === 0 ? 'from-blue-600 to-indigo-600' : 'from-amber-600 to-orange-600'} mx-auto mt-2 sm:mt-3 rounded-full`} />
            </div>

            <div className={`flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-6 sm:pb-8 scrollbar-thin ${categoryIndex % 2 === 0 ? 'scrollbar-thumb-blue-600 scrollbar-track-slate-200 hover:scrollbar-thumb-blue-700' : 'scrollbar-thumb-amber-600 scrollbar-track-slate-200 hover:scrollbar-thumb-amber-700'} snap-x snap-mandatory px-1`}>
              {isLoading ? (
                <p className="text-slate-500 text-center text-sm">Loading products...</p>
              ) : category.products.length === 0 ? (
                <p className="text-slate-500 text-center text-sm">No products available</p>
              ) : (
                category.products.slice(0, 10).map((product, index) => (
                  <div key={product._id} className={`flex-shrink-0 group relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-4xl bg-white/80 backdrop-blur-sm shadow-lg sm:shadow-xl lg:shadow-2xl hover:shadow-3xl ${categoryIndex % 2 === 0 ? 'hover:shadow-blue-500/20' : 'hover:shadow-amber-500/20'} transition-all duration-500 hover:-translate-y-2 w-48 sm:w-56 lg:w-64 snap-start ${categoryIndex === 0 && isDecorativeSectionVisible ? 'opacity-100 translate-y-0' : categoryIndex === 1 && isHairSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'}`} style={{ transitionDelay: `${index * 100}ms`, transformStyle: 'preserve-3d' }}>
                    <div className="aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
                      {product.images && product.images.length > 0 ? (
                        <img 
                          src={product.images[0].startsWith('http') ? product.images[0] : `${apiOrigin}${product.images[0]}`}
                          alt={product.name} 
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-slate-400 text-sm">No image</div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex flex-col gap-2 sm:gap-3">
                        <a
                          href={`https://wa.me/918390946157?text=Hi, I'm interested in ${encodeURIComponent(product.name)}. Please provide more details.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm lg:text-base font-extrabold text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.M157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          WhatsApp
                        </a>
                        <Link
                          to="/contact"
                          state={{ productName: product.name }}
                          className={`inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${categoryIndex % 2 === 0 ? 'from-blue-600 to-blue-700' : 'from-amber-500 to-amber-600'} px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm lg:text-base font-extrabold text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105`}
                        >
                          Enquire
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Feature Section - Enhanced Design */}
      <section ref={finishesSectionRef} className="bg-gradient-to-br from-gray-100 via-white to-gray-100 px-4 py-6 sm:py-12 lg:py-20 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-4 sm:mb-6 lg:mb-10 text-center">
            <p className="text-[8px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-purple-600 mb-1.5 sm:mb-3">Coating Finishes</p>
            <h2 className="text-base sm:text-xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-1.5 sm:mb-3">Choose the Coating Finish for Your Product</h2>
            <p className="text-[9px] sm:text-xs lg:text-base text-gray-600 max-w-lg lg:max-w-3xl mx-auto">The final coating is confirmed according to the material, desired appearance, and production requirement.</p>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mt-2 sm:mt-3 rounded-full" />
          </div>

          <div className="grid gap-2 sm:gap-4 lg:gap-6 grid-cols-1 md:grid-cols-2">
            {finishes.map((finish, index) => (
              <div key={index} className={`group relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl bg-white/80 backdrop-blur-sm shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200/50 p-2 sm:p-4 lg:p-8 hover:-translate-y-1 ${isFinishesSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 150}ms`, transformStyle: 'preserve-3d' }}>
                <div className="relative z-10">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 lg:h-20 lg:w-20 rounded-md sm:rounded-xl lg:rounded-2xl bg-blue-600 flex items-center justify-center mb-1.5 sm:mb-3 lg:mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <span className="text-lg sm:text-xl lg:text-4xl">{finish.icon === '✨' ? '✨' : '🌈'}</span>
                  </div>
                  <h3 className="text-[10px] sm:text-sm lg:text-2xl font-extrabold text-gray-900 mb-1 sm:mb-2 lg:mb-3 group-hover:text-blue-600 transition-colors">{finish.title}</h3>
                  <p className="text-[9px] sm:text-xs lg:text-sm font-semibold text-blue-600 mb-1 sm:mb-2 lg:mb-4 uppercase tracking-wider">{finish.label}</p>
                  <p className="text-[8px] sm:text-[10px] lg:text-sm text-gray-600 leading-relaxed">{finish.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced Design */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-6 sm:py-12 lg:py-20 text-white sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM.jpeg')] bg-cover bg-center opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4 lg:mb-6">
            <span className="text-2xl sm:text-3xl">✨</span>
            <span className="text-[8px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-amber-400">Get Started</span>
          </div>
          <h2 className="text-base sm:text-xl lg:text-4xl font-extrabold text-white leading-tight mb-1.5 sm:mb-4 lg:mb-6">
            Your Components. Our Coating Expertise.
          </h2>
          <p className="text-[10px] sm:text-sm lg:text-lg text-gray-300 leading-relaxed mb-3 sm:mb-5 lg:mb-8 max-w-xl lg:max-w-2xl mx-auto">
            Contact us today to discuss your vacuum metallising requirements and get a competitive quote.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-3 sm:px-6 lg:px-10 py-1.5 sm:py-2.5 lg:py-4 text-[9px] sm:text-xs lg:text-base font-extrabold text-white shadow-xl hover:shadow-2xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 hover:scale-105">
            Request Quote <span className="text-[9px] sm:text-sm lg:text-lg">→</span>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}

export default Products;
