const db = require('../database/connection');


exports.listarPassageiros = (req,res)=>{


const id = req.params.id;



db.query(

`

SELECT


estudante.nome,

estudante.faculdade,

estudante.curso,


presenca.vai,


COALESCE(embarque.embarcou,false)
AS embarcou



FROM viagem



INNER JOIN presenca

ON viagem.id = presenca.viagem_id



INNER JOIN estudante

ON presenca.estudante_id = estudante.id



LEFT JOIN embarque

ON embarque.estudante_id = estudante.id

AND embarque.viagem_id = viagem.id



WHERE viagem.motorista_id = ?



`,


[id],


(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json(result);


}


);



};