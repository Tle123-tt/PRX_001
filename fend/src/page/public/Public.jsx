import { Outlet } from "react-router-dom";
import { Headers, Header, Footer } from "../../components";

const Public = () => {
  return (
    <div className='w-full flex flex-col justify-items-center'>
      <Headers/>
      <Header />
      <div className='w-main'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Public;
