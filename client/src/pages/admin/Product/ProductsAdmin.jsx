import { useEffect, useState } from 'react';
import { getCategories } from '../../../services/categoryService';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../../../services/productService';

const initialForm = { name: '', category: '', description: '', material: 'Other', finishType: 'Custom', isFeatured: false, isActive: true };

function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const loadData = async () => {
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([getProducts(), getCategories()]);
      setProducts(productsResponse.data.data || []);
      setCategories(categoriesResponse.data.data || []);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to load product data.');
    }
  };

  useEffect(() => { loadData(); }, []);

  const change = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((old) => ({ ...old, [name]: type === 'checkbox' ? checked : value }));
  };

  const reset = () => {
    setForm(initialForm);
    setSelectedFiles([]);
    setEditingId(null);
    setMessage('');
  };

  const submit = async (event) => {
    event.preventDefault();
    setMessage('');
    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => payload.append(key, value));
      selectedFiles.forEach((file) => payload.append('images', file));
      const response = editingId ? await updateProduct(editingId, payload) : await createProduct(payload);
      setMessage(response.data.message);
      reset();
      await loadData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to save product.');
    }
  };

  const edit = (product) => {
    setEditingId(product._id);
    setSelectedFiles([]);
    setForm({
      name: product.name,
      category: product.category?._id || product.category,
      description: product.description || '',
      material: product.material,
      finishType: product.finishType,
      isFeatured: product.isFeatured,
      isActive: product.isActive
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const response = await deleteProduct(id);
      setMessage(response.data.message);
      await loadData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to delete product.');
    }
  };

  const toggleActive = async (product) => {
    try {
      await updateProduct(product._id, { ...product, isActive: !product.isActive });
      await loadData();
    } catch (error) {
      setMessage('Unable to update product status.');
    }
  };

  const toggleFeatured = async (product) => {
    try {
      await updateProduct(product._id, { ...product, isFeatured: !product.isFeatured });
      await loadData();
    } catch (error) {
      setMessage('Unable to update featured status.');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' ||
                            product.category?._id === filterCategory ||
                            product.category === filterCategory;
    const matchesStatus = filterStatus === 'all' ||
                          (filterStatus === 'active' && product.isActive) ||
                          (filterStatus === 'inactive' && !product.isActive);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: products.length,
    active: products.filter(p => p.isActive).length,
    featured: products.filter(p => p.isFeatured).length,
    byCategory: categories.reduce((acc, cat) => {
      acc[cat.name] = products.filter(p => p.category?._id === cat._id || p.category === cat._id).length;
      return acc;
    }, {})
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="text-2xl">📦</span>
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.15em] text-orange-600">Content management</p>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">Products</h1>
        <p className="mt-2 text-slate-600">Manage your product catalog and inventory.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📊</span>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold">Total Products</p>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.total}</p>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">✅</span>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold">Active</p>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-green-600">{stats.active}</p>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">⭐</span>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold">Featured</p>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-600">{stats.featured}</p>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📁</span>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold">Categories</p>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-purple-600">{categories.length}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Form Section */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg shadow-slate-200/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-lg">
              {editingId ? '✏️' : '➕'}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">{editingId ? 'Edit product' : 'Add product'}</h2>
          </div>
          
          <form className="space-y-5" onSubmit={submit}>
            <Input label="Product name" name="name" value={form.name} onChange={change} required placeholder="Enter product name" />
            
            <label className="block">
              <span className="block text-sm font-bold text-slate-700 mb-2">Category</span>
              <select 
                required 
                name="category" 
                value={form.category} 
                onChange={change} 
                className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-300"
              >
                <option value="">Select category</option>
                {categories.filter((category) => category.isActive).map((category) => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            </label>
            
            <Input label="Description" name="description" value={form.description} onChange={change} placeholder="Product description" />
            
            <div className="grid gap-4 sm:grid-cols-2">
              <Select label="Material" name="material" value={form.material} onChange={change} options={['PP', 'ABS', 'Other']} />
              <Select label="Finish type" name="finishType" value={form.finishType} onChange={change} options={['Chrome', 'Rainbow', 'Custom']} />
            </div>
            
            <label className="block">
              <span className="block text-sm font-bold text-slate-700 mb-2">Product photos <span className="font-normal text-slate-500">(up to 6 images)</span></span>
              <div className="relative">
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  onChange={(event) => setSelectedFiles([...event.target.files].slice(0, 6))} 
                  className="w-full rounded-xl border-2 border-dashed border-slate-300 px-4 py-8 text-center cursor-pointer hover:border-orange-500 hover:bg-orange-50/50 transition-all duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-slate-400 text-sm">Click or drag to upload images</span>
                </div>
              </div>
              {selectedFiles.length > 0 && (
                <p className="mt-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-2 rounded-lg">Selected: {selectedFiles.map((file) => file.name).join(', ')}</p>
              )}
            </label>
            
            <Checks form={form} change={change} />
            
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
                className="flex-1 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105"
              >
                {editingId ? '✏️ Update product' : '➕ Add product'}
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

        {/* Products List */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 overflow-hidden">
          <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-6 py-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📋</span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">All products</h2>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {filteredProducts.length}
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <input
                  type="text"
                  placeholder="🔍 Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 rounded-xl border-2 border-slate-300 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-300"
                />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 rounded-xl border-2 border-slate-300 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-300"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 rounded-xl border-2 border-slate-300 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-300"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredProducts.map((product) => (
              <div key={product._id} className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5 hover:bg-gradient-to-r hover:from-orange-50 hover:to-white transition-all duration-300">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-slate-900">{product.name}</h3>
                    {product.isFeatured && (
                      <span className="px-2 py-0.5 text-xs font-extrabold bg-amber-100 text-amber-700 rounded-full flex items-center gap-1">
                        <span>⭐</span> Featured
                      </span>
                    )}
                    {!product.isActive && (
                      <span className="px-2 py-0.5 text-xs font-extrabold bg-slate-100 text-slate-600 rounded-full">Hidden</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{categories.find(c => c._id === product.category)?.name || 'Uncategorized'}</p>
                  <p className="text-xs text-slate-500 mt-1">{product.material} • {product.finishType}</p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => toggleActive(product)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-300 hover:scale-105 ${
                      product.isActive
                        ? 'bg-green-100 text-green-700 hover:bg-green-200 border-2 border-green-200'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-2 border-slate-200'
                    }`}
                  >
                    {product.isActive ? '✅ Active' : '⏸️ Inactive'}
                  </button>
                  <button
                    onClick={() => toggleFeatured(product)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-300 hover:scale-105 ${
                      product.isFeatured
                        ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 border-2 border-amber-200'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-2 border-slate-200'
                    }`}
                  >
                    {product.isFeatured ? '⭐ Featured' : '☆ Not Featured'}
                  </button>
                  <button
                    onClick={() => edit(product)}
                    className="px-4 py-2 rounded-xl text-xs font-extrabold bg-blue-100 text-blue-700 hover:bg-blue-200 border-2 border-blue-200 transition-all duration-300 hover:scale-105"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => remove(product._id)}
                    className="px-4 py-2 rounded-xl text-xs font-extrabold bg-red-100 text-red-700 hover:bg-red-200 border-2 border-red-200 transition-all duration-300 hover:scale-105"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="p-8 text-center">
                <span className="text-4xl">📭</span>
                <p className="mt-3 text-slate-600">No products found</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
function Input({ label, name, value, onChange, required = false, placeholder = '' }) { 
  return (
    <label className="block">
      <span className="block text-sm font-bold text-slate-700 mb-2">{label}</span>
      <input 
        required={required} 
        name={name} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-300 placeholder:text-slate-400" 
      />
    </label>
  );
}

function Select({ label, name, value, onChange, options }) { 
  return (
    <label className="block">
      <span className="block text-sm font-bold text-slate-700 mb-2">{label}</span>
      <select 
        name={name} 
        value={value} 
        onChange={onChange} 
        className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-300"
      >
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function Checks({ form, change }) { 
  return (
    <div className="flex flex-wrap gap-4">
      <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
        <input 
          type="checkbox" 
          name="isFeatured" 
          checked={form.isFeatured} 
          onChange={change} 
          className="h-5 w-5 accent-orange-600 rounded" 
        />
        <div>
          <span className="text-sm font-bold text-slate-700">Featured on Home</span>
          <p className="text-xs text-slate-500">Show on homepage</p>
        </div>
      </label>
      <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
        <input 
          type="checkbox" 
          name="isActive" 
          checked={form.isActive} 
          onChange={change} 
          className="h-5 w-5 accent-orange-600 rounded" 
        />
        <div>
          <span className="text-sm font-bold text-slate-700">Active on website</span>
          <p className="text-xs text-slate-500">Visible to users</p>
        </div>
      </label>
    </div>
  );
}
export default ProductsAdmin;
