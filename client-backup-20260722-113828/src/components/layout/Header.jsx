import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const navigationLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const { getCartTotal } = useCart();
  const cartCount = getCartTotal();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 sm:py-3 sm:px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-1.5 sm:gap-3 group" onClick={closeMenu}>
          <img src="/Logo.jpeg" alt="SAI TRADER Logo" className="h-8 w-auto sm:h-10 lg:h-12 object-contain group-hover:scale-105 transition-all duration-300" />
        </Link>
        <nav className="hidden items-center gap-1.5 sm:gap-2 lg:flex" aria-label="Main navigation">
          {navigationLinks.map((link) => <NavLink key={link.label} to={link.to} className={({ isActive }) => `rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs lg:text-sm font-semibold transition-all duration-300 ${isActive ? "bg-blue-50 text-blue-600 font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"}`}>{link.label}</NavLink>)}
        </nav>
        <div className="hidden items-center gap-2 sm:gap-3 lg:flex">
          <Link to="/cart" className="relative inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 sm:px-4 sm:py-2.5 text-slate-600 transition-all duration-300 hover:bg-slate-50 hover:border-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-red-500 text-[10px] sm:text-xs font-extrabold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/contact" className="hidden items-center rounded-lg sm:rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2.5 lg:py-3 text-[9px] sm:text-xs lg:text-sm font-extrabold text-white shadow-sm sm:shadow-md transition-all duration-300 hover:shadow-md sm:hover:shadow-lg hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 sm:inline-flex">Get Quote</Link>
        </div>
        <button type="button" className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 lg:hidden" onClick={() => setIsMenuOpen((isOpen) => !isOpen)} aria-label="Toggle navigation menu" aria-expanded={isMenuOpen}><svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
      </div>
      {isMenuOpen && <nav className="border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 sm:px-4 py-5 sm:py-6 shadow-lg lg:hidden" aria-label="Mobile navigation"><div className="mx-auto flex max-w-7xl flex-col gap-2 sm:gap-2">{navigationLinks.map((link) => <NavLink key={link.label} to={link.to} onClick={closeMenu} className={({ isActive }) => `rounded-lg sm:rounded-xl px-4 sm:px-4 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 ${isActive ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold shadow-md" : "text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700"}`}>{link.label}</NavLink>)}<Link to="/contact" onClick={closeMenu} className="mt-4 sm:mt-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 sm:px-4 py-3 sm:py-4 text-center text-sm sm:text-base font-extrabold text-white shadow-md sm:shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">Get Quote</Link></div></nav>}
    </header>
  );
}

export default Header;
