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
      <div className="max-w-4xl">
        <p className="text-slate-600">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-orange-500">Company settings</p>
      <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Settings</h1>
      <p className="mt-2 text-slate-600">Manage company details, contact information, and branding.</p>

      {message && (
        <div className="mt-4 rounded-lg bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-800">
          {message}
        </div>
      )}

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-extrabold text-slate-900">Company Information</h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <Field label="Company Name" name="companyName" value={form.companyName} onChange={handleChange} required />
          <Field label="Tagline" name="tagline" value={form.tagline} onChange={handleChange} />
          <div className="block">
            <label className="block text-sm font-bold text-slate-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-lg font-extrabold text-slate-900">Contact Information</h3>
          </div>

          <Field label="WhatsApp Number" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
          <Field label="Phone Number" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
          <Field label="Email Address" name="email" value={form.email} onChange={handleChange} type="email" />
          <div className="block">
            <label className="block text-sm font-bold text-slate-700">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows="2"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-lg font-extrabold text-slate-900">Branding</h3>
          </div>

          <div className="block">
            <label className="block text-sm font-bold text-slate-700">Company Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLogoFile(e.target.files[0])}
              className="mt-2 block w-full rounded-lg border border-slate-300 p-2 text-sm font-normal"
            />
            {form.logo && !logoFile && (
              <div className="mt-3">
                <p className="text-xs font-semibold text-slate-500">Current logo:</p>
                <img src={form.logo} alt="Company logo" className="mt-2 h-16 w-auto object-contain" />
              </div>
            )}
            {logoFile && (
              <p className="mt-2 text-xs font-semibold text-slate-500">New logo selected: {logoFile.name}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button className="rounded-lg bg-blue-700 px-6 py-3 text-sm font-extrabold text-white hover:bg-blue-800">
              Save Settings
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function Field({ label, name, value, onChange, type = 'text', required = false, placeholder = '' }) {
  return (
    <label className="block text-sm font-bold text-slate-700">
      {label}
      <input
        required={required}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}

export default Settings;
