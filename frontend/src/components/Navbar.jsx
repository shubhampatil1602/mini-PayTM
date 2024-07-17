import { useEffect, useState } from 'react';
import { BsBank } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const logout = () => {
    localStorage.clear();
    setIsAuth(!isAuth);
  };
  let isAuthenticated = localStorage.getItem('token') !== null;
  useEffect(() => {
    if (isAuthenticated) {
      setIsAuth(!isAuth);
    }
  }, [isAuthenticated]);
  return (
    <nav className='border-b shadow'>
      <div className='p-6 flex justify-between items-center w-[90%] mx-auto border-none'>
        <h1 className='text-2xl flex gap-3 items-center font-bold tracking-wide'>
          <BsBank size={25} /> PayTM
        </h1>
        <div className='flex items-center gap-6'>
          {isAuth && (
            <Link to={'/'} onClick={logout} className='hover:underline'>
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
