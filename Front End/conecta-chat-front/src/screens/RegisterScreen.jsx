import CardLogin from "../components/CardLogin";
import InputsLogin from "../components/InputsLogin";
import {
  EmailIcon,
  PasswordIcon,
  UserIcon,
  PersonIcon,
  SmartIcon,
} from "../assets/assets";
import SolidButton from "../components/SolidButton";
import OutlineButton from "../components/OutlineButton";
import Background from "../components/Background.jsx";
import { useNavigate } from "react-router-dom";
import ErrorInput from "../components/ErrorInputs.jsx";
import useRegister from "../hooks/useRegister.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";

function RegisterScreen() {
  const {
    nome,
    setNome,
    email,
    setEmail,
    numero,
    setNumero,
    senha,
    setSenha,
    repetirSenha,
    setRepetirSenha,
    errorNome,
    errorEmail,
    errorNumero,
    errorSenha,
    errorRepetirSenha,
    error,
    handleRegister,
    loading,
  } = useRegister();

  const navigate = useNavigate();

  return (
    <Background>
      {loading && <LoadingScreen />}
      <div className="flex items-center justify-between flex-col gap-10 w-110">
        <h2 className="text-blue-800 text-5xl font-bold">Conecta Chat</h2>
        <CardLogin>
          <div className="flex flex-col items-center justify-center gap-3">
            <img className="h-16 " src={UserIcon} alt="IconUser" />
            <h2 className="text font-medium text-2xl">Cadastro</h2>
          </div>
          <div className="w-full flex flex-col gap-2">
            <InputsLogin
              info="Nome Completo"
              icon={PersonIcon}
              place="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            {errorNome && <ErrorInput error={errorNome} />}
            <InputsLogin
              info="E-mail"
              icon={EmailIcon}
              place="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errorEmail && <ErrorInput error={errorEmail} />}

            <InputsLogin
              info="Número de Telefone"
              icon={SmartIcon}
              place="00 000000-0000"
              value={numero}
              onChange={(e) => {
                setNumero(e.target.value);
              }}
            />
            {errorNumero && <ErrorInput error={errorNumero} />}

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

            <InputsLogin
              info="Repetir Senha"
              icon={PasswordIcon}
              place="Digite sua senha"
              type="password"
              value={repetirSenha}
              onChange={(e) => {
                setRepetirSenha(e.target.value);
              }}
            />
            {errorRepetirSenha && <ErrorInput error={errorRepetirSenha} />}
          </div>
          <div className="flex flex-col items-center justify-center gap-3 w-full py-3 ">
            {error && <ErrorInput error={error} />}

            <SolidButton text="Criar Conta" action={handleRegister} />
            <OutlineButton
              text="Já tenho uma conta"
              action={() => navigate("/login")}
            />
          </div>
        </CardLogin>
      </div>
    </Background>
  );
}

export default RegisterScreen;
