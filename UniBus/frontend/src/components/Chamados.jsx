function Chamados({

chamados,

abrirChat


}){


return(


<div className="card">


<h2>
🔔 Notificações
</h2>




{

chamados.map(c=>(


<div key={c.id}>


<p>

{c.estudante || "Motorista"}

</p>


<p>

{c.mensagem}

</p>


<p>

Status: {c.status}

</p>



<button

onClick={()=>abrirChat(c)}

>

Abrir chat

</button>



<hr/>


</div>


))


}



</div>


)


}


export default Chamados;