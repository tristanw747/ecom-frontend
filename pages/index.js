import Header from "@/components/Header";
import Featured from "@/components/Featured";
import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";

export default function HomePage({featuredProduct,newProducts}) {
  // console.log(featuredProduct)
  // console.log(newProducts)
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '643d8f31af3253c63b385555';
  await mongooseConnect();
  let featuredProduct = await Product.findById(featuredProductId);
  let newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  // featuredProduct=JSON.parse(JSON.stringify(featuredProduct))
  // newProducts=JSON.parse(JSON.stringify(newProducts))
  featuredProduct=JSON.stringify(featuredProduct)
  newProducts=JSON.stringify(newProducts)

  return {
    props: {
      featuredProduct,
      newProducts
    },
  };
}

