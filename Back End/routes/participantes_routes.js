const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const bodyParserJson = bodyParser.json();

const controllerParticipante = require("../controller/participantes/controller_participantes");

router.get("/:id", cors(), async (req, res) => {
  let id = req.params.id;
  let participantes = await controllerParticipante.buscarConversasUsuario(id);

  res.status(participantes.status_code);
  res.json(participantes);
});

module.exports = router;
