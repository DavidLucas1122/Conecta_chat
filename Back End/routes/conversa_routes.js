const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const bodyParserJson = bodyParser.json();

const controllerConversa = require("../controller/conversa/controller_conversa");

router.get("/", cors(), async (req, res) => {
  let conversa = await controllerConversa.listarConversas();

  console.log(conversa);

  res.status(conversa.status_code);
  res.json(conversa);
});

router.get("/:id", cors(), async (req, res) => {
  let id = req.params.id;
  let conversa = await controllerConversa.buscarConversaPorId(id);

  console.log(conversa);

  res.status(conversa.status_code);
  res.json(conversa);
});

router.post("/", cors(), bodyParserJson, async (req, res) => {
  let dadosBody = req.body;

  let contentType = req.headers["content-type"];

  let conversa = await controllerConversa.crianConversa(dadosBody, contentType);

  res.status(conversa.status_code);
  res.json(conversa);
});

router.delete("/:id", cors(), async (req, res) => {
  let id = req.params.id;
  let conversa = await controllerConversa.deletarConversa(id);

  res.status(conversa.status_code);
  res.json(conversa);
});

module.exports = router;
