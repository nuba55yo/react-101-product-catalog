import { Routes, Route, Navigate } from "react-router-dom";
import CatalogPage from "../pages/catalogpage";
import CartPage from "../pages/cartpage";
import NotFound from "../pages/notfound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/catalog" />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}