const conversaDAO = require("../../model/DAO/conversa.js");
const participantesDAO = require("../participantes/controller_participantes.js");
const messagensDefault = require("../model/config_messages");
const validacao = require("../model/validacions");

const listarConversas = async () => {
  let MESSAGE = JSON.parse(JSON.stringify(messagensDefault));

  try {
    let result = await conversaDAO.getAllConversation();

    console.log(result);

    if (result) {
      if (result.length > 0) {
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code;
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

const buscarConversaPorId = async (id) => {
  let MESSAGE = JSON.parse(JSON.stringify(messagensDefault));

  try {
    let result = await conversaDAO.getConversationById(id);

    if (result) {
      if (result.length > 0) {
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code;
        MESSAGE.HEADER.response = result;

        return MESSAGE.HEADER;
      } else {
        return MESSAGE.ERROR_NOT_FOUND;
      }
    } else {
      return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
    }
  } catch {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

const crianConversa = async (dados, contentType) => {
  let MESSAGE = JSON.parse(JSON.stringify(messagensDefault));

  try {
    let contentTypeValidado = await validacao.validarContentType(contentType);

    if (contentTypeValidado) {
      let result = await conversaDAO.createConversation();

      if (result) {
        let lastIdConversa = await conversaDAO.getSelectLastIdConversation();

        const { usuarios } = dados;

        if (lastIdConversa) {
          let participantes =
            await participantesDAO.criarConversaAddParticipantes(
              usuarios,
              lastIdConversa,
            );

          if (participantes === true) {
            MESSAGE.HEADER.status_code =
              MESSAGE.SUCCESS_CREATED_ITEM.status_code;
            MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message;
            MESSAGE.HEADER.response = {
              id_conversa: lastIdConversa,
              usuarios: usuarios,
            };
            return MESSAGE.HEADER;
          } else {
            await conversaDAO.deleteConversation(lastIdConversa);
            return participantes;
          }
        } else {
          MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
        }
      } else {
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
      }
    } else {
      return MESSAGE.ERROR_CONTENT_TYPE;
    }
  } catch (error) {
    console.log(error);
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

const deletarConversa = async (id) => {
  let MESSAGE = JSON.parse(JSON.stringify(messagensDefault));

  try {
    let idExistente = await buscarConversaPorId(id);

    console.log(idExistente);

    if (idExistente.status_code == 200) {
      let result = await conversaDAO.deleteConversation(id);

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

module.exports = {
  listarConversas,
  buscarConversaPorId,
  crianConversa,
  deletarConversa,
};
