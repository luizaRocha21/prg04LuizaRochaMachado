const db = require('../database/connection');



exports.perfilEstudante = (req,res)=>{


const usuario_id = req.usuario.id;



console.log(
"USUARIO AUTH:",
req.usuario
);





db.query(

`

SELECT


estudante.id AS estudante_id,

estudante.nome,

estudante.faculdade,

estudante.curso,

estudante.telefone,

usuario.email,



viagem.id AS viagem_id,

viagem.data,




onibus.id AS onibus_id,

onibus.numero AS onibus,




rota.id AS rota_id,

rota.nome AS rota,

rota.horario_saida AS saida,

rota.horario_retorno AS retorno,




motorista.id AS motorista_id,

motorista.nome AS motorista




FROM estudante



INNER JOIN usuario

ON estudante.usuario_id = usuario.id




LEFT JOIN onibus

ON estudante.onibus_id = onibus.id





LEFT JOIN viagem

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

"Perfil de estudante não encontrado"

});


}





res.json(result[0]);



}



);



};