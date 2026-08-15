import { Link } from 'react-router-dom';

const cards = [
  { title: 'Categories', detail: 'Manage application groups', to: '/admin/categories', tone: 'from-blue-500 to-blue-600', icon: '📁' },
  { title: 'Products', detail: 'Add products and finishes', to: '/admin/products', tone: 'from-orange-500 to-orange-600', icon: '📦' },
  { title: 'Gallery', detail: 'Upload real work images', to: '/admin/gallery', tone: 'from-violet-500 to-violet-600', icon: '🖼️' },
  { title: 'Inquiries', detail: 'Track customer requests', to: '/admin/inquiries', tone: 'from-slate-600 to-slate-700', icon: '📧' },
  { title: 'Accounting', detail: 'Manage quotes & revenue', to: '/admin/accounting', tone: 'from-emerald-500 to-emerald-600', icon: '💰' },
  { title: 'Settings', detail: 'Company details & branding', to: '/admin/settings', tone: 'from-green-500 to-green-600', icon: '⚙️' }
];

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 sm:p-8 lg:p-12 text-white shadow-2xl">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-[24px] border-white/10" />
        <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full border-[20px] border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
            <span className="text-lg">🚀</span>
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.15em] text-blue-100">SAI TRADER ADMIN</p>
          </div>
          
          <h1 className="mt-4 text-2xl sm:text-3xl lg:text-5xl font-extrabold leading-tight">
            Manage your website with confidence
          </h1>
          
          <p className="mt-4 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-blue-100">
            Add product details, organise application categories, upload completed-work photos, and respond to customer requirements from one place.
          </p>
          
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-4">
            <Link 
              to="/admin/products" 
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-extrabold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105 hover:-translate-y-1"
            >
              <span>➕</span>
              Add a product
            </Link>
            <Link 
              to="/admin/categories" 
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-extrabold text-white shadow-lg transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:-translate-y-1"
            >
              <span>📁</span>
              Manage categories
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="mt-8 sm:mt-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-xl">⚡</span>
              <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.15em] text-orange-600">Quick actions</p>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900">Content management</h2>
          </div>
        </div>
        
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map((card, index) => (
            <Link 
              key={card.title} 
              to={card.to}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.tone} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.tone} text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
                
                <h3 className="mt-4 text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {card.title}
                </h3>
                
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {card.detail}
                </p>
                
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Open</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
