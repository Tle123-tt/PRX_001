import { apiGetCategory } from "../apis/app";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { createSlug } from "../untils/helper";

const Siderbar = () => {
  const [categories, setCategories] = useState(null);
  const fetchCategories = async () => {
    const response = await apiGetCategory();
    if (response.success) setCategories(response.productCategory);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  console.log(categories);

  return (
    <div>
      <div className=' flex flex-wrap justify-center '>
        {categories?.map((el) => (
          <NavLink
            key={createSlug(el.title)}
            to={createSlug(el.title)}
            className={({ isActive }) =>
              isActive
                ? "bg-main text-white p-5 m-5 w-[240px] container h-[100px] bg-blue-500 font-medium font-sans text-xl  hover:text-main"
                : "p-5 m-5 w-[240px] container h-[100px] rounded-lg flex justify-center items-center text-white bg-blue-500 font-medium font-sans text-xl hover:text-main"
            }
          >
            {el.title}
          </NavLink>
        ))}
      </div>
      
    </div>
  );
};

export default Siderbar;
