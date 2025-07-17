import { useEffect, useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/productcard";
import FilterBar from "../components/filterbar";

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerPage(4); // มือถือ
      } else {
        setItemsPerPage(8); // แท็บเล็ตขึ้นไป
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // reset หน้าใหม่เมื่อ filter หรือ layout เปลี่ยน
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, itemsPerPage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold mb-6">สินค้า</h1>

      <input
        type="text"
        placeholder="ค้นหาสินค้า..."
        className="mb-4 w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 placeholder-gray-400 rounded focus:ring-2 focus:ring-blue-400 transition"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <div className="col-span-full text-center text-gray-500 p-10">
            <p className="text-xl">ไม่พบสินค้าที่คุณค้นหา</p>
            <p className="text-sm">ลองพิมพ์คำใหม่ หรือล้าง filter</p>
          </div>
        )}
      </div>
{/* 🧾 จำนวนที่แสดง */}
{filteredProducts.length > 0 && (
  <div className="text-sm text-gray-600 mt-4 text-center">
    แสดง {startIndex + 1}–{Math.min(endIndex, filteredProducts.length)} จาก {filteredProducts.length} รายการ
  </div>
)}
      {/* 🔢 Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}
