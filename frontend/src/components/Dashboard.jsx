import Card from './Card';
import TotalBalanceCard from './TotalBalanceCard';
import { FiMove } from 'react-icons/fi';
import { GrTransaction } from 'react-icons/gr';
import { MdPendingActions } from 'react-icons/md';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import User from './User';
import CustomInputBox from './CustomInputBox';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UsersContext } from '../context/UsersContext';

const Dashboard = () => {
  const { users, setUsers } = useContext(UsersContext);
  const [searchUser, setSearchUser] = useState('');
  const [balance, setBalance] = useState(0);
  const fetchBalance = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/api/v1/account/balance',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setBalance(response.data.balance);
    } catch (error) {
      console.log(error);
    }
  };
  const bulkUsers = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/api/v1/users/bulk?filter=' + searchUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data.user);
      setUsers(response.data.user);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
  let id = null;
  useEffect(() => {
    id = setInterval(() => {
      clearInterval(id);
      bulkUsers();
    }, 500);

    return () => {
      clearInterval(id);
    };
  }, [searchUser]);

  useEffect(() => {
    fetchBalance();
  });
  return (
    <main>
      <div className='py-[6%] lg:py-[2%] px-[4%]'>
        <h2 className='text-3xl font-bold'>
          {JSON.parse(localStorage.getItem('PayTMuser')).msg}
        </h2>
        <p className='text-slate-500'>
          Here's a quick overview of your account.
        </p>
      </div>

      <div className='px-[3%] pb-4 flex flex-col gap-8'>
        <TotalBalanceCard
          text={'Total Balance'}
          balance={balance.toLocaleString('en-US')}
        />
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <Card background={'from-[#ED8936] to-[#F6AD55]'}>
            <div className='flex flex-col items-center justify-center gap-2'>
              <FiMove size={25} />
              <h5 className='text-sm font-medium'>Transfer</h5>
            </div>
          </Card>
          <Card background={'from-[#38A169] to-[#68D391]'}>
            <div className='flex flex-col items-center justify-center gap-2'>
              <GrTransaction size={25} />
              <h5 className='text-sm font-medium'>Transactions</h5>
            </div>
          </Card>
          <Card background={'from-[#4299E1] to-[#63B3ED]'}>
            <div className='flex flex-col items-center justify-center gap-2'>
              <IoCheckmarkDoneCircle size={25} />
              <h5 className='text-sm font-medium'>Completed</h5>
            </div>
          </Card>
          <Card background={'from-[#9B2C2C] to-[#C53030]'}>
            <div className='flex flex-col items-center justify-center gap-2'>
              <MdPendingActions size={25} />
              <h5 className='text-sm font-medium'>Pending</h5>
            </div>
          </Card>
        </div>
      </div>

      <div className='py-[2%] px-[4%]'>
        <h2 className='text-2xl font-bold'>Search for users</h2>
        <p className='text-slate-500'>Search user by name.</p>
      </div>

      <div className='px-[4%] pb-[1%] grid gap-4'>
        <CustomInputBox
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          placeholder={'Search for users..'}
        />
        {users?.map((u) => (
          <User key={u.id} userDetails={u} />
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
