import { useState, useEffect } from 'react';
import { getInquiries, updateInquiryStatus } from '../../../services/inquiryService';

function Accounting() {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    try {
      const response = await getInquiries();
      setInquiries(response.data.data || []);
      calculateStats(response.data.data || []);
    } catch (error) {
      console.error('Error loading inquiries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (data) => {
    const total = data.length;
    const pending = data.filter(i => i.status === 'pending').length;
    const inProgress = data.filter(i => i.status === 'in-progress').length;
    const completed = data.filter(i => i.status === 'completed').length;
    
    // Calculate estimated revenue (this would need actual pricing data)
    const totalRevenue = data.reduce((sum, item) => {
      if (item.status === 'completed' && item.estimatedValue) {
        return sum + (item.estimatedValue || 0);
      }
      return sum;
    }, 0);

    setStats({ total, pending, inProgress, completed, totalRevenue });
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateInquiryStatus(id, { status: newStatus });
      loadInquiries();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredInquiries = filter === 'all' 
    ? inquiries 
    : inquiries.filter(item => item.status === filter);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-600">Loading accounting data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Accounting & Inquiries</h1>
        <p className="mt-2 text-slate-600">Track customer inquiries, manage quotes, and monitor revenue</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-5 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
          <p className="text-xs sm:text-sm text-slate-600 font-semibold">Total Inquiries</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
          <p className="text-xs sm:text-sm text-slate-600 font-semibold">Pending</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-orange-600 mt-1">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
          <p className="text-xs sm:text-sm text-slate-600 font-semibold">In Progress</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 mt-1">{stats.inProgress}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
          <p className="text-xs sm:text-sm text-slate-600 font-semibold">Completed</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-green-600 mt-1">{stats.completed}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
          <p className="text-xs sm:text-sm text-slate-600 font-semibold">Est. Revenue</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">₹{stats.totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'in-progress', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Items</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredInquiries.map((inquiry) => (
                <tr key={inquiry._id} className="hover:bg-slate-50">
                  <td className="px-4 py-4">
                    <div className="font-semibold text-slate-900">{inquiry.name}</div>
                    <div className="text-xs text-slate-600">{inquiry.source || 'Direct'}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-slate-900">{inquiry.email}</div>
                    <div className="text-sm text-slate-600">{inquiry.phone}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-slate-900">
                      {inquiry.cartItems?.length || 0} items
                    </div>
                    {inquiry.message && (
                      <div className="text-xs text-slate-600 mt-1 max-w-xs truncate">
                        {inquiry.message}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <select
                      value={inquiry.status || 'pending'}
                      onChange={(e) => handleStatusUpdate(inquiry._id, e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => handleStatusUpdate(inquiry._id, 'completed')}
                      className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                    >
                      Mark Complete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredInquiries.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-slate-600">
                    No inquiries found
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
