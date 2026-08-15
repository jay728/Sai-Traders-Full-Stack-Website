import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../../../layouts/MainLayout';
import { getProductBySlug } from '../../../services/productService';
import { apiOrigin } from '../../../config/api';

function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await getProductBySlug(slug);
        setProduct(response.data.data);
      } catch (err) {
        setError('Product not found');
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [slug]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-slate-600">Loading product details...</p>
        </div>
      </MainLayout>
    );
  }

  if (error || !product) {
    return (
      <MainLayout>
        <div className="flex min-h-[400px] flex-col items-center justify-center px-4">
          <h1 className="text-2xl font-extrabold text-slate-900">Product Not Found</h1>
          <p className="mt-2 text-slate-600">{error}</p>
          <Link to="/products" className="mt-4 rounded-lg bg-blue-700 px-6 py-3 text-sm font-extrabold text-white hover:bg-blue-800">
            Back to Products
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="bg-white/80 backdrop-blur-sm px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link to="/products" className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-blue-700 hover:text-blue-800">
            ← Back to Products
          </Link>

          <div className="mt-6 sm:mt-8 grid gap-6 sm:gap-8 lg:gap-12 grid-cols-1 lg:grid-cols-2">
            {/* Product Images */}
            <div className="space-y-3 sm:space-y-4">
              {product.images?.length > 0 ? (
                <div className="aspect-square overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-xl shadow-blue-200/30">
                  <img
                    src={`${apiOrigin}${product.images[0]}`}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square flex items-center justify-center rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 text-slate-400 text-sm">No image available</div>
              )}

              {product.images?.length > 1 && (
                <div className="grid gap-2 sm:gap-3 sm:gap-4 grid-cols-3 sm:grid-cols-3">
                  {product.images.slice(1).map((image, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-lg shadow-blue-200/30">
                      <img
                        src={`${apiOrigin}${image}`}
                        alt={`${product.name} ${index + 2}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-extrabold text-blue-700">
                  {product.material}
                </span>
                <span className="rounded-full bg-gradient-to-br from-orange-100 to-orange-200 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-extrabold text-orange-700">
                  {product.finishType} Finish
                </span>
              </div>

              <h1 className="mt-4 sm:mt-6 text-xl sm:text-2xl lg:text-4xl font-extrabold text-slate-900">{product.name}</h1>

              {product.category && (
                <p className="mt-2 text-xs sm:text-sm text-slate-600">
                  Category: {product.category.name}
                </p>
              )}

              {product.description && (
                <div className="mt-4 sm:mt-6">
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900">Description</h2>
                  <p className="mt-2 text-sm sm:text-base leading-5 sm:leading-7 text-slate-600">{product.description}</p>
                </div>
              )}

              <div className="mt-6 sm:mt-8 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/50 p-3 sm:p-4 lg:p-6 shadow-lg shadow-blue-200/30">
                <div className="absolute -right-4 -top-4 h-12 w-12 sm:-right-6 sm:-top-6 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-400/20 blur-xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center">
                      <span className="text-white text-xs">📞</span>
                    </div>
                    <h2 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900">
                      Interested in this product?
                    </h2>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600">
                    Contact us to discuss your requirements for this decorative coating solution.
                  </p>
                  <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <a
                      href={`https://wa.me/918390946157?text=Hi, I'm interested in ${encodeURIComponent(product.name)}. Please provide more details.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-[10px] sm:text-xs lg:text-sm font-extrabold text-white transition-all duration-300 hover:from-green-600 hover:to-green-700 hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5"
                    >
                      <svg viewBox="0 0 24 24" className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp Inquiry
                    </a>
                    <Link
                      to="/contact"
                      state={{ productName: product.name }}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-[10px] sm:text-xs lg:text-sm font-extrabold text-white transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5"
                    >
                      Contact Us <span className="text-sm sm:text-base lg:text-lg">→</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white via-blue-50 to-indigo-50 border border-blue-100/50 p-3 sm:p-4 lg:p-6 shadow-lg shadow-blue-200/30">
                <div className="absolute -right-4 -top-4 h-12 w-12 sm:-right-6 sm:-top-6 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-orange-400/20 to-yellow-400/20 blur-xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <span className="text-white text-xs">⚡</span>
                    </div>
                    <h2 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900">Product Specifications</h2>
                  </div>
                  <dl className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                    <div className="flex justify-between border-b border-blue-100/50 pb-2 sm:pb-3">
                      <dt className="text-xs sm:text-sm font-bold text-slate-600">Material</dt>
                      <dd className="text-xs sm:text-sm font-extrabold text-slate-900">{product.material}</dd>
                    </div>
                    <div className="flex justify-between border-b border-blue-100/50 pb-2 sm:pb-3">
                      <dt className="text-xs sm:text-sm font-bold text-slate-600">Finish Type</dt>
                      <dd className="text-xs sm:text-sm font-extrabold text-slate-900">{product.finishType}</dd>
                    </div>
                    {product.category && (
                      <div className="flex justify-between">
                        <dt className="text-xs sm:text-sm font-bold text-slate-600">Category</dt>
                        <dd className="text-xs sm:text-sm font-extrabold text-slate-900">{product.category.name}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products CTA */}
      <section className="px-4 py-10 sm:py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-rose-600 p-6 sm:p-8 text-white shadow-xl shadow-orange-500/30 sm:p-10 md:flex-row md:items-center md:justify-between">
          <div className="absolute -right-8 -top-8 h-24 w-24 sm:-right-10 sm:-top-10 sm:h-32 sm:w-32 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-400/20 blur-xl" />
          <div className="absolute -left-6 -bottom-6 h-20 w-20 sm:-left-8 sm:-bottom-8 sm:h-28 sm:w-28 rounded-full bg-gradient-to-br from-rose-400/20 to-pink-400/20 blur-xl" />
          <div className="relative z-10 flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                  <span className="text-white text-sm">🔧</span>
                </div>
                <p className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.16em] text-orange-100">Custom solutions</p>
              </div>
              <h2 className="mt-2 text-xl sm:text-3xl font-extrabold">Need a different finish or material?</h2>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 justify-center rounded-xl bg-white px-4 py-2.5 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-extrabold text-orange-700 shadow-lg transition-all duration-300 hover:bg-orange-50 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5"
            >
              Discuss Your Requirements <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default ProductDetails;
