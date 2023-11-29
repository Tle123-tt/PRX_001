import {Link} from "react-router-dom";
import path from "../untils/path";


const Topheader = () => {
  return (
    <div className='h-[38px] w-full bg-black flex items-center justify-center'>
      <div className="w-full flex items-center justify-between text-xl">
            <span className="text-white font-sans font-medium px-[55px]">SĐT:0987124535</span>
            <Link to={`/${path.LOGIN}`} className="text-white font-sans font-medium px-[55px] hover:text-sky-500">Sign In or Create Account</Link>
      </div>
    </div>
  );
};

export default Topheader;
