const Card = ({ children, background }) => {
  return (
    <div
      className={`bg-gradient-to-r ${background} text-white p-4 rounded-lg shadow-lg`}
    >
      {children}
    </div>
  );
};

export default Card;
