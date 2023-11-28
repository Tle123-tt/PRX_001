import { Slider, Danhmuc } from "../../components";

const Home = () => {
  return (
    <div className='w-main flex flex-col '>
      <div className=' '>
        <div className='w-[950px] container py-[35px]'>
          <Slider />
        </div>
      </div>
      <div className=''>Seller</div>
      <div className=""><Danhmuc/></div>
    </div>
  );
};

export default Home;
