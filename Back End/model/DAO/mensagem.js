const knex = require("knex");
const knexConfig = require("../database_config/knexfile");

const db = knex(knexConfig.development);

const getMessagesByConversation = async (idConversa) => {
  console.log(idConversa);
  try {
    const result = await db("tbl_mensagem")
      .select("*")
      .where("id_conversa", idConversa)
      .orderBy("data_envio", "asc");

    console.log(result);

    if (Array.isArray(result)) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const getMessageById = async (id) => {
  try {
    let result = await db.select("*").from("tbl_mensagem").where("id", id);

    if (Array.isArray(result)) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const getSelectLastIdMessage = async () => {
  try {
    let result = await db("tbl_mensagem").max("id as lastId");

    if (Array.isArray(result)) {
      return result[0].lastId;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const createMessage = async (data) => {
  try {
    console.log(data);
    const result = await db("tbl_mensagem").insert(data);

    console.log(result);

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
  getMessagesByConversation,
  getMessageById,
  getSelectLastIdMessage,
  createMessage,
};
