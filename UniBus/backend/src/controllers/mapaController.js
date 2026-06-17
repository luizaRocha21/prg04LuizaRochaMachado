const db = require('../database/connection');



exports.dadosMapa = (req,res)=>{


const id = req.params.id;



const resposta = {};



// buscar ônibus

db.query(

`

SELECT

onibus.numero,

rota.nome AS rota


FROM onibus


INNER JOIN rota

ON onibus.rota_id = rota.id


WHERE onibus.id = ?

`,

[id],


(err,onibus)=>{


if(err){

return res.status(500).json(err);

}


resposta.onibus = onibus[0];



// buscar localização

db.query(

`

SELECT

latitude,

longitude,

horario


FROM localizacao_onibus


WHERE onibus_id = ?


ORDER BY id DESC


LIMIT 1

`,


[id],



(err,localizacao)=>{


if(err){

return res.status(500).json(err);

}



resposta.localizacao = localizacao[0];



// buscar pontos

db.query(

`

SELECT

nome,

latitude,

longitude


FROM ponto_rota


WHERE rota_id =

(

SELECT rota_id

FROM onibus

WHERE id = ?

)

ORDER BY id


`,


[id],



(err,pontos)=>{


if(err){

return res.status(500).json(err);

}



resposta.pontos = pontos;



res.json(resposta);



}



);



}



);



}



);



};