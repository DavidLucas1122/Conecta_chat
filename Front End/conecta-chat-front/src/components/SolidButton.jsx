function SolidButton(props) {
  return (
    <button
      className="text-white bg-blue-dark justify-center cursor-pointer items-center flex w-full  rounded-3xl py-2  text-xl font-bold"
      onClick={props.action}
    >
      {props.text}
    </button>
  );
}

export default SolidButton;
