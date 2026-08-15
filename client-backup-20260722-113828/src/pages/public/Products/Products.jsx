import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../layouts/MainLayout';
import { getProducts } from '../../../services/productService';
import { getCategories } from '../../../services/categoryService';
import { apiOrigin } from '../../../config/api';
import { useLocation } from 'react-router-dom';
import { PrimaryButton, SecondaryButton, ButtonGroup } from '../../../components/ui/EnhancedButton';
import { ImageCard, CardGrid } from '../../../components/ui/EnhancedCard';
import { HeroSection, FeatureSection, CTASection } from '../../../components/ui/EnhancedSection';
import { useCart } from '../../../context/CartContext';

const decorativeProducts = [
  '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM.jpeg',
  '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM (1).jpeg',
  '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.42 PM.jpeg',
  '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.42 PM (1).jpeg',
  '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.42 PM (2).jpeg',
  '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.42 PM (3).jpeg',
  '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.43 PM.jpeg',
  '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.43 PM (1).jpeg',
  '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.43 PM (2).jpeg',
  '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.43 PM (3).jpeg',
];

const hairAccessoriesProducts = [
  '/Hair Accessories/1.jpeg',
  '/Hair Accessories/2.jpeg',
  '/Hair Accessories/3.jpeg',
  '/Hair Accessories/4.jpeg',
  '/Hair Accessories/5.jpeg',
];

const finishes = [
  { title: 'Chrome Finish', label: 'Metallic sheen', description: 'Polished metallic appearance for molded plastic components.', style: 'from-slate-300 via-white to-slate-500' },
  { title: 'Rainbow Finish', label: 'Iridescent effect', description: 'Multi-color surface effect with visual depth and character.', style: 'from-sky-200 via-violet-300 to-orange-200' }
];

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { addToCart, getCartTotal } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
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
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  const productsByCategory = categories.map(category => ({
    ...category,
    products: products.filter(product => 
      product.category?._id === category._id || product.category === category._id
    )
  })).filter(cat => cat.products.length > 0 && cat.products.some(p => p.images && p.images.length > 0));

  return (
    <MainLayout>
      {/* Premium Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM.jpeg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:py-12 lg:py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[8px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-amber-400 mb-1.5 sm:mb-3">Our Products</p>
            <h1 className="text-lg sm:text-2xl lg:text-5xl font-extrabold text-white leading-tight mb-1.5 sm:mb-3 lg:mb-4">
              Vacuum Metallising for Plastic Components
            </h1>
            <p className="text-[10px] sm:text-sm lg:text-lg text-blue-100 max-w-2xl lg:max-w-3xl mx-auto mb-3 sm:mb-5 lg:mb-6">
              SAI TRADER provides B2B job-work vacuum metallising for PP and ABS components. Professional coating solutions for manufacturers.
            </p>
            <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-3 lg:gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-3 sm:px-5 lg:px-8 py-1.5 sm:py-2.5 lg:py-4 text-[9px] sm:text-xs lg:text-base font-extrabold text-white shadow-md sm:shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                Get Quote <span className="text-[9px] sm:text-sm lg:text-lg">→</span>
              </Link>
              <Link to="/about" className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl lg:rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-3 sm:px-5 lg:px-8 py-1.5 sm:py-2.5 lg:py-4 text-[9px] sm:text-xs lg:text-base font-extrabold text-white shadow-md sm:shadow-lg transition-all duration-300 hover:bg-white/20 hover:scale-105">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="section-home-and-decorative-products" className="bg-gradient-to-br from-blue-50 via-white to-amber-50 px-4 py-6 sm:py-12 lg:py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 sm:mb-6 lg:mb-10">
            <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
              <div className="h-8 w-8 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-md sm:rounded-xl lg:rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md sm:shadow-lg lg:shadow-xl">
                <span className="text-white text-xs sm:text-base lg:text-lg font-extrabold">01</span>
              </div>
              <div>
                <h2 className="text-base sm:text-xl lg:text-4xl font-extrabold text-slate-900 leading-tight">Home and Decorative Products</h2>
                <p className="mt-1 sm:mt-2 text-[10px] sm:text-sm lg:text-base text-slate-600">Home decor, household plastic products, gift and promotional items</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 sm:gap-4 lg:gap-6 overflow-x-auto pb-3 sm:pb-6 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-slate-200 hover:scrollbar-thumb-blue-700 snap-x snap-mandatory px-1">
            {decorativeProducts.map((image, index) => (
              <div key={index} className="flex-shrink-0 group overflow-hidden rounded-lg sm:rounded-xl lg:rounded-3xl border border-slate-200 bg-white shadow-sm sm:shadow-md lg:shadow-xl hover:shadow-xl sm:hover:shadow-2xl hover:border-blue-400 transition-all duration-500 hover:-translate-y-0.5 sm:hover:-translate-y-2 w-28 sm:w-40 lg:w-48 snap-start flex flex-col">
                <div className="aspect-square overflow-hidden bg-slate-100 relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img src={image} alt="Decorative product" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-2 sm:p-3 flex-shrink-0">
                  <button
                    onClick={() => addToCart({ _id: `decorative-${index}`, name: 'Decorative Product', image, category: 'Home and Decorative' })}
                    className="w-full inline-flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-2 py-2 text-[10px] sm:text-xs font-extrabold text-white shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95"
                  >
                    <svg viewBox="0 0 24 24" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="section-hair-fashion-accessories" className="bg-gradient-to-br from-amber-50 via-white to-blue-50 px-4 py-6 sm:py-12 lg:py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 sm:mb-6 lg:mb-10">
            <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
              <div className="h-8 w-8 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-md sm:rounded-xl lg:rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md sm:shadow-lg lg:shadow-xl">
                <span className="text-white text-xs sm:text-base lg:text-lg font-extrabold">02</span>
              </div>
              <div>
                <h2 className="text-base sm:text-xl lg:text-4xl font-extrabold text-slate-900 leading-tight">Hair & Fashion Accessories</h2>
                <p className="mt-1 sm:mt-2 text-[10px] sm:text-sm lg:text-base text-slate-600">Hair clips, claws, fashion accessories and decorative hair ornaments</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 sm:gap-4 lg:gap-6 overflow-x-auto pb-3 sm:pb-6 scrollbar-thin scrollbar-thumb-amber-600 scrollbar-track-slate-200 hover:scrollbar-thumb-amber-700 snap-x snap-mandatory px-1">
            {hairAccessoriesProducts.map((image, index) => (
              <div key={index} className="flex-shrink-0 group overflow-hidden rounded-lg sm:rounded-xl lg:rounded-3xl border border-slate-200 bg-white shadow-sm sm:shadow-md lg:shadow-xl hover:shadow-xl sm:hover:shadow-2xl hover:border-amber-400 transition-all duration-500 hover:-translate-y-0.5 sm:hover:-translate-y-2 w-28 sm:w-40 lg:w-48 snap-start flex flex-col">
                <div className="aspect-square overflow-hidden bg-slate-100 relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img src={image} alt="Hair accessory" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-2 sm:p-3 flex-shrink-0">
                  <button
                    onClick={() => addToCart({ _id: `hair-${index}`, name: 'Hair Accessory', image, category: 'Hair & Fashion Accessories' })}
                    className="w-full inline-flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-2 py-2 text-[10px] sm:text-xs font-extrabold text-white shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95"
                  >
                    <svg viewBox="0 0 24 24" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* {!isLoading && productsByCategory.map((category, catIndex) => {
        const sectionId = `section-${category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        return (
          <section key={category._id} id={sectionId} className={`px-4 py-8 sm:py-12 lg:py-20 sm:px-6 lg:px-8 ${catIndex % 2 === 0 ? 'bg-gradient-to-br from-slate-50 via-white to-blue-50' : 'bg-gradient-to-br from-white via-amber-50 to-slate-50'}`}>
            <div className="mx-auto max-w-7xl">
              <div className="mb-5 sm:mb-6 lg:mb-10">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className={`h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg sm:shadow-xl ${catIndex % 2 === 0 ? 'bg-gradient-to-br from-blue-600 to-blue-800' : 'bg-gradient-to-br from-amber-500 to-amber-600'}`}>
                    <span className="text-white text-sm sm:text-base lg:text-lg font-extrabold">{String(category.displayOrder || 0).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl lg:text-4xl font-extrabold text-slate-900 leading-tight">{category.name}</h2>
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base text-slate-600">{category.description}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {category.products.map((product) => (
                  <div key={product._id} className="group overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl border border-slate-200 bg-white shadow-md sm:shadow-lg lg:shadow-xl hover:shadow-2xl hover:border-blue-400 transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2">
                    <div className="relative h-36 sm:h-44 lg:h-56 overflow-hidden bg-slate-100">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <img src={product.images?.length > 0 ? `${apiOrigin}${product.images[0]}` : null} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute top-2 sm:top-3 lg:top-4 left-2 sm:left-3 lg:left-4">
                        <span className="inline-block bg-blue-600 text-white text-[8px] sm:text-[10px] lg:text-[10px] font-extrabold uppercase tracking-wider px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full shadow-md sm:shadow-lg">{product.finishType}</span>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 lg:p-6">
                      <h3 className="text-xs sm:text-sm lg:text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-1 sm:mb-2">{product.name}</h3>
                      <p className="text-[10px] sm:text-xs lg:text-sm text-slate-600 mb-2 sm:mb-3 lg:mb-4">{product.material}</p>
                      <Link to={`/products/${product.slug}`} className="inline-flex items-center gap-1 text-[10px] sm:text-xs lg:text-sm font-extrabold text-blue-600 hover:text-blue-700 transition-colors">
                        View Details <span className="text-[10px] sm:text-xs lg:text-sm">→</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })} */}

      {/* Premium Feature Section */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-6 sm:py-12 lg:py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 sm:mb-6 lg:mb-10 text-center">
            <p className="text-[8px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-blue-600 mb-1.5 sm:mb-3">Coating Finishes</p>
            <h2 className="text-base sm:text-xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-1.5 sm:mb-3">Choose the Coating Finish for Your Product</h2>
            <p className="text-[9px] sm:text-xs lg:text-base text-slate-600 max-w-lg lg:max-w-3xl mx-auto">The final coating is confirmed according to the material, desired appearance, and production requirement.</p>
          </div>

          <div className="grid gap-2 sm:gap-4 lg:gap-6 grid-cols-1 md:grid-cols-2">
            {finishes.map((finish, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-3xl bg-white shadow-sm sm:shadow-md lg:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 hover:-translate-y-0.5 sm:hover:-translate-y-2 border border-slate-200 p-2 sm:p-4 lg:p-8">
                <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 lg:h-20 lg:w-20 rounded-md sm:rounded-xl lg:rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mb-1.5 sm:mb-3 lg:mb-6 shadow-sm sm:shadow-md lg:shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <span className="text-lg sm:text-xl lg:text-4xl">{finish.icon === '✨' ? '✨' : '🌈'}</span>
                  </div>
                  <h3 className="text-[10px] sm:text-sm lg:text-2xl font-extrabold text-slate-900 mb-1 sm:mb-2 lg:mb-3 group-hover:text-blue-600 transition-colors">{finish.title}</h3>
                  <p className="text-[9px] sm:text-xs lg:text-sm font-semibold text-blue-600 mb-1 sm:mb-2 lg:mb-4 uppercase tracking-wider">{finish.label}</p>
                  <p className="text-[8px] sm:text-[10px] lg:text-sm text-slate-600 leading-relaxed">{finish.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-6 sm:py-12 lg:py-20 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM.jpeg')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="text-base sm:text-xl lg:text-4xl font-extrabold text-white leading-tight mb-1.5 sm:mb-4 lg:mb-6">
            Your Components. Our Coating Expertise.
          </h2>
          <p className="text-[10px] sm:text-sm lg:text-lg text-blue-100 leading-relaxed mb-3 sm:mb-5 lg:mb-8 max-w-xl lg:max-w-2xl mx-auto">
            Contact us today to discuss your vacuum metallising requirements and get a competitive quote.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-3 sm:px-6 lg:px-10 py-1.5 sm:py-2.5 lg:py-4 text-[9px] sm:text-xs lg:text-base font-extrabold text-white shadow-md sm:shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
            Request Quote <span className="text-[9px] sm:text-sm lg:text-lg">→</span>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}

export default Products;
