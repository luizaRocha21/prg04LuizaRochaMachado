const express = require('express');

const router = express.Router();


const estudanteController =
require('../controllers/estudanteController');


const authMiddleware =
require('../middlewares/authMiddleware');




// listar estudantes

router.get(
'/',
authMiddleware,
estudanteController.listarEstudantes
);




// cadastro manual

router.post(
'/',
estudanteController.cadastrarEstudante
);




// perfil do estudante logado

router.get(

'/perfil',

authMiddleware,

estudanteController.perfilEstudante

);





module.exports = router;