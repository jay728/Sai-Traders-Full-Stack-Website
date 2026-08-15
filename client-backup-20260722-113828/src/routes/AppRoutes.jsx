import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "../pages/public/About/About";
import Contact from "../pages/public/Contact/Contact";
import Gallery from "../pages/public/Gallery/Gallery";
import Home from "../pages/public/Home/Home";
import ProductDetails from "../pages/public/ProductDetails/ProductDetails";
import Cart from "../pages/public/Cart/Cart";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import Categories from "../pages/admin/Categories/Categories";
import ProductsAdmin from "../pages/admin/Product/ProductsAdmin";
import GalleryAdmin from "../pages/admin/Gallery/GalleryAdmin";
import Inquiries from "../pages/admin/Inquiries/Inquiries";
import Accounting from "../pages/admin/Accounting/Accounting";
import Settings from "../pages/admin/Settings/Settings";
import Login from "../pages/admin/Login/Login";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="gallery" element={<GalleryAdmin />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="accounting" element={<Accounting />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
