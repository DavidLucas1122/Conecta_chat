const { Server } = require("socket.io");

let io;

const iniciarSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Novo usuário conectado:", socket.id);

    socket.on("entrar_conversa", (id_conversa) => {
      const sala = `conversa-${id_conversa}`;

      socket.join(sala);

      console.log(`Socket ${socket.id} entrou na sala: ${sala}`);
    });

    socket.on("sair_conversa", (id_conversa) => {
      const sala = `conversa-${id_conversa}`;

      socket.leave(sala);

      console.log(`Socket ${socket.id} saiu da sala: ${sala}`);
    });

    socket.on("disconnect", () => {
      console.log("Usuário desconectado:", socket.id);
    });
  });
};

const getIO = () => io;

module.exports = {
  iniciarSocket,
  getIO,
};
