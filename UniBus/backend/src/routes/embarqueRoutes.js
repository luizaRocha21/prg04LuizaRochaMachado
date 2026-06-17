const express = require('express');

const router = express.Router();


const embarqueController =
require('../controllers/embarqueController');



router.get(
'/',
embarqueController.listarEmbarques
);



router.post(
'/',
embarqueController.cadastrarEmbarque
);



module.exports = router;