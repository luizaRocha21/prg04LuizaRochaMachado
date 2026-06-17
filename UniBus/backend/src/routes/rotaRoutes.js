const express = require('express');

const router = express.Router();

const rotaController =
require('../controllers/rotaController');

const db = require('../database/connection');



// listar rotas
router.get(
'/',
rotaController.listarRotas
);



// cadastrar rota
router.post(
'/',
rotaController.cadastrarRota
);



// buscar pontos de uma rota
router.get('/:id/pontos', (req, res)=>{


const rotaId = req.params.id;



db.query(

`

SELECT

id,
nome,
latitude,
longitude

FROM ponto_rota

WHERE rota_id = ?

ORDER BY id

`,

[rotaId],


(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json(result);


}


);



});



module.exports = router;