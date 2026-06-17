const express = require('express');

const router = express.Router();


const chamadoController =
require('../controllers/chamadoController');


const auth =
require('../middlewares/authmiddleware');






router.get(

'/viagem/:viagem_id',

auth,

chamadoController.listarChamados

);






router.post(

'/',

auth,

chamadoController.cadastrarChamado

);






router.put(

'/:id',

auth,

chamadoController.atualizarChamado

);






router.get(

'/:id/mensagens',

auth,

chamadoController.listarMensagens

);






router.post(

'/mensagem',

auth,

chamadoController.enviarMensagem

);






module.exports = router;