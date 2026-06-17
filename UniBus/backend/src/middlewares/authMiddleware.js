module.exports = (req,res,next)=>{


const usuario =
req.headers.usuario;



if(!usuario){


return res.status(401).json({

mensagem:"Usuário não autenticado"

});


}



req.usuario =
JSON.parse(usuario);



next();



};