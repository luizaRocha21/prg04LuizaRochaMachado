const db = require('../database/connection');


exports.dashboardMotorista = (req,res)=>{


const id = req.params.id;



db.query(

`

SELECT


motorista.nome AS motorista,


onibus.numero AS onibus,


rota.nome AS rota,



COUNT(DISTINCT presenca.id) 
AS passageiros_confirmados,



COUNT(DISTINCT embarque.id)
AS passageiros_embarcados,



(
COUNT(DISTINCT presenca.id)

-

COUNT(DISTINCT embarque.id)

)

AS pendentes,



COUNT(DISTINCT chamado.id)
AS chamados_pendentes




FROM motorista



LEFT JOIN viagem

ON viagem.motorista_id = motorista.id



LEFT JOIN onibus

ON viagem.onibus_id = onibus.id



LEFT JOIN rota

ON onibus.rota_id = rota.id



LEFT JOIN presenca

ON presenca.viagem_id = viagem.id



LEFT JOIN embarque

ON embarque.viagem_id = viagem.id



LEFT JOIN chamado

ON chamado.viagem_id = viagem.id



WHERE motorista.id = ?



GROUP BY


motorista.id,

motorista.nome,

onibus.numero,

rota.nome



`,


[id],



(err,result)=>{


if(err){

return res.status(500).json(err);

}



res.json(result[0]);


}


);



};