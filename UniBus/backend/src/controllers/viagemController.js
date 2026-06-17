const db = require('../database/connection');




// LISTAR VIAGENS

exports.listarViagens = (req,res)=>{


db.query(

`

SELECT

viagem.id,

viagem.data,

viagem.status,


onibus.numero AS onibus,

rota.nome AS rota,


motorista.nome AS motorista


FROM viagem


INNER JOIN onibus

ON viagem.onibus_id = onibus.id



INNER JOIN rota

ON viagem.rota_id = rota.id



INNER JOIN motorista

ON viagem.motorista_id = motorista.id



ORDER BY viagem.id DESC



`,


(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json(result);


}


);


};









// CRIAR VIAGEM

exports.cadastrarViagem = (req,res)=>{


console.log("USUARIO VIAGEM:",req.usuario);



const motorista_id = req.usuario.id;



const {


data,

onibus_id,

rota_id


}=req.body;





if(!motorista_id){


return res.status(401).json({

mensagem:
"Motorista não autenticado"

});


}






db.query(

`

UPDATE viagem

SET status='finalizada'

WHERE motorista_id=?

AND status='ativa'


`,


[motorista_id],



(err)=>{


if(err){

return res.status(500).json(err);

}




db.query(


`

INSERT INTO viagem

(

data,

onibus_id,

rota_id,

motorista_id,

status

)


VALUES

(?,?,?,?,?)


`,


[

data,

onibus_id,

rota_id,

motorista_id,

"ativa"

],



(err,result)=>{


if(err){

return res.status(500).json(err);

}



res.json({

mensagem:
"Viagem iniciada",

viagem_id:
result.insertId


});



}



);



}


);



};











// FINALIZAR VIAGEM

exports.finalizarViagem=(req,res)=>{


const id=req.params.id;



db.query(

`

UPDATE viagem

SET status='finalizada'

WHERE id=?


`,


[id],



(err)=>{


if(err){

return res.status(500).json(err);

}



res.json({

mensagem:
"Viagem finalizada"

});


}



);



};











// BUSCAR ATIVA


exports.buscarViagemAtiva=(req,res)=>{


const id=req.params.onibus_id;



db.query(

`

SELECT *


FROM viagem


WHERE onibus_id=?

AND status='ativa'


LIMIT 1



`,


[id],



(err,result)=>{


if(err){

return res.status(500).json(err);

}



if(result.length===0){


return res.status(404).json({

mensagem:
"Nenhuma viagem ativa"

});


}



res.json(result[0]);


}



);


};