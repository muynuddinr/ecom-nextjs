"use client"
import React, { useState, useMemo, useCallback } from "react";
import { FiHeart, FiGrid, FiList, FiChevronDown } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Image from 'next/image';
import { memo } from "react";
import image from "../../../public/banner.jpg"
import img from "../../../public/mens.jpg"

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  sizes?: string[];
  color: string;
  image: string;
  originalPrice: number;
  rating: number;
  isNew: boolean;
  isTrending: boolean;
}

interface Filters {
  priceRange: number[];
  categories: string[];
  sizes: string[];
  colors: string[];
}

const PRODUCTS_PER_PAGE = 9;
const INITIAL_FILTERS = {
  priceRange: [0, 75000],
  categories: [] as string[],
  sizes: [] as string[],
  colors: [] as string[]
};

const categories = ["shirts", "pants", "t-shirts", "hoodies"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = [
  { name: "Black", code: "#000000" },
  { name: "Navy", code: "#1E2A38" },
  { name: "Gray", code: "#BCC6CC" },
  { name: "Blue", code: "#1E90FF" },
  { name: "Gold", code: "#FFD700" },
  { name: "Red", code: "#DC143C" },
];

const filterProducts = (products: Product[], activeFilters: Filters) => {
  return products.filter(product => {
    if (product.price < activeFilters.priceRange[0] || 
        product.price > activeFilters.priceRange[1]) {
      return false;
    }
    
    if (activeFilters.categories.length > 0 && 
        !activeFilters.categories.includes(product.category)) {
      return false;
    }
    
    if (activeFilters.sizes.length > 0 && 
        !product.sizes?.some((size: string) => activeFilters.sizes.includes(size))) {
      return false;
    }
    
    if (activeFilters.colors.length > 0 && 
        !activeFilters.colors.includes(product.color)) {
      return false;
    }
    
    return true;
  });
};

const MensProductPage = () => {
  const products = useMemo(() => [
    {
      id: 1,
      name: "Premium Leather Jacket",
      price: 24999,
      originalPrice: 29999,
      rating: 4.5,
      image: img.src,
      isNew: true,
      isTrending: true,
      sizes: ["S", "M", "L", "XL"],
      color: "Black",
      category: "jackets"
    },
    {
      id: 2,
      name: "Classic Denim Shirt",
      price: 3999,
      originalPrice: 4999,
      rating: 4.0,
      image: img.src,
      isNew: false,
      isTrending: true,
      sizes: ["S", "M", "L", "XL"],
      color: "Blue",
      category: "shirts"
    },
    {
      id: 3,
      name: "Urban Casual Blazer",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.8,
      image: img.src,
      isNew: true,
      isTrending: false,
      sizes: ["M", "L", "XL"],
      color: "Navy",
      category: "jackets"
    },
    {
      id: 4,
      name: "Slim Fit Chinos",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.3,
      image: img.src,
      isNew: false,
      isTrending: true,
      sizes: ["S", "M", "L", "XL"],
      color: "Gold",
      category: "pants"
    },
    {
      id: 5,
      name: "Cotton V-Neck T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.6,
      image: img.src,
      isNew: true,
      isTrending: false,
      sizes: ["S", "M", "L"],
      color: "Gray",
      category: "t-shirts"
    },
    {
      id: 6,
      name: "Hooded Sweatshirt",
      price: 69.99,
      originalPrice: 89.99,
      rating: 4.7,
      image: img.src,
      isNew: false,
      isTrending: true,
      sizes: ["S", "M", "L", "XL"],
      color: "Red",
      category: "hoodies"
    },
    {
      id: 7,
      name: "Striped Oxford Shirt",
      price: 84.99,
      originalPrice: 99.99,
      rating: 4.4,
      image: img.src,
      isNew: true,
      isTrending: false,
      sizes: ["M", "L", "XL"],
      color: "Blue",
      category: "shirts"
    },
    {
      id: 8,
      name: "Cargo Pants",
      price: 89.99,
      originalPrice: 109.99,
      rating: 4.2,
      image: img.src,
      isNew: false,
      isTrending: true,
      sizes: ["S", "M", "L", "XL"],
      color: "Black",
      category: "pants"
    },
    {
      id: 9,
      name: "Wool Blend Sweater",
      price: 119.99,
      originalPrice: 149.99,
      rating: 4.9,
      image: img.src,
      isNew: true,
      isTrending: false,
      sizes: ["S", "M", "L"],
      color: "Gray",
      category: "hoodies"
    },
    {
      id: 10,
      name: "Urban Casual Blazer",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.8,
      image: img.src,
      isNew: true,
      isTrending: false,
      sizes: ["M", "L", "XL"],
      color: "Navy",
      category: "jackets"
    },

  ], []);

  const [viewMode, setViewMode] = useState("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState(INITIAL_FILTERS);
  const [activeFilters, setActiveFilters] = useState(INITIAL_FILTERS);
  const [hasFilterChanges, setHasFilterChanges] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => 
    filterProducts(products, activeFilters),
    [products, activeFilters]
  );

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const totalPages = useMemo(() => 
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE),
    [filteredProducts]
  );

  const handleTempFilterChange = useCallback((type: string, value: string[] | number[] | string | number) => {
    setTempFilters(prev => {
      const newFilters = { ...prev, [type]: value };
      setHasFilterChanges(JSON.stringify(newFilters) !== JSON.stringify(activeFilters));
      return newFilters;
    });
  }, [activeFilters]);

  const handleApplyFilters = useCallback(() => {
    setActiveFilters(tempFilters);
    setHasFilterChanges(false);
    setIsMobileFilterOpen(false);
  }, [tempFilters]);

  const handleResetFilters = useCallback(() => {
    setTempFilters(INITIAL_FILTERS);
    setActiveFilters(INITIAL_FILTERS);
    setHasFilterChanges(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section - Simplified without buttons */}
      <div className="relative h-[300px] md:h-[400px] bg-cover bg-center" style={{ backgroundImage: `url(${image.src})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-4">
          <h1 className="text-2xl md:text-4xl font-bold text-center">Style Meets Sophistication – Mens Collection</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Main content area */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Filters Sidebar - Modified for slide-up mobile modal */}
          <div className={`
            fixed md:relative md:inset-auto inset-x-0 bottom-0 z-30 
            bg-white md:bg-transparent
            ${isMobileFilterOpen ? 'translate-y-0' : 'translate-y-full'} 
            md:translate-y-0 transition-transform duration-300 ease-in-out
            ${isMobileFilterOpen ? 'flex' : 'hidden md:flex'}
            flex-col md:w-64
            max-h-[90vh] md:max-h-none
          `}>
            <div className="bg-white p-4 rounded-t-2xl md:rounded-lg shadow-md overflow-y-auto">
              {/* Mobile header */}
              <div className="flex justify-between items-center md:hidden mb-4">
                <h3 className="font-bold text-lg">Filters</h3>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  ✕
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Price Range</h4>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="75000"
                    step="1000"
                    value={tempFilters.priceRange[1]}
                    onChange={(e) => handleTempFilterChange('priceRange', [0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">₹0</span>
                    <span className="text-sm font-medium">Up to ₹{tempFilters.priceRange[1]}</span>
                    <span className="text-sm text-gray-600">₹75000</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleTempFilterChange('priceRange', [0, 5000])}
                      className="px-3 py-1 text-sm rounded-full border hover:bg-gray-50"
                    >
                      Under ₹5000
                    </button>
                    <button 
                      onClick={() => handleTempFilterChange('priceRange', [5000, 15000])}
                      className="px-3 py-1 text-sm rounded-full border hover:bg-gray-50"
                    >
                      ₹5000-₹15000
                    </button>
                    <button 
                      onClick={() => handleTempFilterChange('priceRange', [15000, 75000])}
                      className="px-3 py-1 text-sm rounded-full border hover:bg-gray-50"
                    >
                      ₹15000+
                    </button>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Categories</h4>
                <div className="flex flex-col gap-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={tempFilters.categories.includes(category)}
                        onChange={(e) => {
                          const newCategories = e.target.checked
                            ? [...tempFilters.categories, category]
                            : tempFilters.categories.filter(c => c !== category);
                          handleTempFilterChange('categories', newCategories);
                        }}
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Sizes</h4>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        const newSizes = tempFilters.sizes.includes(size)
                          ? tempFilters.sizes.filter(s => s !== size)
                          : [...tempFilters.sizes, size];
                        handleTempFilterChange('sizes', newSizes);
                      }}
                      className={`px-3 py-1 rounded-md transition-all ${
                        tempFilters.sizes.includes(size) 
                          ? 'bg-[#1E2A38] text-white' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Colors</h4>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        const newColors = tempFilters.colors.includes(color.name)
                          ? tempFilters.colors.filter(c => c !== color.name)
                          : [...tempFilters.colors, color.name];
                        handleTempFilterChange('colors', newColors);
                      }}
                      className={`w-8 h-8 rounded-full border-2 ${
                        tempFilters.colors.includes(color.name) 
                          ? 'border-[#1E90FF]' 
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.code }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Filter Actions */}
              <div className="sticky bottom-0 bg-white pt-4 border-t mt-4">
                <div className="flex gap-2">
                  <button
                    onClick={handleApplyFilters}
                    disabled={!hasFilterChanges}
                    className={`flex-1 py-2 px-4 rounded-lg ${
                      hasFilterChanges
                        ? 'bg-[#1E90FF] text-white hover:bg-blue-600'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={handleResetFilters}
                    className="py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid - Improved mobile layout */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <div className="flex items-center space-x-4 w-full sm:w-auto justify-center">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded flex-1 sm:flex-none ${viewMode === "grid" ? 'bg-[#1E2A38] text-white' : 'bg-gray-100'}`}
                >
                  <FiGrid className="mx-auto" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded flex-1 sm:flex-none ${viewMode === "list" ? 'bg-[#1E2A38] text-white' : 'bg-gray-100'}`}
                >
                  <FiList className="mx-auto" />
                </button>
              </div>

              <select className="w-full sm:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>

            {/* Product grid with improved spacing */}
            <div className={`grid ${
              viewMode === "grid" 
                ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6' 
                : 'grid-cols-1 gap-4'
            }`}>
              {paginatedProducts.map((product) => (
                <div key={product.id} className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all">
                  <div className="relative pb-[100%]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex justify-center space-x-2">
                        <button className="px-4 py-2 bg-[#1E90FF] text-white rounded-lg hover:bg-blue-600">Add to Cart</button>
                        <button className="p-2 bg-white text-[#DC143C] rounded-full hover:bg-gray-100">
                          <FiHeart />
                        </button>
                      </div>
                    </div>
                    {product.isNew && (
                      <span className="absolute top-2 left-2 px-2 py-1 bg-[#DC143C] text-white text-sm rounded">New</span>
                    )}
                    {product.isTrending && (
                      <span className="absolute top-2 right-2 px-2 py-1 bg-[#FFD700] text-black text-sm rounded">Trending</span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-[#1E90FF]">₹{product.price}</span>
                        <span className="ml-2 text-sm line-through text-gray-500">₹{product.originalPrice}</span>
                      </div>
                      <div className="flex text-[#FFD700]">
                        {[...Array(5)].map((_, i) => (
                          i < Math.floor(product.rating) ? <AiFillStar key={i} /> : <AiOutlineStar key={i} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Responsive pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex flex-wrap justify-center gap-2">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-3 sm:px-4 py-2 rounded-lg ${
                      currentPage === 1 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-8 sm:w-10 h-8 sm:h-10 rounded-lg ${
                        currentPage === index + 1 
                          ? 'bg-[#1E2A38] text-white' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-3 sm:px-4 py-2 rounded-lg ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Improved mobile filter button */}
      <button
        onClick={() => setIsMobileFilterOpen(true)}
        className="fixed bottom-4 right-4 md:hidden  p-4 bg-[#1E2A38] text-white rounded-full shadow-lg flex items-center gap-2"
      >
        <span>Filters</span>
        <FiChevronDown className={`transform ${isMobileFilterOpen ? 'rotate-180' : 'rotate-0'} transition-transform`} />
      </button>
    </div>
  );
};

export default memo(MensProductPage);