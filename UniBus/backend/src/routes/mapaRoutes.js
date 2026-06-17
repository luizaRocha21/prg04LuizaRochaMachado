const express = require('express');

const router = express.Router();


const controller =
require('../controllers/mapaController');



router.get(

'/:id/mapa',

controller.dadosMapa

);



module.exports = router;