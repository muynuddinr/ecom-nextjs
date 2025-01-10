

"use client";
import React from 'react';
import { useCart } from './CartCounter';
import { useRouter } from 'next/navigation';

const Checkout: React.FC = () => {
  const { cartItems } = useCart();
  const router = useRouter();

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add payment processing logic here
    alert('Order placed successfully!');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent mb-8">
          Checkout
        </h1>

        <div className="bg-white rounded-2xl p-8 shadow-xl shadow-red-100/50">
          {/* Order Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.uniqueKey} className="flex justify-between text-gray-600">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-red-600 mt-3">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  required
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-200 rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full p-3 border border-gray-200 rounded-lg"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Payment Information</h2>
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-3 border border-gray-200 rounded-lg"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-4 rounded-xl hover:shadow-lg hover:shadow-red-200 transition-all duration-200 font-medium"
            >
              Place Order (₹{total.toFixed(2)})
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

