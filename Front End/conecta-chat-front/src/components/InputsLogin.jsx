import { useState } from "react";
import { EyesIcon, EyesCovereIcon } from "../assets/assets";

function InputsLogin(props) {
  const [showPassword, setShowPassword] = useState(false);

  const typeInput =
    props.type === "password"
      ? showPassword
        ? "text"
        : "password"
      : props.type || "text";

  return (
    <div className="w-full flex flex-col gap-2 items-start justify-start">
      <p className="text-[14px]">{props.info}</p>
      <div className="flex items-center h-10 w-full gap-5 border border-gray-400 rounded-[10px] pl-2">
        <img className="h-[70%]" src={props.icon} alt="Icone" />
        <input
          className="h-full w-full rounded-[10px] text-[14px] appearance-none bg-transparent border-none outline-none focus:outline-none focus:ring-0"
          placeholder={props.place}
          type={typeInput}
          value={props.value}
          onChange={props.onChange}
        />
        {props.type === "password" && (
          <img
            src={showPassword ? EyesCovereIcon : EyesIcon}
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer h-7 pr-2"
            alt="Mostrar/Oculta Senha"
          />
        )}
      </div>
    </div>
  );
}

export default InputsLogin;
