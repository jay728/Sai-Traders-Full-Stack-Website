import { useEffect, useState } from 'react';
import { getInquiries, updateInquiryStatus, deleteInquiry, getInquiryById } from '../../../services/inquiryService';

function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const loadInquiries = async () => {
    try {
      const response = await getInquiries();
      setInquiries(response.data.data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to load inquiries.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateInquiryStatus(id, { status: newStatus });
      setMessage('Status updated successfully');
      await loadInquiries();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to update status.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteInquiry(id);
      setMessage('Inquiry deleted successfully');
      setDeleteConfirm(null);
      await loadInquiries();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to delete inquiry.');
    }
  };

  const handleViewDetails = async (id) => {
    try {
      const response = await getInquiryById(id);
      setSelectedInquiry(response.data.data);
      setShowDetails(true);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to load inquiry details.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Immediate (within 1 week)': return 'bg-red-100 text-red-800 border-red-200';
      case 'Urgent (within 2 weeks)': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Normal (within 1 month)': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Flexible': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl">
      <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-orange-500">Customer inquiries</p>
      <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Inquiries Dashboard</h1>
      <p className="mt-2 text-slate-600">Manage customer requirement submissions, status, and communications.</p>

      {message && (
        <div className="mt-4 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm font-semibold text-blue-800">
          {message}
        </div>
      )}

      {/* Details Modal */}
      {showDetails && selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-slate-900">Inquiry Details</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Name</p>
                  <p className="mt-1 font-semibold text-slate-900">{selectedInquiry.name}</p>
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Company</p>
                  <p className="mt-1 font-semibold text-slate-900">{selectedInquiry.company || '-'}</p>
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Email</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    <a href={`mailto:${selectedInquiry.email}`} className="text-blue-600 hover:text-blue-800">{selectedInquiry.email}</a>
                  </p>
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Phone</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    <a href={`tel:${selectedInquiry.phone}`} className="text-blue-600 hover:text-blue-800">{selectedInquiry.phone}</a>
                  </p>
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Material</p>
                  <p className="mt-1 font-semibold text-slate-900">{selectedInquiry.material || '-'}</p>
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Quantity</p>
                  <p className="mt-1 font-semibold text-slate-900">{selectedInquiry.quantity || '-'}</p>
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Component Type</p>
                  <p className="mt-1 font-semibold text-slate-900">{selectedInquiry.componentType || '-'}</p>
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Urgency</p>
                  <span className={`mt-1 inline-flex rounded-full border px-3 py-1 text-xs font-extrabold ${getUrgencyColor(selectedInquiry.urgency)}`}>
                    {selectedInquiry.urgency || '-'}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Required Finish</p>
                  <p className="mt-1 font-semibold text-slate-900">{selectedInquiry.requirement || '-'}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Message</p>
                  <p className="mt-1 text-slate-700 whitespace-pre-wrap">{selectedInquiry.message || '-'}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Status</p>
                  <span className={`mt-1 inline-flex rounded-full border px-3 py-1 text-xs font-extrabold ${getStatusColor(selectedInquiry.status)}`}>
                    {selectedInquiry.status}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Regarding your inquiry - ${selectedInquiry.requirement}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-extrabold text-white transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/30"
                >
                  📧 Send Email
                </a>
                <a
                  href={`tel:${selectedInquiry.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 text-sm font-extrabold text-white transition-all duration-300 hover:from-green-700 hover:to-emerald-700 hover:shadow-lg hover:shadow-green-500/30"
                >
                  📞 Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6">
            <h3 className="text-xl font-extrabold text-slate-900">Confirm Delete</h3>
            <p className="mt-2 text-slate-600">Are you sure you want to delete this inquiry? This action cannot be undone.</p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm font-extrabold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 py-3 text-sm font-extrabold text-white transition-all duration-300 hover:from-red-700 hover:to-rose-700 hover:shadow-lg hover:shadow-red-500/30"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-5">
          <h2 className="font-extrabold text-slate-900">All Inquiries ({inquiries.length})</h2>
        </div>

        {isLoading ? (
          <p className="p-6 text-slate-500">Loading inquiries...</p>
        ) : inquiries.length === 0 ? (
          <p className="p-6 text-slate-500">No inquiries found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-slate-600">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-slate-600">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-slate-600">Material</th>
                  <th className="px-6 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-slate-600">Component</th>
                  <th className="px-6 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-slate-600">Urgency</th>
                  <th className="px-6 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-slate-600">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-extrabold text-slate-900">{inquiry.name}</div>
                        <div className="text-sm text-slate-500">{inquiry.email}</div>
                        <div className="text-sm text-slate-500">{inquiry.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{inquiry.company || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{inquiry.material || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{inquiry.componentType || inquiry.requirement || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-extrabold ${getUrgencyColor(inquiry.urgency)}`}>
                        {inquiry.urgency || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-extrabold ${getStatusColor(inquiry.status)}`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetails(inquiry._id)}
                          className="rounded-lg bg-blue-100 px-3 py-2 text-xs font-extrabold text-blue-700 transition-colors hover:bg-blue-200"
                          title="View Details"
                        >
                          👁️
                        </button>
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="rounded-lg bg-green-100 px-3 py-2 text-xs font-extrabold text-green-700 transition-colors hover:bg-green-200"
                          title="Send Email"
                        >
                          📧
                        </a>
                        <select
                          value={inquiry.status}
                          onChange={(e) => handleStatusChange(inquiry._id, e.target.value)}
                          className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-normal focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                        <button
                          onClick={() => setDeleteConfirm(inquiry._id)}
                          className="rounded-lg bg-red-100 px-3 py-2 text-xs font-extrabold text-red-700 transition-colors hover:bg-red-200"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default Inquiries;
