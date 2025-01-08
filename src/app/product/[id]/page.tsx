'use client';
import { usePathname } from 'next/navigation';
import Navbar from '../../Components/navbar';
import Footer from '../../Components/footer';
import { INITIAL_PRODUCTS } from '../../Components/mens';
import ProductDetail from '../../Components/product';

const ProductPage = () => {
  const pathname = usePathname();
  const slug = pathname.split('/').pop(); // Extract the slug from the pathname

  if (!slug) {
    return <div>Loading...</div>; // Handle loading state
  }

  const product = INITIAL_PRODUCTS.find((product) => product.slug === slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
      <>
      <Navbar />
      <ProductDetail params={{ slug: slug as string }} />
      <Footer />
    </>
  );
};

export default ProductPage;
