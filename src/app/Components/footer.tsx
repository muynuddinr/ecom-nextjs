"use client"
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About MarketPlace</h3>
            <p className="text-gray-600">
              Your trusted multi-vendor marketplace for quality products from verified sellers worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-600 hover:text-gray-900">Shop</Link></li>
              <li><Link href="/vendors" className="text-gray-600 hover:text-gray-900">Vendors</Link></li>
              <li><Link href="/categories" className="text-gray-600 hover:text-gray-900">Categories</Link></li>
              <li><Link href="/deals" className="text-gray-600 hover:text-gray-900">Deals</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link></li>
              <li><Link href="/shipping" className="text-gray-600 hover:text-gray-900">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-gray-600 hover:text-gray-900">Returns Policy</Link></li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FaLinkedin size={24} />
              </a>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-100 text-gray-800 px-4 py-2 rounded-l focus:outline-none"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} MarketPlace. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900 text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-gray-900 text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
