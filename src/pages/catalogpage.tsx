import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/productcard";
import FilterBar from "../components/filterbar";

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // ดึงหมวดหมู่ทั้งหมดจากข้อมูลสินค้า
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // กรองสินค้า
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold mb-6">สินค้า</h1>

      {/* 🔍 Search */}
      <input
  type="text"
  placeholder="ค้นหาสินค้า..."
  className="mb-4 w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 placeholder-gray-400 rounded focus:ring-2 focus:ring-blue-400 transition"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>


      {/* 📂 Filter */}
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* 🔽 Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
        <div className="col-span-full text-center text-gray-500 p-10">
  <p className="text-xl">ไม่พบสินค้าที่คุณค้นหา</p>
  <p className="text-sm">ลองพิมพ์คำใหม่ หรือล้าง filter</p>
</div>
        )}
      </div>
    </div>
  );
}
