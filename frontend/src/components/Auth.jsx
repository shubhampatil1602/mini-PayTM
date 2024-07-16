import { Link, useNavigate } from 'react-router-dom';
import Quotes from './Quotes';
import { useState } from 'react';
import CustomInputBox from './CustomInputBox';
import axios from 'axios';
import { toast } from 'sonner';

const Auth = () => {
  const [auth, setAuth] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const createAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/users/register',
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          password: formData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
        {
          withCredentials: true,
        }
      );

      if (response.data) {
        localStorage.setItem('PayTMuser', JSON.stringify(response.data));
        navigate('/dashboard');
        toast.success(response.data.msg);
      }

      localStorage.setItem('token', response.data.token);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loginAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/users/login',
        {
          username: formData.username,
          password: formData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
        {
          withCredentials: true,
        }
      );

      if (response.data) {
        localStorage.setItem('PayTMuser', JSON.stringify(response.data));
        navigate('/dashboard');
        toast.success(response.data.msg);
      }

      localStorage.setItem('token', response.data.token);

      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className='flex bg-slate-50 '>
      <div className={`w-full lg:w-2/4 lg:pt-8 ${!auth && 'lg:pt-24'}`}>
        <div className='lg:w-[500px] py-8 rounded-lg bg-white shadow mx-auto lg:border'>
          <h1 className='font-semibold text-center text-3xl'>
            {auth ? 'Register' : 'Login'}
          </h1>
          <p className='text-sm text-slate-500 text-center mt-1'>
            {auth
              ? 'Create a new account to access your banking services.'
              : 'Enter your credentials to access your account.'}
          </p>
          <form className='max-w-sm mx-auto mt-6'>
            {auth && (
              <>
                <CustomInputBox
                  text={'First Name'}
                  placeholder={'First Name'}
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
                <CustomInputBox
                  text={'Last Name'}
                  placeholder={'Last Name'}
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </>
            )}
            <CustomInputBox
              text={'Your email'}
              placeholder={'bhidu@gmail.com'}
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <CustomInputBox
              text={'Your Password'}
              placeholder={'********'}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <button
              onClick={auth ? createAccount : loginAccount}
              type='submit'
              className='text-white mb-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center'
            >
              Submit
            </button>
            <p className='text-sm text-slate-500'>
              {auth ? 'Already have an account? ' : 'Create an account. '}
              <Link
                to='/'
                className='underline text-blue-500 hover:text-blue-800'
                onClick={() => setAuth(!auth)}
              >
                {auth ? 'Login' : 'Register'}
              </Link>
            </p>
          </form>
        </div>
      </div>

      <Quotes />
    </div>
  );
};

export default Auth;
