const db = require('../database/connection');



// motorista envia localização do ônibus

exports.atualizarLocalizacao = (req,res)=>{


const {

onibus_id,

latitude,

longitude

} = req.body;



db.query(

`

INSERT INTO localizacao_onibus

(
onibus_id,
latitude,
longitude
)

VALUES (?, ?, ?)

`,


[

onibus_id,

latitude,

longitude

],



(err)=>{


if(err){

return res.status(500).json(err);

}



res.json({

mensagem:

"Localização atualizada com sucesso"

});


}


);


};







// estudante consulta localização do ônibus

exports.buscarLocalizacao = (req,res)=>{


const onibus_id = req.params.id;



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


[onibus_id],



(err,result)=>{


if(err){

return res.status(500).json(err);

}



if(result.length === 0){

return res.json({

mensagem:

"Sem localização disponível"

});


}



res.json(result[0]);


}


);


};