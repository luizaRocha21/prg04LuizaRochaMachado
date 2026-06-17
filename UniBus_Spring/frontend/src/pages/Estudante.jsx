import {

useEffect,

useState

} from "react";



import api from "../services/api";

import socket from "../services/socket";



import Header from "../components/Header";

import CardPerfil from "../components/CardPerfil";

import CardViagem from "../components/CardViagem";

import ControleEmbarque from "../components/ControleEmbarque";

import Chamados from "../components/Chamados";

import Chat from "../components/Chat";

import Botao from "../components/Botao";







function Estudante(){



const usuario =

JSON.parse(

localStorage.getItem("usuario")

);





const [dados,setDados]=useState(null);



const [motoristas,setMotoristas]=useState([]);



const [motoristaSelecionado,setMotoristaSelecionado]=useState("");



const [chamados,setChamados]=useState([]);



const [chat,setChat]=useState(null);



const [mensagem,setMensagem]=useState("");



const [ida,setIda]=useState(false);



const [volta,setVolta]=useState(false);









useEffect(()=>{



carregarDados();




api.get("/motoristas")

.then(res=>{


setMotoristas(res.data);


})

.catch(err=>{


console.log(err);


});







if(usuario){



socket.emit(

"entrar",

usuario

);




socket.on(

"nova_mensagem",

()=>{


alert(

"💬 Nova mensagem recebida"

);


}


);



}






return()=>{


socket.off(

"nova_mensagem"

);


};



},[]);









function carregarDados(){



api.get("/perfil")

.then(res=>{


console.log(

"DADOS ESTUDANTE",

res.data

);



setDados(res.data);



})



.catch(err=>{


console.log(

"ERRO PERFIL",

err.response

);



});



}









function confirmarIda(){



api.post(

"/embarques",

{


estudante_id:

dados.estudante_id,



viagem_id:

dados.viagem_id,



embarcou:1


}

)


.then(()=>{


setIda(true);


});


}









function confirmarVolta(){



api.post(

"/embarques",

{


estudante_id:

dados.estudante_id,



viagem_id:

dados.viagem_id,



embarcou:1


}

)



.then(()=>{


setVolta(true);


});



}









function enviarChamado(){



if(!mensagem){


alert(

"Digite uma mensagem"

);


return;


}





const corpo={


estudante_id:

dados.estudante_id,


mensagem



};





if(dados.viagem_id){



corpo.viagem_id =

dados.viagem_id;



}

else{



if(!motoristaSelecionado){


alert(

"Escolha um motorista"

);


return;


}



corpo.motorista_id =

motoristaSelecionado;



}








api.post(

"/chamados",

corpo

)



.then(()=>{


setMensagem("");



alert(

"Mensagem enviada"

);



});





}









function enviarMensagem(){



if(!chat)

return;






api.post(

"/chamados/mensagem",

{


chamado_id:

chat.id,



remetente:

"estudante",



mensagem



}

);




setMensagem("");



}









if(!dados){



return(


<div className="page">


<Header/>


<div className="container">


<div className="card">


<h2>

Carregando estudante...

</h2>


</div>


</div>


</div>


)



}









return(


<div className="page">



<Header/>




<div className="container">






<CardPerfil>



<h2>

Olá {dados.nome} 👋

</h2>




<p>

🎓 Faculdade:

{dados.faculdade}

</p>



<p>

📚 Curso:

{dados.curso}

</p>




</CardPerfil>









{


dados.viagem_id ?



<>



<CardViagem

dados={dados}

/>




<ControleEmbarque


ida={ida}


volta={volta}


confirmarIda={confirmarIda}


confirmarVolta={confirmarVolta}


/>



</>



:




<div className="card">


<h2>

🚌 Nenhuma viagem ativa

</h2>



<p>

Aguarde uma viagem disponível.

</p>



</div>



}









<div className="card">



<h2>

💬 Falar com motorista

</h2>







{

!dados.viagem_id &&



<select


value={motoristaSelecionado}



onChange={e=>


setMotoristaSelecionado(

e.target.value

)


}



>


<option value="">


Escolha o motorista


</option>




{

motoristas.map(m=>(


<option


key={m.id}


value={m.id}


>


{m.nome}


</option>



))


}




</select>



}







<input


placeholder="Digite sua mensagem"



value={mensagem}



onChange={e=>


setMensagem(

e.target.value

)



}



/>






<Botao


texto="Enviar"


acao={enviarChamado}


/>





</div>









<Chamados


chamados={chamados}


abrirChat={setChat}


/>








<Chat


chat={chat}


mensagem={mensagem}


setMensagem={setMensagem}


enviarMensagem={enviarMensagem}


/>









</div>



</div>


)



}



export default Estudante;