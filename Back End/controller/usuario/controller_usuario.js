const usuarioDAO = require("../../model/DAO/usuario");
const messagensDefault = require("../model/config_messages");
const bycrypt = require("bcrypt");
const validacao = require("../model/validacions");

const listarUsuarios = async () => {
  let MESSAGE = JSON.parse(JSON.stringify(messagensDefault));

  try {
    let result = await usuarioDAO.getAllUsers();

    if (result) {
      if (result.length > 0) {
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code;

        const usuariosSemSenha = result.map((usuario) => {
          const { senha_hash, ...usuarioSemSenha } = usuario;
          return usuarioSemSenha;
        });

        MESSAGE.HEADER.response = usuariosSemSenha;
        return MESSAGE.HEADER;
      } else {
        return MESSAGE.ERROR_NOT_FOUND;
      }
    } else {
      return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

const buscarUsuarioPorId = async (id) => {
  let MESSAGE = JSON.parse(JSON.stringify(messagensDefault));

  try {
    let result = await usuarioDAO.getUserById(id);

    if (result) {
      if (result.length > 0) {
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code;
        delete result[0].senha_hash;
        MESSAGE.HEADER.response = result;
        return MESSAGE.HEADER;
      } else {
        return MESSAGE.ERROR_NOT_FOUND;
      }
    } else {
      return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

const busacarUsuarioPorNumero = async () => {};

const criarUsuario = async (usuario, contentType) => {
  let MESSAGE = JSON.parse(JSON.stringify(messagensDefault));

  try {
    let contentTypeValido = await validacao.validarContentType(contentType);

    if (contentTypeValido) {
      let dadosValidados = await validacao.validarDadosUsuario(usuario);

      if (dadosValidados === true) {
        const senha_hash = await bycrypt.hash(usuario.senha, 10);
        delete usuario.senha;
        usuario.senha_hash = senha_hash;

        let result = await usuarioDAO.createUser(usuario);

        if (result) {
          let lastIdUsuario = await usuarioDAO.getSelectLastIdUsuario();

          if (lastIdUsuario) {
            MESSAGE.HEADER.status_code =
              MESSAGE.SUCCESS_CREATED_ITEM.status_code;
            MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message;
            MESSAGE.HEADER.response = {
              id_usuario: lastIdUsuario,
              nome: usuario.nome,
            };
            return MESSAGE.HEADER;
          } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
          }
        } else {
          return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
        }
      } else {
        return dadosValidados;
      }
    } else {
      return MESSAGE.ERROR_CONTENT_TYPE;
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

const atualizarUsuario = async (id, usuario, contentType) => {
  let MESSAGE = JSON.parse(JSON.stringify(messagensDefault));

  try {
    let contentTypeValido = await validacao.validarContentType(contentType);
    if (contentTypeValido) {
      let dadosValidados = await validacao.validarDadosUsuario(usuario);

      if (dadosValidados === true) {
        let userExist = await buscarUsuarioPorId(id);

        if (userExist.status_code == 200) {
          const senha_hash = await bycrypt.hash(usuario.senha, 10);
          delete usuario.senha;
          usuario.senha_hash = senha_hash;

          let result = await usuarioDAO.updateUser(id, usuario);

          if (result) {
            MESSAGE.HEADER.status_code =
              MESSAGE.SUCCESS_UPDATED_ITEM.status_code;
            MESSAGE.HEADER.response = MESSAGE.SUCCESS_UPDATED_ITEM.message;
            return MESSAGE.HEADER;
          } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
          }
        } else {
          return userExist;
        }
      } else {
        return dadosValidados;
      }
    } else {
      return MESSAGE.ERROR_CONTENT_TYPE;
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

const deletarUsuario = async (id) => {
  let MESSAGE = JSON.parse(JSON.stringify(messagensDefault));

  try {
    let idExistente = await buscarUsuarioPorId(id);

    if (idExistente) {
      let result = await usuarioDAO.deleteUser(id);

      if (result) {
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETED_ITEM.status_code;
        MESSAGE.HEADER.response = MESSAGE.SUCCESS_DELETED_ITEM.message;
        return MESSAGE.HEADER;
      } else {
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
      }
    } else {
      return idExistente;
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

const loginUsuario = async (dados, contentType) => {
  let MESSAGE = JSON.parse(JSON.stringify(messagensDefault));

  try {
    let contentTypeValido = await validacao.validarContentType(contentType);

    if (contentTypeValido) {
      let dadosValidados = await validacao.validarDadosLogin(dados);

      if (dadosValidados === true) {
        let result = await usuarioDAO.loginUser(dados.email);

        if (result.length > 0) {
          const senhaCorreta = await bycrypt.compare(
            dados.senha,
            result[0].senha_hash,
          );

          if (senhaCorreta) {
            MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code;
            delete result[0].senha_hash;
            MESSAGE.HEADER.response = result;
            return MESSAGE.HEADER;
          } else {
            return MESSAGE.ERROR_PASSWORD;
          }
        } else {
          return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
        }
      } else {
        return dadosValidados;
      }
    } else {
      return MESSAGE.ERROR_CONTENT_TYPE;
    }
  } catch (error) {
    console.log(error);
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

module.exports = {
  listarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
  loginUsuario,
};
