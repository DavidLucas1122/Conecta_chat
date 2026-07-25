const knex = require("knex");
const knexConfig = require("../database_config/knexfile");

const db = knex(knexConfig.development);

const getConversationByIdUser = async (idUsuario) => {
  try {
    const result = await db("tbl_participantes")
      .select("tbl_conversa.*")
      .join(
        "tbl_conversa",
        "tbl_participantes.id_conversa",
        "tbl_conversa.id_conversa",
      )
      .where("tbl_participantes.id_usuario", idUsuario);

    return result;
  } catch (error) {
    return false;
  }
};

const createParticipants = async (data) => {
  try {
    let result = await db("tbl_participantes").insert(data);

    if (Array.isArray(result)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  getConversationByIdUser,
  createParticipants,
};
