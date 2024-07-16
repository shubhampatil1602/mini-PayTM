import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsersContext } from '../context/UsersContext';

const User = ({ userDetails }) => {
  const navigate = useNavigate();
  const { setUserDetails } = useContext(UsersContext);

  const handleClick = () => {
    navigate(`/send/?id=${userDetails.id}?name=${userDetails.firstName}`);
    setUserDetails(userDetails);
  };
  return (
    <div className='border shadow-md py-3 px-4 rounded-md flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <span className='rounded-full flex justify-center items-center font-semibold full border bg-slate-200 w-10 h-10'>
          {userDetails.firstName.slice(0, 1).toUpperCase()}
        </span>
        <span>
          <h2 className='font-medium'>{userDetails.firstName}</h2>
          <h2 className='text-xs text-slate-600'>{userDetails.createdAt}</h2>
        </span>
      </div>

      <button
        onClick={handleClick}
        className='bg-green-600 hover:opacity-85 px-3 py-1.5 rounded-md text-white font-medium tracking-wide'
      >
        Send Money
      </button>
    </div>
  );
};

export default User;
