const db = require('../database/connection');


// listar rotas

exports.listarRotas = (req,res)=>{


    db.query(
        'SELECT * FROM rota',
        (err,resultados)=>{


            if(err){

                return res.status(500).json(err);

            }


            res.json(resultados);


        }
    );


};




// cadastrar rota

exports.cadastrarRota = (req,res)=>{


    const {

        nome,
        origem,
        destino,
        horario_saida,
        horario_retorno


    } = req.body;



    db.query(

        `INSERT INTO rota 
        (nome, origem, destino, horario_saida, horario_retorno)
        VALUES (?, ?, ?, ?, ?)`,

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
                "Rota cadastrada com sucesso"

            });


        }

    );


};