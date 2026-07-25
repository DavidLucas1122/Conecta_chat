const messagensDefault = require("../model/config_messages");
let MESSAGE = JSON.parse(JSON.stringify(messagensDefault));

function validarContentType(contentType) {
  if (String(contentType).toUpperCase() == "APPLICATION/JSON") {
    return true;
  }
  return false;
}

function validarDadosUsuario(usuario) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    usuario.nome == null ||
    usuario.nome === undefined ||
    usuario.nome.trim() === "" ||
    usuario.nome.length > 100
  ) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = "Atributo [NOME] inválido!!!";
    return MESSAGE.ERROR_REQUIRED_FIELDS;
  } else if (
    usuario.email == null ||
    usuario.email === undefined ||
    usuario.email.trim() === "" ||
    usuario.email.length > 100 ||
    !regexEmail.test(usuario.email)
  ) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field =
      "Atributo [EMAIL] inválido!!!";
    return MESSAGE.ERROR_REQUIRED_FIELDS;
  } else if (
    usuario.numero == null ||
    usuario.numero === undefined ||
    usuario.numero.trim() === "" ||
    usuario.numero.length > 45
  ) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field =
      "Atributo [NÚMERO DE TELEFONE] inválido!!!";
    return MESSAGE.ERROR_REQUIRED_FIELDS;
  } else if (
    usuario.senha == null ||
    usuario.senha === undefined ||
    usuario.senha.trim() === "" ||
    usuario.senha.length > 255
  ) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field =
      "Atributo [SENHA] inválido!!!";
    return MESSAGE.ERROR_REQUIRED_FIELDS;
  } else return true;
}

function validarDadosLogin(dados) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    dados.email == null ||
    dados.email === undefined ||
    dados.email.trim() === "" ||
    dados.email.length > 100 ||
    !regexEmail.test(dados.email)
  ) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field =
      "Atributo [EMAIL] inválido!!!";
    return MESSAGE.ERROR_REQUIRED_FIELDS;
  } else if (
    dados.senha == null ||
    dados.senha === undefined ||
    dados.senha.trim() === "" ||
    dados.senha.length > 255
  ) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field =
      "Atributo [SENHA] inválido!!!";
    return MESSAGE.ERROR_REQUIRED_FIELDS;
  } else return true;
}

module.exports = {
  validarDadosUsuario,
  validarContentType,
  validarDadosLogin,
};
