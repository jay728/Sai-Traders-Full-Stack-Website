import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../layouts/MainLayout';
import { getCategories } from '../../../services/categoryService';
import { getProducts } from '../../../services/productService';
import { getGalleryItems } from '../../../services/galleryService';
import { apiOrigin } from '../../../config/api';

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


function Home() {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [heroVideos, setHeroVideos] = useState([]);
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [videoLoadError, setVideoLoadError] = useState(false);
  const videoRefs = useRef([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [machineVideos, setMachineVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingEquipment, setIsLoadingEquipment] = useState(true);
  const [machineVideoErrors, setMachineVideoErrors] = useState({});
  const [galleryItems, setGalleryItems] = useState([]);
  const [categorySectionRef, isCategorySectionVisible] = useIntersectionObserver();
  const categoryScrollRef1 = useRef(null);
  const [statsSectionRef, isStatsSectionVisible] = useIntersectionObserver();
  const [testimonialsSectionRef, isTestimonialsSectionVisible] = useIntersectionObserver();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialsScrollRef = useRef(null);
  const heroVideoRef = useRef(null);

  // Handle video end to advance to next video
  const handleVideoEnd = useCallback(() => {
    if (heroVideos.length > 0) {
      setCurrentHeroImage((prev) => (prev + 1) % heroVideos.length);
    }
  }, [heroVideos.length]);

  // Play video when currentHeroImage changes
  useEffect(() => {
    setVideoLoadError(false);
    if (heroVideoRef.current && heroVideos.length > 0) {
      heroVideoRef.current.currentTime = 0;
      heroVideoRef.current.play().catch(err => {
        console.log('Video play error:', err);
        // Delay showing error to allow backend to wake up
        setTimeout(() => {
          setVideoLoadError(true);
          // Retry after 3 seconds
          setTimeout(() => {
            if (heroVideoRef.current) {
              heroVideoRef.current.play().catch(retryErr => {
                console.log('Video retry failed:', retryErr);
              });
            }
          }, 3000);
        }, 5000);
      });
    }
  }, [currentHeroImage, heroVideos.length]);

  useEffect(() => {
    const productInterval = setInterval(() => {
      setCurrentProductSlide((prev) => (prev + 1) % Math.max(1, Math.min(products.length, 4)));
    }, 5000);
    return () => clearInterval(productInterval);
  }, [products.length]);

  // Auto-slide for testimonials
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(testimonialInterval);
  }, []);

  // Scroll to current testimonial
  useEffect(() => {
    if (testimonialsScrollRef.current) {
      const scrollContainer = testimonialsScrollRef.current;
      const cardWidth = scrollContainer.children[0]?.offsetWidth || 0;
      const gap = 16;
      scrollContainer.scrollTo({
        left: currentTestimonial * (cardWidth + gap),
        behavior: 'smooth'
      });
    }
  }, [currentTestimonial]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Pre-warm backend by calling health endpoint
        try {
          await fetch(`${apiOrigin}/api/health`, { method: 'GET' });
        } catch (healthErr) {
          console.log('Backend health check failed, may be waking up:', healthErr.message);
        }

        const [categoriesResponse, productsResponse, galleryResponse] = await Promise.all([
          getCategories({ active: true }),
          getProducts({ active: true }),
          getGalleryItems()
        ]);
        setCategories(categoriesResponse.data.data || []);
        setProducts(productsResponse.data.data);

        // Filter gallery items for Company Video type
        const companyVideoItems = galleryResponse.data.data?.filter(item => item.type === 'Company Video' && item.isActive) || [];
        setMachineVideos(companyVideoItems);
        setIsLoadingEquipment(false);

        // Store all gallery items for hero images
        setGalleryItems(galleryResponse.data.data || []);

        // Filter gallery items for Hero Video type
        const allItems = galleryResponse.data.data || [];
        const heroVideoItems = allItems.filter(item => item.type === 'Hero Video') || [];

        // Use uploaded videos from admin panel
        setHeroVideos(heroVideoItems);
        setVideosLoaded(true);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoadingCategories(false);
        setIsLoadingProducts(false);
      }
    };
    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    return selectedCategory === 'all' 
      ? products 
      : products.filter(product => product.category?._id === selectedCategory || product.category === selectedCategory);
  }, [products, selectedCategory]);

  const featuredProducts = useMemo(() => {
    return filteredProducts.slice(0, 8);
  }, [filteredProducts]);

  // Auto-slide category sections once after page reload
  useEffect(() => {
    const hasAutoSlid = sessionStorage.getItem('categoryAutoSlid');
    if (!hasAutoSlid) {
      const timer = setTimeout(() => {
        if (categoryScrollRef1.current) {
          categoryScrollRef1.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
        sessionStorage.setItem('categoryAutoSlid', 'true');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <MainLayout>
      {/* Hero Banner Carousel - Enhanced Design */}
      <section className="relative overflow-hidden">
        <div className="relative w-full aspect-[1440/600] sm:aspect-[1440/400] lg:aspect-[1440/500]" role="region">
          <div className="overflow-hidden h-full">
            {heroVideos.length > 0 ? (
              heroVideos.map((video, index) => {
                const videoPath = video.images && video.images.length > 0 ? video.images[0] : null;
                let fullVideoUrl;
                if (videoPath?.startsWith('http')) {
                  fullVideoUrl = videoPath;
                } else if (videoPath?.startsWith('/uploads/')) {
                  fullVideoUrl = `${apiOrigin}${videoPath}`;
                } else if (videoPath) {
                  fullVideoUrl = `${apiOrigin}/uploads/${videoPath}`;
                }
                return (
                  <div key={video._id || index} className={`absolute inset-0 transition-opacity duration-500 ${index === currentHeroImage ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                    <a className="flex items-center justify-center w-full h-full relative group" href="/products">
                      {fullVideoUrl ? (
                        <video
                          ref={index === currentHeroImage ? heroVideoRef : null}
                          src={fullVideoUrl}
                          muted
                          onEnded={index === currentHeroImage ? handleVideoEnd : undefined}
                          playsInline
                          onError={() => setVideoLoadError(true)}
                          onLoadStart={() => setVideoLoadError(false)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                          <div className="text-center">
                            <span className="text-white text-lg font-bold">SAI TRADER</span>
                            <span className="text-white/80 text-sm block mt-2">Premium Plastic Products</span>
                          </div>
                        </div>
                      )}
                      {videoLoadError && index === currentHeroImage && (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                          <div className="text-center">
                            <span className="text-white text-lg font-bold">SAI TRADER</span>
                            <span className="text-white/80 text-sm block mt-2">Premium Plastic Products</span>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 z-20 hidden lg:block">
                        <h1 className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-white mb-2 sm:mb-3 drop-shadow-lg">Premium Plastic Products</h1>
                        <p className="text-xs sm:text-sm lg:text-base text-white/90 mb-3 sm:mb-4 max-w-2xl">Leading manufacturer of vacuum metallised and decorative coating solutions</p>
                        <span className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-extrabold text-xs sm:text-sm hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl">
                          Explore Products
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </a>
                  </div>
                );
              })
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <span className="text-gray-400">No hero videos available. Please upload videos from admin panel.</span>
              </div>
            )}
          </div>
          {/* Carousel indicators */}
          {heroVideos.length > 0 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-30">
              {heroVideos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHeroImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentHeroImage ? 'bg-white w-6 shadow-lg' : 'bg-white/50 hover:bg-white/70'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section - Enhanced Design */}
      <section ref={categorySectionRef} className="bg-gradient-to-br from-gray-100 via-white to-gray-100 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="relative z-10 mx-auto max-w-screen-2xl">
          <div className="mb-6 sm:mb-8 lg:mb-10 text-center">
            <p className="text-[8px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-red-600 mb-1.5 sm:mb-3">Browse</p>
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-gray-900">Shop by Category</h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mt-2 sm:mt-3 rounded-full" />
          </div>

          {!isLoadingCategories && categories.length > 0 ? (
            <div className="flex flex-col gap-4 lg:gap-6">
              {/* Mobile: Single scroll with 2x5 grid */}
              <div ref={categoryScrollRef1} className="flex gap-3 overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-slate-200 hover:scrollbar-thumb-red-700 snap-x snap-mandatory px-2 lg:hidden" style={{ scrollBehavior: 'smooth' }}>
                <div className="flex flex-col gap-3">
                  {/* First row of cards for mobile */}
                  <div className="flex gap-3">
                    {categories.slice(0, 5).map((category, index) => {
                      const sectionId = `section-${category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                      const categoryImage = category.image ? (category.image.startsWith('http') ? category.image : `${apiOrigin.replace('/api', '')}${category.image}`) : null;
                      const showImage = category.image;
                      return (
                        <Link 
                          key={category._id} 
                          to={`/products#${sectionId}`}
                          className={`flex-shrink-0 w-[calc(50%-6px)] aspect-[3/2] group relative bg-gradient-to-br from-white via-white to-gray-50 backdrop-blur-sm rounded-[24px] shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 overflow-hidden cursor-pointer border-2 border-gray-200/50 hover:border-blue-500 flex flex-col items-center justify-center p-4 snap-start hover:-translate-y-2 ${isCategorySectionVisible ? 'animate-fade-in-slide-left' : 'opacity-0'}`}
                          style={{ animationDelay: isCategorySectionVisible ? `${index * 150}ms` : '0ms', transformStyle: 'preserve-3d' }}
                        >
                          {showImage && (
                            <div className="flex-1 flex items-center justify-center w-full overflow-hidden relative rounded-xl">
                              <img 
                                src={categoryImage} 
                                alt={category.name} 
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" 
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                          )}
                          <div className="w-full flex items-center justify-between mt-2">
                            <h3 className="text-xs font-bold text-black group-hover:text-blue-700 transition-colors leading-tight">{category.name}</h3>
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  {/* Second row of cards for mobile */}
                  <div className="flex gap-3">
                    {categories.slice(5, 10).map((category, index) => {
                      const sectionId = `section-${category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                      const categoryImage = category.image ? (category.image.startsWith('http') ? category.image : `${apiOrigin.replace('/api', '')}${category.image}`) : null;
                      const showImage = category.image;
                      return (
                        <Link 
                          key={category._id} 
                          to={`/products#${sectionId}`}
                          className={`flex-shrink-0 w-[calc(50%-6px)] aspect-[3/2] group relative bg-gradient-to-br from-white via-white to-gray-50 backdrop-blur-sm rounded-[24px] shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 overflow-hidden cursor-pointer border-2 border-gray-200/50 hover:border-blue-500 flex flex-col items-center justify-center p-4 snap-start hover:-translate-y-2 ${isCategorySectionVisible ? 'animate-fade-in-slide-left' : 'opacity-0'}`}
                          style={{ animationDelay: isCategorySectionVisible ? `${(index + 5) * 150}ms` : '0ms', transformStyle: 'preserve-3d' }}
                        >
                          {showImage && (
                            <div className="flex-1 flex items-center justify-center w-full overflow-hidden relative rounded-xl">
                              <img 
                                src={categoryImage} 
                                alt={category.name} 
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" 
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                          )}
                          <div className="w-full flex items-center justify-between mt-2">
                            <h3 className="text-xs font-bold text-black group-hover:text-blue-700 transition-colors leading-tight">{category.name}</h3>
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Desktop Row 1: 4 cards */}
              <div className="hidden lg:grid lg:grid-cols-4 lg:overflow-visible lg:gap-5">
                {categories.slice(0, 4).map((category, index) => {
                  const sectionId = `section-${category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                  const categoryImage = category.image ? (category.image.startsWith('http') ? category.image : `${apiOrigin.replace('/api', '')}${category.image}`) : null;
                  const showImage = category.image;
                  return (
                    <Link 
                      key={category._id} 
                      to={`/products#${sectionId}`}
                      className={`group relative bg-gradient-to-br from-white via-white to-gray-50 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 overflow-hidden cursor-pointer h-52 border-2 border-gray-200/50 hover:border-blue-500 flex flex-col items-center justify-center p-4 hover:-translate-y-2 ${isCategorySectionVisible ? 'animate-fade-in-slide-left' : 'opacity-0'}`}
                      style={{ animationDelay: isCategorySectionVisible ? `${index * 150}ms` : '0ms', transformStyle: 'preserve-3d' }}
                    >
                      {showImage && (
                        <div className="flex-1 flex items-center justify-center w-full overflow-hidden relative rounded-xl">
                          <img 
                            src={categoryImage} 
                            alt={category.name} 
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" 
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                      )}
                      <div className="w-full flex items-center justify-between mt-3">
                        <h3 className="text-sm font-bold text-black group-hover:text-blue-700 transition-colors">{category.name}</h3>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              
              {/* Desktop Row 2: 2 cards centered */}
              <div className="hidden lg:grid lg:grid-cols-4 lg:overflow-visible lg:gap-5">
                <div className="hidden lg:block"></div>
                {categories.slice(4, 6).map((category, index) => {
                  const sectionId = `section-${category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                  const categoryImage = category.image ? (category.image.startsWith('http') ? category.image : `${apiOrigin.replace('/api', '')}${category.image}`) : null;
                  const showImage = category.image;
                  return (
                    <Link 
                      key={category._id} 
                      to={`/products#${sectionId}`}
                      className={`group relative bg-gradient-to-br from-white via-white to-gray-50 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 overflow-hidden cursor-pointer h-52 border-2 border-gray-200/50 hover:border-blue-500 flex flex-col items-center justify-center p-4 hover:-translate-y-2 ${isCategorySectionVisible ? 'animate-fade-in-slide-left' : 'opacity-0'}`}
                      style={{ animationDelay: isCategorySectionVisible ? `${(index + 4) * 150}ms` : '0ms', transformStyle: 'preserve-3d' }}
                    >
                      {showImage && (
                        <div className="flex-1 flex items-center justify-center w-full overflow-hidden relative rounded-xl">
                          <img 
                            src={categoryImage} 
                            alt={category.name} 
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" 
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                      )}
                      <div className="w-full flex items-center justify-between mt-3">
                        <h3 className="text-sm font-bold text-black group-hover:text-blue-700 transition-colors">{category.name}</h3>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  );
                })}
                <div className="hidden lg:block"></div>
              </div>
              
              {/* Desktop Row 3: 4 cards */}
              <div className="hidden lg:grid lg:grid-cols-4 lg:overflow-visible lg:gap-5">
                {categories.slice(6, 10).map((category, index) => {
                  const sectionId = `section-${category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                  const categoryImage = category.image ? (category.image.startsWith('http') ? category.image : `${apiOrigin.replace('/api', '')}${category.image}`) : null;
                  const showImage = category.image;
                  return (
                    <Link 
                      key={category._id} 
                      to={`/products#${sectionId}`}
                      className={`group relative bg-gradient-to-br from-white via-white to-gray-50 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 overflow-hidden cursor-pointer h-52 border-2 border-gray-200/50 hover:border-blue-500 flex flex-col items-center justify-center p-4 hover:-translate-y-2 ${isCategorySectionVisible ? 'animate-fade-in-slide-left' : 'opacity-0'}`}
                      style={{ animationDelay: isCategorySectionVisible ? `${(index + 6) * 150}ms` : '0ms', transformStyle: 'preserve-3d' }}
                    >
                      {showImage && (
                        <div className="flex-1 flex items-center justify-center w-full overflow-hidden relative rounded-xl">
                          <img 
                            src={categoryImage} 
                            alt={category.name} 
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" 
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                      )}
                      <div className="w-full flex items-center justify-between mt-3">
                        <h3 className="text-sm font-bold text-black group-hover:text-blue-700 transition-colors">{category.name}</h3>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-600 py-4 sm:py-8 lg:py-12 text-[10px] sm:text-xs">Loading categories...</div>
          )}
        </div>
      </section>

      {/* Equipment/Machinery Videos Section - Enhanced Design */}
      <section className="bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100 px-4 py-6 sm:py-12 lg:py-20 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="relative z-10 mx-auto max-w-screen-2xl">
          <div className="mb-4 sm:mb-6 lg:mb-10 text-center">
            <p className="text-[8px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-blue-600 mb-1.5 sm:mb-3">Our Equipment</p>
            <h2 className="text-base sm:text-xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-1.5 sm:mb-3">Machinery & Equipment</h2>
            <p className="text-[9px] sm:text-xs lg:text-base text-gray-600 max-w-lg lg:max-w-3xl mx-auto">State-of-the-art vacuum metallising equipment for premium coating results.</p>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-2 sm:mt-3 rounded-full" />
          </div>

          {!isLoadingEquipment && machineVideos.length > 0 ? (
            <div className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto pb-6 sm:pb-8 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-slate-200 hover:scrollbar-thumb-blue-700 snap-x snap-mandatory px-1 sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:overflow-visible">
              {machineVideos.map((video, index) => (
                <div key={video._id || index} className="flex-shrink-0 relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 w-40 sm:w-auto sm:max-w-[250px] lg:max-w-[300px] snap-start group">
                  <div className="relative aspect-[9/14]">
                    {video.images && video.images.length > 0 ? (() => {
                      const videoPath = video.images[0];
                      let fullVideoUrl;
                      if (videoPath?.startsWith('http')) {
                        fullVideoUrl = videoPath;
                      } else if (videoPath?.startsWith('/uploads/')) {
                        fullVideoUrl = `${apiOrigin}${videoPath}`;
                      } else {
                        fullVideoUrl = `${apiOrigin}/uploads/${videoPath}`;
                      }
                      return (
                        <video
                          src={fullVideoUrl}
                          autoPlay
                          muted
                          loop
                          playsInline
                          controls
                          onError={() => setMachineVideoErrors(prev => ({ ...prev, [index]: true }))}
                          onLoadStart={() => setMachineVideoErrors(prev => ({ ...prev, [index]: false }))}
                          className="w-full h-full object-cover"
                        />
                      );
                    })() : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-400 text-xs sm:text-sm">No Video</span>
                      </div>
                    )}
                    {machineVideoErrors[index] && (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-gray-500 text-xs mb-1 block">Loading...</span>
                          <span className="text-gray-400 text-[10px]">Backend waking up</span>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-blue-600 text-white text-[8px] sm:text-xs font-extrabold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      HD
                    </div>
                  </div>
                  {video.title && (
                    <div className="p-3 sm:p-4 bg-white">
                      <h3 className="text-xs sm:text-sm lg:text-base font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">{video.title}</h3>
                      {video.description && (
                        <p className="text-[10px] sm:text-xs text-gray-600 mt-1 line-clamp-2">{video.description}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 py-4 sm:py-8 lg:py-12 text-[10px] sm:text-xs">
              {isLoadingEquipment ? 'Loading videos...' : 'No company videos available.'}
            </div>
          )}
        </div>
      </section>

      {/* Statistics Counter Section - Enhanced Design */}
      <section ref={statsSectionRef} className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 px-4 py-6 sm:py-16 lg:py-20 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM.jpeg')] bg-cover bg-center opacity-10" />
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="relative z-10 mx-auto max-w-screen-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-8 lg:gap-12">
            {[
              { number: '500+', label: 'Happy Clients', icon: '👥' },
              { number: '1000+', label: 'Projects Completed', icon: '✅' },
              { number: '15+', label: 'Years Experience', icon: '🏆' },
              { number: '50+', label: 'Product Categories', icon: '📦' }
            ].map((stat, index) => (
              <div key={index} className={`text-center transition-all duration-1000 ${isStatsSectionVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`} style={{ transitionDelay: `${index * 150}ms` }}>
                <div className="text-2xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-1 sm:mb-3 drop-shadow-lg">{stat.number}</div>
                <div className="text-base sm:text-xl lg:text-2xl mb-0.5">{stat.icon}</div>
                <div className="text-[9px] sm:text-sm lg:text-base font-semibold text-red-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section - Enhanced Design */}
      <section ref={testimonialsSectionRef} className="bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-12 sm:py-16 lg:py-20 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="relative z-10 mx-auto max-w-screen-2xl">
          <div className="mb-8 sm:mb-12 lg:mb-16 text-center">
            <p className="text-[8px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-red-600 mb-1.5 sm:mb-3">Testimonials</p>
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-gray-900 mb-2 sm:mb-3">What Our Clients Say</h2>
            <div className="w-20 sm:w-24 lg:w-32 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto rounded-full"></div>
          </div>
          <div ref={testimonialsScrollRef} className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory px-1 sm:grid sm:grid-cols-3 sm:overflow-visible sm:gap-6 lg:gap-10 scrollbar-hide">
            {[
              {
                name: 'Rajesh Kumar',
                company: 'Plastic Manufacturing Co.',
                text: 'Excellent vacuum metallising services. The chrome finish quality is outstanding and delivery is always on time. Highly recommended for B2B coating needs.',
                rating: 5,
                color: 'from-red-500 to-red-600'
              },
              {
                name: 'Priya Sharma',
                company: 'Fashion Accessories Ltd.',
                text: 'Professional team with great expertise in rainbow finishes. Our hair clips look amazing after their metallizing service. Will continue to work with them.',
                rating: 5,
                color: 'from-blue-500 to-blue-600'
              },
              {
                name: 'Amit Patel',
                company: 'Decorative Products Inc.',
                text: 'Reliable service provider with consistent quality. They handle bulk orders efficiently and the PP coating results are perfect. Great partnership!',
                rating: 5,
                color: 'from-green-500 to-green-600'
              }
            ].map((testimonial, index) => (
              <div key={index} className={`flex-shrink-0 w-[calc(100%-16px)] sm:w-auto bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 snap-start border border-gray-100 ${isTestimonialsSectionVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`} style={{ transitionDelay: `${index * 150}ms` }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center text-white font-extrabold text-lg sm:text-xl shadow-lg`}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner - Enhanced Design */}
      <section className="bg-gradient-to-br from-gray-100 via-white to-gray-100 px-3 py-3 sm:py-6 lg:py-12 sm:px-4 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-64 sm:h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="relative z-10 mx-auto max-w-screen-2xl">
          <div className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-3 sm:p-6 lg:p-12 hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]">
            <div className="absolute inset-0 bg-[url('/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM.jpeg')] bg-cover bg-center opacity-10" />
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-6">
              <div className="text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-3">
                  <span className="text-xl sm:text-2xl lg:text-3xl">✨</span>
                  <span className="text-[7px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-red-400">New Collection</span>
                </div>
                <h2 className="text-xs sm:text-lg lg:text-3xl font-extrabold text-white leading-tight mb-0.5 sm:mb-2">New Arrivals</h2>
                <p className="text-[10px] sm:text-sm lg:text-base text-gray-300">Check out our latest products</p>
              </div>
              <Link to="/products" className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-2.5 sm:px-5 lg:px-8 py-1.5 sm:py-2.5 lg:py-3 rounded-md sm:rounded-lg font-extrabold hover:from-red-700 hover:to-red-800 hover:scale-105 transition-all duration-300 text-[10px] sm:text-sm shadow-xl">
                Shop Now <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Contact CTA Section - Modern Design */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-8 sm:py-12 lg:py-14 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-[url('/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM.jpeg')] bg-cover bg-center opacity-5" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        <div className="relative z-10 mx-auto max-w-screen-2xl">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-8 lg:mb-10">
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-3 sm:px-5 py-1.5 sm:py-2 border border-white/10">
              <div className="relative">
                <div className="h-2 sm:h-2.5 w-2 sm:w-2.5 rounded-full bg-green-400 animate-ping absolute" />
                <div className="h-2 sm:h-2.5 w-2 sm:w-2.5 rounded-full bg-green-400 relative" />
              </div>
              <span className="text-[9px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.2em] text-white">Available 24/7</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200 leading-tight mb-1.5 sm:mb-3">
              Let's Connect
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-slate-300 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
              Transform your business with premium vacuum metallising solutions. Get in touch today for expert consultation and competitive pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:gap-6">
            {/* Contact Cards */}
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/10 hover:border-green-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center gap-2 sm:gap-3 lg:gap-4">
                  <div className="flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-lg sm:rounded-xl lg:rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-2xl shadow-green-500/30 group-hover:scale-110 transition-transform duration-300">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm lg:text-base font-extrabold text-white mb-0.5 sm:mb-1 group-hover:text-green-400 transition-colors">WhatsApp</h3>
                    <p className="text-[9px] sm:text-xs lg:text-sm text-slate-400 mb-1 sm:mb-2">Instant response • 24/7 available</p>
                    <a href="https://wa.me/918390946157" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-bold hover:text-green-400 transition-colors group-hover:translate-x-2 transition-transform text-[10px] sm:text-xs lg:text-sm">
                      +91 83909 46157
                      <svg className="w-2 h-2 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center gap-2 sm:gap-3 lg:gap-4">
                  <div className="flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-lg sm:rounded-xl lg:rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm lg:text-base font-extrabold text-white mb-0.5 sm:mb-1 group-hover:text-blue-400 transition-colors">Phone</h3>
                    <p className="text-[9px] sm:text-xs lg:text-sm text-slate-400 mb-1 sm:mb-2">Direct line • Expert support</p>
                    <a href="tel:+919623255747" className="inline-flex items-center gap-2 text-white font-bold hover:text-blue-400 transition-colors group-hover:translate-x-2 transition-transform text-[10px] sm:text-xs lg:text-sm">
                      +91 96232 55747
                      <svg className="w-2 h-2 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center gap-2 sm:gap-3 lg:gap-4">
                  <div className="flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 lg:h-12 lg:w-12 rounded-lg sm:rounded-xl lg:rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-2xl shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6 lg:h-6 lg:w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <path d="M22 6l-10 7L2 6" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm lg:text-base font-extrabold text-white mb-0.5 sm:mb-1 group-hover:text-purple-400 transition-colors">Email</h3>
                    <p className="text-[9px] sm:text-xs lg:text-sm text-slate-400 mb-1 sm:mb-2">Quick response • Professional</p>
                    <a href="mailto:saitrader@gmail.com" className="inline-flex items-center gap-2 text-white font-bold hover:text-purple-400 transition-colors group-hover:translate-x-2 transition-transform text-[10px] sm:text-xs lg:text-sm">
                      saitrader@gmail.com
                      <svg className="w-2 h-2 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/10 hover:border-red-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center gap-2 sm:gap-3 lg:gap-4">
                  <div className="flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-lg sm:rounded-xl lg:rounded-xl bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-2xl shadow-red-500/30 group-hover:scale-110 transition-transform duration-300">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm lg:text-base font-extrabold text-white mb-0.5 sm:mb-1 group-hover:text-red-400 transition-colors">Location</h3>
                    <p className="text-[9px] sm:text-xs lg:text-sm text-slate-400 mb-1 sm:mb-2">Visit us • Factory tour</p>
                    <p className="inline-flex items-center gap-2 text-white font-bold group-hover:translate-x-2 transition-transform text-[10px] sm:text-xs lg:text-sm">
                      Industrial Area, India
                      <svg className="w-2 h-2 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours & CTA */}
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/10">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                    <span className="text-sm sm:text-lg lg:text-xl">🕐</span>
                  </div>
                  <h3 className="text-xs sm:text-base lg:text-lg font-extrabold text-white">Business Hours</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center border-b border-white/10 pb-1.5 sm:pb-2">
                    <span className="text-white font-semibold text-[10px] sm:text-sm lg:text-base">Mon - Fri</span>
                    <span className="text-slate-300 font-mono text-[9px] sm:text-sm lg:text-base">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-1.5 sm:pb-2">
                    <span className="text-white font-semibold text-[10px] sm:text-sm lg:text-base">Saturday</span>
                    <span className="text-slate-300 font-mono text-[9px] sm:text-sm lg:text-base">9:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold text-[10px] sm:text-sm lg:text-base">Sunday</span>
                    <span className="text-slate-300 font-mono text-[9px] sm:text-sm lg:text-base">Closed</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <a
                  href="tel:+919623255747"
                  className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 w-full rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-4 lg:py-5 text-[10px] sm:text-sm lg:text-base font-extrabold text-white shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-blue-500/50 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6 lg:h-6 lg:w-6 group-hover:animate-pulse relative z-10" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="relative z-10">Call Now</span>
                </a>
                <a
                  href="https://wa.me/918390946157"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 w-full rounded-xl sm:rounded-2xl bg-gradient-to-r from-green-500 to-green-600 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-4 lg:py-5 text-[10px] sm:text-sm lg:text-base font-extrabold text-white shadow-2xl shadow-green-500/30 transition-all duration-300 hover:from-green-600 hover:to-green-700 hover:shadow-green-500/50 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/20 to-green-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6 lg:h-6 lg:w-6 group-hover:animate-pulse relative z-10" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.M157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="relative z-10">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Home;
