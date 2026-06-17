import Botao from "./Botao";


function FormularioOnibus({

onibus,

setOnibus,

rotas,

salvarOnibus

}){


return(

<div className="card">


<h2>
Cadastrar ônibus 🚌
</h2>



<input

placeholder="Número"

value={onibus.numero}

onChange={e=>

setOnibus({

...onibus,

numero:e.target.value

})

}

/>



<input

placeholder="Placa"

value={onibus.placa}

onChange={e=>

setOnibus({

...onibus,

placa:e.target.value

})

}

/>



<input

type="number"

placeholder="Capacidade"

value={onibus.capacidade}

onChange={e=>

setOnibus({

...onibus,

capacidade:e.target.value

})

}

/>



<select

value={onibus.rota_id}

onChange={e=>

setOnibus({

...onibus,

rota_id:e.target.value

})

}

>


<option value="">
Escolha uma rota
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

texto="Cadastrar ônibus"

acao={salvarOnibus}

/>



</div>


)


}


export default FormularioOnibus;