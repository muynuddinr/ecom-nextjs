import Navbar from "../../Components/navbar";
import Product from "../../Components/product";
import Footer from "../../Components/footer";

interface Props {
  params: { id: string };
}

export default async function ProductPage(props: Props) {
  const { params } = props;
  const { id } = params;

  return (
    <>
      <Navbar />
      <Product params={{ id }} />
      <Footer />
    </>
  );
}
