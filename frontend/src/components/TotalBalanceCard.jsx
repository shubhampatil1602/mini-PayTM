const TotalBalanceCard = ({ text, balance }) => {
  return (
    <div className='bg-gradient-to-r from-[#4FD1C5] to-[#81E6D9] text-white p-6 rounded-lg shadow-lg flex justify-between items-center'>
      <div>
        <h5 className='text-sm font-medium'>{text}</h5>
        <p className='text-4xl font-bold'>₹{balance}</p>
      </div>
      <p className='text-5xl font-bold'>₹</p>
    </div>
  );
};

export default TotalBalanceCard;
