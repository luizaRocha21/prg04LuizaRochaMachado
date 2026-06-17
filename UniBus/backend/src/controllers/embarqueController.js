const db = require('../database/connection');


// listar embarques

exports.listarEmbarques = (req,res)=>{


    db.query(

    `
    SELECT

    embarque.id,

    estudante.nome AS estudante,

    onibus.numero AS onibus,

    embarque.embarcou


    FROM embarque


    INNER JOIN estudante

    ON embarque.estudante_id = estudante.id


    INNER JOIN viagem

    ON embarque.viagem_id = viagem.id


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





// cadastrar embarque

exports.cadastrarEmbarque = (req,res)=>{


const {

estudante_id,

viagem_id,

embarcou


}=req.body;




db.query(

`

SELECT *

FROM embarque

WHERE estudante_id=?

AND viagem_id=?

`,

[

estudante_id,

viagem_id

],



(err,result)=>{


if(result.length){

return res.json({

mensagem:

"Embarque já confirmado"


});


}





db.query(


`

INSERT INTO embarque

(estudante_id,viagem_id,embarcou)

VALUES(?,?,?)

`,


[

estudante_id,

viagem_id,

embarcou

],


(err)=>{


if(err){

return res.status(500).json(err);


}




res.json({

mensagem:

"Embarque confirmado"


});



}



);



}



);



};