import { useCart } from "../context/cartcontext";

export default function CartDropdown() {
  const { state, dispatch } = useCart();
  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="animate-fade-in absolute right-0 top-full mt-2 w-80 bg-white shadow-lg rounded-lg z-50 border">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">รายการในตะกร้า</h2>
        {state.items.length === 0 ? (
           <div className="text-center text-gray-500 py-8">
    <p>ไม่มีสินค้าในตะกร้า</p>
    <span className="text-3xl">🛒</span>
  </div>
        ) : (
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {state.items.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ฿{item.price.toLocaleString()} × {item.quantity}
                  </p>
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => dispatch({ type: "DECREASE_QUANTITY", payload: item.id })}
                      className="px-2 bg-gray-200 rounded"
                    >
                      −
                    </button>
                    <button
                      onClick={() => dispatch({ type: "INCREASE_QUANTITY", payload: item.id })}
                      className="px-2 bg-gray-200 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
                      className="text-red-500 text-sm"
                    >
                      ลบ
                    </button>
                  </div>
                </div>
                <div className="font-semibold text-right whitespace-nowrap">
                  ฿{(item.price * item.quantity).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}

        {state.items.length > 0 && (
          <div className="mt-4 text-right">
            <p className="font-semibold">ยอดรวม: ฿{total.toLocaleString()}</p>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full">
              ไปชำระเงิน
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
