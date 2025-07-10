type Props = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

export default function FilterBar({ categories, selectedCategory, onCategoryChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        onClick={() => onCategoryChange("")}
        className={`px-4 py-2 rounded ${selectedCategory === "" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
      >
        ทั้งหมด
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-2 rounded ${
            selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
