import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import About from "../pages/public/About/About";
import Contact from "../pages/public/Contact/Contact";
import Home from "../pages/public/Home/Home";
import Products from "../pages/public/Products/Products";
import ProductDetails from "../pages/public/ProductDetails/ProductDetails";
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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
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
