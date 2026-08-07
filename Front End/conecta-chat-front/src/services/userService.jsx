import api from "./api.js";

const getUsers = async function () {
  const url = "/usuarios";

  try {
    const response = await api.get(url);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const getUserById = async (id) => {
  const url = `/usuarios/${id}`;

  try {
    const response = await api.get(url);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const createUser = async function (data) {
  const url = `/usuarios`;

  try {
    const response = await api.post(url, data);

    console.log(response);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const loginUser = async (data) => {
  const url = "usuarios/login";

  try {
    const response = await api.post(url, data);

    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

const getConversationUser = async (id) => {
  const url = `participantes/${id}`;

  try {
    const response = await api.get(url);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const userService = {
  getUsers,
  getUserById,
  createUser,
  loginUser,
  getConversationUser,
};
