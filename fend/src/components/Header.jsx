import { Link } from "react-router-dom";
import { Button } from "antd";
import "../css/header.css"
import CustomIcon from "../common/CustomIcon";

const Header = () => {
  return (
    <div className='bg-black header'>
      <div className='flex h-14 p-4 justify-between items-center'>
        <Link
          to='/'
          className='logo text-white font-semibold text-5xl font-sans'
        >
          Book shop
        </Link>

        <div className='flex'>
          <div>
            <Link
              to='/'
              className='m-3.5 text-2xl text-white font-sans font-medium hover:underline'
            >
              Trang chủ
            </Link>
          </div>
          <div>
            <Link
              to='/sanpham'
              className='m-3.5 text-2xl text-white font-sans font-medium hover:underline'
            >
              Sản phẩm
            </Link>
          </div>
          <div>
            <Link
              to='/blog'
              className='m-3.5 text-2xl text-white font-sans font-medium hover:underline'
            >
              Blog
            </Link>
          </div>
          <div>
            <a
              href='/'
              className='m-3.5 text-2xl text-white font-sans font-medium hover:underline'
            >
              Danh mục
            </a>
          </div>
          <div>
            <Link
              to='/gioithieu'
              className='m-3.5 text-2xl text-white font-sans font-medium hover:underline'
            >
              Giới thiệu
            </Link>
          </div>
        </div>

        <div className="flex">
          <div className='m-3.5'>
            <Button
              className='bg-black border-0'
              icon={
                <CustomIcon src='/icon/magnifying-glass-solid.svg' width={24} />
              }
            ></Button>
          </div>

          <div className='m-3.5'>
            <Link to='/login'>
              <Button
                className='bg-black border-0'
                icon={<CustomIcon src='/icon/user-solid.svg' width={24} />}
                type='link'
                to='/login'
              ></Button>
            </Link>
          </div>

          <div className='m-3.5'>
            <Link to='/giohang'>
              <Button
                className='bg-black border-0 cart-icon'
                icon={
                  <CustomIcon src='/icon/cart-shopping-solid.svg' width={24} />
                }
              >
                <span className='cart-badge bg-red-600 text-white px-1.5 rounded-full '>
                  0
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
