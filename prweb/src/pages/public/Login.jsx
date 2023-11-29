import { InputFields, Button } from "../../components";
import { useCallback, useState } from "react";
import { apiReigister, apiLogin } from "../../apis/user";
import Swal from "sweetalert2";

const Login = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
  });

  const [isRegister, setIsRegister] = useState(false);
  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      mobile: "",
    });
  };

  const handleSubmit = async () => {
    const { firstname, lastname, mobile, ...data } = payload;
    if (isRegister) {
      const response = await apiReigister(payload);
      Swal.fire(
        response.success ? "Congradtulation" : "Oops",
        response.mes,
        response.success ? "success" : "error"
      ).then(() => {
        setIsRegister(false);
        resetPayload();
      });
    } else {
      const rs = await apiLogin(data);
      console.log(rs);
    }
  };

  return (
    <div className='w-screen h-screen relative '>
      <img
        src='https://c4.wallpaperflare.com/wallpaper/498/1011/761/abstract-simple-background-colorful-waveforms-wallpaper-preview.jpg'
        alt=''
        className='w-full h-full object-cover'
      />
      <div className='absolute flex justify-center items-center top-0 bottom-0 left-0 right-0'>
        <div className='bg-white flex flex-col items-center p-8 rounded-md min-w-[500px] '>
          <h1 className='text-[32px] text-black text-center font-sans mb-8'>
            {isRegister ? "Register" : "Login"}
          </h1>
          {isRegister && (
            <div>
              <InputFields
                value={payload.firstname}
                setValue={setPayload}
                nameKey='firstname'
              />
              <InputFields
                value={payload.lastname}
                setValue={setPayload}
                nameKey='lastname'
              />
            </div>
          )}
          <InputFields
            value={payload.email}
            setValue={setPayload}
            nameKey='email'
          />
          <InputFields
            value={payload.mobile}
            setValue={setPayload}
            nameKey='mobile'
          />
          <InputFields
            value={payload.password}
            setValue={setPayload}
            nameKey='password'
            type='password'
          />
          <Button
            name={isRegister ? "Register" : "Login"}
            handleOnClick={handleSubmit}
            fw
          />
          <div className='flex items-center justify-between my-2 w-full'>
            {!isRegister && (
              <span className='text-blue-500 hover:underline cursor-pointer'>
                ForgotPassword?
              </span>
            )}
            {!isRegister && (
              <span
                className='text-blue-500 hover:underline cursor-pointer'
                onClick={() => setIsRegister(true)}
              >
                Create account
              </span>
            )}
            {isRegister && (
              <span
                className='text-blue-500 hover:underline cursor-pointer mx-auto'
                onClick={() => setIsRegister(false)}
              >
                Go login
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
