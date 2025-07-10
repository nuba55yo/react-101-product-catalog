import { Link } from "react-router-dom";
import AppRoutes from "./router/approutes";
import { useCart } from "./context/cartcontext";
import { useState, useRef, useEffect, createRef } from "react";
import CartDropdown from "./components/cartdropdown";

// ✅ export ให้ใช้ใน productcard ได้
export const cartIconRef = createRef<HTMLButtonElement>();

export default function App() {
  const { state } = useCart();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ คลิกข้างนอก dropdown จะปิด
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center relative">
        <h1 className="text-xl font-bold">🛍️ MyCatalog</h1>
        <div className="space-x-4 relative">
          <Link to="/catalog" className="text-blue-600 hover:underline">
            สินค้า
          </Link>

          {/* ✅ ใส่ ref ที่ปุ่มตะกร้า */}
          <button
            ref={cartIconRef}
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-blue-600 hover:underline relative"
          >
            ตะกร้า
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 text-xs bg-red-500 text-white rounded-full px-1.5">
                {totalItems}
              </span>
            )}
          </button>

          {showDropdown && (
            <div ref={dropdownRef}>
              <CartDropdown />
            </div>
          )}
        </div>
      </nav>

      <main className="p-4">
        <AppRoutes />
      </main>
    </div>
  );
}
