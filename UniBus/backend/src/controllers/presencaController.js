const db = require('../database/connection');



// listar presenças

exports.listarPresencas = (req,res)=>{


db.query(

`
SELECT

presenca.id,

estudante.nome AS estudante,

viagem.data,

onibus.numero AS onibus,

presenca.vai,

presenca.volta


FROM presenca


INNER JOIN estudante
ON presenca.estudante_id = estudante.id


INNER JOIN viagem
ON presenca.viagem_id = viagem.id


INNER JOIN onibus
ON viagem.onibus_id = onibus.id

`,


(err,resultados)=>{


if(err){

return res.status(500).json(err);

}


res.json(resultados);


}


);


};





// cadastrar presença

exports.cadastrarPresenca = (req,res)=>{


const {

estudante_id,

viagem_id,

vai,

volta


}=req.body;



db.query(


`
INSERT INTO presenca
(estudante_id, viagem_id, vai, volta)

VALUES (?, ?, ?, ?)

`,


[

estudante_id,

viagem_id,

vai,

volta

],


(err)=>{


if(err){

return res.status(500).json(err);

}


res.json({

mensagem:
"Presença registrada"

});


}


);



};