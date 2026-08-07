import { useState } from "react";
import { userService } from "../services/userService";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function useLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorSenha, setErrorSenha] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const dados = {
        email: email,
        senha: senha,
      };

      const errors = validation(dados);

      setErrorEmail(errors.email);
      setErrorSenha(errors.senha);
      setError("");

      if (errors.email || errors.senha) {
        setLoading("false");
        return;
      }

      const login = await userService.loginUser(dados);

      if (login.status_code == 404) {
        setError("Usuário não encontrado!");
        setLoading("false");
        return;
      } else if (login.status_code == 401) {
        setError("Senha incorreta!");
        setLoading("false");
        return;
      }

      Cookies.set("id_usuario", login.response[0].id_usuario);

      setError("");
      navigate("/main");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    senha,
    setSenha,
    errorEmail,
    errorSenha,
    error,
    handleLogin,
    loading,
  };
}

function validation(dados) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let errors = {
    email: "",
    senha: "",
  };

  if (
    dados.email == null ||
    dados.email === undefined ||
    dados.email.trim() === "" ||
    dados.email.length > 100 ||
    !regexEmail.test(dados.email)
  ) {
    errors.email = "Preencha o campo de Email corretamente!";
  }
  if (
    dados.senha == null ||
    dados.senha === undefined ||
    dados.senha.trim() === "" ||
    dados.senha.length > 255
  ) {
    errors.senha = "Preencha o campo de Senha corretamente!";
  }
  return errors;
}

export default useLogin;
