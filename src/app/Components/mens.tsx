"use client"
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { FiHeart, FiGrid, FiList, FiChevronDown } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Image from 'next/image';
import { memo } from "react";
import img from "../../../public/mens.jpg"
import img1 from "../../../public/womens.jpg"
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  sizes?: string[];
  color: string;
  image: string;
  hoverImage: string;
  originalPrice: number;
  rating: number;
  isNew: boolean;
  isTrending: boolean;
  slug: string;
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

const filterProducts = (products: readonly Product[], activeFilters: Filters) => {
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

// Change from const to export const
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "premium-leather-jacket",
    name: "Premium Leather Jacket",
    price: 24999,
    originalPrice: 29999,
    rating: 4.5,
    image: img.src,
    hoverImage: img1.src,
    isNew: true,
    isTrending: true,
    sizes: ["S", "M", "L", "XL"],
    color: "Black",
    category: "jackets",
  },
  {
    id: 2,
    slug: "classic-denim-shirt",
    name: "Classic Denim Shirt",
    price: 3999,
    originalPrice: 4999,
    rating: 4.0,
    image: img.src,
    hoverImage: img1.src,
    isNew: false,
    isTrending: true,
    sizes: ["S", "M", "L", "XL"],
    color: "Blue",
    category: "shirts",
  },
  {
    id: 3,
    name: "Urban Casual Blazer",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.8,
    image: img.src,
    hoverImage: img1.src,
    isNew: true,
    isTrending: false,
    sizes: ["M", "L", "XL"],
    color: "Navy",
    category: "jackets",
    slug: "urban-casual-blazer"
  },
  {
    id: 4,
    name: "Slim Fit Chinos",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.3,
    image: img.src,
    hoverImage: img1.src,
    isNew: false,
    isTrending: true,
    sizes: ["S", "M", "L", "XL"],
    color: "Gold",
    category: "pants",
    slug: "slim-fit-chinos"
  },
  {
    id: 5,
    name: "Cotton V-Neck T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.6,
    image: img.src,
    hoverImage: img1.src,
    isNew: true,
    isTrending: false,
    sizes: ["S", "M", "L"],
    color: "Gray",
    category: "t-shirts",
    slug: "cotton-v-neck-t-shirt"
  },
  {
    id: 6,
    name: "Hooded Sweatshirt",
    price: 69.99,
    originalPrice: 89.99,
    rating: 4.7,
    image: img.src,
    hoverImage: img1.src,
    isNew: false,
    isTrending: true,
    sizes: ["S", "M", "L", "XL"],
    color: "Red",
    category: "hoodies",
    slug: "hooded-sweatshirt"
  },
  {
    id: 7,
    name: "Striped Oxford Shirt",
    price: 84.99,
    originalPrice: 99.99,
    rating: 4.4,
    image: img.src,
    hoverImage: img1.src,
    isNew: true,
    isTrending: false,
    sizes: ["M", "L", "XL"],
    color: "Blue",
    category: "shirts",
    slug: "striped-oxford-shirt"
  },
  {
    id: 8,
    name: "Cargo Pants",
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.2,
    image: img.src,
    hoverImage: img1.src,
    isNew: false,
    isTrending: true,
    sizes: ["S", "M", "L", "XL"],
    color: "Black",
    category: "pants",
    slug: "cargo-pants"
  },
  {
    id: 9,
    name: "Wool Blend Sweater",
    price: 119.99,
    originalPrice: 149.99,
    rating: 4.9,
    image: img.src,
    hoverImage: img1.src,
    isNew: true,
    isTrending: false,
    sizes: ["S", "M", "L"],
    color: "Gray",
    category: "hoodies",
    slug: "wool-blend-sweater"
  },
  {
    id: 10,
    name: "Urban Casual Blazer",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.8,
    image: img.src,
    hoverImage: img1.src,
    isNew: true,
    isTrending: false,
    sizes: ["M", "L", "XL"],
    color: "Navy",
    category: "jackets",
    slug: "urban-casual-blazer"
  },
];

// Create a custom hook for filter logic
const useProductFilters = (initialProducts: readonly Product[]) => {
  const [tempFilters, setTempFilters] = useState(INITIAL_FILTERS);
  const [activeFilters, setActiveFilters] = useState(INITIAL_FILTERS);
  const [hasFilterChanges, setHasFilterChanges] = useState(false);

  const filteredProducts = useMemo(() => 
    filterProducts(initialProducts, activeFilters),
    [initialProducts, activeFilters]
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
  }, [tempFilters]);

  const handleResetFilters = useCallback(() => {
    setTempFilters(INITIAL_FILTERS);
    setActiveFilters(INITIAL_FILTERS);
    setHasFilterChanges(false);
  }, []);

  return {
    tempFilters,
    hasFilterChanges,
    filteredProducts,
    handleTempFilterChange,
    handleApplyFilters,
    handleResetFilters
  };
};

// Create a custom hook for product sorting and pagination
const useProductSorting = (filteredProducts: Product[]) => {
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return sortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

  return {
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    paginatedProducts,
    totalPages
  };
};

const MensProductPage = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const products = useMemo(() => INITIAL_PRODUCTS, []);
  const [viewMode, setViewMode] = useState("grid");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const effectiveViewMode = isMobile ? "list" : viewMode;

  const {
    tempFilters,
    hasFilterChanges,
    filteredProducts,
    handleTempFilterChange,
    handleApplyFilters,
    handleResetFilters
  } = useProductFilters(products);

  const {
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    paginatedProducts,
    totalPages
  } = useProductSorting(filteredProducts);

  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = useCallback((productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const setupIntersectionObserver = useCallback((productId: number, element: HTMLElement) => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imageContainer = element.querySelector('.product-images');
            if (imageContainer) {
              imageContainer.classList.add('show-hover-image');
            }
          } else {
            const imageContainer = element.querySelector('.product-images');
            if (imageContainer) {
              imageContainer.classList.remove('show-hover-image');
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(element);
    return observer;
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Enhanced Page Title */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-4">
            Mens Collection
          </h1>
          <p className="text-gray-600 text-lg">Elevate your style with our premium menswear selection</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Modified Filters Sidebar */}
          <div className={`
            fixed md:relative md:inset-auto inset-x-0 bottom-0 z-30 
            backdrop-blur-lg md:backdrop-blur-none
            ${isMobileFilterOpen ? 'translate-y-0' : 'translate-y-full'} 
            md:translate-y-0 transition-all duration-300
            ${isMobileFilterOpen ? 'flex' : 'hidden md:flex'}
            flex-col md:w-72
            max-h-[90vh] md:max-h-none
          `}>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100">
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
                          ? 'bg-red-600 text-white' 
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
                          ? 'border-red-600' 
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
                        ? 'bg-red-600 text-white hover:bg-red-700'
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

          {/* Enhanced Product Grid Section */}
          <div className="flex-1">
            {/* Modified toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100">
              <div className="hidden sm:flex items-center space-x-4 w-full sm:w-auto">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-xl flex items-center gap-2 transition-all ${
                    viewMode === "grid" 
                      ? 'bg-gradient-to-r from-red-600 to-red-800 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <FiGrid /> <span>Grid</span>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-xl flex items-center gap-2 transition-all ${
                    viewMode === "list" 
                      ? 'bg-gradient-to-r from-red-600 to-red-800 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <FiList /> <span>List</span>
                </button>
              </div>

              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-4 py-3 border rounded-lg bg-white/80 backdrop-blur-sm"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Modified Product Cards Grid - single column on mobile */}
            <div className={`grid ${
              effectiveViewMode === "grid" 
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8' 
                : 'grid-cols-1 gap-6'
            }`}>
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-100 group"
                  ref={(el) => {
                    if (el) {
                      setupIntersectionObserver(product.id, el);
                    }
                  }}
                >
                  <Link href={`/product/${product.slug}`} className="block">
                    <div className="relative pb-[100%] product-images">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-opacity duration-300 main-image"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <Image
                        src={product.hoverImage}
                        alt={`${product.name} hover`}
                        fill
                        className="object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-300 hover-image"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Badges and wishlist button */}
                      <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start">
                        <div className="flex gap-2">
                          {product.isNew && (
                            <span className="px-4 py-1.5 bg-red-500/90 backdrop-blur-sm text-white text-sm font-medium rounded-full shadow-lg">
                              New
                            </span>
                          )}
                          {product.isTrending && (
                            <span className="px-4 py-1.5 bg-yellow-400/90 backdrop-blur-sm text-black text-sm font-medium rounded-full shadow-lg">
                              Trending
                            </span>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(product.id);
                          }}
                          className={`p-3 rounded-full ${
                            wishlist.includes(product.id) 
                              ? 'bg-red-500 text-white' 
                              : 'bg-white/80'
                          }`}
                        >
                          <FiHeart className={wishlist.includes(product.id) ? 'fill-current' : ''} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Product info */}
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-3">
                        {product.name}
                      </h3>
                      <button className="w-full mb-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl">
                        Add to Cart
                      </button>
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                              ₹{product.price}
                            </span>
                            <span className="text-sm line-through text-gray-400">₹{product.originalPrice}</span>
                          </div>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              i < Math.floor(product.rating) ? 
                                <AiFillStar key={i} className="w-4 h-4" /> : 
                                <AiOutlineStar key={i} className="w-4 h-4" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Enhanced pagination with glassmorphism */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="flex flex-wrap justify-center gap-2 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100">
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
                          ? 'bg-gradient-to-r from-red-600 to-red-800 text-white' 
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

      {/* Enhanced mobile filter button with gradient */}
      <button
        onClick={() => setIsMobileFilterOpen(true)}
        className="fixed bottom-6 right-6 md:hidden px-6 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full shadow-xl flex items-center gap-2 hover:opacity-90 transition-opacity"
      >
        <span>Filters</span>
        <FiChevronDown className={`transform ${isMobileFilterOpen ? 'rotate-180' : 'rotate-0'} transition-transform`} />
      </button>
    </div>
  );
};

export default memo(MensProductPage);