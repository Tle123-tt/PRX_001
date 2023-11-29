

const InputFields = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
}) => {
  return (
    <div className='w-full flex'>
      <input
        type={type || "text"}
        className='px-4 py-2 my-2 w-[500px] placeholder:text-sm placeholder:italic rounded-sm border border-soild border-black outline-none'
        placeholder={nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
      />
    </div>
  );
};

export default InputFields;
