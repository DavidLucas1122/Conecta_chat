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
