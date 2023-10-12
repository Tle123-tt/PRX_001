import { Link } from "react-router-dom";
import { Rate, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import '../../../css/image.css'
// import data from "../../../data";
import logger from "use-reducer-logger"
import {useEffect, useReducer} from "react";
import axios from "axios"
import Loading from "../../message/Loading";

const reducer=(state, action)=>{
  switch(action.type){
    case'FETCH_REQUEST':
      return {...state, loading:true}
    case'FETCH_SUCCESS':
      return {...state, products: action.payload ,loading:false}
    case'FETCH_FAIL':
      return {...state, loading:false, error:action.payload}
    default:
      return state;
  }
}

const Sanpham = () => {
  const [{loading, error, products}, dispactch]=useReducer(logger(reducer),{
    products:[],
    loading:true, 
    error:''
  });

  // const [products,setProducts]=useState([]);
  console.log(products)
  useEffect(()=>{
    const getData = async () =>{
      dispactch({type:'FETCH_REQUEST'});
      try {
        const prDta=await axios.get('/api/product')
        dispactch({type:'FETCH_SUCCESS',payload:prDta.data})
      } catch (err) {
        dispactch({type:'FETCH_FAIL',payload:err.message})
      }   
      // setProducts(prDta.data);
    };
    getData();
  },[])

  return (
    <>
      <div className='text-center font-medium text-5xl p-10  font-sans'>
        <h1 className="">Sản phẩm</h1>
      </div>
      <div className="border-0 border-8 border-b border-black border-solid container w-5/6"/>
      <div className='sachs flex flex-wrap justify-center container  py-12 w-5/6'>
        {loading ? (
          <Loading/>
        ):error ? (
          <div>{error}</div>
        ):(
        products.map((product) => (
          <div
            className='sach mx-7 bg-slate-50 mt-4 mb-7 rounded-lg shadow-xl shadow-gray-400'
            key={product.id}
          >
            <Link to={`/sach/${product.id}`}>
              <img src={product.image} alt='' className='image rounaded-t-lg' />
            </Link>

            <div className='px-3 overflay'>
              <h2>
                <Link to={`/sach/${product.id}`} className='font-sans'>
                  {product.name}
                </Link>
              </h2>
              <Rate disabled allowHalf value={product.rating} />
              <div className='text-xl font-sans pt-3'>
                Giá: {product.price}đ
              </div>
              <div className='flex p-4'>
                <Button
                  type='button'
                  className='mb-3 w-11/12 mx-auto bg-red-500 dhang border-0 h-12 text-white'
                  icon={<ShoppingCartOutlined />}
                >
                    Đặt hàng
                </Button>
              </div>
            </div>
          </div>
        )))}
      </div>
    </>
  );
};

export default Sanpham;
