import { Outlet } from "react-router-dom";
import { Footer, Header, Navigation, Topheader } from "../../components";
const Public = () => {
  return (
    <div className='w-full flex flex-col items-center justify-items-center'>
      <Topheader/>
      <Header />
      <Navigation />
      <div className='w-main'>
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default Public;
