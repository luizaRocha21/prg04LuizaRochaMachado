const express = require('express');

const router = express.Router();


const controller =
require('../controllers/pontoRotaController');



router.get(
'/:id/pontos',
controller.listarPontos
);



module.exports = router;