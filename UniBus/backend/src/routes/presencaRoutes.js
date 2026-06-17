const express = require('express');

const router = express.Router();


const presencaController =
require('../controllers/presencaController');



router.get(
'/',
presencaController.listarPresencas
);



router.post(
'/',
presencaController.cadastrarPresenca
);



module.exports = router;