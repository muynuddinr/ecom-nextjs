'use client';
import { usePathname } from 'next/navigation';
import Navbar from '../../Components/navbar';
import Footer from '../../Components/footer';
import { INITIAL_PRODUCTS as MENS_PRODUCTS } from '../../Components/mens';
import { INITIAL_PRODUCTS as WOMENS_PRODUCTS } from '../../Components/womens';
import { INITIAL_PRODUCTS as KIDS_PRODUCTS } from '../../Components/kids';
import { INITIAL_PRODUCTS as ACCESSORIES_PRODUCTS } from '../../Components/accessories';
import ProductDetail from '../../Components/product';

const ProductPage = () => {
  const pathname = usePathname();
  const slug = pathname.split('/').pop(); // Extract the slug from the pathname

  if (!slug) {
    return <div>Loading...</div>; // Handle loading state
  }

  const product = MENS_PRODUCTS.find((product) => product.slug === slug);
  const product2 = WOMENS_PRODUCTS.find((product) => product.slug === slug);
  const product3 = KIDS_PRODUCTS.find((product) => product.slug === slug);
  const product4 = ACCESSORIES_PRODUCTS.find((product) => product.slug === slug);


  if (!product && !product2 && !product3 && !product4) {
    return <div>Product not found</div>;
  }

  return (
      <>
      <Navbar />
      {product ? <ProductDetail params={{ slug: slug as string }} /> : product2 ? <ProductDetail params={{ slug: slug as string }} /> : product3 ? <ProductDetail params={{ slug: slug as string }} /> : product4 ? <ProductDetail params={{ slug: slug as string }} /> : null} 
      <Footer />
    </>
  );
};

export default ProductPage;
