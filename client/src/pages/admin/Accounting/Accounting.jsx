import { useState, useEffect } from 'react';
import { getInquiries, updateInquiryStatus } from '../../../services/inquiryService';

function Accounting() {
  const [inquiries, setInquiries] = useState([]);
  const [offlineCustomers, setOfflineCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [offlineForm, setOfflineForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    items: '',
    estimatedValue: '',
    status: 'pending',
    notes: ''
  });
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    totalRevenue: 0,
    onlineCount: 0,
    offlineCount: 0
  });

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    try {
      const response = await getInquiries();
      setInquiries(response.data.data || []);
      
      // Load offline customers from localStorage
      const savedOffline = localStorage.getItem('offlineCustomers');
      const offlineData = savedOffline ? JSON.parse(savedOffline) : [];
      setOfflineCustomers(offlineData);
      
      calculateStats(response.data.data || [], offlineData);
    } catch (error) {
      console.error('Error loading inquiries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (onlineData, offlineData) => {
    const allCustomers = [
      ...onlineData.map(item => ({ ...item, type: 'online' })),
      ...offlineData.map(item => ({ ...item, type: 'offline' }))
    ];
    
    const total = allCustomers.length;
    const pending = allCustomers.filter(i => i.status === 'pending').length;
    const inProgress = allCustomers.filter(i => i.status === 'in-progress').length;
    const completed = allCustomers.filter(i => i.status === 'completed').length;
    const onlineCount = onlineData.length;
    const offlineCount = offlineData.length;
    
    // Calculate estimated revenue
    const totalRevenue = allCustomers.reduce((sum, item) => {
      if (item.status === 'completed' && item.estimatedValue) {
        return sum + (parseFloat(item.estimatedValue) || 0);
      }
      return sum;
    }, 0);

    setStats({ total, pending, inProgress, completed, totalRevenue, onlineCount, offlineCount });
  };

  const handleStatusUpdate = async (id, newStatus, customerType) => {
    if (customerType === 'offline') {
      // Update offline customer status
      const updatedOffline = offlineCustomers.map(customer => 
        customer._id === id ? { ...customer, status: newStatus } : customer
      );
      setOfflineCustomers(updatedOffline);
      localStorage.setItem('offlineCustomers', JSON.stringify(updatedOffline));
      calculateStats(inquiries, updatedOffline);
    } else {
      // Update online inquiry status
      try {
        await updateInquiryStatus(id, { status: newStatus });
        loadInquiries();
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  };

  const handleAddOfflineCustomer = (e) => {
    e.preventDefault();
    const newCustomer = {
      ...offlineForm,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      type: 'offline'
    };
    const updatedOffline = [...offlineCustomers, newCustomer];
    setOfflineCustomers(updatedOffline);
    localStorage.setItem('offlineCustomers', JSON.stringify(updatedOffline));
    calculateStats(inquiries, updatedOffline);
    setOfflineForm({
      name: '',
      email: '',
      phone: '',
      company: '',
      items: '',
      estimatedValue: '',
      status: 'pending',
      notes: ''
    });
    setShowAddForm(false);
  };

  const handleDeleteOfflineCustomer = (id) => {
    if (!window.confirm('Delete this offline customer record?')) return;
    const updatedOffline = offlineCustomers.filter(customer => customer._id !== id);
    setOfflineCustomers(updatedOffline);
    localStorage.setItem('offlineCustomers', JSON.stringify(updatedOffline));
    calculateStats(inquiries, updatedOffline);
  };

  const filteredInquiries = filter === 'all' 
    ? [...inquiries.map(item => ({ ...item, type: 'online' })), ...offlineCustomers.map(item => ({ ...item, type: 'offline' }))]
    : [...inquiries.filter(item => item.status === filter).map(item => ({ ...item, type: 'online' })), ...offlineCustomers.filter(item => item.status === filter).map(item => ({ ...item, type: 'offline' }))];

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="p-8 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-600 border-r-transparent"></div>
          <p className="mt-3 text-slate-600">Loading accounting data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="text-2xl">💰</span>
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.15em] text-orange-600">Financial management</p>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">Accounting & Inquiries</h1>
        <p className="mt-2 text-slate-600">Track customer inquiries, manage quotes, and monitor revenue</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-5 mb-8">
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📊</span>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold">Total Inquiries</p>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.total}</p>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🌐</span>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold">Online</p>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-blue-600">{stats.onlineCount}</p>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🏪</span>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold">Offline</p>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-purple-600">{stats.offlineCount}</p>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">✅</span>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold">Completed</p>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-green-600">{stats.completed}</p>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">💵</span>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold">Est. Revenue</p>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-600">₹{stats.totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'in-progress', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-xl text-sm font-extrabold transition-all duration-300 hover:scale-105 ${
                  filter === status
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-white border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-emerald-300'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="ml-auto rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-2 text-sm font-extrabold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105"
          >
            ➕ Add Offline Customer
          </button>
        </div>
      </div>

      {/* Add Offline Customer Form */}
      {showAddForm && (
        <div className="mb-6 rounded-2xl border border-purple-200 bg-white p-6 shadow-lg shadow-purple-200/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-lg">
              ➕
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">Add Offline Customer</h2>
          </div>
          <form onSubmit={handleAddOfflineCustomer} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Customer Name</label>
              <input
                type="text"
                required
                value={offlineForm.name}
                onChange={(e) => setOfflineForm({ ...offlineForm, name: e.target.value })}
                className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 font-normal outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all duration-300"
                placeholder="Enter customer name"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
              <input
                type="email"
                value={offlineForm.email}
                onChange={(e) => setOfflineForm({ ...offlineForm, email: e.target.value })}
                className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 font-normal outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all duration-300"
                placeholder="customer@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Phone</label>
              <input
                type="tel"
                value={offlineForm.phone}
                onChange={(e) => setOfflineForm({ ...offlineForm, phone: e.target.value })}
                className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 font-normal outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all duration-300"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Company</label>
              <input
                type="text"
                value={offlineForm.company}
                onChange={(e) => setOfflineForm({ ...offlineForm, company: e.target.value })}
                className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 font-normal outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all duration-300"
                placeholder="Company name"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Items/Products</label>
              <input
                type="text"
                value={offlineForm.items}
                onChange={(e) => setOfflineForm({ ...offlineForm, items: e.target.value })}
                className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 font-normal outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all duration-300"
                placeholder="Products ordered"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Estimated Value (₹)</label>
              <input
                type="number"
                value={offlineForm.estimatedValue}
                onChange={(e) => setOfflineForm({ ...offlineForm, estimatedValue: e.target.value })}
                className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 font-normal outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all duration-300"
                placeholder="50000"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
              <select
                value={offlineForm.status}
                onChange={(e) => setOfflineForm({ ...offlineForm, status: e.target.value })}
                className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 font-normal outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all duration-300"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Notes</label>
              <textarea
                value={offlineForm.notes}
                onChange={(e) => setOfflineForm({ ...offlineForm, notes: e.target.value })}
                rows="2"
                className="w-full resize-y rounded-xl border-2 border-slate-300 px-4 py-3 font-normal outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all duration-300"
                placeholder="Additional notes"
              />
            </div>
            <div className="flex gap-2 sm:col-span-3">
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105"
              >
                ➕ Add Customer
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="rounded-xl border-2 border-slate-300 px-6 py-3 text-sm font-extrabold text-slate-700 hover:bg-slate-50 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Inquiries Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📋</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Inquiries List</h2>
            <span className="ml-auto text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {filteredInquiries.length} items
            </span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-extrabold uppercase tracking-wider text-slate-600">Type</th>
                <th className="px-6 py-4 text-left text-xs font-extrabold uppercase tracking-wider text-slate-600">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-extrabold uppercase tracking-wider text-slate-600">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-extrabold uppercase tracking-wider text-slate-600">Items</th>
                <th className="px-6 py-4 text-left text-xs font-extrabold uppercase tracking-wider text-slate-600">Est. Value</th>
                <th className="px-6 py-4 text-left text-xs font-extrabold uppercase tracking-wider text-slate-600">Status</th>
                <th className="px-6 py-4 text-left text-xs font-extrabold uppercase tracking-wider text-slate-600">Date</th>
                <th className="px-6 py-4 text-left text-xs font-extrabold uppercase tracking-wider text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInquiries.map((inquiry) => (
                <tr key={inquiry._id} className="group hover:bg-gradient-to-r hover:from-emerald-50 hover:to-white transition-all duration-300">
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold ${
                      inquiry.type === 'online' 
                        ? 'bg-blue-100 text-blue-700 border-2 border-blue-200' 
                        : 'bg-purple-100 text-purple-700 border-2 border-purple-200'
                    }`}>
                      {inquiry.type === 'online' ? '🌐 Online' : '🏪 Offline'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-extrabold text-slate-900">{inquiry.name}</div>
                    <div className="text-xs text-slate-500">{inquiry.company || inquiry.source || '-'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">{inquiry.email || '-'}</div>
                    <div className="text-sm text-slate-600">{inquiry.phone || '-'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">
                      {inquiry.items || inquiry.cartItems?.length || 0} {inquiry.items ? '' : 'items'}
                    </div>
                    {inquiry.message && (
                      <div className="text-xs text-slate-600 mt-1 max-w-xs truncate">
                        {inquiry.message}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-extrabold text-slate-900">
                      {inquiry.estimatedValue ? `₹${parseFloat(inquiry.estimatedValue).toLocaleString()}` : '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={inquiry.status || 'pending'}
                      onChange={(e) => handleStatusUpdate(inquiry._id, e.target.value, inquiry.type)}
                      className="px-4 py-2 rounded-xl border-2 border-slate-300 text-sm font-semibold focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all duration-300"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusUpdate(inquiry._id, 'completed', inquiry.type)}
                        className="rounded-xl border-2 border-emerald-200 px-4 py-2 text-xs font-extrabold text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 hover:scale-105"
                      >
                        ✅ Complete
                      </button>
                      {inquiry.type === 'offline' && (
                        <button
                          onClick={() => handleDeleteOfflineCustomer(inquiry._id)}
                          className="rounded-xl border-2 border-red-200 px-4 py-2 text-xs font-extrabold text-red-700 hover:bg-red-50 hover:border-red-300 transition-all duration-300 hover:scale-105"
                        >
                          🗑️ Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredInquiries.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center">
                    <span className="text-4xl">📭</span>
                    <p className="mt-3 text-slate-600">No inquiries found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Accounting;
