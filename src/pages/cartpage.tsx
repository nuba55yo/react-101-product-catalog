import { useCart } from "../context/cartcontext";

export default function CartPage() {
  const { state, dispatch } = useCart();
  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">ตะกร้าสินค้า</h1>

      {state.items.length === 0 ? (
       <div className="text-center py-16 text-gray-500">
    <p className="text-2xl">🛒 ตะกร้าว่างเปล่า</p>
    <p className="text-sm mt-2">ไปเพิ่มสินค้าก่อนนะ!</p>
  </div>
      ) : (
        <>
         <ul>
  {state.items.map((item) => (
   <li
  key={item.id}
  className="flex items-center justify-between border-b py-4 transition-opacity duration-300 hover:opacity-90"
>
  <div>
    <p className="font-medium">{item.name}</p>
    <p className="text-sm text-gray-500">฿{item.price.toLocaleString()}</p>
    <div className="flex items-center gap-2 mt-1">
      <button
        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        onClick={() => dispatch({ type: "DECREASE_QUANTITY", payload: item.id })}
      >
        −
      </button>
      <span className="font-semibold">{item.quantity}</span>
      <button
        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        onClick={() => dispatch({ type: "INCREASE_QUANTITY", payload: item.id })}
      >
        +
      </button>
    </div>
  </div>

  <div className="text-right">
    <p className="font-semibold">
      ฿{(item.price * item.quantity).toLocaleString()}
    </p>
    <button
      className="text-red-500 text-sm hover:underline mt-1"
      onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
    >
      ลบ
    </button>
  </div>
</li>
  ))}
</ul>


          <div className="mt-6 text-xl font-semibold text-right">
            ยอดรวม: ฿{total.toLocaleString()}
          </div>
        </>
      )}
    </div>
  );
}
