import { createContext, useContext, useReducer, useEffect } from "react";
import type { ReactNode } from "react";
import type { Product } from "../data/products";

// 1. กำหนด CartItem (มี quantity)
type CartItem = Product & { quantity: number };

// 2. สถานะของ cart ทั้งหมด
type CartState = {
  items: CartItem[];
};

// 3. Action ที่รองรับ
type Action =
  | { type: "ADD_ITEM"; payload: Product; quantity: number }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "INCREASE_QUANTITY"; payload: number }
  | { type: "DECREASE_QUANTITY"; payload: number };
// 4. Context structure
type CartContextType = {
  state: CartState;
  dispatch: React.Dispatch<Action>;
};

// 5. สร้าง context
const CartContext = createContext<CartContextType | undefined>(undefined);

// 6. Reducer function
const cartReducer = (state: CartState, action: Action): CartState => {
 switch (action.type) {
  case "ADD_ITEM": {
    const exists = state.items.find((i) => i.id === action.payload.id);
    if (exists) {
      return {
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: i.quantity + action.quantity }
            : i
        ),
      };
    }
    return {
      items: [...state.items, { ...action.payload, quantity: action.quantity }],
    };
  }

  case "REMOVE_ITEM":
    return {
      items: state.items.filter((i) => i.id !== action.payload),
    };

  case "INCREASE_QUANTITY":
    return {
      items: state.items.map((item) =>
        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      ),
    };

  case "DECREASE_QUANTITY":
    return {
      items: state.items
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    };

  default:
    return state;
}
};

// 7. Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, loadCart());

  // 🧠 โหลดจาก localStorage
  function loadCart(): CartState {
    try {
      const json = localStorage.getItem("cart");
      if (json) {
        return JSON.parse(json);
      }
    } catch (e) {
      console.error("loadCart error", e);
    }
    return { items: [] };
  }

  // 💾 บันทึกทุกครั้งที่ state เปลี่ยน
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// 8. Custom Hook เพื่อใช้ CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

