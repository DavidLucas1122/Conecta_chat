const knex = require("knex");
const knexConfig = require("../database_config/knexfile");

const db = knex(knexConfig.development);

const getAllConversation = async () => {
  try {
    let result = await db
      .select("*")
      .from("tbl_conversa")
      .orderBy("id_conversa");

    if (Array.isArray(result)) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const getConversationById = async (id) => {
  console.log(id);
  try {
    let result = await db
      .select("*")
      .from("tbl_conversa")
      .where("id_conversa", id);

    console.log(`AAA ${result}`);

    if (Array.isArray(result)) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getSelectLastIdConversation = async () => {
  try {
    let result = await db("tbl_conversa").max("id_conversa as lastId");

    if (Array.isArray(result)) {
      return result[0].lastId;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const createConversation = async () => {
  try {
    let result = await db("tbl_conversa").insert({});

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

const deleteConversation = async (id) => {
  try {
    let result = await db("tbl_conversa").where("id_conversa", id).del();

    if (result == 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

module.exports = {
  getAllConversation,
  getConversationById,
  getSelectLastIdConversation,
  createConversation,
  deleteConversation,
};
