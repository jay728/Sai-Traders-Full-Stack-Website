import { useEffect, useState } from 'react';
import { apiOrigin } from '../../../config/api';
import { createGalleryItem, deleteGalleryItem, getGalleryItems, updateGalleryItem } from '../../../services/galleryService';

const initialForm = { title: '', description: '', type: 'Company Video', isActive: true };

function GalleryAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadItems = async () => {
    try {
      const response = await getGalleryItems();
      setItems(response.data.data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to load gallery items.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadItems(); }, []);

  const change = ({ target: { name, value, type, checked } }) => 
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));

  const reset = () => {
    setForm(initialForm);
    setFiles([]);
    setEditingId(null);
    setMessage('');
  };

  const submit = async (event) => {
    event.preventDefault();
    setMessage('');
    if (!editingId && files.length === 0) {
      setMessage('Please select at least one image or video.');
      return;
    }
    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => payload.append(key, value));
      files.forEach((file) => payload.append('images', file));
      const response = editingId ? await updateGalleryItem(editingId, payload) : await createGalleryItem(payload);
      setMessage(response.data.message);
      reset();
      await loadItems();
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || 'Unable to save gallery item.');
    }
  };

  const edit = (item) => {
    setEditingId(item._id);
    setFiles([]);
    setForm({ 
      title: item.title, 
      description: item.description || '', 
      type: item.type, 
      isActive: item.isActive 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this gallery item?')) return;
    try {
      const response = await deleteGalleryItem(id);
      setMessage(response.data.message || 'Gallery item deleted successfully');
      await loadItems();
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || 'Unable to delete gallery item.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="text-2xl">🖼️</span>
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.15em] text-orange-600">Content management</p>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">Gallery</h1>
        <p className="mt-2 text-slate-600">Upload real product, factory, and finish photographs for the public website.</p>
      </div>

      <div className="mt-8 grid gap-6 lg:gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Form Section */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg shadow-slate-200/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center text-white text-lg">
              {editingId ? '✏️' : '➕'}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">{editingId ? 'Edit gallery item' : 'Add gallery item'}</h2>
          </div>
          
          <form className="space-y-5" onSubmit={submit}>
            <Field label="Title" name="title" value={form.title} onChange={change} required placeholder="Enter title" />
            
            <label className="block">
              <span className="block text-sm font-bold text-slate-700 mb-2">Type</span>
              <select 
                name="type" 
                value={form.type} 
                onChange={change} 
                className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 font-normal outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all duration-300"
              >
                <option>Company Video</option>
                <option>Hero Video</option>
              </select>
            </label>
            
            <label className="block">
              <span className="block text-sm font-bold text-slate-700 mb-2">Description</span>
              <textarea 
                name="description" 
                value={form.description} 
                onChange={change} 
                rows="4" 
                placeholder="Brief description"
                className="w-full resize-y rounded-xl border-2 border-slate-300 px-4 py-3 font-normal outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all duration-300 placeholder:text-slate-400" 
              />
            </label>
            
            <label className="block">
              <span className="block text-sm font-bold text-slate-700 mb-2">Photos & Videos <span className="font-normal text-slate-500">(up to 6)</span></span>
              <div className="relative">
                <input 
                  type="file" 
                  accept="image/*,video/*,.mov,.mp4,.webm" 
                  multiple 
                  onChange={(event) => setFiles([...event.target.files].slice(0, 6))} 
                  className="w-full rounded-xl border-2 border-dashed border-slate-300 px-4 py-8 text-center cursor-pointer hover:border-violet-500 hover:bg-violet-50/50 transition-all duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-slate-400 text-sm">Click or drag to upload images/videos</span>
                </div>
              </div>
              {files.length > 0 && (
                <p className="mt-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-2 rounded-lg">Selected: {files.map((file) => file.name).join(', ')}</p>
              )}
            </label>
            
            <label className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
              <input 
                name="isActive" 
                type="checkbox" 
                checked={form.isActive} 
                onChange={change} 
                className="h-5 w-5 accent-violet-600 rounded" 
              />
              <div>
                <span className="text-sm font-bold text-slate-700">Visible on website</span>
                <p className="text-xs text-slate-500">Show this item on the public website</p>
              </div>
            </label>
            
            {message && (
              <div className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                message.includes('success') || message.includes('created') || message.includes('updated') 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message}
              </div>
            )}
            
            <div className="flex gap-3 pt-2">
              <button 
                type="submit"
                className="flex-1 rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105"
              >
                {editingId ? '✏️ Update item' : '➕ Upload item'}
              </button>
              {editingId && (
                <button 
                  type="button" 
                  onClick={reset} 
                  className="rounded-xl border-2 border-slate-300 px-6 py-3 text-sm font-extrabold text-slate-700 hover:bg-slate-50 transition-all duration-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>
        {/* Gallery List Section */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
          <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📋</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Saved gallery items</h2>
              <span className="ml-auto text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {items.length} total
              </span>
            </div>
          </div>
          
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-violet-600 border-r-transparent"></div>
              <p className="mt-3 text-slate-600">Loading gallery...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="p-8 text-center">
              <span className="text-4xl">🖼️</span>
              <p className="mt-3 text-slate-600">No gallery images yet. Upload your first real work photo.</p>
            </div>
          ) : (() => {
            const groupedItems = items.reduce((acc, item) => {
              if (!acc[item.type]) acc[item.type] = [];
              acc[item.type].push(item);
              return acc;
            }, {});
            return Object.entries(groupedItems).map(([type, typeItems]) => (
              <div key={type} className="mb-6">
                <div className="border-b border-slate-200 px-6 py-4 bg-gradient-to-r from-violet-50 to-white">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📁</span>
                    <h3 className="font-extrabold text-slate-900">{type}</h3>
                    <span className="text-xs font-semibold text-violet-600 bg-violet-100 px-3 py-1 rounded-full">
                      {typeItems.length} item(s)
                    </span>
                  </div>
                </div>
                <div className="grid gap-4 p-5 sm:grid-cols-2">
                  {typeItems.map((item) => (
                    <article key={item._id} className="group relative overflow-hidden rounded-2xl border border-slate-200 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 hover:-translate-y-1">
                      <div className="aspect-video overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                        {item.images[0]?.toLowerCase().endsWith('.mov') || item.images[0]?.toLowerCase().endsWith('.mp4') || item.images[0]?.toLowerCase().endsWith('.webm') ? (
                          <video 
                            src={item.images[0].startsWith('http') ? item.images[0] : `${apiOrigin}${item.images[0]}`} 
                            controls 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <img 
                            src={item.images[0].startsWith('http') ? item.images[0] : `${apiOrigin}${item.images[0]}`} 
                            alt={item.title} 
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" 
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-violet-600 bg-violet-50 px-2 py-1 rounded-full">{item.type}</span>
                          {!item.isActive && (
                            <span className="text-xs font-extrabold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Hidden</span>
                          )}
                        </div>
                        <h3 className="font-extrabold text-slate-900">{item.title}</h3>
                        <p className="mt-1 text-xs text-slate-500">{item.images.length} file(s) • {item.isActive ? 'Visible' : 'Hidden'}</p>
                        <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button 
                            onClick={() => edit(item)} 
                            className="flex-1 rounded-xl border-2 border-violet-200 px-4 py-2 text-xs font-extrabold text-violet-700 hover:bg-violet-50 hover:border-violet-300 transition-all duration-300 hover:scale-105"
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            onClick={() => remove(item._id)} 
                            className="flex-1 rounded-xl border-2 border-red-200 px-4 py-2 text-xs font-extrabold text-red-700 hover:bg-red-50 hover:border-red-300 transition-all duration-300 hover:scale-105"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ));
          })()}
        </section>
      </div>
    </div>
  );
}
function Field({ label, name, value, onChange, required = false, placeholder = '' }) { 
  return (
    <label className="block">
      <span className="block text-sm font-bold text-slate-700 mb-2">{label}</span>
      <input 
        required={required} 
        name={name} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 font-normal outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all duration-300 placeholder:text-slate-400" 
      />
    </label>
  );
}

export default GalleryAdmin;
