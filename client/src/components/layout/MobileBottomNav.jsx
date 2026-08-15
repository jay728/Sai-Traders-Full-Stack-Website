import { Link, NavLink } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/', icon: HomeIcon },
  { label: 'Services', to: '/products', icon: GridIcon },
  { label: 'About', to: '/about', icon: InfoIcon },
  { label: 'Contact', to: '/contact', icon: PhoneIcon },
];

function MobileBottomNav() {
  return (
    <nav className="mobile-bottom-nav fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/80 bg-white/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_24px_rgba(15,23,42,0.10)] backdrop-blur lg:hidden" aria-label="Mobile quick navigation">
      <div className="mx-auto grid max-w-md grid-cols-5 items-center justify-items-center">
        <NavItem {...links[0]} />
        <NavItem {...links[1]} />
        <Link to="/contact" className="-mt-6 flex flex-col items-center text-center text-[10px] font-extrabold text-orange-600 group">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-slate-50 bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 transition-all duration-300 group-hover:from-orange-600 group-hover:to-orange-700 group-hover:shadow-xl group-hover:shadow-orange-500/40 group-hover:scale-105"><PlusIcon /></span>
          <span className="mt-1 group-hover:text-orange-700 transition-colors">Requirement</span>
        </Link>
        <NavItem {...links[2]} />
        <NavItem {...links[3]} />
      </div>
    </nav>
  );
}

function NavItem({ label, to, icon: Icon }) {
  return <NavLink to={to} className={({ isActive }) => `flex min-h-14 flex-col items-center justify-center gap-1 text-[11px] font-bold transition-all duration-300 ${isActive ? 'text-blue-700 scale-105' : 'text-slate-500 hover:text-blue-700 hover:scale-105'}`}><Icon /><span>{label}</span></NavLink>;
}

function HomeIcon() { return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z" /><path d="M9 21v-6h6v6" /></svg>; }
function GridIcon() { return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>; }
function InfoIcon() { return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>; }
function PhoneIcon() { return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .8 2.9a2 2 0 0 1-.5 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.9.7 2.9.8a2 2 0 0 1 1.6 1.9Z" /></svg>; }
function PlusIcon() { return <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>; }

export default MobileBottomNav;
