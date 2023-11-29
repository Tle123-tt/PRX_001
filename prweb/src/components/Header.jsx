import { Link } from "react-router-dom";
import path from "../untils/path";
import {
  ShoppingOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";

const Header = () => {
  return (
    <div className='border-0 border-b-4 border-solid border-gray-400 bg-white flex justify-between w-full py-[35px] h-[88px]'>
      <Link
        to={`/${path.HOME}`}
        className='px-[55px] text-red-600 font-semibold text-5xl font-sans flex items-center'
      >
        Book Shop
      </Link>
      <div className='flex px-[55px] font-semibold font-sans  items-center'>
        {/* <div className="text-white text-2xl pr-[30px]">Đăng nhập</div>
        <div className="text-white text-2xl px-[30px]">Đăng ký</div> */}
        <Link
          to={`/${path.LOGIN}`}
          className='bg-white text-black border-0 pr-[30px] text-3xl'
        >
          <UserOutlined />
        </Link>
        <Link className='bg-white text-black border-0 px-[30px] text-3xl'>
          <ShoppingOutlined />
        </Link>
        <Link className='bg-white text-black border-0 px-[30px] text-3xl'>
          <MailOutlined />
        </Link>
      </div>
    </div>
  );
};

export default Header;
