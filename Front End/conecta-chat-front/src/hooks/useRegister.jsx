import { useState } from "react";
import { userService } from "../services/userService";
import { useNavigate } from "react-router-dom";

function useRegister() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [numero, setNumero] = useState("");
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");
  const [errorNome, setErrorNome] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorNumero, setErrorNumero] = useState("");
  const [errorSenha, setErrorSenha] = useState("");
  const [errorRepetirSenha, setErrorRepetirSenha] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setLoading(true);
      const dados = {
        nome: nome,
        email: email,
        numero: numero,
        senha: senha,
        repetirSenha: repetirSenha,
      };

      const errors = validacion(dados);

      setErrorNome(errors.nome);
      setErrorEmail(errors.email);
      setErrorNumero(errors.numero);
      setErrorSenha(errors.senha);
      setErrorRepetirSenha(errors.repetirSenha);
      setError("");

      if (
        errors.nome ||
        errors.email ||
        errors.numero ||
        errors.senha ||
        errors.repetirSenha
      ) {
        setLoading("false");
        return;
      }

      delete dados.repetirSenha;

      const criar = await userService.createUser(dados);

      if (criar.status_code == 409) {
        if (criar.code == "EMAIL_ALREADY_EXISTS") {
          setErrorEmail("Este e-mail já está cadastrado.");
        } else {
          setErrorNumero("Este número já está cadastrado.");
        }
        setError(
          "Um ou mais dados já estão cadastrados! Verifique e tente novamente!",
        );
        setLoading("false");
        return;
      }
      if (criar.status_code != 201) {
        setError("Tente novamente mais tarde!");
        setLoading("false");
        return;
      }

      setError("");

      alert(
        "Conta Criada com sucesso! Execute o Login para entrar na sua conta!",
      );

      navigate("/login");
    } finally {
      setLoading("false");
    }
  };
  return {
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
  };
}

function validacion(dados) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let errors = {
    nome: "",
    email: "",
    numero: "",
    senha: "",
    repetirSenha: "",
  };

  if (
    dados.nome == null ||
    dados.nome === undefined ||
    dados.nome.trim() === "" ||
    dados.nome.length > 100
  ) {
    errors.nome = "Preencha o campo de nome corretamente";
  }
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
    dados.numero == null ||
    dados.numero === undefined ||
    dados.numero.trim() === "" ||
    dados.numero.length > 45
  ) {
    errors.numero = "Preencha o campo de Número corretamente!";
  }
  if (
    dados.senha == null ||
    dados.senha === undefined ||
    dados.senha.trim() === "" ||
    dados.senha.length > 255
  ) {
    errors.senha = "Preencha o campo de Senha corretamente";
  }
  if (dados.repetirSenha != dados.senha) {
    errors.repetirSenha = "As Senhas não conferem";
  }
  return errors;
}

export default useRegister;
