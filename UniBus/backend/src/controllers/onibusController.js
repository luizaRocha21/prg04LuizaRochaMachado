const db = require('../database/connection');



// listar ônibus

exports.listarOnibus = (req,res)=>{


    db.query(

        'SELECT * FROM onibus',

        (err,resultados)=>{


            if(err){

                return res.status(500).json(err);

            }


            res.json(resultados);


        }

    );


};





// cadastrar ônibus

exports.cadastrarOnibus = (req,res)=>{


    const {

        numero,
        placa,
        capacidade,
        rota_id


    } = req.body;



    db.query(

        `INSERT INTO onibus
        (numero, placa, capacidade, rota_id)
        VALUES (?, ?, ?, ?)`,

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
                "Ônibus cadastrado com sucesso"

            });


        }


    );


};