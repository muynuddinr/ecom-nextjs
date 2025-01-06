'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import womens from "../../../public/womens.jpg"
import mens from "../../../public/mens.jpg"
import kids from "../../../public/kid.jpg"
import accessories from "../../../public/accessories.jpg"


const CATEGORIES = [
  {
    title: "Women's Collection",
    subtitle: "NEW SEASON",
    description: "Elevate your style with our latest collection",
    mainImage: womens.src,
    smallImage: womens,
    accent: "bg-red-600",
    link: "/womens"
  },
  {
    title: "Men's Collection",
    subtitle: "URBAN ESSENTIALS",
    description: "Contemporary styles for the modern man",
    mainImage: mens.src,
    smallImage: mens,
    accent: "bg-red-600",
    link: "/mens"
  },
  {
    title: "Kids Collection",
    subtitle: "PLAYFUL & PRACTICAL",
    description: "Comfortable and stylish outfits for little ones",
    mainImage: kids.src,
    smallImage: kids.src,
    accent: "bg-red-600",
    link: "/kids"
  },
  {
    title: "Accessories",
    subtitle: "FINISHING TOUCHES",
    description: "Complete your look with perfect details",
    mainImage: accessories.src,
    smallImage: accessories.src,
    accent: "bg-red-600",
    link: "/accessories"
  }
] as const;

const CategoryButton = ({ 
  category, 
  isActive, 
  onClick 
}: {
  category: typeof CATEGORIES[number];
  isActive: boolean;
  onClick: () => void;
}) => (
  <motion.button
    className={`w-full text-left p-4 rounded-xl transition-all
              ${isActive ? 'bg-white shadow-lg scale-[1.02]' : 'hover:bg-red-50'}
              touch-pan-x sm:touch-pan-y`}
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="flex items-center space-x-3">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden relative">
        <Image
          src={category.smallImage}
          alt={category.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 48px, 64px"
        />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{category.subtitle}</p>
        <h3 className="font-semibold text-base sm:text-lg">{category.title}</h3>
      </div>
    </div>
  </motion.button>
);

const CategoryContent = ({
  category,
}: {
  category: typeof CATEGORIES[number];
}) => (
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
);

const Banner = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="relative bg-white">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 lg:py-12">
        <div className="grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Navigation */}
          <div className="lg:col-span-3 flex lg:block 
                        overflow-x-auto lg:overflow-visible 
                        scrollbar-hide scroll-smooth snap-x lg:snap-none
                        space-x-4 lg:space-x-0 lg:space-y-4
                        pb-4 lg:pb-0 -mx-3 px-3 sm:mx-0 sm:px-0">
            {CATEGORIES.map((category, index) => (
              <div key={index} 
                   className="w-[280px] sm:w-[320px] lg:w-full flex-shrink-0 
                            snap-start lg:snap-align-none">
                <CategoryButton
                  category={category}
                  isActive={activeCategory === index}
                  onClick={() => setActiveCategory(index)}
                />
              </div>
            ))}
          </div>

          {/* Right Column - Main Display */}
          <div className="lg:col-span-9 relative h-[40vh] sm:h-[50vh] lg:h-[70vh] 
                        rounded-xl sm:rounded-2xl overflow-hidden
                        shadow-lg">
            {CATEGORIES.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activeCategory === index ? 1 : 0,
                  scale: activeCategory === index ? 1 : 1.1
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0"
                style={{ 
                  display: activeCategory === index ? 'block' : 'none',
                  willChange: 'opacity, transform'
                }}
              >
                <Image
                  src={category.mainImage}
                  alt={category.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw,
                         (max-width: 1024px) 75vw,
                         66vw"
                  quality={90}
                />
                <CategoryContent category={category} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Banner;
