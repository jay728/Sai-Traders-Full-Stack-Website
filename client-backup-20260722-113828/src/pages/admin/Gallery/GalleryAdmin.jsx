import { useEffect, useState } from 'react';
import { apiOrigin } from '../../../config/api';
import { createGalleryItem, deleteGalleryItem, getGalleryItems, updateGalleryItem } from '../../../services/galleryService';

const initialForm = { title: '', description: '', type: 'Product', isActive: true };

function GalleryAdmin() {
  const [items, setItems] = useState([]); const [form, setForm] = useState(initialForm); const [files, setFiles] = useState([]); const [editingId, setEditingId] = useState(null); const [message, setMessage] = useState(''); const [isLoading, setIsLoading] = useState(true);
  const loadItems = async () => { try { const response = await getGalleryItems(); setItems(response.data.data); } catch (error) { setMessage(error.response?.data?.message || 'Unable to load gallery items.'); } finally { setIsLoading(false); } };
  useEffect(() => { loadItems(); }, []);
  const change = ({ target: { name, value, type, checked } }) => setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  const reset = () => { setForm(initialForm); setFiles([]); setEditingId(null); };
  const submit = async (event) => { event.preventDefault(); setMessage(''); if (!editingId && files.length === 0) { setMessage('Please select at least one image or video.'); return; } try { const payload = new FormData(); Object.entries(form).forEach(([key, value]) => payload.append(key, value)); files.forEach((file) => payload.append('images', file)); const response = editingId ? await updateGalleryItem(editingId, payload) : await createGalleryItem(payload); setMessage(response.data.message); reset(); await loadItems(); } catch (error) { setMessage(error.response?.data?.message || error.message || 'Unable to save gallery item.'); } };
  const edit = (item) => { setEditingId(item._id); setFiles([]); setForm({ title: item.title, description: item.description || '', type: item.type, isActive: item.isActive }); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const remove = async (id) => { if (!window.confirm('Delete this gallery item?')) return; try { const response = await deleteGalleryItem(id); setMessage(response.data.message); await loadItems(); } catch (error) { setMessage(error.response?.data?.message || 'Unable to delete gallery item.'); } };
  return (
    <div className="max-w-7xl">
      <p className="text-xs font-extrabold uppercase tracking-[.16em] text-orange-600">Content management</p>
      <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Gallery</h1>
      <p className="mt-2 text-slate-600">Upload real product, factory, and finish photographs for the public website.</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50">
          <h2 className="text-xl font-extrabold text-slate-900">{editingId ? 'Edit gallery item' : 'Add gallery item'}</h2>
          <form className="mt-6 space-y-4" onSubmit={submit}>
            <Field label="Title" name="title" value={form.title} onChange={change} required />
            <label className="block text-sm font-bold text-slate-700">Type
              <select name="type" value={form.type} onChange={change} className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal">
                <option>Product</option>
                <option>Finish</option>
                <option>Factory</option>
                <option>Equipment</option>
                <option>Hero Video</option>
              </select>
            </label>
            <label className="block text-sm font-bold text-slate-700">Description
              <textarea name="description" value={form.description} onChange={change} rows="4" className="mt-2 w-full resize-y rounded-xl border border-slate-300 px-3 py-2.5 font-normal" />
            </label>
            <label className="block text-sm font-bold text-slate-700">Photos & Videos <span className="font-normal text-slate-500">(up to 6)</span>
              <input type="file" accept="image/*,video/*,.mov,.mp4,.webm" multiple onChange={(event) => setFiles([...event.target.files].slice(0, 6))} className="mt-2 block w-full rounded-xl border border-slate-300 p-2 text-sm font-normal" />
            </label>
            {files.length > 0 && <p className="text-xs font-semibold text-slate-500">Selected: {files.map((file) => file.name).join(', ')}</p>}
            <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
              <input name="isActive" type="checkbox" checked={form.isActive} onChange={change} className="h-4 w-4 accent-blue-700" />Visible on website
            </label>
            {message && <p className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800">{message}</p>}
            <div className="flex gap-3">
              <button className="rounded-xl bg-blue-700 px-4 py-3 text-sm font-extrabold text-white hover:bg-blue-800">{editingId ? 'Update item' : 'Upload item'}</button>
              {editingId && <button type="button" onClick={reset} className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-extrabold text-slate-700">Cancel</button>}
            </div>
          </form>
        </section>
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
          <div className="border-b border-slate-200 px-6 py-5"><h2 className="font-extrabold text-slate-900">Saved gallery items</h2></div>
          {isLoading ? (
            <p className="p-6 text-slate-500">Loading gallery...</p>
          ) : items.length === 0 ? (
            <p className="p-6 text-slate-500">No gallery images yet. Upload your first real work photo.</p>
          ) : (() => {
            const groupedItems = items.reduce((acc, item) => {
              if (!acc[item.type]) acc[item.type] = [];
              acc[item.type].push(item);
              return acc;
            }, {});
            return Object.entries(groupedItems).map(([type, typeItems]) => (
              <div key={type} className="mb-6">
                <div className="border-b border-slate-200 px-6 py-3 bg-slate-50">
                  <h3 className="font-extrabold text-slate-900">{type}</h3>
                  <p className="text-xs text-slate-500">{typeItems.length} item(s)</p>
                </div>
                <div className="grid gap-4 p-5 sm:grid-cols-2">
                  {typeItems.map((item) => (
                    <article key={item._id} className="rounded-xl border border-slate-200">
                      {item.images[0]?.toLowerCase().endsWith('.mov') || item.images[0]?.toLowerCase().endsWith('.mp4') || item.images[0]?.toLowerCase().endsWith('.webm') ? (
                        <div style={{ aspectRatio: '16/9', width: '100%' }}>
                          <video src={item.images[0].startsWith('http') ? item.images[0] : `${apiOrigin}${item.images[0]}`} controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                      ) : (
                        <img src={item.images[0]} alt={item.title} className="h-36 w-full object-cover" />
                      )}
                      <div className="p-4">
                        <p className="text-xs font-extrabold uppercase tracking-[.12em] text-orange-600">{item.type}</p>
                        <h3 className="mt-1 font-extrabold text-slate-900">{item.title}</h3>
                        <p className="mt-1 text-xs text-slate-500">{item.images.length} file(s) | {item.isActive ? 'Visible' : 'Hidden'}</p>
                        <div className="mt-4 flex gap-2">
                          <button onClick={() => edit(item)} className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-extrabold text-blue-700">Edit</button>
                          <button onClick={() => remove(item._id)} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-extrabold text-red-600">Delete</button>
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
function Field({ label, name, value, onChange, required = false }) { return <label className="block text-sm font-bold text-slate-700">{label}<input required={required} name={name} value={value} onChange={onChange} className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal" /></label>; }
export default GalleryAdmin;
