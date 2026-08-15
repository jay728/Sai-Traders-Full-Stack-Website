import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../layouts/MainLayout';
import { useCart } from '../../../context/CartContext';
import { submitInquiry } from '../../../services/inquiryService';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, parseInt(newQuantity) || 0);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage('');

    try {
      // Create inquiry with cart items
      const inquiryData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        cartItems: cartItems.map(item => ({
          productId: item._id,
          name: item.name,
          category: item.category,
          quantity: item.quantity,
          image: item.image
        })),
        source: 'cart'
      };

      const response = await submitInquiry(inquiryData);
      
      setFormMessage('Inquiry submitted successfully! We will contact you soon.');
      clearCart();
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setFormMessage(error.response?.data?.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <MainLayout>
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:py-12 lg:py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[10px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-amber-400 mb-1.5 sm:mb-3">Shopping Cart</p>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white leading-tight mb-2 sm:mb-4">Your Selected Products</h1>
            <p className="text-xs sm:text-sm lg:text-lg text-blue-100">Review your items and submit inquiry for quotation</p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-50 via-white to-amber-50 px-4 py-6 sm:py-12 lg:py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">Your cart is empty</h2>
              <p className="text-slate-600 mb-6">Add products from our catalog to get started</p>
              <Link to="/products" className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-extrabold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
                Browse Products →
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1fr_400px]">
              {/* Cart Items */}
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Cart Items ({cartTotal})</h2>
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4 bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-slate-600 mb-2">{item.category}</p>
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-slate-600">Qty:</label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                          className="w-16 px-2 py-1 border border-slate-300 rounded text-sm"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="text-red-600 hover:text-red-700 text-sm font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Inquiry Form */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-4">Submit Inquiry</h2>
                {formMessage && (
                  <div className="mb-4 rounded-lg p-3 text-sm font-bold text-center bg-blue-50 text-blue-600">
                    {formMessage}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-1">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-1">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-1">Additional Notes</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Any specific requirements..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-extrabold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}

export default Cart;
