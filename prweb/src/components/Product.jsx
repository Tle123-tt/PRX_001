import { Button } from "antd";
import { formatMoney } from "../untils/helper";
import { useState } from "react";
import path from "../untils/path";
import { ShoppingCartOutlined,MenuOutlined } from "@ant-design/icons";
import {Link} from "react-router-dom";

const Product = ({ productData }) => {
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <div className='w-full'>
      <div className='p-[15px]'>
        <div className='w-[289px] rounded-lg border border-solid border-gray-300 flex flex-col'>
          <img
            src={
              productData?.images[0] ||
              "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
            }
            alt=''
            className='w-[289px] h-[289px] rounded-t-lg object-contain'
          />
          <div className='my-6 flex flex-col'>
            <Link to={`/${path.DETAIL_PRODUCT}/${productData?._id}/${productData?.title}`} className='px-10 my-6 font-sans line-clamp-1 text-black'>
              {productData?.title}
            </Link>
            <span className='px-10 mb-4 font-sans'>
              Giá: {`${formatMoney(productData?.price)}Đ`}
            </span>
          </div>
          <div className="flex ">
            <Button className="mb-3 mx-auto bg-red-500 dhang border-0 h-12 text-white" icon={<ShoppingCartOutlined />}>Thêm vào giỏ hàng</Button>           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
