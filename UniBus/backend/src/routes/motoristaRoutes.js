const express = require('express');

const router = express.Router();


const motoristaController =
require('../controllers/motoristaController');



router.get(
'/',
motoristaController.listarMotoristas
);



router.post(
'/',
motoristaController.cadastrarMotorista
);



module.exports = router;