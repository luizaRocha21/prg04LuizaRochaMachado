const express = require('express');

const router = express.Router();


const controller =
require('../controllers/viagemController');


const auth =
require('../middlewares/authMiddleware');




// listar

router.get(

"/",

controller.listarViagens

);




// criar

router.post(

"/",

auth,

controller.cadastrarViagem

);




// finalizar

router.put(

"/finalizar/:id",

auth,

controller.finalizarViagem

);




// ativa

router.get(

"/ativa/:onibus_id",

controller.buscarViagemAtiva

);



module.exports=router;