import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import MobileBottomNav from "../components/layout/MobileBottomNav";
import B2BRequirementBar from "../components/common/B2BRequirementBar";
import SiteProductTexture from "../components/common/SiteProductTexture";
import { CartProvider } from "../context/CartContext";

function MainLayout({ children }) {
  return <CartProvider><div className="min-h-screen bg-slate-50 text-slate-900"><SiteProductTexture /><div className="relative z-10"><Header /><B2BRequirementBar /><main>{children}</main><div className="pb-20 lg:pb-0"><Footer /></div><MobileBottomNav /></div></div></CartProvider>;
}

export default MainLayout;
