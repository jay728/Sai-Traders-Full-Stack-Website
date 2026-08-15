function ProductTexture() {
  return (
    <div className="product-texture pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 160 160" className="product-shape product-claw absolute -right-5 top-6 h-40 w-40 animate-float-soft" fill="none">
        <path d="M43 22c18-12 42-9 56 7l-13 12c-8-8-21-10-31-4l-12 7 12 12 16-9 8 14-16 9 12 12 18-10 8 14-18 11 13 13c10-5 16-15 16-26h18c1 24-12 45-33 55-22 11-48 6-65-11L22 72c-17-19-15-39 1-50 7-5 13-7 20 0Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
        <path d="m46 45 27 31m-8-43 27 31m-6-45 27 31" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>

      <svg viewBox="0 0 180 100" className="product-shape product-beads absolute -left-7 bottom-12 h-24 w-44 animate-float-soft" fill="none">
        <path d="M7 60C36 6 126 2 174 49" stroke="currentColor" strokeWidth="3" strokeDasharray="4 7" />
        <circle cx="30" cy="34" r="13" fill="currentColor" /><circle cx="68" cy="19" r="11" fill="currentColor" /><circle cx="110" cy="22" r="15" fill="currentColor" /><circle cx="145" cy="37" r="10" fill="currentColor" />
      </svg>

      <svg viewBox="0 0 100 130" className="product-shape product-cap absolute right-[25%] bottom-[-28px] h-28 w-24" fill="none">
        <path d="M22 35h56l-7 75H29l-7-75Z" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth="4" />
        <path d="M15 20c0-8 7-14 15-14h40c8 0 15 6 15 14v15H15V20Z" fill="currentColor" fillOpacity=".35" stroke="currentColor" strokeWidth="4" />
        <path d="M20 27h60M31 48h38" stroke="currentColor" strokeWidth="3" opacity=".8" />
      </svg>
    </div>
  );
}

export default ProductTexture;
