const db = require('../database/connection');




// listar estudantes

exports.listarEstudantes=(req,res)=>{


db.query(

'SELECT * FROM estudante',


(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json(result);



}


);


};









// cadastrar estudante

exports.cadastrarEstudante=(req,res)=>{


const {

nome,

faculdade,

curso,

telefone,

usuario_id


}=req.body;



db.query(

`

INSERT INTO estudante

(

nome,

faculdade,

curso,

telefone,

usuario_id

)

VALUES (?,?,?,?,?)

`,


[

nome,

faculdade,

curso,

telefone,

usuario_id

],


(err)=>{


if(err){

return res.status(500).json(err);

}


res.json({

mensagem:

"Estudante cadastrado"

});


}


);



};









// PERFIL ESTUDANTE LOGADO


exports.perfilEstudante=(req,res)=>{


const usuario_id =

req.usuario.id;




db.query(

`

SELECT



estudante.id AS estudante_id,

estudante.nome,

estudante.faculdade,

estudante.curso,

estudante.telefone,





viagem.id AS viagem_id,

viagem.data,

viagem.status,





onibus.id AS onibus_id,

onibus.numero AS onibus,





rota.id AS rota_id,

rota.nome AS rota,

rota.horario_saida AS saida,

rota.horario_retorno AS retorno,





motorista.id AS motorista_id,

motorista.nome AS motorista





FROM estudante





LEFT JOIN viagem

ON viagem.id = estudante.viagem_id





LEFT JOIN onibus

ON viagem.onibus_id = onibus.id





LEFT JOIN rota

ON viagem.rota_id = rota.id





LEFT JOIN motorista

ON viagem.motorista_id = motorista.id





WHERE estudante.usuario_id = ?





ORDER BY viagem.id DESC





LIMIT 1



`,


[usuario_id],



(err,result)=>{


if(err){


console.log(err);


return res.status(500).json(err);


}





if(result.length===0){


return res.status(404).json({

mensagem:

"Estudante não encontrado"

});


}





res.json(result[0]);



}



);



};