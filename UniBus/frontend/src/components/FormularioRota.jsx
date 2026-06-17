import Botao from "./Botao";


function FormularioRota({

rota,

setRota,

salvarRota

}){


return(

<div className="card">


<h2>
Cadastrar rota 🛣️
</h2>


<input

placeholder="Nome"

value={rota.nome}

onChange={e=>

setRota({

...rota,

nome:e.target.value

})

}

/>



<input

placeholder="Origem"

value={rota.origem}

onChange={e=>

setRota({

...rota,

origem:e.target.value

})

}

/>



<input

placeholder="Destino"

value={rota.destino}

onChange={e=>

setRota({

...rota,

destino:e.target.value

})

}

/>



<input

type="time"

value={rota.horario_saida}

onChange={e=>

setRota({

...rota,

horario_saida:e.target.value

})

}

/>



<input

type="time"

value={rota.horario_retorno}

onChange={e=>

setRota({

...rota,

horario_retorno:e.target.value

})

}

/>



<Botao

texto="Cadastrar rota"

acao={salvarRota}

/>


</div>


)


}


export default FormularioRota;