import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-b from-slate-900 via-slate-950 to-black text-gray-300 border-t border-white/10">
      <div className="mx-auto grid max-w-screen-2xl gap-8 sm:gap-10 px-4 py-12 sm:py-16 lg:py-20 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.25fr_0.7fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <img src="/Logo.jpeg" alt="SAI TRADER Logo" className="relative h-12 w-auto sm:h-14 object-contain rounded-full border-2 border-white/20 bg-white/10 p-1" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base lg:text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors duration-300">SAI TRADER</h2>
              <p className="text-[10px] sm:text-xs text-gray-400 font-semibold tracking-wider uppercase">Vacuum Metallising</p>
            </div>
          </div>
          <p className="mt-4 sm:mt-5 max-w-sm text-xs sm:text-sm leading-relaxed text-gray-400">Professional vacuum metallising and decorative coating solutions for PP and ABS plastic components. B2B job-work services for manufacturers.</p>
          <div className="mt-6 flex gap-3">
            <a href="https://wa.me/919623255747" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-11 sm:h-11 bg-white/10 hover:bg-green-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/30 border border-white/10">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-11 sm:h-11 bg-white/10 hover:bg-pink-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/30 border border-white/10">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-11 sm:h-11 bg-white/10 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30 border border-white/10">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.16em] text-white mb-4">Quick Links</h3>
          <div className="flex flex-col gap-2 text-xs sm:text-sm">
            <Link to="/" className="hover:text-amber-400 hover:translate-x-2 transition-all duration-300 inline-block py-2 px-3 rounded-lg hover:bg-white/5">Home</Link>
            <Link to="/about" className="hover:text-amber-400 hover:translate-x-2 transition-all duration-300 inline-block py-2 px-3 rounded-lg hover:bg-white/5">About Us</Link>
            <Link to="/products" className="hover:text-amber-400 hover:translate-x-2 transition-all duration-300 inline-block py-2 px-3 rounded-lg hover:bg-white/5">Products</Link>
            <Link to="/contact" className="hover:text-amber-400 hover:translate-x-2 transition-all duration-300 inline-block py-2 px-3 rounded-lg hover:bg-white/5">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.16em] text-white mb-4">Contact Info</h3>
          <div className="space-y-3 text-xs sm:text-sm leading-relaxed">
            <a href="tel:+919623255747" className="flex items-center gap-3 hover:text-amber-400 hover:translate-x-2 transition-all duration-300 py-2 px-3 rounded-lg hover:bg-white/5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              +91 96232 55747
            </a>
            <a href="tel:+917972039556" className="flex items-center gap-3 hover:text-amber-400 hover:translate-x-2 transition-all duration-300 py-2 px-3 rounded-lg hover:bg-white/5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              +91 79720 39556
            </a>
            <a href="mailto:saiitrader24@gmail.com" className="flex items-center gap-3 break-all hover:text-amber-400 hover:translate-x-2 transition-all duration-300 py-2 px-3 rounded-lg hover:bg-white/5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              saiitrader24@gmail.com
            </a>
            <div className="flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-white/5 transition-all duration-300">
              <svg className="w-4 h-4 mt-1 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed">Babla Compound, Gaibi Nagar, opposite Sana Hotel, Kalyan Road, Bhiwandi - 421308</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 bg-black/50 backdrop-blur-sm px-4 py-6 text-center text-xs text-gray-500">
        <p>Copyright {new Date().getFullYear()} SAI TRADER. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
