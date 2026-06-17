const db = require('../database/connection');




// listar motoristas

exports.listarMotoristas = (req,res)=>{


db.query(

`
SELECT

motorista.id,
motorista.nome,
motorista.foto,
motorista.telefone,
motorista.cnh,
usuario.email

FROM motorista

LEFT JOIN usuario

ON motorista.usuario_id = usuario.id

`,

(err,resultados)=>{


if(err){

return res.status(500).json(err);

}


res.json(resultados);


}


);


};









// cadastrar motorista

exports.cadastrarMotorista = (req,res)=>{


const {


nome,

foto,

telefone,

cnh,

usuario_id


}=req.body;




db.query(

`

INSERT INTO motorista

(

nome,
foto,
telefone,
cnh,
usuario_id

)

VALUES (?,?,?,?,?)

`,

[

nome,
foto,
telefone,
cnh,
usuario_id

],



(err,result)=>{


if(err){

return res.status(500).json(err);

}



res.json({

mensagem:
"Motorista cadastrado",

motorista_id:
result.insertId

});



}


);



};









// buscar motorista logado

exports.perfilMotorista=(req,res)=>{


const id=req.usuario.id;



db.query(

`

SELECT

motorista.id,
motorista.nome,
motorista.foto,
motorista.telefone,
motorista.cnh


FROM motorista


WHERE motorista.usuario_id=?


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
"Motorista não encontrado"

});

}



res.json(result[0]);



}


);



};