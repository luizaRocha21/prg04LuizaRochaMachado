const db = require('../database/connection');




// =========================
// CADASTRO PÚBLICO
// SOMENTE ESTUDANTE
// =========================


exports.cadastrar = (req,res)=>{


const {


nome,

email,

senha,


foto,

telefone,


faculdade,

curso



}=req.body;





const tipo="estudante";





if(!nome || !email || !senha){


return res.status(400).json({

mensagem:

"Preencha todos os campos obrigatórios"

});


}






db.query(


`

SELECT id

FROM usuario

WHERE email=?

`,


[email],



(err,result)=>{


if(err){

return res.status(500).json(err);

}




if(result.length){


return res.status(400).json({

mensagem:

"Email já cadastrado"

});


}







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

(?,?,?,?)

`,


[

nome,

email,

senha,

tipo

],



(err,result)=>{


if(err){

return res.status(500).json(err);

}




const usuario_id=result.insertId;







db.query(


`

INSERT INTO estudante

(

nome,

foto,

faculdade,

curso,

telefone,

usuario_id

)

VALUES

(?,?,?,?,?,?)

`,


[


nome,

foto || null,

faculdade || null,

curso || null,

telefone || null,

usuario_id


],




(err)=>{


if(err){

return res.status(500).json(err);

}



res.json({

mensagem:

"Estudante cadastrado com sucesso"

});



}



);



}



);



}



);



};









// =========================
// LOGIN
// =========================



exports.login=(req,res)=>{



const {


email,

senha


}=req.body;






db.query(


`

SELECT *

FROM usuario

WHERE email=?

AND senha=?

`,


[

email,

senha

],



(err,result)=>{



if(err){

return res.status(500).json(err);

}




if(result.length===0){


return res.status(401).json({

mensagem:

"Email ou senha inválidos"

});


}




res.json({

usuario:result[0]

});



}



);



};









// =========================
// ADMIN CADASTRA MOTORISTA
// =========================



exports.cadastrarMotorista=(req,res)=>{


const {


nome,

email,

senha,

foto,

telefone,

cnh


}=req.body;






const tipo="motorista";






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

(?,?,?,?)

`,


[

nome,

email,

senha,

tipo

],



(err,result)=>{


if(err){

return res.status(500).json(err);

}





const usuario_id=result.insertId;






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

"Motorista cadastrado pelo administrador"

});



}



);



}



);



};