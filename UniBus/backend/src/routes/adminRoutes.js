const express = require('express');

const router = express.Router();


const adminController =
require('../controllers/adminController');




// =====================
// ROTAS
// =====================


router.post(

'/rotas',

adminController.cadastrarRota

);




// =====================
// ONIBUS
// =====================


router.post(

'/onibus',

adminController.cadastrarOnibus

);




// =====================
// MOTORISTA
// =====================


router.post(

'/motoristas',

adminController.cadastrarMotorista

);





module.exports = router;