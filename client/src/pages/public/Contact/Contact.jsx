import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MainLayout from '../../../layouts/MainLayout';
import { submitInquiry } from '../../../services/inquiryService';
import { InputField, TextareaField, FormContainer, FormGroup, FormGrid, FormActions, ButtonGroup, PrimaryButton } from '../../../components/ui/EnhancedForm';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';

const initialForm = { name: '', email: '', phone: '', companyName: '', productName: '', quantity: '', finish: '', budget: '', preferredContact: '', message: '' };

function Contact() {
  const location = useLocation();
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const handleChange = useCallback(({ target: { name, value } }) => setFormData((current) => ({ ...current, [name]: value })), []);
  const [contactSectionRef, isContactSectionVisible] = useIntersectionObserver();
  const [infoSectionRef, isInfoSectionVisible] = useIntersectionObserver();

  // Pre-fill product name if passed from ProductDetails or Home page
  useEffect(() => {
    if (location.state?.productName) {
      setFormData((prev) => ({ ...prev, productName: location.state.productName }));
    }
  }, [location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormMessage('');
    try {
      const response = await submitInquiry(formData);
      setFormMessage(response.data.message);
      setFormData(initialForm);
    } catch (error) {
      setFormMessage(error.response?.data?.message || 'Unable to send your inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <section ref={contactSectionRef} className="bg-gradient-to-br from-gray-100 via-white to-gray-100 px-4 py-8 sm:py-12 lg:py-20 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl mb-6 sm:mb-8 lg:mb-12 text-center">
          <p className="text-[8px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-blue-600 mb-1.5 sm:mb-3">Get In Touch</p>
          <h2 className="text-lg sm:text-2xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-2 sm:mb-3">We'd Love to Hear From You</h2>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 max-w-2xl mx-auto">Fill out the form below and our team will get back to you within 2-4 hours with a competitive quote.</p>
          <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-2 sm:mt-3 rounded-full" />
        </div>
        <div className="relative z-10 mx-auto grid max-w-7xl gap-4 sm:gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-[1fr_1.5fr]">
          <div className="space-y-3 sm:space-y-6">
            <div className={`bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-200/50 p-3 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden hover:-translate-y-1 ${isContactSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0ms', transformStyle: 'preserve-3d' }}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
                  <div className="h-8 w-8 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-md sm:rounded-xl lg:rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-sm sm:text-base lg:text-2xl">📞</span>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-base lg:text-xl font-extrabold text-gray-900">Contact Us Directly</h3>
                    <p className="text-[9px] sm:text-xs lg:text-sm text-gray-600">We're here to help with your coating needs</p>
                  </div>
                </div>
                <p className="text-[9px] sm:text-xs lg:text-sm text-gray-600 leading-relaxed">Contact us directly or send an inquiry. We'll discuss your component, finish requirements, and pricing to provide you with the best solution.</p>
              </div>
            </div>

            <div className={`bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-6 lg:p-8 shadow-xl text-white relative overflow-hidden hover:-translate-y-1 ${isContactSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '100ms', transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 bg-[url('/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM.jpeg')] bg-cover bg-center opacity-10" />
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
              <div className="relative z-10">
                <h3 className="text-xs sm:text-base lg:text-xl font-extrabold mb-2 sm:mb-4 lg:mb-6">Why Choose Us?</h3>
                <ul className="space-y-1.5 sm:space-y-3 lg:space-y-4">
                  <li className="flex items-start gap-1.5 sm:gap-3 group">
                    <span className="text-amber-400 mt-0.5 sm:mt-1 text-xs sm:text-base lg:text-lg group-hover:scale-125 transition-transform duration-300">✓</span>
                    <span className="text-[9px] sm:text-xs lg:text-base text-gray-100">15+ years of industry experience</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-3 group">
                    <span className="text-amber-400 mt-0.5 sm:mt-1 text-xs sm:text-base lg:text-lg group-hover:scale-125 transition-transform duration-300">✓</span>
                    <span className="text-[9px] sm:text-xs lg:text-base text-gray-100">500+ satisfied clients</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-3 group">
                    <span className="text-amber-400 mt-0.5 sm:mt-1 text-xs sm:text-base lg:text-lg group-hover:scale-125 transition-transform duration-300">✓</span>
                    <span className="text-[9px] sm:text-xs lg:text-base text-gray-100">Competitive pricing</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-3 group">
                    <span className="text-amber-400 mt-0.5 sm:mt-1 text-xs sm:text-base lg:text-lg group-hover:scale-125 transition-transform duration-300">✓</span>
                    <span className="text-[9px] sm:text-xs lg:text-base text-gray-100">Quick turnaround time</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-3 group">
                    <span className="text-amber-400 mt-0.5 sm:mt-1 text-xs sm:text-base lg:text-lg group-hover:scale-125 transition-transform duration-300">✓</span>
                    <span className="text-[9px] sm:text-xs lg:text-base text-gray-100">Quality assurance guaranteed</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className={`bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-200/50 p-3 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden hover:-translate-y-1 ${isContactSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms', transformStyle: 'preserve-3d' }}>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-green-500/10 rounded-full blur-2xl" />
              <div className="relative z-10">
                <h3 className="text-xs sm:text-base lg:text font-extrabold text-gray-900 mb-2 sm:mb-4">Quick Response</h3>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9px] sm:text-xs lg:text-sm text-gray-600">Average response time: 2-4 hours</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`relative bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl lg:rounded-4xl border border-blue-100/50 shadow-2xl shadow-blue-500/10 p-6 sm:p-8 lg:p-12 overflow-hidden hover:shadow-3xl hover:shadow-blue-500/20 transition-all duration-500 ${isContactSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms', transformStyle: 'preserve-3d' }}>
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl" />
            
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                <div className="inline-flex items-center gap-2 mb-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-200/50">
                  <div className="relative">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-ping absolute" />
                    <div className="h-2 w-2 rounded-full bg-blue-500 relative" />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.15em] text-blue-700">Quick Quote</span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 leading-tight mb-3">
                  Share Your Coating Requirements
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-xl mx-auto">
                  Fill in the details below and we'll get back to you with a competitive quote within 2-4 hours.
                </p>
              </div>

              {formMessage && (
                <div className="mb-6 rounded-2xl p-4 text-sm font-extrabold text-center bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 shadow-xl border border-blue-200">
                  {formMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="space-y-5 sm:space-y-6">
                  {/* Personal Information */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-100/50 shadow-sm">
                    <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="text-lg sm:text-xl">👤</span>
                      Personal Information
                    </h3>
                    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs sm:text-sm font-extrabold text-gray-700 mb-2">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter your name"
                          className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-sm sm:text-base bg-white/80 backdrop-blur-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-extrabold text-gray-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-sm sm:text-base bg-white/80 backdrop-blur-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-extrabold text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-sm sm:text-base bg-white/80 backdrop-blur-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-extrabold text-gray-700 mb-2">Company Name</label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder="Your company name"
                          className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-sm sm:text-base bg-white/80 backdrop-blur-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Product Information */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-100/50 shadow-sm">
                    <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="text-lg sm:text-xl">📦</span>
                      Product Details
                    </h3>
                    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs sm:text-sm font-extrabold text-gray-700 mb-2">Product Name</label>
                        <input
                          type="text"
                          name="productName"
                          value={formData.productName}
                          onChange={handleChange}
                          placeholder="Which product are you interested in?"
                          className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-sm sm:text-base bg-white/80 backdrop-blur-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-extrabold text-gray-700 mb-2">Quantity Required</label>
                        <input
                          type="text"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          placeholder="e.g., 1000 pieces"
                          className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-sm sm:text-base bg-white/80 backdrop-blur-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-extrabold text-gray-700 mb-2">Preferred Finish</label>
                        <input
                          type="text"
                          name="finish"
                          value={formData.finish}
                          onChange={handleChange}
                          placeholder="Chrome, Rainbow, or Custom"
                          className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-sm sm:text-base bg-white/80 backdrop-blur-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-extrabold text-gray-700 mb-2">Budget Range</label>
                        <input
                          type="text"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          placeholder="e.g., ₹10,000 - ₹50,000"
                          className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-sm sm:text-base bg-white/80 backdrop-blur-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Preferences */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-indigo-100/50 shadow-sm">
                    <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="text-lg sm:text-xl">💬</span>
                      Contact Preferences
                    </h3>
                    <div className="grid gap-4 sm:gap-6 grid-cols-1">
                      <div>
                        <label className="block text-xs sm:text-sm font-extrabold text-gray-700 mb-2">Preferred Contact Method</label>
                        <input
                          type="text"
                          name="preferredContact"
                          value={formData.preferredContact}
                          onChange={handleChange}
                          placeholder="Phone, Email, or WhatsApp"
                          className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 text-sm sm:text-base bg-white/80 backdrop-blur-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-extrabold text-gray-700 mb-2">Your Message *</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          required
                          placeholder="Tell us about your requirements, specifications, or any specific details..."
                          className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 text-sm sm:text-base bg-white/80 backdrop-blur-sm resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-4 sm:px-10 sm:py-5 lg:px-12 lg:py-6 text-sm sm:text-base lg:text-lg font-extrabold text-white shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 hover:shadow-3xl hover:shadow-blue-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      <span className="relative">{isSubmitting ? 'Sending...' : 'Submit Inquiry'}</span>
                      <span className="relative text-lg sm:text-xl lg:text-2xl group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section ref={infoSectionRef} className="bg-gradient-to-br from-white via-gray-50 to-white px-4 py-6 sm:py-12 lg:py-20 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-4 sm:mb-6 lg:mb-10 text-center">
            <p className="text-[8px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-blue-600 mb-1.5 sm:mb-3">Contact Information</p>
            <h2 className="text-base sm:text-xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-1.5 sm:mb-3">Get in Touch</h2>
            <p className="text-[9px] sm:text-xs lg:text-base text-gray-600 max-w-lg lg:max-w-3xl mx-auto">Reach out to us directly for quick responses to your coating requirements.</p>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-600 to-amber-600 mx-auto mt-2 sm:mt-3 rounded-full" />
          </div>

          <div className="grid gap-2 sm:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <div className={`group bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-200/50 p-3 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl hover:border-blue-400 transition-all duration-300 relative overflow-hidden hover:-translate-y-1 ${isInfoSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0ms', transformStyle: 'preserve-3d' }}>
              <div className="relative z-10">
                <div className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 rounded-md sm:rounded-xl lg:rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-2 sm:mb-4 lg:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-sm sm:text-base lg:text-3xl">📱</span>
                </div>
                <h3 className="text-xs sm:text-base lg:text-xl font-extrabold text-gray-900 mb-1.5 sm:mb-3 group-hover:text-blue-600 transition-colors">Call Us</h3>
                <p className="text-gray-600 text-[9px] sm:text-xs lg:text-base leading-relaxed">+91 96232 55747<br/>+91 79720 39556</p>
                <div className="mt-2 sm:mt-3 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[8px] sm:text-[10px] lg:text-xs text-green-600 font-semibold">Available</span>
                </div>
              </div>
            </div>
            <div className={`group bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-200/50 p-3 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl hover:border-amber-400 transition-all duration-300 relative overflow-hidden hover:-translate-y-1 ${isInfoSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '100ms', transformStyle: 'preserve-3d' }}>
              <div className="relative z-10">
                <div className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 rounded-md sm:rounded-xl lg:rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-2 sm:mb-4 lg:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-sm sm:text-base lg:text-3xl">✉️</span>
                </div>
                <h3 className="text-xs sm:text-base lg:text-xl font-extrabold text-gray-900 mb-1.5 sm:mb-3 group-hover:text-amber-600 transition-colors">Email Us</h3>
                <p className="text-gray-600 text-[9px] sm:text-xs lg:text-base leading-relaxed">saiitrader24@gmail.com</p>
                <div className="mt-2 sm:mt-3 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[8px] sm:text-[10px] lg:text-xs text-amber-600 font-semibold">24/7 Support</span>
                </div>
              </div>
            </div>
            <div className={`group bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-200/50 p-3 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl hover:border-blue-400 transition-all duration-300 relative overflow-hidden hover:-translate-y-1 ${isInfoSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms', transformStyle: 'preserve-3d' }}>
              <div className="relative z-10">
                <div className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 rounded-md sm:rounded-xl lg:rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-2 sm:mb-4 lg:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-sm sm:text-base lg:text-3xl">📍</span>
                </div>
                <h3 className="text-xs sm:text-base lg:text-xl font-extrabold text-gray-900 mb-1.5 sm:mb-3 group-hover:text-blue-600 transition-colors">Visit Us</h3>
                <p className="text-gray-600 text-[9px] sm:text-xs lg:text-base leading-relaxed">Babla Compound, Gaibi Nagar, opposite Sana Hotel, Kalyan Road, Bhiwandi - 421308</p>
                <div className="mt-2 sm:mt-3 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[8px] sm:text-[10px] lg:text-xs text-blue-600 font-semibold">Open Now</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-12 text-center">
            <a href="https://wa.me/917972039556" className="inline-flex items-center gap-1.5 sm:gap-3 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-r from-green-500 to-green-600 px-4 sm:px-6 lg:px-12 py-2 sm:py-3.5 lg:py-5 text-[9px] sm:text-xs lg:text-base font-extrabold text-white shadow-xl hover:shadow-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-105 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative text-lg sm:text-2xl lg:text-3xl">💬</span>
              <span className="relative">Chat on WhatsApp</span>
            </a>
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-16 text-center">
            <div className="inline-flex items-center gap-1.5 sm:gap-3 px-3 sm:px-6 lg:px-8 py-1.5 sm:py-3 lg:py-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full border-2 border-blue-200 shadow-lg hover:shadow-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 hover:scale-105">
              <span className="text-blue-600 text-xs sm:text-base lg:text-lg font-semibold">⏰</span>
              <span className="text-blue-900 text-[9px] sm:text-xs lg:text-base font-semibold">Business Hours: Mon-Sat, 9AM-6PM</span>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 lg:mt-8 text-center">
            <div className="inline-flex items-center gap-2 sm:gap-4 px-3 sm:px-6 lg:px-8 py-1.5 sm:py-3 lg:py-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-full border-2 border-amber-200 shadow-lg hover:shadow-xl hover:from-amber-100 hover:to-amber-200 transition-all duration-300 hover:scale-105">
              <span className="text-amber-600 text-xs sm:text-base lg:text-lg font-semibold">🚀</span>
              <span className="text-amber-900 text-[9px] sm:text-xs lg:text-base font-semibold">Quick Response Guaranteed</span>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 lg:mt-8 text-center">
            <div className="inline-flex items-center gap-2 sm:gap-4 px-3 sm:px-6 lg:px-8 py-1.5 sm:py-3 lg:py-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-full border-2 border-purple-200 shadow-lg hover:shadow-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-300 hover:scale-105">
              <span className="text-purple-600 text-xs sm:text-base lg:text-lg font-semibold">✨</span>
              <span className="text-purple-900 text-[9px] sm:text-xs lg:text-base font-semibold">Free Consultation Available</span>
            </div>
          </div>

          {/* Google Maps Section */}
          <div className="mt-8 sm:mt-12 lg:mt-16">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.123456789!2d73.071779!3d19.286375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBabla+Compound%2C+Gaibi+Nagar%2C+opposite+Sana+Hotel%2C+Kalyan+Road%2C+Bhiwandi%2C+Maharashtra+421302!5e0!3m2!1sen!2sin!4v1234567890&q=Babla+Compound+Gaibi+Nagar+opposite+Sana+Hotel+Kalyan+Road+Bhiwandi"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SAI TRADER Location"
                className="w-full h-64 sm:h-80 lg:h-96"
              />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Contact;
