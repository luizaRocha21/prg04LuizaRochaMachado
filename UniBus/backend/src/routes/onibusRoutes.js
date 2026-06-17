const express = require('express');

const router = express.Router();


const onibusController =
require('../controllers/onibusController');



router.get(
'/',
onibusController.listarOnibus
);



router.post(
'/',
onibusController.cadastrarOnibus
);



module.exports = router;