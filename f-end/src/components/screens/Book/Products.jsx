import { Button, Badge, Rate, Modal, Input, Steps, Tabs } from "antd";
import { ShoppingCartOutlined, EditOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
// import data from "../../../data";
import Loading from "../../message/Loading";
import {Store} from "../../../App";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Product = () => {
  const params = useParams();

  // const product = data.listdt.find(
  //   (product) => product.id === Number(params.id)
  // );

  const [{ loading, error, product }, dispactch] = useReducer(logger(reducer), {
    product: [],
    loading: true,
    error: "",
  });

  // const [products,setProducts]=useState([]);
  // console.log(products);
  useEffect(() => {
    const getData = async () => {
      dispactch({ type: "FETCH_REQUEST" });
      try {
        const prDta = await axios.get(`/api/product/${params.id}`);
        dispactch({ type: "FETCH_SUCCESS", payload: prDta.data });
      } catch (err) {
        dispactch({ type: "FETCH_FAIL", payload: err.message });
      }
      // setProducts(prDta.data);
    };
    getData();
  }, [params.id]);

  const { state, dispatch: cxtDispatch } = useContext(Store);
  const addToCartHandler = () => {
    cxtDispatch({ type: "CART_ADD_ITEM", payload: { ...product,quantity:1 }})
  };

  return loading ? (
    <Loading />
  ) : error ? (
    <div className='container bg-red-600 text-white p-8 w-5/6 my-52 rounded-3xl text-3xl font-sans font-semibold'>
      {error}
    </div>
  ) : (
    <>
      <div className='flex mx-16 my-10 p-5 justify-evenly '>
        <div className='mx-8'>
          <img src={product.image} alt='sach' />
        </div>
        <div className='mx-8'>
          <div>
            <h1>{product.name}</h1>
          </div>
          <div className='w-72'>
            <h2 className='post-ctiet p-3'>Giá: {product.price}đ</h2>
            <h3 className='post-ctiet p-3'>
              Tình trạng:{" "}
              {product.soluong > 0 ? (
                <Badge className='bg-green-700 text-white p-3 rounded-full'>
                  Còn hàng
                </Badge>
              ) : (
                <Badge className='bg-red-700 text-white p-3 rounded-full'>
                  Hết hàng
                </Badge>
              )}
            </h3>
            <h3 className='post-ctiet p-3'>
              Rating: <Rate disabled value={product.rating} />
            </h3>
            <h3 className='post-ctiet p-3'>Số trang: {product.page}</h3>
            <h3 className='post-ctiet p-3'>Ngày xuất bản: {product.date}</h3>
            <h3 className='post-ctiet p-3'>Nhà xuất bản: {product.NXB}</h3>
          </div>
          <div className='flex items-center justify-center my-6'>
            <Button
              className='bg-red-600 text-white font-semibold'
              //   onClick={() => setCount(count - 1)}
            >
              -
            </Button>
            <span className='mx-3 font-normal'>0</span>
            <Button
              className='bg-blue-600 text-white font-semibold'
              //   onClick={() => setCount(count + 1)}
            >
              +
            </Button>
          </div>

          {product.soluong > 0 && (
            <div className='flex justify-evenly'>
              <Button
                className='bt-dhang'
                icon={<ShoppingCartOutlined />}
                //   onClick={() => dispatch(addtoCart(sach ,count))}
                onClick={addToCartHandler}
              >
                Đặt hàng
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Product;
