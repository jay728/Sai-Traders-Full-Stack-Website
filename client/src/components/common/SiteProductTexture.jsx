function SiteProductTexture() {
  return (
    <div className="site-product-texture pointer-events-none fixed inset-0 z-[20] overflow-hidden" aria-hidden="true">
      <Claw className="site-texture-item site-claw-one" />
      <Pearls className="site-texture-item site-pearls-one" />
      <Cap className="site-texture-item site-cap-one" />
      <Claw className="site-texture-item site-claw-two" />
      <Pearls className="site-texture-item site-pearls-two" />
      <Cap className="site-texture-item site-cap-two" />
      <Pearls className="site-texture-item site-pearls-three" />
      <Cap className="site-texture-item site-cap-three" />
    </div>
  );
}

function Claw({ className }) {
  return <svg viewBox="0 0 90 90" className={className} fill="none"><path d="M24 13c12-8 28-6 37 5l-9 8c-5-5-13-6-19-2l-8 5 8 8 10-6 6 10-10 6 8 8 12-7 6 10-12 7c8 8 7 17 2 23-9 10-25 9-35-1L12 56C2 45 5 25 17 17c2-2 5-3 7-4Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" /><path d="m28 29 18 20m-4-28 18 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>;
}

function Pearls({ className }) {
  return <svg viewBox="0 0 130 70" className={className} fill="none"><path d="M5 55C27 12 89 3 125 35" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 6" /><circle cx="27" cy="25" r="9" fill="currentColor" /><circle cx="53" cy="13" r="7" fill="currentColor" /><circle cx="80" cy="14" r="10" fill="currentColor" /><circle cx="106" cy="25" r="7" fill="currentColor" /></svg>;
}

function Cap({ className }) {
  return <svg viewBox="0 0 70 90" className={className} fill="none"><path d="M18 27h34l-4 51H22l-4-51Z" fill="currentColor" fillOpacity=".22" stroke="currentColor" strokeWidth="3" /><path d="M13 17c0-6 5-10 11-10h22c6 0 11 4 11 10v10H13V17Z" fill="currentColor" fillOpacity=".35" stroke="currentColor" strokeWidth="3" /><path d="M18 21h34M24 37h22" stroke="currentColor" strokeWidth="2" /></svg>;
}

export default SiteProductTexture;
