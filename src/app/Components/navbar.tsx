"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes, FaStore, 
         FaBox, FaChartLine, FaHeart, FaBell, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCart } from './CartCounter';

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVendorMenuOpen, setIsVendorMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { cartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      if (isVendorMenuOpen || isUserMenuOpen || isCategoryOpen) {
        setIsVendorMenuOpen(false);
        setIsUserMenuOpen(false);
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVendorMenuOpen, isUserMenuOpen, isCategoryOpen]);

  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const suggestions = [
        `${searchQuery} in Electronics`,
        `${searchQuery} in Fashion`,
        `Popular: ${searchQuery} deals`,
        `Trending: ${searchQuery} items`,
      ];
      setSearchSuggestions(suggestions);
    }
  }, [searchQuery]);

  useEffect(() => {
    // Simulating auth check - replace with your actual auth logic
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(isLoggedIn);
    };
    checkAuth();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setRecentSearches(prev => [searchQuery, ...prev.slice(0, 4)]);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    setIsAuthenticated(false);
  };

  const renderUserMenu = () => (
    <div className="relative">
      <button 
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
      >
        <FaUser className="h-6 w-6" />
      </button>

      {/* Enhanced User Mega Menu */}
      <AnimatePresence>
        {isUserMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-[300px] bg-white rounded-xl shadow-lg py-4 border"
          >
            {isAuthenticated ? (
              // Logged in user view
              <>
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                  <p className="text-xs text-gray-500">Manage your account</p>
                </div>
                <div className="grid grid-cols-2 gap-2 p-4">
                  <Link href="/account" className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50">
                    <FaUser className="h-5 w-5 text-gray-400 mb-1" />
                    <span className="text-sm text-gray-700">Profile</span>
                  </Link>
                  <Link href="/orders" className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50">
                    <FaBox className="h-5 w-5 text-gray-400 mb-1" />
                    <span className="text-sm text-gray-700">Orders</span>
                  </Link>
                  <Link href="/wishlist" className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50">
                    <FaHeart className="h-5 w-5 text-gray-400 mb-1" />
                    <span className="text-sm text-gray-700">Wishlist</span>
                  </Link>
                  <Link href="/settings" className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50">
                    <FaCog className="h-5 w-5 text-gray-400 mb-1" />
                    <span className="text-sm text-gray-700">Settings</span>
                  </Link>
                </div>
                <div className="px-4 pt-2 border-t">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-50 rounded-lg"
                  >
                    <FaSignOutAlt className="h-4 w-4 mr-3" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              // Guest view
              <>
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-medium text-gray-900">Welcome to FashAT</p>
                  <p className="text-xs text-gray-500">Join us or sign in to your account</p>
                </div>
                <div className="p-4 space-y-3">
                  <Link 
                    href="/login"
                    className="block w-full px-4 py-2 text-center bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register"
                    className="block w-full px-4 py-2 text-center border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Create Account
                  </Link>
                </div>
                <div className="px-4 pt-2 border-t">
                  <div className="text-xs text-gray-500 mb-2">Quick Links:</div>
                  <Link href="/track-order" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                    <FaBox className="h-4 w-4 mr-3 text-gray-400" />
                    Track Order
                  </Link>
                  <Link href="/help" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                    <FaBell className="h-4 w-4 mr-3 text-gray-400" />
                    Help Center
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-lg' : ''
    }`}>
      {/* Top Announcement Bar - Add animation */}
      <motion.div 
        initial={{ height: 40 }}
        animate={{ height: isScrolled ? 0 : 40 }}
        className="bg-gradient-to-r from-red-600 to-red-500 text-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 text-center text-sm font-medium">
          Become a seller today and reach millions of customers! 
          <Link href="/become-seller" className="ml-2 underline hover:text-yellow-300">
            Start Selling →
          </Link>
        </div>
      </motion.div>

      {/* Main Navbar - Add hover effects and transitions */}
      <nav className={`bg-white transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                Fash<span className="text-gray-800">AT</span>
              </span>
            </Link>

            {/* Search Bar - Centered */}
            <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-3xl mx-6">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, stores, brands..."
                  className={`w-full pl-12 pr-4 py-2.5 rounded-xl border ${
                    isSearchFocused ? 'border-red-600 ring-2 ring-red-100' : 'border-gray-300'
                  } focus:outline-none transition-all duration-300`}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                />
                <FaSearch className="absolute left-4 top-3 text-gray-400" />
                <button 
                  type="submit"
                  className="absolute right-2 top-1.5 px-4 py-1 bg-red-600 text-white rounded-lg 
                           hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
                >
                  Search
                </button>

                {/* Search Suggestions Dropdown */}
                {isSearchFocused && (searchSuggestions.length > 0 || recentSearches.length > 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute w-full bg-white mt-2 rounded-xl shadow-lg border z-50"
                  >
                    {recentSearches.length > 0 && (
                      <div className="p-2 border-b">
                        <div className="text-xs text-gray-500 mb-2">Recent Searches</div>
                        {recentSearches.map((search, index) => (
                          <div
                            key={index}
                            className="flex items-center px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                            onClick={() => setSearchQuery(search)}
                          >
                            <FaSearch className="h-3 w-3 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-700">{search}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {searchSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSearchQuery(suggestion)}
                      >
                        <div className="flex items-center">
                          <FaSearch className="h-3 w-3 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-700">{suggestion}</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </form>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
              {/* Vendor Dashboard */}
              <div className="relative hidden md:block">
                <button 
                  onClick={() => setIsVendorMenuOpen(!isVendorMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <FaStore className="h-5 w-5" />
                  <span className="font-medium">Seller Center</span>
                </button>
                
                {/* Vendor Dropdown */}
                <AnimatePresence>
                  {isVendorMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 border"
                    >
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium text-gray-900">Seller Dashboard</p>
                        <p className="text-xs text-gray-500">Manage your store</p>
                      </div>
                      <div className="py-1">
                        <Link href="/vendor/dashboard" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <FaChartLine className="h-4 w-4 mr-3 text-gray-400" />
                          Analytics
                        </Link>
                        <Link href="/vendor/products" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <FaBox className="h-4 w-4 mr-3 text-gray-400" />
                          Products
                        </Link>
                        <Link href="/vendor/orders" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <FaShoppingCart className="h-4 w-4 mr-3 text-gray-400" />
                          Orders
                        </Link>
                        <Link href="/vendor/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <FaCog className="h-4 w-4 mr-3 text-gray-400" />
                          Settings
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Notifications */}
              <button className="relative text-gray-700 hover:text-red-600 transition-colors">
                <FaBell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Wishlist */}
              <Link href="/wishlist" className="hidden md:block text-gray-700 hover:text-red-600 transition-colors">
                <FaHeart className="h-6 w-6" />
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative group">
                <div className="relative text-gray-700 hover:text-red-600 transition-colors">
                  <FaShoppingCart className="h-6 w-6" />
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 
                               flex items-center justify-center group-hover:bg-red-700"
                  >
                    {cartItems.length}
                  </motion.span>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute invisible group-hover:visible -right-4 top-8 bg-white shadow-lg 
                             rounded-lg p-4 w-80 z-50 border"
                >
                  <div className="text-sm font-medium text-gray-900 mb-3">Shopping Cart ({cartItems.length})</div>
                  {/* Cart Items */}
                  <div className="space-y-3 max-h-60 overflow-auto">
                    {cartItems.map((item) => (
                      <div key={item.uniqueKey} className="flex items-center space-x-3 border-b pb-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-md">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-800">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.quantity} x ${item.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex justify-between text-sm mb-3">
                      <span>Subtotal:</span>
                      <span className="font-medium">
                        ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                      </span>
                    </div>
                    <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 
                                     transition-colors text-sm">
                      Checkout
                    </button>
                  </div>
                </motion.div>
              </Link>

              {/* User Account */}
              {renderUserMenu()}

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <div className="px-4">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-100"
                  />
                </div>
                <div className="px-4 py-2 border-t border-gray-200">
                  <div className="text-sm font-semibold text-gray-800 mb-2">Quick Navigation</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['Mens', 'Womens', 'Kids', 'Accessories'].map((item) => (
                      <Link
                        key={item}
                        href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-red-600"
                      >
                        <span>{item}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="px-4 py-2 border-t border-gray-200">
                  <div className="text-sm font-semibold text-gray-800 mb-2">Customer Support</div>
                  <div className="space-y-2">
                    <Link href="/customer-service" className="block text-gray-600 hover:text-red-600">
                      Customer Service
                    </Link>
                    <Link href="/gift-cards" className="block text-gray-600 hover:text-red-600">
                      Gift Cards
                    </Link>
                    <Link href="/track-order" className="block text-gray-600 hover:text-red-600">
                      Track Order
                    </Link>
                  </div>
                </div>

                <Link href="/vendor/dashboard" className="px-4 py-2 hover:bg-gray-50 flex items-center space-x-2">
                  <FaStore className="h-5 w-5 text-gray-400" />
                  <span>Seller Center</span>
                </Link>
                <Link href="/wishlist" className="px-4 py-2 hover:bg-gray-50 flex items-center space-x-2">
                  <FaHeart className="h-5 w-5 text-gray-400" />
                  <span>Wishlist</span>
                </Link>
                <Link href="/orders" className="px-4 py-2 hover:bg-gray-50 flex items-center space-x-2">
                  <FaBox className="h-5 w-5 text-gray-400" />
                  <span>My Orders</span>
                </Link>
                <div className="px-4 py-2 border-t border-gray-200">
                  <div className="text-sm font-semibold text-gray-800 mb-2">Categories</div>
                  <div className="space-y-2">
                    <Link href="/category/electronics" className="block text-gray-600 hover:text-red-600">
                      Electronics & Gadgets
                    </Link>
                    <Link href="/category/fashion" className="block text-gray-600 hover:text-red-600">
                      Fashion & Apparel
                    </Link>
                    <Link href="/category/home" className="block text-gray-600 hover:text-red-600">
                      Home & Living
                    </Link>
                    <Link href="/category/beauty" className="block text-gray-600 hover:text-red-600">
                      Beauty & Health
                    </Link>
                  </div>
                </div>

                <div className="px-4 py-2 border-t border-gray-200">
                  <div className="text-sm font-semibold text-gray-800 mb-2">Quick Links</div>
                  <div className="space-y-2">
                    <Link href="/mens" className="block text-gray-600 hover:text-red-600">
                      Mens
                    </Link>
                    <Link href="/womens" className="block text-gray-600 hover:text-red-600">
                      Womens
                    </Link>
                    <Link href="/kids" className="block text-gray-600 hover:text-red-600">
                      Kids
                    </Link>
                    <Link href="/accessories" className="block text-red-500 hover:text-red-600">
                      Accessories
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* New Category Navigation Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-12">
            {/* Categories Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center space-x-2 text-gray-700 hover:text-red-600 py-3 px-4 font-medium"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <FaBars className="h-4 w-4" />
                <span>All Categories</span>
              </button>

              {isCategoryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 w-64 bg-white border rounded-lg shadow-lg py-2"
                >
                  <Link href="/category/electronics" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50">
                    Electronics & Gadgets
                  </Link>
                  <Link href="/category/fashion" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50">
                    Fashion & Apparel
                  </Link>
                  <Link href="/category/home" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50">
                    Home & Living
                  </Link>
                  <Link href="/category/beauty" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50">
                    Beauty & Health
                  </Link>
                  <Link href="/category/sports" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50">
                    Sports & Outdoor
                  </Link>
                  <Link href="/category/books" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50">
                    Books & Stationery
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 ml-8">
              {['Mens', 'Womens', 'Kids', 'Accessories'].map((item) => (
                <Link 
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-gray-600 hover:text-red-600 font-medium relative group"
                >
                  {item}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 origin-left"
                  />
                </Link>
              ))}
            </div>

            {/* Right Side Links */}
            <div className="hidden md:flex items-center ml-auto space-x-6">
              <Link href="/customer-service" className="text-gray-600 hover:text-red-600 text-sm">
                Customer Service
              </Link>
              <Link href="/gift-cards" className="text-gray-600 hover:text-red-600 text-sm">
                Gift Cards
              </Link>
              <Link href="/track-order" className="text-gray-600 hover:text-red-600 text-sm">
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
