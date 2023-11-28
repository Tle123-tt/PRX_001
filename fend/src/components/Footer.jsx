import { Link } from "react-router-dom";
import CustomIcon from "../common/CustomIcon";

const Footer = () => {
  return (
    <div className='bg-slate-600'>
      <div className='flex justify-evenly'>
        <div className='m-7'>
          <div className='mb-4'>
            <Link className='text-white'>Giới thiệu</Link>
          </div>
          <div className='mb-4'>
            <Link className='text-white'>Liên hệ</Link>
          </div>
          <div className='mb-4'>
            <Link className='text-white'>Thông báo</Link>
          </div>
          <div className='mb-4'>
            <Link className='text-white'>Chính sách vận chuyển</Link>
          </div>
        </div>
        <div className='m-7'>
          <div className='mb-4'>
            <Link className='text-white'>Chính sách bảo mật</Link>
          </div>
          <div className='mb-4'>
            <Link className='text-white'>Hướng dẫn mua hàng</Link>
          </div>
          <div className='mb-4'>
            <Link className='text-white'>Quy định đổi trả hàng</Link>
          </div>
        </div>
        <div className='flex items-center m-7'>
          <Link to='' className='m-5'>
            {<CustomIcon src='/icon/facebook.svg' width={24} />}
          </Link>
          <Link to='' className='m-5'>
            {<CustomIcon src='/icon/instagram.svg' width={24} />}
          </Link>
          <Link to='' className='m-5'>
            {<CustomIcon src='/icon/tiktok.svg' width={24} />}
          </Link>
          <Link to='' className='m-5'>
            {<CustomIcon src='/icon/youtube.svg' width={24} />}
          </Link>
          <Link to='' className='m-5'>
            {<CustomIcon src='/icon/twitter.svg' width={24} />}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
