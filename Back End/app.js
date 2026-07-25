const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");

const bodyParserJson = bodyParser.json();

const PORT = process.env.PORT || 3000;

const { iniciarSocket } = require("./websocket/socket");

const app = express();

const server = http.createServer(app);

iniciarSocket(server);

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const usuarioRoutes = require("./routes/usuario_routes");
const conversaRoutes = require("./routes/conversa_routes");
const participantesRoutes = require("./routes/participantes_routes");
const mensagensRoutes = require("./routes/mensagem_routes");

app.use("/v1/chat/usuarios", usuarioRoutes);
app.use("/v1/chat/conversas", conversaRoutes);
app.use("/v1/chat/participantes", participantesRoutes);
app.use("/v1/chat/mensagens", mensagensRoutes);

server.listen(PORT, () => {
  console.log(`API aguardando conexões na porta ${PORT}`);
});
