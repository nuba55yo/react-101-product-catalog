import { useState, useRef } from "react";
import { useCart } from "../context/cartcontext";
import toast from "react-hot-toast";
import { cartIconRef } from "../App";
import type { Product } from "../data/products";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleAdd = () => {
    if (quantity <= 0) return;

    dispatch({ type: "ADD_ITEM", payload: product, quantity });
    toast.success(`${product.name} จำนวน ${quantity} ชิ้นถูกเพิ่มลงตะกร้าแล้ว!`);

    // 🧠 Animation
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
  };

  return (
    <div className="border rounded-xl shadow p-4 transition hover:shadow-lg hover:opacity-95">
      <img
        src={product.image}
        alt={product.name}
        ref={imgRef}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-500">฿{product.price.toLocaleString()}</p>

      <div className="mt-2 flex items-center space-x-2">
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-16 px-2 py-1  bg-white border rounded"
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 active:scale-95 transition"
          onClick={handleAdd}
        >
          เพิ่มลงตะกร้า
        </button>
      </div>
    </div>
  );
}
