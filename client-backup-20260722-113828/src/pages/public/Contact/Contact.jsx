import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../layouts/MainLayout';
import { submitInquiry } from '../../../services/inquiryService';
import { PrimaryButton, ButtonGroup } from '../../../components/ui/EnhancedButton';
import { FeatureCard } from '../../../components/ui/EnhancedCard';
import { HeroSection } from '../../../components/ui/EnhancedSection';
import { InputField, TextareaField, SelectField, FormContainer, FormGroup, FormGrid, FormActions } from '../../../components/ui/EnhancedForm';

const initialForm = { name: '', email: '', phone: '', finishType: '', materialType: '', quantity: '', dimensions: '', urgency: '', budget: '', message: '' };

function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const handleChange = ({ target: { name, value } }) => setFormData((current) => ({ ...current, [name]: value }));
  
  const handleSubmit = async (event) => { event.preventDefault(); setIsSubmitting(true); setFormMessage(''); try { const response = await submitInquiry(formData); setFormMessage(response.data.message); setFormData(initialForm); } catch (error) { setFormMessage(error.response?.data?.message || 'Unable to send your inquiry. Please try again.'); } finally { setIsSubmitting(false); } };

  const finishOptions = [
    { value: 'chrome', label: 'Chrome finish' },
    { value: 'rainbow', label: 'Rainbow finish' },
    { value: 'custom', label: 'Custom metallising job work' },
    { value: 'guidance', label: 'Need guidance' },
  ];

  const materialOptions = [
    { value: 'pp', label: 'PP (Polypropylene)' },
    { value: 'abs', label: 'ABS (Acrylonitrile Butadiene Styrene)' },
    { value: 'pc', label: 'PC (Polycarbonate)' },
    { value: 'pvc', label: 'PVC (Polyvinyl Chloride)' },
    { value: 'other', label: 'Other material' },
  ];

  const urgencyOptions = [
    { value: 'urgent', label: 'Urgent (within 1 week)' },
    { value: 'normal', label: 'Normal (within 2-3 weeks)' },
    { value: 'flexible', label: 'Flexible timing' },
  ];

  const budgetOptions = [
    { value: 'small', label: 'Small project (< ₹10,000)' },
    { value: 'medium', label: 'Medium project (₹10,000 - ₹50,000)' },
    { value: 'large', label: 'Large project (> ₹50,000)' },
    { value: 'discuss', label: 'Budget to discuss' },
  ];

  return (
    <MainLayout>
      {/* Premium Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/decorative-products/WhatsApp Image 2026-07-16 at 11.25.41 PM.jpeg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:py-12 lg:py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[8px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-amber-400 mb-1.5 sm:mb-3">Request Quote</p>
            <h1 className="text-lg sm:text-2xl lg:text-5xl font-extrabold text-white leading-tight mb-1.5 sm:mb-3 lg:mb-4">
              Get a Quote for Your Coating Requirements
            </h1>
            <p className="text-[10px] sm:text-sm lg:text-lg text-blue-100 max-w-2xl lg:max-w-3xl mx-auto mb-3 sm:mb-5 lg:mb-6">
              Share your component details, material type, and finish requirements. We'll provide competitive pricing for your vacuum metallising job-work.
            </p>
            <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-3 lg:gap-4 justify-center">
              <Link to="/products" className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-3 sm:px-5 lg:px-8 py-1.5 sm:py-2.5 lg:py-4 text-[9px] sm:text-xs lg:text-base font-extrabold text-white shadow-md sm:shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                View Products <span className="text-[9px] sm:text-sm lg:text-lg">→</span>
              </Link>
              <Link to="/about" className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl lg:rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-3 sm:px-5 lg:px-8 py-1.5 sm:py-2.5 lg:py-4 text-[9px] sm:text-xs lg:text-base font-extrabold text-white shadow-md sm:shadow-lg transition-all duration-300 hover:bg-white/20 hover:scale-105">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-50 via-white to-amber-50 px-4 py-8 sm:py-12 lg:py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-[1fr_1.5fr]">
          <div className="space-y-3 sm:space-y-6">
            <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-3xl border border-slate-200 p-3 sm:p-6 lg:p-8 shadow-sm sm:shadow-md lg:shadow-xl hover:shadow-md sm:hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full blur-3xl opacity-10" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
                  <div className="h-8 w-8 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-md sm:rounded-xl lg:rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-sm sm:shadow-md lg:shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <span className="text-sm sm:text-base lg:text-2xl">📞</span>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-base lg:text-xl font-extrabold text-slate-900">Contact Us Directly</h3>
                    <p className="text-[9px] sm:text-xs lg:text-sm text-slate-600">We're here to help with your coating needs</p>
                  </div>
                </div>
                <p className="text-[9px] sm:text-xs lg:text-sm text-slate-600 leading-relaxed">Contact us directly or send an inquiry. We'll discuss your component, finish requirements, and pricing to provide you with the best solution.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg sm:rounded-xl lg:rounded-3xl p-3 sm:p-6 lg:p-8 shadow-sm sm:shadow-md lg:shadow-2xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full blur-3xl opacity-20" />
              <div className="relative z-10">
                <h3 className="text-xs sm:text-base lg:text-xl font-extrabold mb-2 sm:mb-4 lg:mb-6">Why Choose Us?</h3>
                <ul className="space-y-1.5 sm:space-y-3 lg:space-y-4">
                  <li className="flex items-start gap-1.5 sm:gap-3 group">
                    <span className="text-amber-400 mt-0.5 sm:mt-1 text-xs sm:text-base lg:text-lg group-hover:scale-125 transition-transform duration-300">✓</span>
                    <span className="text-[9px] sm:text-xs lg:text-base text-blue-100">15+ years of industry experience</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-3 group">
                    <span className="text-amber-400 mt-0.5 sm:mt-1 text-xs sm:text-base lg:text-lg group-hover:scale-125 transition-transform duration-300">✓</span>
                    <span className="text-[9px] sm:text-xs lg:text-base text-blue-100">500+ satisfied clients</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-3 group">
                    <span className="text-amber-400 mt-0.5 sm:mt-1 text-xs sm:text-base lg:text-lg group-hover:scale-125 transition-transform duration-300">✓</span>
                    <span className="text-[9px] sm:text-xs lg:text-base text-blue-100">Competitive pricing</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-3 group">
                    <span className="text-amber-400 mt-0.5 sm:mt-1 text-xs sm:text-base lg:text-lg group-hover:scale-125 transition-transform duration-300">✓</span>
                    <span className="text-[9px] sm:text-xs lg:text-base text-blue-100">Quick turnaround time</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-3 group">
                    <span className="text-amber-400 mt-0.5 sm:mt-1 text-xs sm:text-base lg:text-lg group-hover:scale-125 transition-transform duration-300">✓</span>
                    <span className="text-[9px] sm:text-xs lg:text-base text-blue-100">Quality assurance guaranteed</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-3xl border border-slate-200 p-3 sm:p-6 lg:p-8 shadow-sm sm:shadow-md lg:shadow-xl hover:shadow-md sm:hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full blur-3xl opacity-10" />
              <div className="relative z-10">
                <h3 className="text-xs sm:text-base lg:text font-extrabold text-slate-900 mb-2 sm:mb-4">Quick Response</h3>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9px] sm:text-xs lg:text-sm text-slate-600">Average response time: 2-4 hours</span>
                </div>
              </div>
            </div>
          </div>

          <FormContainer
            title="Share your coating requirements"
            description="Fill in the details below and we'll get back to you with a competitive quote."
          >
            {formMessage && (
              <div className="mb-6 rounded-xl p-4 text-sm font-extrabold text-center bg-blue-50 text-blue-600 shadow-sm">
                {formMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <FormGroup>
                <FormGrid columns={1} sm:columns={2}>
                  <InputField
                    label="Company name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your company name"
                  />
                  <InputField
                    label="Email address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </FormGrid>

                <FormGrid columns={1} sm:columns={2}>
                  <InputField
                    label="Phone number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                  />
                  <SelectField
                    label="Finish type"
                    name="finishType"
                    value={formData.finishType}
                    onChange={handleChange}
                    options={finishOptions}
                    placeholder="Select a finish type"
                  />
                </FormGrid>

                <FormGrid columns={1} sm:columns={2}>
                  <SelectField
                    label="Material type"
                    name="materialType"
                    value={formData.materialType}
                    onChange={handleChange}
                    options={materialOptions}
                    placeholder="Select material type"
                  />
                  <InputField
                    label="Quantity"
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Number of pieces"
                  />
                </FormGrid>

                <FormGrid columns={1} sm:columns={2}>
                  <InputField
                    label="Dimensions (L×W×H)"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleChange}
                    placeholder="e.g., 10×5×2 cm"
                  />
                  <SelectField
                    label="Urgency level"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    options={urgencyOptions}
                    placeholder="Select urgency"
                  />
                </FormGrid>

                <FormGrid columns={1}>
                  <SelectField
                    label="Budget range"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    options={budgetOptions}
                    placeholder="Select budget range"
                  />
                </FormGrid>

                <TextareaField
                  label="Additional requirements"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Specific requirements, special instructions, or any other details..."
                />
              </FormGroup>

              <FormActions>
                <ButtonGroup>
                  <PrimaryButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Submit Inquiry'} <span className="text-lg">→</span>
                  </PrimaryButton>
                </ButtonGroup>
              </FormActions>
            </form>
          </FormContainer>
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-6 sm:py-12 lg:py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 sm:mb-6 lg:mb-10 text-center">
            <p className="text-[8px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-[0.15em] text-blue-600 mb-1.5 sm:mb-3">Contact Information</p>
            <h2 className="text-base sm:text-xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-1.5 sm:mb-3">Get in Touch</h2>
            <p className="text-[9px] sm:text-xs lg:text-base text-slate-600 max-w-lg lg:max-w-3xl mx-auto">Reach out to us directly for quick responses to your coating requirements.</p>
          </div>

          <div className="grid gap-2 sm:gap-4 lg:gap-6 grid-cols-1 md:grid-cols-3">
            <div className="group bg-white rounded-lg sm:rounded-xl lg:rounded-3xl border border-slate-200 p-3 sm:p-6 lg:p-8 shadow-sm sm:shadow-md lg:shadow-xl hover:shadow-md sm:hover:shadow-xl hover:border-blue-400 transition-all duration-500 hover:-translate-y-0.5 sm:hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 rounded-md sm:rounded-xl lg:rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mb-2 sm:mb-4 lg:mb-6 shadow-sm sm:shadow-md lg:shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-sm sm:text-base lg:text-3xl">📱</span>
                </div>
                <h3 className="text-xs sm:text-base lg:text-xl font-extrabold text-slate-900 mb-1.5 sm:mb-3 group-hover:text-blue-600 transition-colors">Call Us</h3>
                <p className="text-slate-600 text-[9px] sm:text-xs lg:text-base leading-relaxed">+91 96232 55747<br/>+91 79720 39556</p>
                <div className="mt-2 sm:mt-3 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[8px] sm:text-[10px] lg:text-xs text-green-600 font-semibold">Available</span>
                </div>
              </div>
            </div>
            <div className="group bg-white rounded-lg sm:rounded-xl lg:rounded-3xl border border-slate-200 p-3 sm:p-6 lg:p-8 shadow-sm sm:shadow-md lg:shadow-xl hover:shadow-md sm:hover:shadow-xl hover:border-amber-400 transition-all duration-500 hover:-translate-y-0.5 sm:hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 rounded-md sm:rounded-xl lg:rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-2 sm:mb-4 lg:mb-6 shadow-sm sm:shadow-md lg:shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-sm sm:text-base lg:text-3xl">✉️</span>
                </div>
                <h3 className="text-xs sm:text-base lg:text-xl font-extrabold text-slate-900 mb-1.5 sm:mb-3 group-hover:text-amber-600 transition-colors">Email Us</h3>
                <p className="text-slate-600 text-[9px] sm:text-xs lg:text-base leading-relaxed">saiitrader24@gmail.com</p>
                <div className="mt-2 sm:mt-3 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[8px] sm:text-[10px] lg:text-xs text-amber-600 font-semibold">24/7 Support</span>
                </div>
              </div>
            </div>
            <div className="group bg-white rounded-lg sm:rounded-xl lg:rounded-3xl border border-slate-200 p-3 sm:p-6 lg:p-8 shadow-sm sm:shadow-md lg:shadow-xl hover:shadow-md sm:hover:shadow-xl hover:border-blue-400 transition-all duration-500 hover:-translate-y-0.5 sm:hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 rounded-md sm:rounded-xl lg:rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mb-2 sm:mb-4 lg:mb-6 shadow-sm sm:shadow-md lg:shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-sm sm:text-base lg:text-3xl">📍</span>
                </div>
                <h3 className="text-xs sm:text-base lg:text-xl font-extrabold text-slate-900 mb-1.5 sm:mb-3 group-hover:text-blue-600 transition-colors">Visit Us</h3>
                <p className="text-slate-600 text-[9px] sm:text-xs lg:text-base leading-relaxed">Babla Compound, Gaibi Nagar, opposite Sana Hotel, Kalyan Road, Bhiwandi - 421308</p>
                <div className="mt-2 sm:mt-3 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[8px] sm:text-[10px] lg:text-xs text-blue-600 font-semibold">Open Now</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-12 text-center">
            <a href="https://wa.me/918390946157" className="inline-flex items-center gap-1.5 sm:gap-3 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-r from-green-500 to-green-600 px-4 sm:px-6 lg:px-12 py-2 sm:py-3.5 lg:py-5 text-[9px] sm:text-xs lg:text-base font-extrabold text-white shadow-sm sm:shadow-md lg:shadow-xl transition-all duration-300 hover:shadow-xl sm:hover:shadow-2xl hover:scale-105 hover:-translate-y-0.5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 text-lg sm:text-2xl lg:text-3xl">💬</span>
              <span className="relative z-10">Chat on WhatsApp</span>
            </a>
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-16 text-center">
            <div className="inline-flex items-center gap-1.5 sm:gap-3 px-3 sm:px-6 lg:px-8 py-1.5 sm:py-3 lg:py-4 bg-blue-50 rounded-full border-2 border-blue-200 shadow-sm sm:shadow-md lg:shadow-lg hover:bg-blue-100 transition-colors duration-300">
              <span className="text-blue-600 text-xs sm:text-base lg:text-lg font-semibold">⏰</span>
              <span className="text-blue-900 text-[9px] sm:text-xs lg:text-base font-semibold">Business Hours: Mon-Sat, 9AM-6PM</span>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 lg:mt-8 text-center">
            <div className="inline-flex items-center gap-2 sm:gap-4 px-3 sm:px-6 lg:px-8 py-1.5 sm:py-3 lg:py-4 bg-amber-50 rounded-full border-2 border-amber-200 shadow-sm sm:shadow-md lg:shadow-lg hover:bg-amber-100 transition-colors duration-300">
              <span className="text-amber-600 text-xs sm:text-base lg:text-lg font-semibold">🚀</span>
              <span className="text-amber-900 text-[9px] sm:text-xs lg:text-base font-semibold">Quick Response Guaranteed</span>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Contact;
