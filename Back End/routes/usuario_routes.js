const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const bodyParserJson = bodyParser.json();

const controllerUsuario = require("../controller/usuario/controller_usuario");

router.get("/", cors(), async (req, res) => {
  let usuario = await controllerUsuario.listarUsuarios();

  console.log(usuario);

  res.status(usuario.status_code);
  res.json(usuario);
});

router.get("/:id", cors(), async (req, res) => {
  let id = req.params.id;
  let usuario = await controllerUsuario.buscarUsuarioPorId(id);

  console.log(usuario);

  res.status(usuario.status_code);
  res.json(usuario);
});

router.post("/", cors(), bodyParserJson, async (req, res) => {
  let dadosBody = req.body;

  let contentType = req.headers["content-type"];

  let usuario = await controllerUsuario.criarUsuario(dadosBody, contentType);

  console.log(usuario);

  res.status(usuario.status_code);
  res.json(usuario);
});

router.put("/:id", cors(), bodyParserJson, async (req, res) => {
  let id = req.params.id;
  let dadosBody = req.body;
  let contentType = req.headers["content-type"];

  let usuario = await controllerUsuario.atualizarUsuario(
    id,
    dadosBody,
    contentType,
  );

  res.status(usuario.status_code);
  res.json(usuario);
});

router.delete("/:id", cors(), async (req, res) => {
  let id = req.params.id;
  let usuario = await controllerUsuario.deletarUsuario(id);

  res.status(usuario.status_code);
  res.json(usuario);
});

router.post("/login", cors(), bodyParserJson, async (req, res) => {
  let dadosBody = req.body;

  let contentType = req.headers["content-type"];

  let usuario = await controllerUsuario.loginUsuario(dadosBody, contentType);

  res.status(usuario.status_code);
  res.json(usuario);
});

module.exports = router;
