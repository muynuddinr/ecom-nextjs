'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { INITIAL_PRODUCTS } from '../Components/mens';
import { INITIAL_PRODUCTS as WOMENS_PRODUCTS } from '../Components/womens';
import { INITIAL_PRODUCTS as KIDS_PRODUCTS } from '../Components/kids';
import { INITIAL_PRODUCTS as ACCESSORIES_PRODUCTS } from '../Components/accessories';
import Link from 'next/link';


export default function ProductDetail({ params }: { params: { slug: string } }) {
  const product = INITIAL_PRODUCTS.find(p => p.slug === params.slug);
  const product2 = WOMENS_PRODUCTS.find(p => p.slug === params.slug);
  const product3 = KIDS_PRODUCTS.find(p => p.slug === params.slug);
  const product4 = ACCESSORIES_PRODUCTS.find(p => p.slug === params.slug);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Get the active product (either from mens or womens)
  const activeProduct = product || product2 || product3 || product4;

  // If no product is found, show error
  if (!activeProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li><Link href="/" className="hover:text-red-600">Home</Link></li>
            <li>/</li>
            <li><Link href="/mens" className="hover:text-red-600">Mens</Link></li>
            <li>/</li>
            <li><Link href="/womens" className="hover:text-red-600">Womens</Link></li>
            <li>/</li>
            <li><Link href="/kids" className="hover:text-red-600">Kids</Link></li>  
            <li>/</li>
            <li><Link href="/accessories" className="hover:text-red-600">Accessories</Link></li>
            <li>/</li>
            <li className="text-red-600">{activeProduct.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src={activeProduct.image}
                alt={activeProduct.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[activeProduct.image, activeProduct.hoverImage].map((img, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={img}
                    alt={`${activeProduct.name} view ${index + 1}`}
                    fill
                    className="object-cover cursor-pointer hover:opacity-75"
                    sizes="(max-width: 768px) 25vw, 12vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{activeProduct.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    i < Math.floor(activeProduct.rating) ? 
                      <AiFillStar key={i} className="w-5 h-5" /> : 
                      <AiOutlineStar key={i} className="w-5 h-5" />
                  ))}
                </div>
                <span className="text-gray-600">({activeProduct.rating} reviews)</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold">₹{activeProduct.price}</span>
                <span className="text-xl text-gray-500 line-through">₹{activeProduct.originalPrice}</span>
                <span className="text-green-600 font-medium">
                  {Math.round((1 - activeProduct.price/activeProduct.originalPrice) * 100)}% OFF
                </span>
              </div>
              <p className="text-green-600">inclusive of all taxes</p>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <h3 className="font-semibold">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {activeProduct.sizes?.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-lg border-2 flex items-center justify-center ${
                      selectedSize === size 
                        ? 'border-red-600 text-red-600' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-4">
              <h3 className="font-semibold">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl flex items-center justify-center space-x-2">
                <FiShoppingCart />
                <span>Add to Cart</span>
              </button>
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  isWishlisted ? 'bg-red-600 text-white' : 'border border-gray-300'
                }`}
              >
                <FiHeart className={isWishlisted ? 'fill-current' : ''} />
              </button>
            </div>

            {/* Product Details */}
            <div className="space-y-4 pt-6 border-t">
              <h3 className="font-semibold">Product Details</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Category: {activeProduct.category}</li>
                <li>Color: {activeProduct.color}</li>
                <li>Available Sizes: {activeProduct.sizes?.join(', ')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
