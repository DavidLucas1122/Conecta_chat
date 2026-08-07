const mensagemDAO = require("../../model/DAO/mensagem.js");
const messagensDefault = require("../model/config_messages");
const validacao = require("../model/validacions");
const { getIO } = require("../../websocket/socket.js");

const buscarMensagensConversa = async (idConversa) => {
  let MESSAGE = JSON.parse(JSON.stringify(messagensDefault));

  try {
    let result = await mensagemDAO.getMessagesByConversation(idConversa);

    if (result) {
      result.forEach((mensagem) => {
        const data = new Date(mensagem.data_envio);

        mensagem.data = data.toLocaleDateString("pt-BR");
        mensagem.hora = data.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        delete mensagem.data_envio;
      });

      MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code;
      MESSAGE.HEADER.response = result;
      MESSAGE.HEADER.idConversa = idConversa;

      return MESSAGE.HEADER;
    } else {
      return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

const criarMensagem = async (dados, contentType) => {
  let MESSAGE = JSON.parse(JSON.stringify(messagensDefault));

  try {
    let contentTypeValidado = await validacao.validarContentType(contentType);

    if (contentTypeValidado) {
      let result = await mensagemDAO.createMessage(dados);

      if (result) {
        let lastIdMensagem = await mensagemDAO.getSelectLastIdMessage();

        if (lastIdMensagem) {
          const mensagemCriada =
            await mensagemDAO.getMessageById(lastIdMensagem);

          const io = getIO();

          io.to(`conversa-${dados.id_conversa}`).emit(
            "nova-mensagem",
            mensagemCriada,
          );

          MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code;
          MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message;
          MESSAGE.HEADER.response = mensagemCriada;

          return MESSAGE.HEADER;
        } else {
          return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
        }
      } else {
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
      }
    } else {
      return MESSAGE.ERROR_CONTENT_TYPE;
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

module.exports = {
  buscarMensagensConversa,
  criarMensagem,
};
