import {
useEffect,
useState
} from "react";


import api from "../services/api";

import socket from "../services/socket";


import Header from "../components/Header";

import Botao from "../components/Botao";

import Mapa from "../components/Mapa";

import Chamados from "../components/Chamados";

import Chat from "../components/Chat";

import CardViagem from "../components/CardViagem";





function Motorista(){



const motorista =
JSON.parse(localStorage.getItem("usuario"));




const [onibus,setOnibus]=useState([]);

const [rotas,setRotas]=useState([]);

const [alunos,setAlunos]=useState([]);

const [chamados,setChamados]=useState([]);

const [chat,setChat]=useState(null);


const [mensagem,setMensagem]=useState("");


const [rastreamento,setRastreamento]=useState(false);



const [viagem,setViagem]=useState({

id:null,

onibus:null,

rota:null

});








useEffect(()=>{


if(!motorista)
return;





socket.emit(

"entrar",

{

tipo:"motorista",

id:motorista.id

}

);




socket.on(

"novo_chamado",

(chamado)=>{


setChamados(prev=>[

chamado,

...prev

]);



}



);





api.get("/onibus")

.then(res=>setOnibus(res.data));




api.get("/rotas")

.then(res=>setRotas(res.data));





return()=>{


socket.off("novo_chamado");


};


},[]);









function iniciarViagem(){


if(!viagem.onibus || !viagem.rota){

alert(
"Escolha ônibus e rota"
);

return;

}



api.post(

"/viagens",

{


data:

new Date()
.toISOString()
.substring(0,10),


onibus_id:

viagem.onibus,


rota_id:

viagem.rota


}

)


.then(res=>{


setViagem({

...viagem,

id:

res.data.viagem_id

});



carregarPassageiros();



alert(
"🚌 Viagem iniciada"
);


});


}









function finalizarViagem(){


if(!viagem.id)
return;




api.put(

`/viagens/finalizar/${viagem.id}`

)


.then(()=>{


setViagem({

id:null,

onibus:null,

rota:null

});



setAlunos([]);

setChamados([]);

});


}








function carregarPassageiros(){


api.get(

`/motoristas/${motorista.id}/passageiros`

)


.then(res=>{


setAlunos(res.data);


});


}








function iniciarRastreamento(){


if(!viagem.id){

alert(
"Inicie uma viagem"
);

return;

}


setRastreamento(true);



}



return(



<div className="page">


<Header/>




<div className="container">





{

chamados.length > 0 &&


<div className="notificacao-topo">


🔔

Novos chamados:

{chamados.length}


</div>



}








<h1 className="titulo">


Dashboard Motorista 🚍


</h1>









<div className="card">


<h2>

Controle de viagem

</h2>






<select

value={viagem.onibus || ""}

onChange={e=>

setViagem({

...viagem,

onibus:Number(e.target.value)

})

}


>


<option value="">

Escolha ônibus

</option>



{

onibus.map(o=>(


<option

key={o.id}

value={o.id}

>

Ônibus {o.numero}

</option>


))


}


</select>









<select

value={viagem.rota || ""}

onChange={e=>

setViagem({

...viagem,

rota:Number(e.target.value)

})


}


>


<option value="">


Escolha rota


</option>




{

rotas.map(r=>(


<option

key={r.id}

value={r.id}

>

{r.nome}

</option>


))


}


</select>







<Botao

texto="▶ Iniciar viagem"

acao={iniciarViagem}


/>





<Botao

texto="⛔ Encerrar"

acao={finalizarViagem}


/>





<Botao

texto={
rastreamento
?
"🟢 GPS ativo"
:
"📍 GPS"
}

acao={iniciarRastreamento}


/>



</div>









<Mapa

rotaId={viagem.rota}

onibusId={viagem.onibus}

/>










<Chamados

chamados={chamados}

abrirChat={setChat}

/>






<Chat

chat={chat}

mensagem={mensagem}

setMensagem={setMensagem}

enviarMensagem={()=>{}}

/>





</div>


</div>


)



}



export default Motorista;