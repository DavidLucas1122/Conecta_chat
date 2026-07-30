const knex = require("knex");
const knexConfig = require("../database_config/knexfile");

const db = knex(knexConfig.development);

const getAllUsers = async () => {
  try {
    let result = await db.select("*").from("tbl_usuario").orderBy("id_usuario");

    if (Array.isArray(result)) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const getUserById = async (id) => {
  try {
    let result = await db
      .select("*")
      .from("tbl_usuario")
      .where("id_usuario", id);

    if (Array.isArray(result)) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const getSelectLastIdUsuario = async () => {
  try {
    let result = await db("tbl_usuario").max("id_usuario as lastId");

    if (Array.isArray(result)) {
      return result[0].lastId;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const createUser = async (userData) => {
  try {
    let result = await db("tbl_usuario").insert(userData);

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

const findByEmail = async (email) => {
  return await db("tbl_usuario").where({ email }).first();
};

const findByNumero = async (numero) => {
  return await db("tbl_usuario").where({ numero }).first();
};

const updateUser = async (id, userData) => {
  try {
    let result = await db("tbl_usuario")
      .where("id_usuario", id)
      .update(userData);

    if (result) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const deleteUser = async (id) => {
  try {
    let result = await db("tbl_usuario").where("id_usuario", id).del();

    console.log(result);

    if (result == 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const loginUser = async (email) => {
  try {
    let result = await db.select("*").from("tbl_usuario").where("email", email);

    if (Array.isArray(result)) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getSelectLastIdUsuario,
  createUser,
  findByEmail,
  findByNumero,
  updateUser,
  deleteUser,
  loginUser,
};
