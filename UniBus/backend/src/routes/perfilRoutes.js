const express = require('express');

const router = express.Router();


const perfilController =
require('../controllers/perfilController');


const authMiddleware =
require('../middlewares/authMiddleware');





router.get(

'/perfil',

authMiddleware,

perfilController.perfilEstudante

);





module.exports = router;