import { SiderBar, Banner, BestSeller } from "../../components";


const Home = () => {

  return (
    <div className='w-main flex flex-col'>
      <div className=' w-[75%]  container'>
        <Banner />
      </div>
      <div className=' w-[80%]  container'>
        <div className='text-center text-5xl font-medium p-11 font-sans'>
          Danh mục
        </div>
        <SiderBar />
      </div>
      <div className=''>
        <BestSeller />
      </div>
    </div>
  );
};

export default Home;
