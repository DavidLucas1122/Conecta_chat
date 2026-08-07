function OutlineButton(props) {
  return (
    <button
      onClick={props.action}
      className="border-blue-light text-blue-light bg-transparent cursor-pointer justify-center items-center flex w-full  rounded-2xl shadow-2xl py-2 text-[16px]"
    >
      {props.text}
    </button>
  );
}

export default OutlineButton;
