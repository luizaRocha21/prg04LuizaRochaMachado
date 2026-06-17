module.exports=(tipo)=>{


return(req,res,next)=>{



if(!req.usuario){


return res.status(401).json({

mensagem:"Não autenticado"

});


}





if(req.usuario.tipo !== tipo){


return res.status(403).json({

mensagem:"Sem permissão"

});


}



next();


}


}