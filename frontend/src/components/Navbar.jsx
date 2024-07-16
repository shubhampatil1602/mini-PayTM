import { BsBank } from 'react-icons/bs';

const Navbar = () => {
  return (
    <nav className='border-b shadow'>
      <div className='p-6 flex justify-between items-center w-[90%] mx-auto border-none'>
        <h1 className='text-2xl flex gap-3 items-center font-bold tracking-wide'>
          <BsBank size={25} /> PayTM
        </h1>
        <div className='flex items-center gap-6'></div>
      </div>
    </nav>
  );
};

export default Navbar;
