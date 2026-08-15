import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { apiOrigin } from '../../../config/api';
import MainLayout from '../../../layouts/MainLayout';
import { getGalleryItems } from '../../../services/galleryService';
import { PrimaryButton, ButtonGroup } from '../../../components/ui/EnhancedButton';
import { ImageCard, CardGrid } from '../../../components/ui/EnhancedCard';
import { HeroSection, CTASection } from '../../../components/ui/EnhancedSection';


function Gallery() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Scroll to top is now handled by ScrollToTop component in AppRoutes
  }, []);

  useEffect(() => {
    getGalleryItems({ active: true })
      .then((response) => setItems(response.data.data))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const hasRealPhotos = useMemo(() => items.length > 0, [items.length]);

  const renderGalleryItems = () => {
    if (isLoading) return <p className="mt-4 sm:mt-8 lg:mt-10 text-slate-500 text-center text-[9px] sm:text-xs lg:text-sm">Loading gallery...</p>;
    if (!hasRealPhotos) {
      return <p className="mt-4 sm:mt-8 lg:mt-10 text-slate-500 text-center text-[9px] sm:text-xs lg:text-sm">No gallery items available</p>;
    }

    const groupedItems = items.reduce((acc, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    }, {});

    return Object.entries(groupedItems).map(([type, typeItems]) => (
      <div key={type} id={`category-${type.toLowerCase()}`} className="mb-4 sm:mb-8 lg:mb-10">
        <div className="flex items-center gap-1.5 sm:gap-3 mb-2 sm:mb-4 lg:mb-5">
          <h2 className="text-xs sm:text-base lg:text-2xl font-extrabold text-gray-900">{type}</h2>
          <span className="text-[9px] sm:text-xs lg:text-sm font-semibold text-gray-600 bg-blue-50 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-sm">{typeItems.length} item(s)</span>
        </div>
        <div className="flex gap-2 sm:gap-4 lg:gap-6 overflow-x-auto pb-3 sm:pb-6 scrollbar-thin scrollbar-thumb-amber-600 scrollbar-track-slate-700 hover:scrollbar-thumb-amber-700 snap-x snap-mandatory px-1">
          {typeItems.flatMap((item) =>
            item.images.map((image, index) => (
              <div key={`${item._id}-${index}`} className="group flex-shrink-0 relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl bg-white shadow-md hover:shadow-xl border border-gray-200 hover:border-amber-400 transition-all duration-300 w-64 h-auto sm:w-80 lg:w-96 snap-start">
                <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden bg-gray-100">
                  {image.toLowerCase().endsWith('.mov') || image.toLowerCase().endsWith('.mp4') || image.toLowerCase().endsWith('.webm') ? (
                    <video src={image.startsWith('http') ? image : `${apiOrigin}${image}`} controls autoPlay muted loop playsInline onLoadedData={(e) => e.target.play().catch(err => console.log('Autoplay prevented:', err))} className="w-full h-full object-contain" />
                  ) : (
                    <>
                      <img src={image.startsWith('http') ? image : `${apiOrigin}${image}`} alt={`${item.title} ${index + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
                    </>
                  )}
                </div>
                <div className="p-3 sm:p-5 lg:p-6 bg-white">
                  <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-gray-900 leading-tight group-hover:text-amber-600 transition-colors">{item.title}</h3>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    ));
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[url('/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM.jpeg')] bg-cover bg-center opacity-10" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:py-12 lg:py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[8px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-amber-400 mb-1.5 sm:mb-3">Work Gallery</p>
            <h1 className="text-lg sm:text-2xl lg:text-5xl font-extrabold text-white leading-tight mb-1.5 sm:mb-3 lg:mb-4">
              Our Coating Work and Finished Products
            </h1>
            <p className="text-[10px] sm:text-sm lg:text-lg text-gray-300 max-w-2xl lg:max-w-3xl mx-auto mb-3 sm:mb-5 lg:mb-6">
              {hasRealPhotos ? "A selection of completed coating work from SAI TRADER." : "A preview of coating applications and finishes. Real work photographs will be added soon."}
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

      <section className="bg-gray-100 px-4 py-6 sm:py-12 lg:py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 sm:mb-6 lg:mb-10">
            <div className="flex flex-col justify-between gap-2 sm:gap-4 lg:gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-[8px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-blue-600">{hasRealPhotos ? 'Completed work' : 'Preview'}</p>
                <h2 className="mt-1 sm:mt-2 text-base sm:text-xl lg:text-4xl font-extrabold text-gray-900 leading-tight">{hasRealPhotos ? 'Recent work' : 'Coating applications'}</h2>
              </div>
              {!hasRealPhotos && (
                <p className="max-w-md text-[9px] sm:text-xs lg:text-sm text-gray-600">These are visual category previews, not completed work photographs.</p>
              )}
            </div>
          </div>


          {renderGalleryItems()}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-black px-4 py-6 sm:py-12 lg:py-20 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM.jpeg')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="text-base sm:text-xl lg:text-4xl font-extrabold text-white leading-tight mb-1.5 sm:mb-4 lg:mb-6">
            Tell Us About Your Coating Requirements
          </h2>
          <p className="text-[10px] sm:text-sm lg:text-lg text-gray-300 leading-relaxed mb-3 sm:mb-5 lg:mb-8 max-w-xl lg:max-w-2xl mx-auto">
            We'll discuss suitable chrome, rainbow, or custom coating options for your plastic components.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-3 sm:px-6 lg:px-10 py-1.5 sm:py-2.5 lg:py-4 text-[9px] sm:text-xs lg:text-base font-extrabold text-white shadow-md sm:shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
            Request Quote <span className="text-[9px] sm:text-sm lg:text-lg">→</span>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}

export default Gallery;
