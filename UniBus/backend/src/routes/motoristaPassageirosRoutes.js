const express = require('express');

const router = express.Router();


const controller =
require('../controllers/motoristaPassageirosController');



router.get(
'/:id/passageiros',
controller.listarPassageiros
);



module.exports = router;