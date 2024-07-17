import { useContext, useState } from 'react';
import { UsersContext } from '../context/UsersContext';
import CustomInputBox from './CustomInputBox';
import { FaArrowRightLong } from 'react-icons/fa6';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Send = () => {
  const [money, setMoney] = useState(0);
  const { userDetails } = useContext(UsersContext);
  const navigate = useNavigate();
  const sender = JSON.parse(localStorage.getItem('PayTMuser'));

  const transferMoney = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:3001/api/v1/account/transfer',
        {
          to: userDetails.id,
          amount: parseInt(money),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(res.data);
      navigate('/dashboard');
      toast.success('Money Transfered Successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-slate-300'>
      <div className='flex bg-slate-50 h-[600px]'>
        <div className={`w-full pt-8`}>
          <Link
            to={'/dashboard'}
            className='border px-4 py-2 text-lg rounded shadow-sm bg-white hover:bg-slate-100 m-[5%]'
          >
            Back
          </Link>
          <div className='lg:w-[500px] mt-8 py-8 lg:rounded-lg bg-white lg:shadow mx-auto lg:border'>
            <h1 className='font-semibold text-center text-3xl mb-6 underline'>
              Send Money to {userDetails.firstName}
            </h1>

            <div className='flex justify-center items-center'>
              <SenderReceiver user={sender} />
              <FaArrowRightLong size={30} className='mx-10' />
              <SenderReceiver user={userDetails} />
            </div>
            <form className='max-w-sm mx-auto mt-6'>
              <CustomInputBox
                text={'Amount in Rupees'}
                placeholder={'Enter amount'}
                value={money}
                onChange={(e) => setMoney(e.target.value)}
              />
              <button
                onClick={transferMoney}
                type='submit'
                className='text-white mb-3 bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center'
              >
                Initiate Transfer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Send;

const SenderReceiver = ({ user }) => {
  return (
    <div className='flex items-center gap-3'>
      <span className='rounded-full text-lg flex justify-center items-center font-semibold full bg-green-200 w-10 h-10'>
        {user.firstName[0].toUpperCase()}
      </span>

      <h2 className='font-medium text-2xl'>{user.firstName}</h2>
    </div>
  );
};
