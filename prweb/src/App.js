import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Login, Public, Product, Blog, Gthieu, DetailProduct, Dmuc } from "./pages/public";
import path from "./untils/path";
import { getCategory } from "./store/asyncAction";
import { useDispatch } from "react-redux";

function App() {
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(getCategory())
  });
  return (
    <div className='min-h-screen'>
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          
          <Route path={path.PRODUCT} element={<Product />} />
          <Route path={path.BLOG} element={<Blog/>} />
          <Route path={path.GTHIEU} element={<Gthieu/>} />
          <Route path={path.DETAIL_PRODUCT__PID__TITLE} element={<DetailProduct/>}/>
          <Route path={path.DMUC} element={<Dmuc/>}/>
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
