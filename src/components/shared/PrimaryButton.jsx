const PrimaryButton = ({ text, onClickHandler, sx, type, disabled }) => {
  return (
    <button
      onClick={onClickHandler}
      disabled={disabled}
      type={type}
      className={
        sx +
        " text-gray-100 font-medium rounded-sm text-xs bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 disabled:opacity-50 disabled:hover:bg-violet-500"
      }
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
