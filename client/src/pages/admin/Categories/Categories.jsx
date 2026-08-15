import { useEffect, useState } from 'react';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../../../services/categoryService';

const initialForm = { name: '', description: '', displayOrder: 0, isActive: true, image: '' };

function Categories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const loadCategories = async () => { 
    try { 
      const response = await getCategories(); 
      setCategories(response.data.data); 
    } catch (error) { 
      setMessage(error.response?.data?.message || 'Unable to load categories.'); 
    } finally { 
      setIsLoading(false); 
    } 
  };
  
  useEffect(() => { loadCategories(); }, []);
  
  const handleChange = (event) => { 
    const { name, value, type, checked } = event.target; 
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value })); 
  };
  
  const handleImageChange = (event) => { 
    const file = event.target.files[0]; 
    if (file) { 
      setImageFile(file); 
      setImagePreview(URL.createObjectURL(file)); 
      setForm((current) => ({ ...current, image: file.name })); 
    } 
  };
  
  const resetForm = () => { 
    setForm(initialForm); 
    setEditingId(null); 
    setImageFile(null); 
    setImagePreview(''); 
    setMessage('');
  };
  
  const handleSubmit = async (event) => { 
    event.preventDefault(); 
    setMessage(''); 
    try { 
      const formData = new FormData(); 
      formData.append('name', form.name); 
      formData.append('description', form.description); 
      formData.append('displayOrder', Number(form.displayOrder)); 
      formData.append('isActive', form.isActive); 
      if (imageFile) { 
        formData.append('image', imageFile); 
      } 
      const response = editingId ? await updateCategory(editingId, formData) : await createCategory(formData); 
      setMessage(response.data.message); 
      resetForm(); 
      await loadCategories(); 
    } catch (error) { 
      setMessage(error.response?.data?.message || 'Unable to save category.'); 
    } 
  };
  
  const handleEdit = (category) => { 
    setEditingId(category._id); 
    setForm({ 
      name: category.name, 
      description: category.description || '', 
      displayOrder: category.displayOrder, 
      isActive: category.isActive, 
      image: category.image || '' 
    }); 
    setImagePreview(category.image || ''); 
    setImageFile(null); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };
  
  const handleDelete = async (id) => { 
    if (!window.confirm('Delete this category?')) return; 
    try { 
      const response = await deleteCategory(id); 
      setMessage(response.data.message); 
      await loadCategories(); 
    } catch (error) { 
      setMessage(error.response?.data?.message || 'Unable to delete category.'); 
    } 
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="text-2xl">📁</span>
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.15em] text-orange-600">Content management</p>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">Categories</h1>
        <p className="mt-2 text-slate-600">Create the application groups shown across the public website.</p>
      </div>

      <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Form Section */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg shadow-slate-200/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-lg">
              {editingId ? '✏️' : '➕'}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">{editingId ? 'Edit category' : 'Add category'}</h2>
          </div>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <Field label="Category name" name="name" value={form.name} onChange={handleChange} required placeholder="Enter category name" />
            <Field label="Description" name="description" value={form.description} onChange={handleChange} placeholder="Brief description of the category" />
            <Field label="Display order" name="displayOrder" type="number" value={form.displayOrder} onChange={handleChange} placeholder="0" />
            
            <label className="block">
              <span className="block text-sm font-bold text-slate-700 mb-2">Category Image</span>
              <div className="relative">
                <input 
                  type="file" 
                  name="image" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="w-full rounded-xl border-2 border-dashed border-slate-300 px-4 py-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-slate-400 text-sm">Click or drag to upload image</span>
                </div>
              </div>
              {imagePreview && (
                <div className="mt-3">
                  <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded-xl border-2 border-slate-200" />
                </div>
              )}
            </label>
            
            <label className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
              <input 
                name="isActive" 
                type="checkbox" 
                checked={form.isActive} 
                onChange={handleChange} 
                className="h-5 w-5 accent-blue-600 rounded" 
              />
              <div>
                <span className="text-sm font-bold text-slate-700">Active on website</span>
                <p className="text-xs text-slate-500">Show this category on the public website</p>
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
                className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
              >
                {editingId ? '✏️ Update Category' : '➕ Add Category'}
              </button>
              {editingId && (
                <button 
                  type="button" 
                  onClick={resetForm} 
                  className="rounded-xl border-2 border-slate-300 px-6 py-3 text-sm font-extrabold text-slate-700 hover:bg-slate-50 transition-all duration-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* List Section */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 overflow-hidden">
          <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📋</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Categories</h2>
              <span className="ml-auto text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {categories.length} total
              </span>
            </div>
          </div>
          
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-3 text-slate-600">Loading categories...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="p-8 text-center">
              <span className="text-4xl">📭</span>
              <p className="mt-3 text-slate-600">No categories yet. Create your first category!</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {categories.map((category) => (
                <div key={category._id} className="group flex items-center justify-between p-4 sm:p-5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-white transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-2xl">
                      {category.image ? (
                        <img src={category.image} alt={category.name} className="h-full w-full object-cover rounded-xl" />
                      ) : (
                        '📁'
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-extrabold text-slate-900">{category.name}</p>
                        {!category.isActive && (
                          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Hidden</span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{category.description || 'No description'}</p>
                      <p className="text-xs text-slate-400 mt-1">Order: {category.displayOrder}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={() => handleEdit(category)} 
                      className="rounded-xl border-2 border-blue-200 px-4 py-2 text-sm font-extrabold text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(category._id)} 
                      className="rounded-xl border-2 border-red-200 px-4 py-2 text-sm font-extrabold text-red-700 hover:bg-red-50 hover:border-red-300 transition-all duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
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
        className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 placeholder:text-slate-400" 
      />
    </label>
  );
}

export default Categories;
