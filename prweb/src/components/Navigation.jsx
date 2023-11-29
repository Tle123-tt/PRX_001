// import path from "../untils/path";
import { navigation } from "../untils/contants";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="w-full">
      <div className='w-full border-b-1 mb-7 h-[48px] py-2 bg-red-500 border-0 border-b-4 border-solid border-gray-100 flex items-center border '>
        {navigation.map((el) => (
          <NavLink
            to={el.path}
            key={el.id}
            className={({ isActive }) =>
              isActive
                ? "px-5 text-xl text-white hover:text-sky-400 font-sans font-medium "
                : "px-5 text-xl text-white hover:text-sky-400 font-sans font-medium "
            }
          >
            {el.value}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
