import { Link } from "react-router-dom";
import { Button } from "antd";
import CustomIcon from "../../common/CustomIcon";
import "../../css/header.css";

const Header = () => {
  return (
    <div className='bg-black header'>
      <div className='flex h-14 p-4 items-center justify-between'>
        <Link to='/' className='text-5xl font-sans font-bold text-white'>
          BookStore
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
            <Link
              to='/lienhe'
              className='m-3.5 text-2xl text-white font-sans font-medium hover:underline'
            >
              Liên hệ
            </Link>
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

        <div className='flex'>
          <div className='m-3.5'>
            <Button
              className='bg-black border-0'
              icon={<CustomIcon src='/icon/magnifying-glass-solid.svg' />}
            ></Button>
          </div>
          <div className='m-3.5'>
            <Button
              className='bg-black border-0'
              icon={<CustomIcon src='/icon/user-solid.svg' />}
            ></Button>
          </div>
          <div className='m-3.5'>
            <Link>
              <Button
                className='bg-black border-0'
                icon={<CustomIcon src='/icon/cart-shopping-solid.svg' />}
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
