import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../layouts/MainLayout';
import { getCategories } from '../../../services/categoryService';
import { getProducts } from '../../../services/productService';
import { getGalleryItems } from '../../../services/galleryService';
import { apiOrigin } from '../../../config/api';
import { useCart } from '../../../context/CartContext';
import { PrimaryButton, SecondaryButton, ButtonGroup } from '../../../components/ui/EnhancedButton';
import { FeatureCard, CardGrid } from '../../../components/ui/EnhancedCard';
import { HeroSection, FeatureSection, StatsSection } from '../../../components/ui/EnhancedSection';

const heroImages = [
  '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM.jpeg',
  '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM (1).jpeg',
  '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.42 PM.jpeg',
  '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.42 PM (1).jpeg',
  '/Hair Accessories/1.jpeg',
  '/Hair Accessories/2.jpeg',
];

const categoryImages = {
  'Hair & Fashion Accessories': '/Hair Accessories/1.jpeg',
  'Home and Decorative Products': '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM.jpeg',
  'Cosmetic Caps & Closures': '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM (1).jpeg',
  'Automotive Components': '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.42 PM.jpeg',
  'Electrical Parts': '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.42 PM (1).jpeg',
  'Gift & Promotional Items': '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.42 PM (2).jpeg',
};

function Home() {
  const { addToCart } = useCart();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [heroVideos, setHeroVideos] = useState([]);
  const videoRefs = useRef([]);
  const [categories, setCategories] = useState([
    { _id: '1', name: 'Hair & Fashion Accessories', description: 'Hair clips, claws, fashion accessories and decorative hair ornaments' },
    { _id: '2', name: 'Home and Decorative Products', description: 'Home decor, household plastic products, gift and promotional items' },
    { _id: '3', name: 'Cosmetic Caps & Closures', description: 'Cosmetic packaging, caps, closures and containers' },
    { _id: '4', name: 'Automotive Components', description: 'Automotive parts, accessories and interior components' },
    { _id: '5', name: 'Electrical Parts', description: 'Electrical components, switches and fittings' },
    { _id: '6', name: 'Gift & Promotional Items', description: 'Corporate gifts, promotional items and custom merchandise' },
  ]);
  const [products, setProducts] = useState([]);
  const [machineVideos, setMachineVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingEquipment, setIsLoadingEquipment] = useState(true);

  useEffect(() => {
    // Only use interval for images, videos auto-slide onEnded
    if (heroVideos.length === 0) {
      const interval = setInterval(() => {
        setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [heroVideos.length]);

  useEffect(() => {
    const productInterval = setInterval(() => {
      setCurrentProductSlide((prev) => (prev + 1) % Math.max(1, Math.min(products.length, 4)));
    }, 5000);
    return () => clearInterval(productInterval);
  }, [products.length]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesResponse, productsResponse, galleryResponse] = await Promise.all([
          getCategories({ active: true }),
          getProducts({ active: true }),
          getGalleryItems()
        ]);
        if (categoriesResponse.data.data && categoriesResponse.data.data.length > 0) {
          setCategories(categoriesResponse.data.data);
        } else {
          // Fallback to hardcoded categories
          setCategories([
            { _id: '1', name: 'Hair & Fashion Accessories', description: 'Hair clips, claws, fashion accessories and decorative hair ornaments' },
            { _id: '2', name: 'Home and Decorative Products', description: 'Home decor, household plastic products, gift and promotional items' },
            { _id: '3', name: 'Cosmetic Caps & Closures', description: 'Cosmetic packaging, caps, closures and containers' },
            { _id: '4', name: 'Automotive Components', description: 'Automotive parts, accessories and interior components' },
            { _id: '5', name: 'Electrical Parts', description: 'Electrical components, switches and fittings' },
            { _id: '6', name: 'Gift & Promotional Items', description: 'Corporate gifts, promotional items and custom merchandise' },
          ]);
        }
        setProducts(productsResponse.data.data);

        // Filter gallery items for Equipment type
        const equipmentItems = galleryResponse.data.data?.filter(item => item.type === 'Equipment') || [];
        setMachineVideos(equipmentItems);
        setIsLoadingEquipment(false);

        // Filter gallery items for Hero Video type
        const allItems = galleryResponse.data.data || [];
        const heroVideoItems = allItems.filter(item => item.type === 'Hero Video') || [];
        setHeroVideos(heroVideoItems);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoadingCategories(false);
        setIsLoadingProducts(false);
      }
    };
    loadData();
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category?._id === selectedCategory || product.category === selectedCategory);

  const featuredProducts = filteredProducts.slice(0, 8);

  return (
    <MainLayout>
      {/* Premium Hero Section with Image Slideshow */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM.jpeg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:py-10 lg:py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12">
            <div className="flex gap-4 sm:gap-8 lg:gap-12 items-center">
              {/* Left Side - Text Content */}
              <div className="text-left w-1/2 order-1">
                <p className="text-[10px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-amber-400 mb-1.5 sm:mb-3 hidden sm:block">Premium Vacuum Metallising</p>
                <h1 className="text-lg sm:text-2xl lg:text-5xl font-extrabold text-white leading-tight mb-2 sm:mb-3 lg:mb-4 animate-fade-in">
                  Professional Coating Solutions
                </h1>
                <p className="text-xs sm:text-sm lg:text-lg text-blue-100 mb-3 sm:mb-5 lg:mb-6 hidden sm:block animate-fade-in-delay">
                  Expert decorative coating for PP and ABS plastic components. 15+ years of excellence serving 500+ satisfied clients.
                </p>
                {/* Desktop Buttons */}
                <div className="hidden sm:flex flex-row gap-1.5 sm:gap-3 lg:gap-4 animate-fade-in-delay-2">
                  <button onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })} className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-3 sm:px-5 lg:px-8 py-1.5 sm:py-2.5 lg:py-4 text-xs sm:text-xs lg:text-base font-extrabold text-white shadow-md sm:shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                    View All Products <span className="text-xs sm:text-sm lg:text-lg">→</span>
                  </button>
                  <Link to="/gallery" className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl lg:rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-3 sm:px-5 lg:px-8 py-1.5 sm:py-2.5 lg:py-4 text-xs sm:text-xs lg:text-base font-extrabold text-white shadow-md sm:shadow-lg transition-all duration-300 hover:bg-white/20 hover:scale-105">
                    Gallery
                  </Link>
                </div>
              </div>

              {/* Right Side - Square Video Slideshow */}
              <div className="order-2 w-1/2">
                <div className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 aspect-square max-w-[280px] sm:max-w-md lg:max-w-lg mx-auto">
                {heroVideos.length > 0 ? (
                  heroVideos.map((video, index) => (
                    <div
                      key={video._id || index}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentHeroImage ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <video
                        ref={el => videoRefs.current[index] = el}
                        src={video.images[0]?.startsWith('http') ? video.images[0] : `${apiOrigin}${video.images[0]}`}
                        autoPlay={index === currentHeroImage}
                        muted
                        playsInline
                        controls
                        className="w-full h-full object-cover"
                        onLoadedData={() => {
                          if (index === currentHeroImage) {
                            videoRefs.current[index]?.play().catch(e => console.log('Autoplay prevented:', e));
                          }
                        }}
                        onEnded={() => {
                          setCurrentHeroImage((prev) => {
                            const nextIndex = (prev + 1) % heroVideos.length;
                            setTimeout(() => {
                              if (videoRefs.current[nextIndex]) {
                                videoRefs.current[nextIndex].play();
                              }
                            }, 100);
                            return nextIndex;
                          });
                        }}
                      />
                    </div>
                  ))
                ) : (
                  heroImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentHeroImage ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 lg:bottom-4 lg:left-4 lg:right-4">
                        <span className="inline-block bg-amber-500 text-white text-[7px] sm:text-[10px] lg:text-xs font-extrabold uppercase tracking-wider px-1 sm:px-2 lg:px-3 py-0.5 sm:py-1 rounded-full mb-1 sm:mb-2">
                          Premium Quality
                        </span>
                        <p className="text-white text-[9px] sm:text-xs lg:text-sm font-semibold">Professional Coating</p>
                      </div>
                    </div>
                  ))
                )}
                
                {/* Slideshow Indicators */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
                  {(heroVideos.length > 0 ? heroVideos : heroImages).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentHeroImage(index)}
                      className={`h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full transition-all ${
                        index === currentHeroImage ? 'bg-amber-500 w-3 sm:w-6' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Buttons Section */}
          <div className="flex sm:hidden flex-row gap-2 sm:gap-3 lg:gap-4">
            <button onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })} className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 sm:px-5 lg:px-8 py-2.5 sm:py-2.5 lg:py-4 text-sm sm:text-xs lg:text-base font-extrabold text-white shadow-md sm:shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              View All Products <span className="text-sm sm:text-sm lg:text-lg">→</span>
            </button>
            <Link to="/gallery" className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl lg:rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-4 sm:px-5 lg:px-8 py-2.5 sm:py-2.5 lg:py-4 text-sm sm:text-xs lg:text-base font-extrabold text-white shadow-md sm:shadow-lg transition-all duration-300 hover:bg-white/20 hover:scale-105">
              Gallery
            </Link>
          </div>
          </div>
        </div>
      </section>

      {/* Premium Categories Section */}
      <section id="categories" className="bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-6 sm:py-12 lg:py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 sm:mb-6 lg:mb-10 text-center">
            <p className="text-[10px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-blue-600 mb-1.5 sm:mb-3">Our Expertise</p>
            <h2 className="text-base sm:text-xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-1.5 sm:mb-3">Industries We Serve</h2>
            <p className="text-xs sm:text-xs lg:text-base text-slate-600 max-w-lg lg:max-w-3xl mx-auto">Premium coating solutions across diverse industries with unmatched quality and precision.</p>
          </div>

          {!isLoadingCategories && categories.length > 0 ? (
            <div className="flex gap-2 sm:gap-4 lg:gap-6 overflow-x-auto pb-3 sm:pb-6 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-slate-200 hover:scrollbar-thumb-blue-700 snap-x snap-mandatory px-1">
              {categories.map((category, index) => {
                const sectionId = `section-${category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                const categoryImage = categoryImages[category.name] || '/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM.jpeg';
                return (
                  <Link 
                    key={category._id} 
                    to={`/products#${sectionId}`}
                    className="flex-shrink-0 group relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-3xl bg-white shadow-sm sm:shadow-md lg:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 hover:-translate-y-0.5 sm:hover:-translate-y-2 border border-slate-200 w-52 h-68 sm:w-72 sm:h-96 lg:w-96 lg:h-[28rem] snap-start"
                  >
                    <div className="h-full overflow-hidden">
                      <img 
                        src={categoryImage} 
                        alt={category.name} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="inline-block bg-amber-500 text-white text-[8px] sm:text-[10px] lg:text-xs font-extrabold uppercase tracking-wider px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg">
                          Premium
                        </span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 lg:p-6">
                      <div className="flex items-center gap-2 mb-1 sm:mb-2">
                        <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-amber-400 animate-pulse" />
                        <span className="text-[8px] sm:text-[10px] lg:text-xs font-semibold text-amber-400 uppercase tracking-wider">Available</span>
                      </div>
                      <h3 className="text-xs sm:text-base lg:text-lg font-extrabold text-white leading-tight group-hover:text-amber-400 transition-colors mb-1 sm:mb-2">{category.name}</h3>
                      <p className="text-[8px] sm:text-[10px] lg:text-xs text-slate-300 line-clamp-2">{category.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-slate-600 py-4 sm:py-8 lg:py-12 text-[10px] sm:text-xs">Loading categories...</div>
          )}
        </div>
      </section>

      {/* Products by Category Section */}
      {!isLoadingProducts && categories.length > 0 && categories.map((category, catIndex) => {
        const categoryProducts = products.filter(product => 
          product.category?._id === category._id || product.category === category._id
        );
        
        if (categoryProducts.length === 0) return null;

        const sectionId = `section-${category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        const categoryColor = catIndex % 2 === 0 ? 'blue' : 'amber';

        return (
          <section 
            key={category._id} 
            id={sectionId}
            className={`bg-gradient-to-br from-${categoryColor}-50 via-white to-blue-50 px-4 py-6 sm:py-12 lg:py-20 sm:px-6 lg:px-8`}
          >
            <div className="mx-auto max-w-7xl">
              <div className="mb-4 sm:mb-6 lg:mb-10">
                <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
                  <div className={`h-8 w-8 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-md sm:rounded-xl lg:rounded-2xl bg-gradient-to-br from-${categoryColor}-500 to-${categoryColor}-600 flex items-center justify-center shadow-md sm:shadow-lg lg:shadow-xl`}>
                    <span className="text-white text-xs sm:text-base lg:text-lg font-extrabold">{String(catIndex + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-xl lg:text-4xl font-extrabold text-slate-900 leading-tight">{category.name}</h2>
                    <p className="mt-1 sm:mt-2 text-[10px] sm:text-sm lg:text-base text-slate-600">{category.description}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 sm:gap-4 lg:gap-6 overflow-x-auto pb-3 sm:pb-6 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-slate-200 hover:scrollbar-thumb-blue-700 snap-x snap-mandatory px-1">
                {categoryProducts.map((product) => (
                  <div key={product._id} className="flex-shrink-0 group overflow-hidden rounded-lg sm:rounded-xl lg:rounded-3xl border border-slate-200 bg-white shadow-sm sm:shadow-md lg:shadow-xl hover:shadow-xl sm:hover:shadow-2xl hover:border-blue-400 transition-all duration-500 hover:-translate-y-0.5 sm:hover:-translate-y-2 w-28 sm:w-40 lg:w-48 snap-start flex flex-col">
                    <div className="aspect-square overflow-hidden bg-slate-100 relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {product.images && product.images.length > 0 ? (
                        <img 
                          src={product.images[0]?.startsWith('http') ? product.images[0] : `${apiOrigin}${product.images[0]}`} 
                          alt={product.name} 
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-slate-400 text-xs">No Image</div>
                      )}
                    </div>
                    <div className="p-2 sm:p-3 flex-shrink-0">
                      <button
                        onClick={() => addToCart({ 
                          _id: product._id, 
                          name: product.name, 
                          image: product.images?.[0] || '', 
                          category: category.name 
                        })}
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
        );
      })}

      {/* Premium Process Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-amber-50 px-4 py-6 sm:py-12 lg:py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 sm:mb-6 lg:mb-10 text-center">
            <p className="text-[10px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-blue-600 mb-1.5 sm:mb-3">How It Works</p>
            <h2 className="text-base sm:text-xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-1.5 sm:mb-3">Simple Three-Step Process</h2>
            <p className="text-xs sm:text-xs lg:text-base text-slate-600 max-w-lg lg:max-w-3xl mx-auto">Get your components coated professionally with our streamlined job-work process.</p>
          </div>

          <div className="grid gap-2 sm:gap-4 lg:gap-8 grid-cols-1 md:grid-cols-3">
            <div className="group relative">
              <div className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-3xl bg-white shadow-sm sm:shadow-md lg:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 hover:-translate-y-0.5 sm:hover:-translate-y-2 border border-slate-200 p-2 sm:p-4 lg:p-8">
                <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="h-8 w-8 sm:h-8 sm:w-8 lg:h-16 lg:w-16 rounded-md sm:rounded-lg lg:rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mb-1.5 sm:mb-3 lg:mb-6 shadow-sm sm:shadow-md lg:shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-sm sm:text-base lg:text-3xl">📦</span>
                  </div>
                  <div className="text-lg sm:text-2xl lg:text-4xl font-extrabold text-blue-600 mb-1 sm:mb-2 lg:mb-3 opacity-30">01</div>
                  <h3 className="text-xs sm:text-sm lg:text-xl font-extrabold text-slate-900 mb-1 sm:mb-2 lg:mb-3 group-hover:text-blue-600 transition-colors">Share Your Component</h3>
                  <p className="text-[10px] sm:text-[10px] lg:text-sm text-slate-600 leading-relaxed">Tell us the material, component type, quantity, and preferred finish for accurate quotation.</p>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-3xl bg-white shadow-sm sm:shadow-md lg:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 hover:-translate-y-0.5 sm:hover:-translate-y-2 border border-slate-200 p-2 sm:p-4 lg:p-8">
                <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 lg:w-24 lg:h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="h-8 w-8 sm:h-8 sm:w-8 lg:h-16 lg:w-16 rounded-md sm:rounded-lg lg:rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-1.5 sm:mb-3 lg:mb-6 shadow-sm sm:shadow-md lg:shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-sm sm:text-base lg:text-3xl">🎨</span>
                  </div>
                  <div className="text-lg sm:text-2xl lg:text-4xl font-extrabold text-amber-600 mb-1 sm:mb-2 lg:mb-3 opacity-30">02</div>
                  <h3 className="text-xs sm:text-sm lg:text-xl font-extrabold text-slate-900 mb-1 sm:mb-2 lg:mb-3 group-hover:text-amber-600 transition-colors">Confirm the Finish</h3>
                  <p className="text-[10px] sm:text-[10px] lg:text-sm text-slate-600 leading-relaxed">We discuss chrome, rainbow, or custom coating solutions tailored to your specific needs.</p>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-3xl bg-white shadow-sm sm:shadow-md lg:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 hover:-translate-y-0.5 sm:hover:-translate-y-2 border border-slate-200 p-2 sm:p-4 lg:p-8">
                <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="h-8 w-8 sm:h-8 sm:w-8 lg:h-16 lg:w-16 rounded-md sm:rounded-lg lg:rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mb-1.5 sm:mb-3 lg:mb-6 shadow-sm sm:shadow-md lg:shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-sm sm:text-base lg:text-3xl">🚚</span>
                  </div>
                  <div className="text-lg sm:text-2xl lg:text-4xl font-extrabold text-blue-600 mb-1 sm:mb-2 lg:mb-3 opacity-30">03</div>
                  <h3 className="text-xs sm:text-sm lg:text-xl font-extrabold text-slate-900 mb-1 sm:mb-2 lg:mb-3 group-hover:text-blue-600 transition-colors">Coating & Dispatch</h3>
                  <p className="text-[10px] sm:text-[10px] lg:text-sm text-slate-600 leading-relaxed">You supply the molded parts; we complete the job work and arrange timely dispatch.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-8 lg:mt-12 text-center">
            <Link to="/contact" className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 px-3 sm:px-6 lg:px-10 py-1.5 sm:py-2.5 lg:py-4 text-xs sm:text-xs lg:text-base font-extrabold text-white shadow-md sm:shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              Start Your Project <span className="text-xs sm:text-sm lg:text-lg">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Machine Videos Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 py-6 sm:py-12 lg:py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 sm:mb-6 lg:mb-10 text-center">
            <p className="text-[10px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-amber-400 mb-1.5 sm:mb-3">Our Equipment</p>
            <h2 className="text-base sm:text-xl lg:text-4xl font-extrabold text-white leading-tight mb-1.5 sm:mb-3">Advanced Machinery</h2>
            <p className="text-xs sm:text-xs lg:text-base text-blue-100 max-w-lg lg:max-w-3xl mx-auto">State-of-the-art vacuum metallising equipment for precision coating and consistent quality.</p>
          </div>

          <div className="flex gap-2 sm:gap-4 lg:gap-6 overflow-x-auto pb-3 sm:pb-6 scrollbar-thin scrollbar-thumb-amber-600 scrollbar-track-slate-700 hover:scrollbar-thumb-amber-700 snap-x snap-mandatory px-1">
            {isLoadingEquipment ? (
              <div className="text-center text-slate-400 py-4 sm:py-8 lg:py-12 text-[10px] sm:text-xs w-full">Loading equipment videos...</div>
            ) : machineVideos.length === 0 ? (
              <div className="text-center text-slate-400 py-4 sm:py-8 lg:py-12 text-[10px] sm:text-xs w-full">No equipment videos available.</div>
            ) : (
              machineVideos.map((video, index) => (
                <div key={video._id || index} className="flex-shrink-0 group relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-3xl bg-slate-800 shadow-sm sm:shadow-md lg:shadow-xl border border-slate-700 hover:border-amber-400 transition-all duration-500 hover:-translate-y-0.5 sm:hover:-translate-y-2 w-64 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[28rem] snap-start">
                  <div className="h-full overflow-hidden bg-slate-900">
                    {video.images[0]?.toLowerCase().endsWith('.mov') || video.images[0]?.toLowerCase().endsWith('.mp4') || video.images[0]?.toLowerCase().endsWith('.webm') ? (
                      <video 
                        src={video.images[0].startsWith('http') ? video.images[0] : `${apiOrigin}${video.images[0]}`} 
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img 
                        src={video.images[0].startsWith('http') ? video.images[0] : `${apiOrigin}${video.images[0]}`} 
                        alt={video.title} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    )}
                  </div>
                  <div className="p-3 sm:p-5 lg:p-6">
                    <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors">{video.title}</h3>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 sm:mt-8 lg:mt-12 text-center">
            <Link to="/gallery" className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-3 sm:px-5 lg:px-8 py-1.5 sm:py-2.5 lg:py-4 text-xs sm:text-xs lg:text-base font-extrabold text-white shadow-md sm:shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              View All Videos <span className="text-xs sm:text-sm lg:text-lg">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Stats Section */}
      <section className="bg-white px-4 py-5 sm:py-10 lg:py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-2 sm:gap-4 lg:gap-8 grid-cols-2 md:grid-cols-4">
            <div className="text-center group">
              <div className="text-lg sm:text-2xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
              <div className="text-[10px] sm:text-[10px] lg:text-sm font-semibold text-slate-600">Happy Clients</div>
            </div>
            <div className="text-center group">
              <div className="text-lg sm:text-2xl lg:text-5xl font-extrabold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">10K+</div>
              <div className="text-[10px] sm:text-[10px] lg:text-sm font-semibold text-slate-600">Components Coated</div>
            </div>
            <div className="text-center group">
              <div className="text-lg sm:text-2xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">15+</div>
              <div className="text-[10px] sm:text-[10px] lg:text-sm font-semibold text-slate-600">Years Experience</div>
            </div>
            <div className="text-center group">
              <div className="text-lg sm:text-2xl lg:text-5xl font-extrabold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">99%</div>
              <div className="text-[10px] sm:text-[10px] lg:text-sm font-semibold text-slate-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Home;
