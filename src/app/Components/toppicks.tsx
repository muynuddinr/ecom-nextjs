import React, { useMemo } from 'react';
import Image from 'next/image';
import img1 from "../../../public/mens.jpg"
import img2 from "../../../public/kid.jpg"
import img3 from "../../../public/womens.jpg"

interface TopPickItem {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
}

const topPicksData: TopPickItem[] = [
  {
    id: 1,
    title: "Premium Headphones",
    image: img1.src,
    price: 24999,
    category: "Audio"
  },
  {
    id: 2,
    title: "Wireless Speaker",
    image: img2.src,
    price: 15999,
    category: "Audio"
  },
  {
    id: 3,
    title: "Smartwatch",
    image: img3.src,
    price: 19999,
    category: "Wearables"
  },
];

const ProductCard: React.FC<{ item: TopPickItem }> = ({ item }) => (
  <div className="group snap-center md:snap-align-none transform transition-transform duration-500 hover:-translate-y-2">
    <div className="relative bg-white p-4 md:p-6 rounded-2xl h-full shadow-sm hover:shadow-xl transition-shadow duration-500">
      {/* Image container */}
      <ProductImage item={item} />
      
      {/* Product info */}
      <ProductInfo item={item} />
    </div>
  </div>
);

const ProductImage: React.FC<{ item: TopPickItem }> = ({ item }) => (
  <div className="relative aspect-square mb-4 md:mb-6 overflow-hidden rounded-xl">
    <Image
      src={item.image}
      alt={item.title}
      fill
      className="object-cover brightness-100 group-hover:scale-110 transition-all duration-700"
      sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
      priority
    />
    <ImageOverlay />
    <PriceTag price={item.price} />
  </div>
);

const ImageOverlay: React.FC = () => (
  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
);

const PriceTag: React.FC<{ price: number }> = ({ price }) => (
  <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded-lg shadow-sm">
    <span className="font-medium">₹{(price / 100).toFixed(2)}</span>
  </div>
);

const ProductInfo: React.FC<{ item: TopPickItem }> = ({ item }) => (
  <div className="space-y-2">
    <h3 className="font-medium text-lg">{item.title}</h3>
    <p className="text-sm text-gray-600">{item.category}</p>
  </div>
);

const CTAButton: React.FC = () => (
  <div className="text-center mt-12">
    <button className="px-8 py-3 bg-black text-white rounded-full hover:bg-red-500 transition-colors duration-300">
      View All Products
    </button>
  </div>
);

const MobileScrollIndicator: React.FC = () => (
  <div className="absolute -left-4 top-1/2 -translate-y-1/2 md:hidden">
    <div className="bg-gradient-to-r from-white/80 to-transparent w-8 h-full" />
  </div>
);

const ScrollIndicators: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex justify-center gap-2 mt-6 md:hidden">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="w-1.5 h-1.5 rounded-full bg-black/20" />
    ))}
  </div>
);

const TopPicks: React.FC = () => {
  // Memoize static content
  const renderHeader = useMemo(() => (
    <div className="mb-8 md:mb-12 relative">
      <div className="overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-48 h-48 bg-red-500/20 rounded-full blur-2xl"></div>
        </div>
        
        {/* Compact title */}
        <h2 className="relative text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-center">
          <span className="bg-gradient-to-r from-black via-red-500 to-black bg-clip-text text-transparent animate-gradient">
            TOP PICKS
          </span>
        </h2>
      </div>
      
      {/* Minimal subtitle */}
      <p className="text-black/60 text-center mt-2 text-sm md:text-base font-light">
        <span className="inline-block border-b border-red-500/30 pb-0.5">
          Discover Our Most Popular Products
        </span>
      </p>
      
      {/* Small decorative dots */}
      <div className="absolute -top-2 right-2 md:right-10 flex gap-0.5">
        <div className="w-0.5 h-0.5 rounded-full bg-red-500"></div>
        <div className="w-0.5 h-0.5 rounded-full bg-red-500/50"></div>
        <div className="w-0.5 h-0.5 rounded-full bg-red-500/25"></div>
      </div>
    </div>
  ), []);

  return (
    <section className="py-16 md:py-32 bg-gradient-to-b from-white to-stone-50">
      <div className="container mx-auto px-4">
        {renderHeader}
        
        <div className="relative">
          <MobileScrollIndicator />
          
          {/* Product grid with performance optimizations */}
          <div className="grid grid-cols-[repeat(3,85%)] md:grid-cols-2 lg:grid-cols-3 overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory md:snap-none -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none scroll-smooth gap-6 md:gap-12">
            {topPicksData.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
          
          <ScrollIndicators count={topPicksData.length} />
        </div>
        
        <CTAButton />
      </div>
    </section>
  );
};

export default TopPicks;
