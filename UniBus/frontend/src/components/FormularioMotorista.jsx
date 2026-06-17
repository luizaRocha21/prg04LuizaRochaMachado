import Botao from "./Botao";


function FormularioMotorista({
motorista,
setMotorista,
salvarMotorista
}){


return(

<div className="card">


<h2>
Cadastrar motorista 🚍
</h2>



<input

placeholder="Nome"

value={motorista.nome}

onChange={e=>

setMotorista({

...motorista,

nome:e.target.value

})

}

/>



<input

placeholder="Email"

value={motorista.email}

onChange={e=>

setMotorista({

...motorista,

email:e.target.value

})

}

/>




<input

type="password"

placeholder="Senha"

value={motorista.senha}

onChange={e=>

setMotorista({

...motorista,

senha:e.target.value

})

}

/>




<input

placeholder="Telefone"

value={motorista.telefone}

onChange={e=>

setMotorista({

...motorista,

telefone:e.target.value

})

}

/>




<input

placeholder="CNH"

value={motorista.cnh}

onChange={e=>

setMotorista({

...motorista,

cnh:e.target.value

})

}

/>



<Botao

texto="Cadastrar motorista"

acao={salvarMotorista}

/>



</div>


)


}


export default FormularioMotorista;