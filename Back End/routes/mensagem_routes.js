const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const bodyParserJson = bodyParser.json();

const controllerMensagem = require("../controller/mensagem/controller_mensagem");

router.get("/:id", cors(), async (req, res) => {
  let id_conversa = req.params.id;
  let mensagens = await controllerMensagem.buscarMensagensConversa(id_conversa);

  res.status(mensagens.status_code);
  res.json(mensagens);
});

router.post("/", cors(), bodyParserJson, async (req, res) => {
  let dadosBody = req.body;

  let contentType = req.headers["content-type"];

  let mensagem = await controllerMensagem.criarMensagem(dadosBody, contentType);

  res.status(mensagem.status_code);
  res.json(mensagem);
});

module.exports = router;
