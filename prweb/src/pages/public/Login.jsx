import { Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";;

const Login = () => {

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div className=' h-full flex justify-center'>
      <div className='bg-slate-300 w-6/12 my-24 px-10 py-5'>
        <h1 className='text-black font-sans'>Đăng nhập</h1>
        <form>
          <div>
            <p className='font-sans text-xl'>Email:</p>
          </div>
          <div className='email'>
            <Input
              id='email-form'
              className='w-3/5'
              placeholder='Nhập username'
              
            />
          </div>
          <div>
            <p className='font-sans text-xl'>Mật khẩu:</p>
          </div>
          <div className='password'>
            <Input.Password
              id='password-form'
              className='w-3/5'
              placeholder='Nhập password'
              
            />
          </div>
          <div className='pt-4'>
            <Checkbox onChange={onChange} className='font-sans text-base'>
              Nhớ mật khẩu
            </Checkbox>
          </div>
          <div className='py-3'>
            <Link className='font-sans text-xl'>Bạn quên mật khẩu</Link>
          </div>
          <Button
            htmlType='submit'
            className='bg-red-600 text-white w-44 h-12 font-sans'
          >
            Đăng nhập
          </Button>
          <div className='pb-3'>
            <p className='font-sans text-xl'>
              Bạn chưa có tài khoản? Hãy đăng ký <Link to='/dky'>tại đây</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
