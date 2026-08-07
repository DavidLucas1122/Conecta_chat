import { useEffect, useState } from "react";
import { userService } from "../services/userService";
import { messageService } from "../services/messageService";
import Cookies from "js-cookie";

function useMain() {
  const id_usuario = Number(Cookies.get("id_usuario"));
  const [loading, setLoading] = useState(false);
  const [conversas, setConversas] = useState([]);
  const [user, setUser] = useState(null);
  const [conversaSelecionada, setConversaSelecionada] = useState(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    carregarConversas();
  }, []);

  useEffect(() => {
    carregarUser();
  }, []);

  async function carregarConversas() {
    setLoading(true);
    try {
      const buscarConversas = await userService.getConversationUser(id_usuario);

      if (buscarConversas.status_code === 404) {
        setConversas([]);
        return;
      }

      setConversas(buscarConversas.response);
    } finally {
      setLoading(false);
    }
  }

  async function carregarUser() {
    setLoading(true);
    try {
      const buscarUser = await userService.getUserById(id_usuario);

      setUser(buscarUser.response[0]);
    } finally {
      setLoading(false);
    }
  }

  async function selecionarConversa(id_conversa) {
    setLoading(true);

    try {
      const conversa = await messageService.getConversation(id_conversa);

      console.log(conversa);

      setConversaSelecionada(conversa);
    } finally {
      setLoading(false);
    }
  }

  async function enviarMensagem() {
    if (!mensagem.trim() || !conversaSelecionada) {
      return;
    }

    console.log(conversaSelecionada);

    const dados = {
      id_conversa: conversaSelecionada.idConversa,
      id_usuario: id_usuario,
      conteudo: mensagem,
    };

    const resposta = await messageService.sendMessage(dados);

    const novaMensagem = resposta.response[0];
    const data = new Date(novaMensagem.data_envio);

    novaMensagem.data = data.toLocaleDateString("pt-BR");
    novaMensagem.hora = data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    delete novaMensagem.data_envio;

    setConversaSelecionada((prev) => ({
      ...prev,
      response: [...prev.response, novaMensagem],
    }));

    setMensagem("");
  }

  return {
    conversas,
    loading,
    user,
    conversaSelecionada,
    mensagem,
    setMensagem,
    setConversaSelecionada,
    selecionarConversa,
    enviarMensagem,
  };
}

export default useMain;
