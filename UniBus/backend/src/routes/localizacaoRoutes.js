const express = require('express');

const router = express.Router();


const db = require('../database/connection');


const auth =
require('../middlewares/authMiddleware');





// motorista envia GPS

router.post('/',auth,(req,res)=>{



const {


onibus_id,

latitude,

longitude


}=req.body;





db.query(


`

INSERT INTO localizacao_onibus

(

onibus_id,

latitude,

longitude

)


VALUES(?,?,?)


`,


[

onibus_id,

latitude,

longitude

],




(err)=>{


if(err){

return res.status(500).json(err);

}



res.json({

mensagem:

"Localização atualizada"

});



}


);



});










// estudante recebe GPS

router.get('/:id',auth,(req,res)=>{


const id=req.params.id;




db.query(


`

SELECT *


FROM localizacao_onibus


WHERE onibus_id=?


ORDER BY horario DESC


LIMIT 1



`,


[id],




(err,result)=>{


if(err){

return res.status(500).json(err);

}




res.json(result[0] || null);



}


);



});





module.exports = router;