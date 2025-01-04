import React from 'react';
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

const TopPicks: React.FC = () => {
  return (
    <section className="py-16 md:py-32 bg-gradient-to-b from-white to-stone-50">
      <div className="container mx-auto px-4">
        {/* Compact header with subtle gradient */}
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

        {/* Enhanced product grid */}
        <div className="relative">
          <div className="md:hidden text-center mb-6 text-sm text-black/60 animate-pulse">
            Scroll to explore →
          </div>

          <div className="grid 
            grid-cols-[repeat(3,85%)] md:grid-cols-2 lg:grid-cols-3
            overflow-x-auto overflow-y-hidden md:overflow-visible
            snap-x snap-mandatory md:snap-none
            -mx-4 px-4 md:mx-0 md:px-0
            scrollbar-none
            scroll-smooth
            gap-6 md:gap-12">
            {topPicksData.map((item) => (
              <div 
                key={item.id} 
                className="group snap-center md:snap-align-none transform transition-transform duration-500 hover:-translate-y-2"
              >
                {/* Enhanced card design */}
                <div className="relative bg-white p-4 md:p-6 rounded-2xl h-full shadow-sm hover:shadow-xl transition-shadow duration-500">
                  {/* Enhanced image container */}
                  <div className="relative aspect-square mb-4 md:mb-6 overflow-hidden rounded-xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover brightness-100 group-hover:scale-110 transition-all duration-700"
                      sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                    {/* Enhanced overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="bg-white text-black px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-full transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-red-500 hover:text-white">
                          View Product
                        </button>
                      </div>
                    </div>
                    {/* Enhanced price tag */}
                    <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-white/95 backdrop-blur-sm text-black px-3 md:px-4 py-1 md:py-2 rounded-full text-sm md:text-base font-medium shadow-lg">
                      ₹{item.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Enhanced product info */}
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs text-red-500 tracking-wider uppercase font-semibold">
                          {item.category}
                        </span>
                        <h3 className="text-base md:text-xl font-medium mt-1 group-hover:text-red-500 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <span className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-red-500 group-hover:border-red-500 group-hover:text-white transition-all duration-300">
                        →
                      </span>
                    </div>
                    <div className="h-px w-full bg-gradient-to-r from-stone-200 via-red-500/20 to-stone-200"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced scroll indicators */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {topPicksData.map((_, index) => (
              <div 
                key={index}
                className="w-2 h-2 rounded-full bg-stone-300 first:bg-red-500"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {/* Enhanced CTA button */}
        <div className="mt-12 md:mt-24 text-center">
          <a href="#" className="group relative inline-block overflow-hidden rounded-full">
            <span className="relative z-10 block px-8 md:px-12 py-3 md:py-4 bg-black text-white text-sm md:text-base font-medium">
              <span className="group-hover:opacity-0 transition-opacity duration-300">
                Explore Collection
              </span>
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Lets Go →
              </span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TopPicks;
