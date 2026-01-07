
import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  ChevronDown,
  Home,
  X,
  Search,
  Filter,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import { Select, Slider, Drawer, Button, Badge } from "antd";
import ProductCard from "../card/Card";
import { useLocation } from "react-router-dom";

const ProductList = () => {
  // --- States ---
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [priceRange, setPriceRange] = useState([200, 10200]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [sortBy, setSortBy] = useState("popular");
  const [productsPerPage] = useState(12);
  const [displayedProducts, setDisplayedProducts] = useState(12);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const observerTarget = useRef(null);

  const { state } = useLocation();
  console.log(state);


  const allProducts = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        id: i + 1,
        name: [
          "Line-Pattern Zipper Sweatshirt",
          "Black Fantasy Sweatshirt",
          "Brooklyn-NYC Sweatshirt",
          "Basic Plain Shirt",
          "Premium Cotton Hoodie",
          "Casual T-Shirt",
          "Oversized Sweatshirt",
          "Tech Hoodie",
        ][i % 8],
        price: Math.floor(Math.random() * 800) + 150,
        oldPrice:
          Math.random() > 0.6 ? Math.floor(Math.random() * 400) + 400 : null,
        tag: ["NEW", "BEST SELLER", "HOT PROMO", null][
          Math.floor(Math.random() * 4)
        ],
        images: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        ],
        brand: ["Roadster", "Mochi", "Metro", "Provogue"][i % 4],
        subcategory: ["Casual", "Premium", "Sports"][i % 3],
        color: ["Black", "Brown", "Tan", "Olive", "Grey"][i % 5],
        rating: (Math.random() * 1.5 + 3.5).toFixed(1),
        reviews: Math.floor(Math.random() * 500) + 50,
        discount: Math.random() > 0.5 ? Math.floor(Math.random() * 50) + 10 : 0,
        inStock: Math.random() > 0.2,
      })),
    []
  );

  const brands = ["Roadster", "Mochi", "Metro", "Provogue"];
  const subcategories = ["Casual", "Premium", "Sports"];
  const colors = [
    { name: "Black", hex: "#374151" },
    { name: "Brown", hex: "#78350f" },
    { name: "Tan", hex: "#d2b48c" },
    { name: "Olive", hex: "#3f6212" },
    { name: "Grey", hex: "#9ca3af" },
  ];

  const ratingOptions = [
    { label: "4 Star & above", value: 4 },
    { label: "3 Star & above", value: 3 },
    { label: "2 Star & above", value: 2 },
  ];

  const discountOptions = [
    { label: "50% or more", value: 50 },
    { label: "30% - 50%", value: [30, 50] },
    { label: "10% - 30%", value: [10, 30] },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let result = allProducts.filter((p) => {
      const brandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const subcategoryMatch =
        selectedSubcategories.length === 0 ||
        selectedSubcategories.includes(p.subcategory);
      const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
      const colorMatch =
        selectedColors.length === 0 || selectedColors.includes(p.color);
      const ratingMatch =
        selectedRating.length === 0 ||
        selectedRating.some((r) => p.rating >= r);
      const discountMatch =
        selectedDiscount.length === 0 ||
        selectedDiscount.some((d) => {
          if (typeof d === "number") return p.discount >= d;
          return p.discount >= d[0] && p.discount <= d[1];
        });
      const availabilityMatch =
        selectedAvailability.length === 0 ||
        selectedAvailability.some((a) =>
          a === "inStock" ? p.inStock : !p.inStock
        );

      return (
        brandMatch &&
        subcategoryMatch &&
        priceMatch &&
        colorMatch &&
        ratingMatch &&
        discountMatch &&
        availabilityMatch
      );
    });

    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "newest") result.sort((a, b) => b.id - a.id);

    return result;
  }, [
    allProducts,
    selectedBrands,
    selectedSubcategories,
    priceRange,
    selectedColors,
    selectedRating,
    selectedDiscount,
    selectedAvailability,
    sortBy,
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          displayedProducts < filteredAndSortedProducts.length
        ) {
          setDisplayedProducts((prev) =>
            Math.min(prev + productsPerPage, filteredAndSortedProducts.length)
          );
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [displayedProducts, filteredAndSortedProducts.length, productsPerPage]);

  const toggleFilter = (value, setter, list) => {
    setter(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedSubcategories([]);
    setPriceRange([200, 10200]);
    setSelectedColors([]);
    setSelectedRating([]);
    setSelectedDiscount([]);
    setSelectedAvailability([]);
    setDisplayedProducts(12);
  };

  const activeFilterCount =
    selectedBrands.length +
    selectedSubcategories.length +
    selectedColors.length +
    selectedRating.length +
    selectedDiscount.length +
    selectedAvailability.length +
    (priceRange[0] !== 200 || priceRange[1] !== 10200 ? 1 : 0);

  const visibleProducts = filteredAndSortedProducts.slice(0, displayedProducts);

  const FilterGroups = () => (
    <div className="space-y-8 pb-7">
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-[11px] font-black tracking-widest text-gray-400 uppercase">
            Brands
          </span>
          <Search size={14} className="text-gray-400 cursor-pointer" />
        </div>
        <div className="space-y-2.5">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() =>
                  toggleFilter(brand, setSelectedBrands, selectedBrands)
                }
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <span className="text-[11px] font-black tracking-widest text-gray-400 uppercase block mb-1">
          Subcategory
        </span>
        <div className="space-y-2.5">
          {subcategories.map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedSubcategories.includes(cat)}
                onChange={() =>
                  toggleFilter(
                    cat,
                    setSelectedSubcategories,
                    selectedSubcategories
                  )
                }
                className="w-4 h-4 rounded border-gray-300 text-indigo-600"
              />
              <span className="text-sm text-gray-600">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <span className="text-[11px] font-black tracking-widest text-gray-400 uppercase block mb-1">
          Price
        </span>
        <div className="px-1">
          <Slider
            range
            min={200}
            max={10200}
            value={priceRange}
            onChange={setPriceRange}
            trackStyle={{ backgroundColor: "#4f46e5" }}
          />
          <div className="flex justify-between mt-2 text-xs font-bold text-gray-700">
            <span>₹{priceRange[0].toLocaleString()}</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div>
        <span className="text-[11px] font-black tracking-widest text-gray-400 uppercase block mb-1">
          Color
        </span>
        <div className="grid grid-cols-2 gap-2">
          {colors.map((color) => (
            <label
              key={color.name}
              className={`flex items-center gap-2 p-1.5 rounded-lg border transition-all cursor-pointer ${selectedColors.includes(color.name)
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-100 hover:border-gray-200"
                }`}
            >
              <input
                type="checkbox"
                hidden
                checked={selectedColors.includes(color.name)}
                onChange={() =>
                  toggleFilter(color.name, setSelectedColors, selectedColors)
                }
              />
              <div
                className="w-4 h-4 rounded-full border border-gray-200"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-xs font-medium text-gray-700">
                {color.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <span className="text-[11px] font-black tracking-widest text-gray-400 uppercase block mb-1">
          Customer Ratings
        </span>
        <div className="space-y-2">
          {ratingOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedRating.includes(opt.value)}
                onChange={() =>
                  toggleFilter(opt.value, setSelectedRating, selectedRating)
                }
                className="w-4 h-4 rounded border-gray-300 text-indigo-600"
              />
              <span className="text-sm text-gray-600 flex items-center gap-1">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <span className="text-[11px] font-black tracking-widest text-gray-400 uppercase block mb-1">
          Discount
        </span>
        <div className="space-y-2">
          {discountOptions.map((opt, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedDiscount.includes(opt.value)}
                onChange={() =>
                  toggleFilter(opt.value, setSelectedDiscount, selectedDiscount)
                }
                className="w-4 h-4 rounded border-gray-300 text-indigo-600"
              />
              <span className="text-sm text-gray-600">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <span className="text-[11px] font-black tracking-widest text-gray-400 uppercase block mb-1">
          Availability
        </span>
        <div className="flex flex-wrap gap-2">
          {["inStock", "outOfStock"].map((val) => (
            <button
              key={val}
              onClick={() =>
                toggleFilter(val, setSelectedAvailability, selectedAvailability)
              }
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${selectedAvailability.includes(val)
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-500 border-gray-200"
                }`}
            >
              {val === "inStock" ? "IN STOCK" : "OUT OF STOCK"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      <aside className="hidden lg:block w-72 p-6 border-r border-gray-100 overflow-y-auto h-screen sticky top-0 no-scrollbar bg-white">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-black text-gray-800">Filters</h2>
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-pink-500 font-bold hover:underline"
            >
              Clear All
            </button>
          )}
        </div>
        <FilterGroups />
      </aside>

      <Drawer
        title={
          <div className="flex justify-between items-center pr-4">
            <span className="font-black">FILTERS</span>
          </div>
        }
        placement="bottom"
        onClose={() => setIsFilterOpen(false)}
        open={isFilterOpen}
        height="85%"
        contentWrapperStyle={{
          borderRadius: "20px 20px 0 0",
          overflow: "hidden",
        }}
        extra={
          <Button
            type="text"
            danger
            onClick={clearAllFilters}
            className="font-bold"
          >
            Reset
          </Button>
        }
      >
        <div className="mb-6">
          <span className="text-[11px] font-black tracking-widest text-gray-400 uppercase block mb-3">
            Sort By
          </span>
          <Select
            className="w-full"
            value={sortBy}
            onChange={setSortBy}
            options={[
              { value: "popular", label: "Most Popular" },
              { value: "newest", label: "Newest" },
              { value: "price-low", label: "Price: Low to High" },
              { value: "price-high", label: "Price: High to Low" },
            ]}
          />
        </div>
        <FilterGroups />
      </Drawer>

      <main className="flex-1 p-4 lg:p-8 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <nav className="flex items-center gap-2 text-[10px] text-gray-400 mb-3 font-bold uppercase tracking-widest">
                <Home size={12} />
                <span className="hidden sm:inline">Products</span>
                <span className="text-gray-300">/</span> {state?.type}
                <span className="text-gray-300">/</span> {state?.title}
              </nav>
              <h1 className="text-3xl lg:text-3xl font-black text-gray-900 tracking-tight leading-tight">
                {state?.title || "Collection"}
              </h1>
            </div>

            <div className="hidden lg:flex bg-white w-72 border border-gray-100 px-5 py-2.5 rounded-2xl text-sm text-gray-400 shadow-sm items-center gap-3">
              Sort by:
              <Select
                value={sortBy}
                onChange={setSortBy}
                bordered={false}
                width="100%"
                options={[
                  { value: "popular", label: "Most Popular" },
                  { value: "newest", label: "Newest" },
                  { value: "price-low", label: "Price: Low to High" },
                  { value: "price-high", label: "Price: High to Low" },
                ]}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {activeFilterCount > 0 && (
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-[11px] font-bold shadow-lg"
              >
                <Filter size={14} /> Filters ({activeFilterCount})
              </button>
            )}
            {selectedBrands.map((b) => (
              <Tag
                key={b}
                label={b}
                onClear={() =>
                  setSelectedBrands((prev) => prev.filter((x) => x !== b))
                }
              />
            ))}
            {selectedSubcategories.map((c) => (
              <Tag
                key={c}
                label={c}
                onClear={() =>
                  setSelectedSubcategories((prev) =>
                    prev.filter((x) => x !== c)
                  )
                }
              />
            ))}
            {selectedColors.map((c) => (
              <Tag
                key={c}
                label={c}
                onClear={() =>
                  setSelectedColors((prev) => prev.filter((x) => x !== c))
                }
              />
            ))}
            {selectedRating.map((r) => (
              <Tag
                key={r}
                label={`${r}★ & above`}
                onClear={() =>
                  setSelectedRating((prev) => prev.filter((x) => x !== r))
                }
              />
            ))}
            {(priceRange[0] !== 200 || priceRange[1] !== 10200) && (
              <Tag
                label={`₹${priceRange[0]} - ₹${priceRange[1]}`}
                onClear={() => setPriceRange([200, 10200])}
              />
            )}
          </div>

          <div className="mb-6 flex justify-between items-center text-sm">
            <p className="text-gray-500">
              Showing{" "}
              <span className="font-bold text-gray-900">
                {visibleProducts.length}
              </span>{" "}
              results
            </p>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6">
              {visibleProducts.map((p) => (
                <div key={p.id} className="transform transition-transform ">
                  <ProductCard {...p} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
              <p className="text-gray-400 text-lg">
                No matches found for your selection.
              </p>
              <Button
                onClick={clearAllFilters}
                className="mt-4"
                type="primary"
                ghost
              >
                Clear all filters
              </Button>
            </div>
          )}
          <div
            ref={observerTarget}
            className="h-20 flex items-center justify-center"
          >
            {displayedProducts < filteredAndSortedProducts.length && (
              <div className="w-6 h-6 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            )}
          </div>
        </div>
      </main>

      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] font-bold text-sm hover:scale-105 active:scale-95 transition-all"
        >
          <SlidersHorizontal size={18} />
          Filter & Sort
          {activeFilterCount > 0 && (
            <span className="bg-indigo-500 w-5 h-5 rounded-full text-[10px] flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

const Tag = ({ label, onClear }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-100 rounded-lg text-[10px] font-bold text-gray-600 shadow-sm">
    {label}
    <X
      size={12}
      className="cursor-pointer hover:text-red-500"
      onClick={onClear}
    />
  </div>
);

export default ProductList;