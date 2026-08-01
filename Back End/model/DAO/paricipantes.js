const knex = require("knex");
const knexConfig = require("../database_config/knexfile");

const db = knex(knexConfig.development);

const getConversationByIdUser = async (idUsuario) => {
  try {
    const result = await db("tbl_participantes as p1")
      .select("c.id_conversa", "u.id_usuario", "u.nome", "u.email", "u.imagem")
      .join("tbl_participantes as p2", "p1.id_conversa", "p2.id_conversa")
      .join("tbl_usuario as u", "p2.id_usuario", "u.id_usuario")
      .join("tbl_conversa as c", "c.id_conversa", "p1.id_conversa")
      .where("p1.id_usuario", idUsuario)
      .whereNot("p2.id_usuario", idUsuario);

    return result;
  } catch (error) {
    console.log(error);
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
