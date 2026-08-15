import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navigationLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-orange-400/30 bg-white/95 shadow-2xl shadow-orange-500/20 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group" onClick={closeMenu}>
          <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 text-base sm:text-lg font-black text-white shadow-lg shadow-orange-400/50 group-hover:shadow-xl group-hover:shadow-orange-400/60 group-hover:scale-110 transition-all duration-300">S</span>
          <span><span className="block text-base sm:text-lg font-extrabold leading-5 text-slate-900 group-hover:text-orange-500 transition-colors">SAI TRADER</span><span className="block text-[10px] sm:text-xs font-semibold text-orange-400">Vacuum Metallising Services</span></span>
        </Link>
        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main navigation">
          {navigationLinks.map((link) => <NavLink key={link.label} to={link.to} className={({ isActive }) => `rounded-lg px-3 py-2 text-sm font-bold transition-all duration-300 ${isActive ? "bg-gradient-to-r from-orange-500/20 to-purple-500/20 text-orange-600 shadow-lg shadow-orange-500/30 border border-orange-500/30" : "text-slate-600 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-purple-500/10 hover:text-orange-600"}`}>{link.label}</NavLink>)}
        </nav>
        <Link to="/contact" className="hidden items-center rounded-xl bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-orange-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-400/60 hover:scale-110 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 sm:inline-flex">Get Quote</Link>
        <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-orange-400/30 text-orange-500 transition hover:bg-orange-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 lg:hidden" onClick={() => setIsMenuOpen((isOpen) => !isOpen)} aria-label="Toggle navigation menu" aria-expanded={isMenuOpen}><svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
      </div>
      {isMenuOpen && <nav className="border-t border-orange-400/30 bg-white/95 backdrop-blur-md px-4 py-5 shadow-2xl shadow-orange-500/20 lg:hidden" aria-label="Mobile navigation"><div className="mx-auto flex max-w-7xl flex-col gap-3">{navigationLinks.map((link) => <NavLink key={link.label} to={link.to} onClick={closeMenu} className={({ isActive }) => `rounded-xl px-4 py-3.5 text-sm font-bold transition-all duration-300 ${isActive ? "bg-gradient-to-r from-orange-500/20 to-purple-500/20 text-orange-600 shadow-lg shadow-orange-500/30 border border-orange-500/30" : "text-slate-700 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-purple-500/10 hover:text-orange-600"}`}>{link.label}</NavLink>)}<Link to="/contact" onClick={closeMenu} className="mt-3 rounded-xl bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 px-4 py-3.5 text-center text-sm font-extrabold text-white shadow-lg shadow-orange-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-400/60 hover:scale-110">Get Quote</Link></div></nav>}
    </header>
  );
}

export default Header;
