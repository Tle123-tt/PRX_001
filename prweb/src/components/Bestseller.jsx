import { apiGetProduct } from "../apis/product";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Product from "./Product";

const tabs = [
  {
    id: 1,
    name: "best sellers",
  },
  {
    id: 2,
    name: "new book",
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
};

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState(null);
  const [newProducts, setNewProducts] = useState(null);
  const [activedTab, setActivedTab] = useState(1);
  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    const response = await Promise.all([
      apiGetProduct({ sort: "-sold" }),
      apiGetProduct({ sort: "-createdAt" }),
    ]);
    if (response[0]?.success) setBestSeller(response[0].Products);
    if (response[1]?.success) setNewProducts(response[1].Products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(()=>{
    if(activedTab===1) setProducts(bestSeller)
    if(activedTab===2) setProducts(newProducts)
  },[activedTab])

  return (
    <div className="mb-12">
      <div className='flex gap-8 my-8 pb-4 text-3xl border-l-0 border-r-0 border-t-0 border-1 border-solid border-red-600'>
        {tabs.map((el) => (
          <span
            key={el.id}
            className={` text-gray-400 font-medium  capitalize pr-11 font-sans ${
              activedTab === el.id ? "text-slate-900" : " "
            }`}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className='my-3'>
        <Slider {...settings}>
          {products?.map(el=>(
            <Product
                key={el.id}
                productData={el}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BestSeller;
