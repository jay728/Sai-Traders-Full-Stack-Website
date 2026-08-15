import { useEffect, useState } from 'react';
import { apiOrigin } from '../../../config/api';

const initialForm = { productName: '', displayOrder: 0, status: true };

function BestSellersAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadItems = async () => {
    try {
      const response = await fetch(`${apiOrigin}/api/best-sellers`);
      const data = await response.json();
      setItems(data.data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to load best sellers.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const change = ({ target: { name, value, type, checked } }) =>
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));

  const reset = () => {
    setForm(initialForm);
    setFile(null);
    setEditingId(null);
    setMessage('');
  };

  const submit = async (event) => {
    event.preventDefault();
    setMessage('');

    if (!form.productName?.trim()) {
      setMessage('Product name is required.');
      return;
    }

    if (!editingId && !file) {
      setMessage('Please select an image.');
      return;
    }

    try {
      const payload = new FormData();
      payload.append('productName', form.productName.trim());
      payload.append('displayOrder', form.displayOrder);
      payload.append('status', form.status);
      if (file) payload.append('image', file);

      const url = editingId 
        ? `${apiOrigin}/api/best-sellers/${editingId}`
        : `${apiOrigin}/api/best-sellers`;
      
      const method = editingId ? 'PUT' : 'POST';
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: payload,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Unable to save best seller.');
      }

      setMessage(data.message);
      reset();
      await loadItems();
    } catch (error) {
      setMessage(error.message || 'Unable to save best seller.');
    }
  };

  const edit = (item) => {
    setEditingId(item._id);
    setFile(null);
    setForm({
      productName: item.productName,
      displayOrder: item.displayOrder,
      status: item.status,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this best seller?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${apiOrigin}/api/best-sellers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Unable to delete best seller.');
      }

      setMessage(data.message || 'Best seller deleted successfully');
      await loadItems();
    } catch (error) {
      setMessage(error.message || 'Unable to delete best seller.');
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath?.startsWith('http')) return imagePath;
    if (imagePath?.startsWith('/uploads/')) return `${apiOrigin.replace('/api', '')}${imagePath}`;
    return `${apiOrigin}${imagePath}`;
  };

  return (
    <div className="max-w-7xl">
      <p className="text-xs font-extrabold uppercase tracking-[.16em] text-orange-600">Content management</p>
      <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Best Sellers</h1>
      <p className="mt-2 text-slate-600">Manage featured products displayed on the home page.</p>
      
      <div className="mt-8 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50">
          <h2 className="text-xl font-extrabold text-slate-900">{editingId ? 'Edit best seller' : 'Add best seller'}</h2>
          <form className="mt-6 space-y-4" onSubmit={submit}>
            <label className="block text-sm font-bold text-slate-700">
              Product Name
              <input
                type="text"
                name="productName"
                value={form.productName}
                onChange={change}
                required
                className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal"
              />
            </label>
            
            <label className="block text-sm font-bold text-slate-700">
              Display Order
              <input
                type="number"
                name="displayOrder"
                value={form.displayOrder}
                onChange={change}
                className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal"
              />
            </label>
            
            <label className="block text-sm font-bold text-slate-700">
              Product Image
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setFile(event.target.files[0])}
                className="mt-2 block w-full rounded-xl border border-slate-300 p-2 text-sm font-normal"
              />
            </label>
            
            {file && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-lg"
                />
              </div>
            )}
            
            {editingId && !file && (
              <div className="mt-2">
                <img
                  src={getImageUrl(items.find(item => item._id === editingId)?.image)}
                  alt="Current"
                  className="h-32 w-32 object-cover rounded-lg"
                />
              </div>
            )}
            
            <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
              <input
                name="status"
                type="checkbox"
                checked={form.status}
                onChange={change}
                className="h-4 w-4 accent-blue-700"
              />
              Active on website
            </label>
            
            {message && (
              <p className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800">
                {message}
              </p>
            )}
            
            <div className="flex gap-3">
              <button
                type="submit"
                className="rounded-xl bg-blue-700 px-4 py-3 text-sm font-extrabold text-white hover:bg-blue-800"
              >
                {editingId ? 'Update best seller' : 'Add best seller'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-extrabold text-slate-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>
        
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="font-extrabold text-slate-900">Saved best sellers</h2>
          </div>
          
          {isLoading ? (
            <p className="p-6 text-slate-500">Loading best sellers...</p>
          ) : items.length === 0 ? (
            <p className="p-6 text-slate-500">No best sellers yet. Add your first featured product.</p>
          ) : (
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              {items.map((item) => (
                <article key={item._id} className="rounded-xl border border-slate-200">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.productName}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-extrabold text-slate-900">{item.productName}</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Order: {item.displayOrder} | {item.status ? 'Active' : 'Inactive'}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Created: {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => edit(item)}
                        className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-extrabold text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => remove(item._id)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-xs font-extrabold text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default BestSellersAdmin;
