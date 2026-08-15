import { useEffect, useState } from 'react';
import { getSettings, updateSettings } from '../../../services/settingsService';

const initialForm = {
  companyName: 'SAI TRADER',
  tagline: 'B2B Decorative Coating Solutions',
  description: 'Premium vacuum metallising and decorative coating services for PP and ABS plastic components.',
  whatsapp: '',
  phone: '',
  email: '',
  address: '',
  logo: '',
};

function Settings() {
  const [form, setForm] = useState(initialForm);
  const [logoFile, setLogoFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadSettings = async () => {
    try {
      const response = await getSettings();
      if (response.data.data) {
        setForm(response.data.data);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    
    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key !== 'logo') {
          payload.append(key, value);
        }
      });
      
      if (logoFile) {
        payload.append('logo', logoFile);
      }

      const response = await updateSettings(payload);
      setMessage(response.data.message);
      await loadSettings();
      setLogoFile(null);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to save settings.');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="p-8 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
          <p className="mt-3 text-slate-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="text-2xl">⚙️</span>
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.15em] text-orange-600">Company settings</p>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">Settings</h1>
        <p className="mt-2 text-slate-600">Manage company details, contact information, and branding.</p>
      </div>

      {message && (
        <div className={`rounded-xl px-4 py-3 text-sm font-semibold ${
          message.includes('success') || message.includes('saved') || message.includes('updated')
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-blue-50 text-blue-800 border border-blue-200'
        }`}>
          {message}
        </div>
      )}

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg shadow-slate-200/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-lg">
            🏢
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Company Information</h2>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Field label="Company Name" name="companyName" value={form.companyName} onChange={handleChange} required placeholder="Enter company name" />
          <Field label="Tagline" name="tagline" value={form.tagline} onChange={handleChange} placeholder="Company tagline" />
          
          <div>
            <label className="block">
              <span className="block text-sm font-bold text-slate-700 mb-2">Description</span>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="3"
                placeholder="Brief company description"
                className="w-full resize-y rounded-xl border-2 border-slate-300 px-4 py-3 font-normal outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-300 placeholder:text-slate-400"
              />
            </label>
          </div>

          <div className="border-t-2 border-slate-200 pt-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl">📞</span>
              <h3 className="text-lg font-extrabold text-slate-900">Contact Information</h3>
            </div>
          </div>

          <Field label="WhatsApp Number" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
          <Field label="Phone Number" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
          <Field label="Email Address" name="email" value={form.email} onChange={handleChange} type="email" placeholder="contact@company.com" />
          
          <div>
            <label className="block">
              <span className="block text-sm font-bold text-slate-700 mb-2">Address</span>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows="2"
                placeholder="Company address"
                className="w-full resize-y rounded-xl border-2 border-slate-300 px-4 py-3 font-normal outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-300 placeholder:text-slate-400"
              />
            </label>
          </div>

          <div className="border-t-2 border-slate-200 pt-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl">🎨</span>
              <h3 className="text-lg font-extrabold text-slate-900">Branding</h3>
            </div>
          </div>

          <div>
            <label className="block">
              <span className="block text-sm font-bold text-slate-700 mb-2">Company Logo</span>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogoFile(e.target.files[0])}
                  className="w-full rounded-xl border-2 border-dashed border-slate-300 px-4 py-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50/50 transition-all duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-slate-400 text-sm">Click or drag to upload logo</span>
                </div>
              </div>
              {form.logo && !logoFile && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-slate-500">Current logo:</p>
                  <img src={form.logo} alt="Company logo" className="mt-2 h-16 w-auto object-contain rounded-xl border-2 border-slate-200" />
                </div>
              )}
              {logoFile && (
                <p className="mt-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-2 rounded-lg">New logo selected: {logoFile.name}</p>
              )}
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              className="flex-1 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-green-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105"
            >
              💾 Save Settings
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function Field({ label, name, value, onChange, type = 'text', required = false, placeholder = '' }) {
  return (
    <label className="block">
      <span className="block text-sm font-bold text-slate-700 mb-2">{label}</span>
      <input
        required={required}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 font-normal outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-300 placeholder:text-slate-400"
      />
    </label>
  );
}

export default Settings;
