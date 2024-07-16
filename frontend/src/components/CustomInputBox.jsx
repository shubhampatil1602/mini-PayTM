const CustomInputBox = ({ text, placeholder, value, onChange }) => {
  return (
    <div className='mb-5'>
      <label className='block mb-2 text-sm font-medium text-gray-900'>
        {text}
      </label>
      <input
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomInputBox;
