import CardLogin from "../components/CardLogin";
import InputsLogin from "../components/InputsLogin";
import { EmailIcon, PasswordIcon, UserIcon } from "../assets/assets";
import SolidButton from "../components/SolidButton";
import OutlineButton from "../components/OutlineButton";
import useLogin from "../hooks/useLogin.jsx";
import Background from "../components/Background.jsx";
import { useNavigate } from "react-router-dom";
import ErrorInput from "../components/ErrorInputs.jsx";
import { useState } from "react";
import LoadingScreen from "../components/LoadingScreen.jsx";

function LoginScreen() {
  const {
    email,
    setEmail,
    senha,
    setSenha,
    errorEmail,
    errorSenha,
    error,
    handleLogin,
    loading,
  } = useLogin();

  const navigate = useNavigate();

  return (
    <Background>
      {loading && <LoadingScreen />}
      <div className="flex items-center justify-between flex-col gap-10 w-110">
        <h2 className="text-blue-800 text-5xl font-bold">Conecta Chat</h2>
        <CardLogin>
          <div className="flex flex-col gap-3">
            <img className="h-16" src={UserIcon} alt="IconUser" />
            <h2 className="text font-medium text-2xl">Login</h2>
          </div>
          <div className="w-full flex flex-col gap-2">
            <InputsLogin
              info="E-mail"
              icon={EmailIcon}
              place="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errorEmail && <ErrorInput error={errorEmail} />}
            <InputsLogin
              info="Senha"
              icon={PasswordIcon}
              place="Digite sua senha"
              type="password"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
              }}
            />
            {errorSenha && <ErrorInput error={errorSenha} />}
          </div>
          <div className="flex flex-col items-center justify-center gap-3 w-full py-3 ">
            {error && <ErrorInput error={error} />}
            <SolidButton text="Entrar" action={handleLogin} />
            {/* <OutlineButton text="Esqueci a Senha" action={""} /> */}
            <OutlineButton
              text="Criar Conta"
              action={() => navigate("/register")}
            />
          </div>
        </CardLogin>
      </div>
    </Background>
  );
}

export default LoginScreen;
