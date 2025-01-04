"use client"
import React, { useState } from "react";
import { FiHeart, FiGrid, FiList, FiChevronDown } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Image from 'next/image';
import img from "../../../public/accessories.jpg"
import image from "../../../public/banner.jpg"


const MensProductPage = () => {
  const products = [
    {
      id: 1,
      name: "Luxury Watch Collection",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.5,
      image: img.src,
      isNew: true,
      isTrending: true
    },
    {
      id: 2,
      name: "Designer Sunglasses",
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.0,
      image: img.src,
      isNew: false,
      isTrending: true
    },
    {
      id: 3,
      name: "Premium Leather Belt",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.8,
      image: img.src,
      isNew: true,
      isTrending: false
    },
    // Add more products as needed
  ];

  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categories = ["Watches", "Sunglasses", "Belts", "Jewelry", "Wallets", "Ties"];
  const colors = [
    { name: "Gold", code: "#FFD700" },
    { name: "Silver", code: "#C0C0C0" },
    { name: "Rose Gold", code: "#B76E79" },
    { name: "Black", code: "#000000" },
    { name: "Brown", code: "#8B4513" },
    { name: "Tan", code: "#D2B48C" },
  ];

  const handleCategorySelect = (category: string) => {
    setSelectedSizes(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleColorSelect = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-cover bg-center" style={{ backgroundImage: `url(${image.src})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-6">Style Meets Sophistication – Accessories Collection</h1>
          <div className="flex space-x-4">
            <button className="px-6 py-2 bg-[#1E90FF] hover:bg-blue-600 rounded-lg transition-all">Shop All</button>
            <button className="px-6 py-2 bg-[#FFD700] hover:bg-yellow-500 text-black rounded-lg transition-all">View Offers</button>
            <button className="px-6 py-2 bg-[#DC143C] hover:bg-red-600 rounded-lg transition-all">Apply Filters</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Filters Sidebar */}
        <div className={`w-64 space-y-6 ${isMobileFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4">Filters</h3>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Price Range</h4>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`px-3 py-1 rounded-md transition-all ${selectedSizes.includes(category) ? 'bg-[#1E2A38] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {category}
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
                    onClick={() => handleColorSelect(color.name)}
                    className={`w-8 h-8 rounded-full border-2 ${selectedColors.includes(color.name) ? 'border-[#1E90FF]' : 'border-transparent'}`}
                    style={{ backgroundColor: color.code }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? 'bg-[#1E2A38] text-white' : 'bg-gray-100'}`}
              >
                <FiGrid />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? 'bg-[#1E2A38] text-white' : 'bg-gray-100'}`}
              >
                <FiList />
              </button>
            </div>

            <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Most Popular</option>
            </select>
          </div>

          <div className={`grid ${viewMode === "grid" ? 'grid-cols-1 md:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'}`}>
            {products.map((product) => (
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
                      <span className="text-lg font-bold text-[#1E90FF]">${product.price}</span>
                      <span className="ml-2 text-sm line-through text-gray-500">${product.originalPrice}</span>
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

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">Previous</button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 rounded-lg ${page === 1 ? 'bg-[#1E2A38] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {page}
                </button>
              ))}
              <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        className="fixed bottom-4 right-4 md:hidden z-50 p-4 bg-[#1E2A38] text-white rounded-full shadow-lg"
      >
        <FiChevronDown className={`transform ${isMobileFilterOpen ? 'rotate-180' : 'rotate-0'} transition-transform`} />
      </button>
    </div>
  );
};

export default MensProductPage;