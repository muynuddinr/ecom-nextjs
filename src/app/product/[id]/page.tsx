import Navbar from "../../Components/navbar";
import Product from "../../Components/product";
import Footer from "../../Components/footer";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const productData = {
    id: '1',
    name: 'Example Product',
    price: 99.99,
    description: 'This is a detailed product description...',
    images: ['/image1.jpg', '/image2.jpg', '/image3.jpg', '/image4.jpg'],
    rating: 4,
    reviews: 123,
    stock: 10
  };

  return (
    <>
      <Navbar />
      <Product params={{ id: productData.id }} />
      <Footer />
    </>
  );
}
