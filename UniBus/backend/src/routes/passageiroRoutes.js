const express = require("express");

const router = express.Router();


const controller =
require("../controllers/passageiroController");



router.get(

"/viagem/:viagem_id",

controller.listarPassageiros

);



router.put(

"/:id",

controller.atualizarPassageiro

);



module.exports = router;