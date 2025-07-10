import type { Product } from "../data/products";
import { useCart } from "../context/cartcontext";
import toast from "react-hot-toast";
import { cartIconRef } from "../App";
import { useRef } from "react";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { dispatch } = useCart();
  const imgRef = useRef<HTMLImageElement>(null);

  function handleAdd() {
    dispatch({ type: "ADD_ITEM", payload: product });
    toast.success(`${product.name} ถูกเพิ่มลงตะกร้าแล้ว!`);

    // 🎞️ Fly-to-cart animation
    if (imgRef.current && cartIconRef.current) {
      const img = imgRef.current;
      const cart = cartIconRef.current;

      const imgRect = img.getBoundingClientRect();
      const cartRect = cart.getBoundingClientRect();

      const clone = img.cloneNode(true) as HTMLImageElement;
      clone.style.position = "fixed";
      clone.style.zIndex = "1000";
      clone.style.width = `${imgRect.width}px`;
      clone.style.height = `${imgRect.height}px`;
      clone.style.left = `${imgRect.left}px`;
      clone.style.top = `${imgRect.top}px`;
      clone.style.transition = "all 0.8s ease-in-out";
      document.body.appendChild(clone);

      requestAnimationFrame(() => {
        clone.style.left = `${cartRect.left}px`;
        clone.style.top = `${cartRect.top}px`;
        clone.style.width = "20px";
        clone.style.height = "20px";
        clone.style.opacity = "0.2";
      });

      setTimeout(() => {
        document.body.removeChild(clone);
      }, 800);
    }
  }

  return (
    <div className="border rounded-xl shadow p-4 transition hover:shadow-lg hover:opacity-95">
      <img
        ref={imgRef}
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-500">฿{product.price.toLocaleString()}</p>
      <button
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 active:scale-95 transition"
        onClick={handleAdd} // ✅ ใช้ handleAdd แทน
      >
        เพิ่มลงตะกร้า
      </button>
    </div>
  );
}
