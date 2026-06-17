import Botao from "./Botao";


function ControleEmbarque({

ida,

volta,

confirmarIda,

confirmarVolta


}){


return(


<div className="card">


<h3>
🚌 Embarque
</h3>




<Botao

texto={
ida 
?
"✅ Ida confirmada"
:
"Confirmar ida"
}

acao={confirmarIda}

/>





<Botao

texto={
volta
?
"✅ Volta confirmada"
:
"Confirmar volta"
}

acao={confirmarVolta}

/>




</div>


)


}


export default ControleEmbarque;