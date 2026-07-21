const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');


const app = express();


app.use(cors());

app.use(express.json());



const server = http.createServer(app);



const io = new Server(server,{

cors:{

origin:"*",

methods:["GET","POST"]

}

});





app.set("io",io);





io.on("connection",(socket)=>{


console.log("Socket conectado");




socket.on("entrar",(usuario)=>{


if(usuario.tipo==="motorista"){


socket.join(
"motorista_"+usuario.id
);


}



if(usuario.tipo==="estudante"){


socket.join(
"estudante_"+usuario.id
);


}




if(usuario.tipo==="admin"){


socket.join(
"admin_"+usuario.id
);


}



});





socket.on("disconnect",()=>{


console.log("Socket desconectado");


});


});









// =====================
// IMPORTS DAS ROTAS
// =====================



const authRoutes =
require('./routes/authRoutes');


const estudanteRoutes =
require('./routes/estudanteRoutes');


const motoristaRoutes =
require('./routes/motoristaRoutes');


const motoristaDashboardRoutes =
require('./routes/motoristaDashboardRoutes');


const rotaRoutes =
require('./routes/rotaRoutes');


const onibusRoutes =
require('./routes/onibusRoutes');


const viagemRoutes =
require('./routes/viagemRoutes');


const presencaRoutes =
require('./routes/presencaRoutes');


const chamadoRoutes =
require('./routes/chamadoRoutes');


const embarqueRoutes =
require('./routes/embarqueRoutes');


const localizacaoRoutes =
require('./routes/localizacaoRoutes');


const passageiroRoutes =
require('./routes/passageiroRoutes');


const mapaRoutes =
require('./routes/mapaRoutes');


const pontoRotaRoutes =
require('./routes/pontoRotaRoutes');


const perfilRoutes =
require('./routes/perfilRoutes');


const adminRoutes =
require('./routes/adminRoutes');


const authMiddleware =
require('./middlewares/authMiddleware');






// =====================
// AUTH
// =====================


app.use(
'/auth',
authRoutes
);





// =====================
// ROTAS PUBLICAS
// =====================


app.use(
'/rotas',
rotaRoutes
);



app.use(
'/onibus',
onibusRoutes
);



app.use(
'/viagens',
viagemRoutes
);



app.use(
'/chamados',
chamadoRoutes
);



app.use(
'/embarques',
embarqueRoutes
);



app.use(
'/localizacao',
localizacaoRoutes
);



app.use(
'/passageiros',
passageiroRoutes
);




app.use(
'/motoristas',
motoristaRoutes
);







// =====================
// MAPAS
// =====================


app.use(
'/onibus',
mapaRoutes
);



app.use(
'/rotas',
pontoRotaRoutes
);







// =====================
// ROTAS PROTEGIDAS
// =====================


app.use(

'/estudantes',

authMiddleware,

perfilRoutes

);





app.use(

'/motoristas',

authMiddleware,

motoristaDashboardRoutes

);







// =====================
// ADMIN
// =====================


app.use(

'/admin',

authMiddleware,

adminRoutes

);






server.listen(3000,()=>{


console.log(

"Servidor UniBus rodando na porta 3000"

);


});