import api from "./api.js";

const getConversation = async (id) => {
  const url = `/mensagens/${id}`;

  try {
    const response = await api.get(url);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const sendMessage = async (data) => {
  const url = `/mensagens`;

  console.log(data);

  try {
    const response = await api.post(url, data);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const messageService = {
  getConversation,
  sendMessage,
};
