const participantesDAO = require("../../model/DAO/paricipantes");
const messagensDefault = require("../model/config_messages");
const validacao = require("../model/validacions");

const buscarConversasUsuario = async (id) => {
  let MESSAGE = JSON.parse(JSON.stringify(messagensDefault));

  try {
    let result = await participantesDAO.getConversationByIdUser(id);

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

const criarConversaAddParticipantes = async (usuarios, conversa) => {
  let MESSAGE = JSON.parse(JSON.stringify(messagensDefault));

  try {
    let result = await Promise.all(
      usuarios.map((idUsuario) =>
        participantesDAO.createParticipants({
          id_usuario: idUsuario,
          id_conversa: conversa,
        }),
      ),
    );
    if (result[0] & result[1]) {
      return true;
    } else {
      return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
    }
  } catch (error) {
    console.log(error);
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

module.exports = {
  buscarConversasUsuario,
  criarConversaAddParticipantes,
};
