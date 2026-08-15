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
  };

  const submit = async (event) => {
    event.preventDefault();
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

  // Filter products
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

  // Stats
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
    <div className="max-w-7xl">
      <div className="mb-6">
        <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-orange-500">Content management</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Products</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
          <p className="text-xs sm:text-sm text-slate-600 font-semibold">Total Products</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
          <p className="text-xs sm:text-sm text-slate-600 font-semibold">Active</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-green-600 mt-1">{stats.active}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
          <p className="text-xs sm:text-sm text-slate-600 font-semibold">Featured</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1">{stats.featured}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
          <p className="text-xs sm:text-sm text-slate-600 font-semibold">Categories</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 mt-1">{categories.length}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Form Section */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-extrabold">{editingId ? 'Edit product' : 'Add product'}</h2>
          <form className="mt-6 space-y-4" onSubmit={submit}>
            <Input label="Product name" name="name" value={form.name} onChange={change} required />
            <label className="block text-sm font-bold text-slate-700">
              Category
              <select required name="category" value={form.category} onChange={change} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal">
                <option value="">Select category</option>
                {categories.filter((category) => category.isActive).map((category) => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            </label>
            <Input label="Description" name="description" value={form.description} onChange={change} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Select label="Material" name="material" value={form.material} onChange={change} options={['PP', 'ABS', 'Other']} />
              <Select label="Finish type" name="finishType" value={form.finishType} onChange={change} options={['Chrome', 'Rainbow', 'Custom']} />
            </div>
            <label className="block text-sm font-bold text-slate-700">
              Product photos <span className="font-normal text-slate-500">(up to 6 images)</span>
              <input type="file" accept="image/*" multiple onChange={(event) => setSelectedFiles([...event.target.files].slice(0, 6))} className="mt-2 block w-full rounded-lg border border-slate-300 p-2 text-sm font-normal" />
            </label>
            {selectedFiles.length > 0 && (
              <p className="text-xs font-semibold text-slate-500">Selected: {selectedFiles.map((file) => file.name).join(', ')}</p>
            )}
            <Checks form={form} change={change} />
            {message && <p className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">{message}</p>}
            <div className="flex gap-3">
              <button type="submit" className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-blue-700">
                {editingId ? 'Update product' : 'Add product'}
              </button>
              {editingId && (
                <button type="button" onClick={reset} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Products List */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-extrabold">All products ({filteredProducts.length})</h2>
            <div className="flex gap-2 flex-wrap">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-300 text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-300 text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredProducts.map((product) => (
              <div key={product._id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900">{product.name}</h3>
                    {product.isFeatured && (
                      <span className="px-2 py-0.5 text-xs font-extrabold bg-amber-100 text-amber-700 rounded-full">Featured</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">{categories.find(c => c._id === product.category)?.name || 'Uncategorized'}</p>
                  <p className="text-xs text-slate-500">{product.material} • {product.finishType}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleActive(product)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      product.isActive
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {product.isActive ? 'Active' : 'Inactive'}
                  </button>
                  <button
                    onClick={() => toggleFeatured(product)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      product.isFeatured
                        ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {product.isFeatured ? 'Featured' : 'Not Featured'}
                  </button>
                  <button
                    onClick={() => edit(product)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(product._id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-100 text-red-700 hover:bg-red-200 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="text-center py-8 text-slate-600">
                No products found
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
function Input({ label, name, value, onChange, required = false }) { return <label className="block text-sm font-bold text-slate-700">{label}<input required={required} name={name} value={value} onChange={onChange} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal" /></label>; }
function Select({ label, name, value, onChange, options }) { return <label className="block text-sm font-bold text-slate-700">{label}<select name={name} value={value} onChange={onChange} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal">{options.map((option) => <option key={option}>{option}</option>)}</select></label>; }
function Checks({ form, change }) { return <div className="flex flex-wrap gap-5 text-sm font-bold text-slate-700"><label className="flex items-center gap-2"><input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={change} className="accent-blue-700" />Featured on Home</label><label className="flex items-center gap-2"><input type="checkbox" name="isActive" checked={form.isActive} onChange={change} className="accent-blue-700" />Active on website</label></div>; }
export default ProductsAdmin;
