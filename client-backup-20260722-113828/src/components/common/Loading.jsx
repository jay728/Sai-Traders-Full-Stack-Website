import './Loading.css';

function Loading() {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-logo">
          <img src="/Logo.jpeg" alt="SAI TRADER Logo" className="w-24 h-auto object-contain" />
        </div>
        <div className="loading-text">SAI TRADER</div>
        <div className="loading-divider"></div>
        <div className="loading-subtext">B2B Decorative Coating</div>
        <div className="loading-spinner">
          <div className="spinner-dot"></div>
          <div className="spinner-dot"></div>
          <div className="spinner-dot"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
