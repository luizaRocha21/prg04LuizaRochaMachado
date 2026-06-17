const db = require("../database/connection");




// listar passageiros da viagem

exports.listarPassageiros = (req,res)=>{


const viagem_id = req.params.viagem_id;



db.query(

`

SELECT


passageiro_viagem.id,


estudante.id AS estudante_id,


estudante.nome,


estudante.faculdade,


estudante.curso,



passageiro_viagem.vai,


passageiro_viagem.volta,


passageiro_viagem.embarcado



FROM passageiro_viagem



INNER JOIN estudante

ON estudante.id = passageiro_viagem.estudante_id



WHERE viagem_id = ?


`,

[viagem_id],



(err,result)=>{


if(err)

return res.status(500).json(err);



res.json(result);


}



);


};







// atualizar status do aluno


exports.atualizarPassageiro = (req,res)=>{


const id=req.params.id;


const {

vai,

volta,

embarcado

}=req.body;




db.query(

`

UPDATE passageiro_viagem


SET

vai=?,

volta=?,

embarcado=?


WHERE id=?



`,

[

vai,

volta,

embarcado,

id

],



(err)=>{


if(err)

return res.status(500).json(err);



res.json({

mensagem:

"Passageiro atualizado"

});


}



);


};