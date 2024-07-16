import Quote from './Quote';

const Quotes = () => {
  const quotes = [
    {
      text: 'The key to financial freedom is to manage your money, not let it manage you.',
      author: 'Dave Ramsey',
      customStyles: 'from-[#4FD1C5] to-[#81E6D9]',
    },
    {
      text: "Wealth is not about having a lot of money; it's about having a lot of options.",
      author: 'Chris Rock',
      customStyles: 'from-[#ED8936] to-[#F6AD55]',
    },
    {
      text: 'Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.',
      author: 'Ayn Rand',
      customStyles: 'from-[#38A169] to-[#68D391]',
    },
  ];
  return (
    <div className='hidden lg:flex flex-col gap-4 lg:w-2/4 p-6 pt-10'>
      {quotes.map((quote) => (
        <Quote
          key={quote.author}
          text={quote.text}
          author={quote.author}
          customStyles={quote.customStyles}
        />
      ))}
    </div>
  );
};

export default Quotes;
