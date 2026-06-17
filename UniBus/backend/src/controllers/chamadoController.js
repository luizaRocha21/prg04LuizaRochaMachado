const db = require('../database/connection');





// ======================================
// LISTAR CHAMADOS DA VIAGEM
// ======================================

exports.listarChamados = (req,res)=>{


const viagem_id = req.params.viagem_id;



db.query(

`

SELECT


chamado.id,


estudante.id AS estudante_id,


estudante.nome AS estudante,


estudante.faculdade,


chamado.mensagem,


chamado.status,


viagem.motorista_id



FROM chamado



INNER JOIN estudante

ON chamado.estudante_id = estudante.id



LEFT JOIN viagem

ON chamado.viagem_id = viagem.id



WHERE chamado.viagem_id = ?



ORDER BY chamado.id DESC


`,

[viagem_id],



(err,result)=>{


if(err){

return res.status(500).json(err);

}



res.json(result);



}



);


};









// ======================================
// CRIAR CHAMADO
// COM OU SEM VIAGEM
// ======================================


exports.cadastrarChamado = (req,res)=>{



const {


estudante_id,

viagem_id,

motorista_id,

mensagem


}=req.body;







// validação


if(!estudante_id || !mensagem){


return res.status(400).json({

mensagem:

"Dados obrigatórios faltando"

});


}









// ======================================
// CASO TENHA VIAGEM
// ======================================


if(viagem_id){



db.query(


`

SELECT motorista_id

FROM viagem

WHERE id=?

`,


[viagem_id],



(err,viagem)=>{



if(err){

return res.status(500).json(err);

}





if(!viagem.length){

return res.status(404).json({

mensagem:

"Viagem não encontrada"

});

}




const motoristaDaViagem = viagem[0].motorista_id;






salvarChamado(

req,

res,

{

estudante_id,

viagem_id,

mensagem,

motorista_id:motoristaDaViagem

}

);





}




);



}









// ======================================
// SEM VIAGEM
// ENVIA DIRETO AO MOTORISTA
// ======================================


else if(motorista_id){



salvarChamado(

req,

res,

{

estudante_id,

viagem_id:null,

mensagem,

motorista_id

}

);



}

else{


return res.status(400).json({

mensagem:

"Selecione um motorista"

});


}



};












// ======================================
// FUNÇÃO AUXILIAR
// ======================================


function salvarChamado(req,res,dados){



const {


estudante_id,

viagem_id,

mensagem,

motorista_id


}=dados;





db.query(


`

INSERT INTO chamado

(

estudante_id,

viagem_id,

mensagem,

status

)


VALUES

(?,?,?,?)



`,


[


estudante_id,

viagem_id,

mensagem,

"Pendente"



],



(err,result)=>{



if(err){

return res.status(500).json(err);

}





const chamado = {


id:

result.insertId,


estudante_id,


viagem_id,


motorista_id,


mensagem,


status:"Pendente"



};







// SOCKET EM TEMPO REAL


const io=req.app.get("io");





io.to(


"motorista_"+motorista_id


)

.emit(


"novo_chamado",


chamado


);









res.json({


mensagem:

"Mensagem enviada ao motorista",


chamado



});





}



);



}














// ======================================
// ATUALIZAR STATUS
// ======================================


exports.atualizarChamado=(req,res)=>{


const id=req.params.id;


const {

status

}=req.body;




db.query(


`

UPDATE chamado

SET status=?

WHERE id=?



`,


[

status,

id

],



(err)=>{


if(err){

return res.status(500).json(err);

}




res.json({

mensagem:

"Status atualizado"

});



}



);



};













// ======================================
// LISTAR MENSAGENS CHAT
// ======================================


exports.listarMensagens=(req,res)=>{


const chamado_id=req.params.id;



db.query(


`

SELECT *

FROM mensagem

WHERE chamado_id=?

ORDER BY data ASC


`,


[chamado_id],



(err,result)=>{


if(err){

return res.status(500).json(err);

}



res.json(result);



}



);


};












// ======================================
// ENVIAR MENSAGEM CHAT
// ======================================


exports.enviarMensagem=(req,res)=>{


const {


chamado_id,


remetente,


mensagem


}=req.body;





db.query(


`

INSERT INTO mensagem

(

chamado_id,

remetente,

mensagem

)


VALUES

(?,?,?)


`,


[


chamado_id,

remetente,

mensagem


],




(err)=>{



if(err){

return res.status(500).json(err);

}





const io=req.app.get("io");





io.emit(

"nova_mensagem",

{

chamado_id,

remetente,

mensagem

}

);






res.json({

mensagem:

"Mensagem enviada"


});





}



);



};