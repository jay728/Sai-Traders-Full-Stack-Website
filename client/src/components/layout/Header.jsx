import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navigationLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Contact", to: "/contact" },
];

function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-800 via-blue-900 to-slate-900 sticky top-0 z-50 shadow-xl backdrop-blur-md border-b border-white/20">
      <div className="mx-auto max-w-screen-2xl px-4 py-3 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center justify-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <img src="/Logo.jpeg" alt="SAI TRADER Logo" className="relative h-10 w-auto sm:h-12 object-contain rounded-full border-2 border-white/20 bg-white/10 p-1" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-base sm:text-lg lg:text-xl tracking-tight group-hover:text-blue-200 transition-colors duration-300">Sai Trader</span>
                <span className="text-[10px] sm:text-xs text-blue-100 font-medium tracking-wider uppercase">Vacuum Metallising</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/admin/login" className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-blue-900 px-4 py-2.5 text-xs sm:text-sm font-extrabold shadow-lg transition-all duration-300 hover:bg-blue-50 hover:scale-105 hover:-translate-y-0.5 sm:px-5">
              <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Admin Login</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mt-4 max-lg:hidden">
          {navigationLinks.map((link) => (
            <NavLink key={link.label} to={link.to} className={({ isActive }) => `relative px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold transition-all duration-300 rounded-full ${isActive ? "bg-white text-blue-900 shadow-lg" : "text-white/90 hover:text-white hover:bg-white/20"}`}>
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
