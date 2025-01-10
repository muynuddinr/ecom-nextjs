"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import img from '../../../public/mens.jpg'
import img2 from '../../../public/kid.jpg'
import img3 from '../../../public/womens.jpg'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from './CartCounter';

interface CartItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  uniqueKey: string;
}

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [total, setTotal] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    // Calculate total whenever cart items change
    const newTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(newTotal);
  }, [cartItems]);

  const removeItem = (slug: string) => {
    removeFromCart(slug);
  };

  const handleQuantityChange = (slug: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(slug, newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
            Your Cart
          </h1>
          <div className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
            <span className="text-gray-600">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="max-w-lg mx-auto text-center bg-white rounded-2xl p-12 shadow-xl shadow-red-100/50">
            <img 
              src="https://illustrations.popsy.co/red/taking-notes.svg" 
              alt="Empty cart" 
              className="w-48 h-48 mx-auto mb-6"
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Time to fill it with amazing products!</p>
            <Link href="/">
              <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-full hover:shadow-lg hover:shadow-red-200 transition-all duration-200">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Products List */}
            <div className="lg:w-2/3 space-y-6">
              {cartItems.map((item) => (
                <div key={item.uniqueKey} 
                  className="bg-white rounded-2xl p-6 shadow-xl shadow-red-100/50 hover:shadow-red-200/50 transition-shadow">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="relative w-full sm:w-40 h-40">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-rose-100 rounded-xl"></div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-cover rounded-xl mix-blend-multiply hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {item.name}
                              <span className="ml-2 text-sm font-normal text-gray-500">
                                ({item.category})
                              </span>
                            </h3>
                            <div className="inline-flex items-center px-3 py-1 bg-red-50 rounded-full">
                              <span className="text-sm text-red-600 font-medium">
                                ₹{item.price.toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeItem(item.uniqueKey)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                          >
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center gap-2 bg-gray-50 rounded-full p-1">
                          <button
                            onClick={() => handleQuantityChange(item.uniqueKey, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-red-50 transition-colors"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.uniqueKey, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-red-50 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                          <p className="text-lg font-bold text-red-600">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl p-8 shadow-xl shadow-red-100/50 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-500 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="font-medium">₹{(total * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-6 mb-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg text-gray-900 font-medium">Total</span>
                    <span className="text-2xl font-bold text-red-600">
                      ₹{(total + (total * 0.1)).toFixed(2)}
                    </span>
                  </div>

                  <button 
                    onClick={() => router.push('/checkout')}
                    className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-4 rounded-xl hover:shadow-lg hover:shadow-red-200 transition-all duration-200 font-medium"
                  >
                    Checkout Now
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure Payment
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {['Visa', 'Mastercard', 'PayPal'].map((method) => (
                      <div key={method} className="bg-gray-50 rounded-lg p-2 text-center text-sm text-gray-600">
                        {method}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
