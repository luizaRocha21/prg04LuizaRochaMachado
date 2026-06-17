const db = require('../database/connection');




// =====================
// CADASTRAR ROTA
// =====================


exports.cadastrarRota = (req,res)=>{


const {

nome,

origem,

destino,

horario_saida,

horario_retorno


}=req.body;




db.query(

`

INSERT INTO rota

(

nome,

origem,

destino,

horario_saida,

horario_retorno

)

VALUES

(?,?,?,?,?)

`,

[

nome,

origem,

destino,

horario_saida,

horario_retorno

],



(err)=>{


if(err){

return res.status(500).json(err);

}



res.json({

mensagem:
"Rota cadastrada"

});


}



);


};









// =====================
// CADASTRAR ONIBUS
// =====================


exports.cadastrarOnibus = (req,res)=>{


const {


numero,

placa,

capacidade,

rota_id


}=req.body;





db.query(

`

INSERT INTO onibus

(

numero,

placa,

capacidade,

rota_id

)

VALUES

(?,?,?,?)

`,

[

numero,

placa,

capacidade,

rota_id

],



(err)=>{


if(err){

return res.status(500).json(err);

}



res.json({

mensagem:
"Ônibus cadastrado"

});


}



);


};









// =====================
// CADASTRAR MOTORISTA
// =====================


exports.cadastrarMotorista = (req,res)=>{


const {


nome,

email,

senha,

telefone,

cnh,

foto


}=req.body;






// cria usuário motorista


db.query(


`

INSERT INTO usuario

(

nome,

email,

senha,

tipo

)

VALUES

(?,?,?,'motorista')


`,


[

nome,

email,

senha

],




(err,result)=>{


if(err){

return res.status(500).json(err);

}



const usuario_id =
result.insertId;





// cria motorista


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

VALUES

(?,?,?,?,?)

`,


[


nome,

foto || null,

telefone || null,

cnh || null,

usuario_id


],




(err)=>{


if(err){

return res.status(500).json(err);

}



res.json({

mensagem:

"Motorista cadastrado com sucesso"


});



}



);



}



);



};