import Botao from "./Botao";


function Chat({

chat,

mensagem,

setMensagem,

enviarMensagem


}){


if(!chat)
return null;



return(


<div className="card">


<h2>
💬 Chat
</h2>



<p>
{chat.mensagem}
</p>



<input

placeholder="Responder"

value={mensagem}

onChange={e=>

setMensagem(e.target.value)

}

/>




<Botao

texto="Enviar"

acao={enviarMensagem}

/>



</div>


)


}



export default Chat;