'use client';
import React, { useState } from 'react';
import { useCart } from './CartCounter';
import { FiShoppingCart } from 'react-icons/fi';

interface AddToCartButtonProps {
  product: any;
  className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, className = '' }) => {
  const { addToCart } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAnimating) {
      setIsAnimating(true);
      addToCart(product);
      
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        group relative overflow-hidden transform transition-all duration-300 ease-out
        ${className}
        ${isAnimating ? 'scale-95 bg-green-600' : 'bg-red-600 hover:bg-red-700 hover:scale-105'}
        before:content-[''] before:absolute before:inset-0 before:bg-white/20
        before:scale-0 before:opacity-0 before:transition-transform before:duration-500
        before:rounded-full before:origin-center hover:before:scale-[2.5] hover:before:opacity-100
      `}
      disabled={isAnimating}
    >
      <div className="relative flex items-center justify-center gap-2">
        <FiShoppingCart className={`transition-transform duration-300 ${
          isAnimating ? 'rotate-[360deg] scale-110' : 'group-hover:scale-110'
        }`} />
        <span className={`transition-all duration-300 ${
          isAnimating ? 'opacity-0' : 'opacity-100'
        }`}>
          Add to Cart
        </span>
        {isAnimating && (
          <span className="absolute inset-0 flex items-center justify-center text-white">
            Added! ✓
          </span>
        )}
      </div>
    </button>
  );
};

export default AddToCartButton; 