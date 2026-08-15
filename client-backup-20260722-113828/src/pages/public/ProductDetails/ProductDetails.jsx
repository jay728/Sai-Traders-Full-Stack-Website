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

          <div className="mt-6 sm:mt-8 grid gap-8 lg:gap-12 lg:grid-cols-2">
            {/* Product Images */}
            <div className="space-y-3 sm:space-y-4">
              {product.images?.length > 0 ? (
                <div className="aspect-square overflow-hidden rounded-3xl bg-white shadow-xl shadow-blue-200/30">
                  <img
                    src={`${apiOrigin}${product.images[0]}`}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square flex items-center justify-center rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 text-slate-400 text-sm">No image available</div>
              )}

              {product.images?.length > 1 && (
                <div className="grid gap-3 sm:gap-4 grid-cols-3 sm:grid-cols-3">
                  {product.images.slice(1).map((image, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-2xl bg-white shadow-lg shadow-blue-200/30">
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

              <h1 className="mt-4 sm:mt-6 text-2xl sm:text-4xl font-extrabold text-slate-900">{product.name}</h1>

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

              <div className="mt-6 sm:mt-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/50 p-4 sm:p-6 shadow-lg shadow-blue-200/30">
                <div className="absolute -right-4 -top-4 h-12 w-12 sm:-right-6 sm:-top-6 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-400/20 blur-xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center">
                      <span className="text-white text-xs">📞</span>
                    </div>
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                      Interested in this product?
                    </h2>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600">
                    Contact us to discuss your requirements for this decorative coating solution.
                  </p>
                  <Link
                    to="/contact"
                    className="mt-3 sm:mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-extrabold text-white transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5"
                  >
                    Post Your Requirement <span className="text-lg">→</span>
                  </Link>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-blue-50 to-indigo-50 border border-blue-100/50 p-4 sm:p-6 shadow-lg shadow-blue-200/30">
                <div className="absolute -right-4 -top-4 h-12 w-12 sm:-right-6 sm:-top-6 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-orange-400/20 to-yellow-400/20 blur-xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <span className="text-white text-xs">⚡</span>
                    </div>
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900">Product Specifications</h2>
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
