const Quote = ({ text, author, customStyles }) => {
  return (
    <div
      className={`bg-gradient-to-r ${customStyles} text-white flex flex-col items-center justify-center gap-6 p-8 rounded-md`}
    >
      <h4 className='font-semibold text-center text-2xl'>{text}</h4>
      <h6 className='font-semibold text-center text-xl'>- {author}</h6>
    </div>
  );
};

export default Quote;
