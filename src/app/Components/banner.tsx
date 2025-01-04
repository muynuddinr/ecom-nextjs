'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import img from "../../../public/banner.jpg"

const Banner = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    {
      title: "Women's Collection",
      subtitle: "NEW SEASON",
      description: "Elevate your style with our latest collection",
      mainImage: img.src,
      smallImage: img.src,
      accent: "bg-rose-500",
      link: "/womens"
    },
    {
      title: "Men's Collection",
      subtitle: "URBAN ESSENTIALS",
      description: "Contemporary styles for the modern man",
      mainImage: img.src,
      smallImage: img.src,
      accent: "bg-blue-500",
      link: "/mens"
    },
    {
      title: "Kids Collection",
      subtitle: "PLAYFUL & PRACTICAL",
      description: "Comfortable and stylish outfits for little ones",
      mainImage: img.src,
      smallImage: img.src,
      accent: "bg-green-500",
      link: "/kids"
    },
    {
      title: "Accessories",
      subtitle: "FINISHING TOUCHES",
      description: "Complete your look with perfect details",
      mainImage: img.src,
      smallImage: img.src,
      accent: "bg-amber-500",
      link: "/accessories"
    }
  ];

  return (
    <section className="relative bg-gray-50">
      {/* Main Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Navigation */}
          <div className="lg:col-span-3 space-y-6">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                className={`w-full text-left p-4 rounded-xl transition-all
                          ${activeCategory === index ? 'bg-white shadow-lg' : ''}`}
                onClick={() => setActiveCategory(index)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg overflow-hidden relative`}>
                    <Image
                      src={category.smallImage}
                      alt={category.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{category.subtitle}</p>
                    <h3 className="font-semibold">{category.title}</h3>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right Column - Main Display */}
          <div className="lg:col-span-9 relative h-[70vh] rounded-2xl overflow-hidden">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activeCategory === index ? 1 : 0,
                  scale: activeCategory === index ? 1 : 1.1
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
                style={{ display: activeCategory === index ? 'block' : 'none' }}
              >
                <Image
                  src={category.mainImage}
                  alt={category.title}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent">
                  <div className="absolute bottom-0 left-0 p-8 max-w-xl">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className={`px-4 py-1 rounded-full text-sm text-white ${category.accent}`}>
                        {category.subtitle}
                      </span>
                      <h2 className="text-4xl lg:text-6xl font-bold text-white mt-4 mb-4">
                        {category.title}
                      </h2>
                      <p className="text-white/90 text-lg mb-6">
                        {category.description}
                      </p>
                      <Link
                        href={category.link}
                        className="inline-flex items-center space-x-2 bg-white text-black 
                                 px-6 py-3 rounded-lg hover:bg-black hover:text-white 
                                 transition-colors duration-300"
                      >
                        <span>Explore Collection</span>
                        <svg 
                          className="w-4 h-4" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 5l7 7-7 7" 
                          />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
