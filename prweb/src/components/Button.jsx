import { memo } from "react";

const Button = ({ name, handleOnClick, style, iconsBefore, iconAfter, fw }) => {
  return (
    <button
      type='button'
      className={
        style
          ? style
          : `px-4 py-2 my-4 rounded-md text-semibold text-white bg-red-600  ${
              fw ? "w-full" : "w-fit"
            }`
      }
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
    >
      {iconsBefore}
      <span>{name}</span>
      {iconAfter}
    </button>
  );
};

export default memo(Button);
