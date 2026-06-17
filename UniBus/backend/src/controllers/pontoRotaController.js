const db = require('../database/connection');



exports.listarPontos = (req,res)=>{


const rota_id = req.params.id;



db.query(

`

SELECT

nome,

latitude,

longitude


FROM ponto_rota


WHERE rota_id = ?


ORDER BY id


`,


[rota_id],


(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json(result);


}


);



};