const { Server } = require("socket.io");

let io;

const iniciarSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on("entrar_conversa", (id_conversa) => {
      const sala = `conversa-${id_conversa}`;

      socket.join(sala);
    });

    socket.on("sair_conversa", (id_conversa) => {
      const sala = `conversa-${id_conversa}`;

      socket.leave(sala);
    });

    socket.on("disconnect", () => {});
  });
};

const getIO = () => io;

module.exports = {
  iniciarSocket,
  getIO,
};
