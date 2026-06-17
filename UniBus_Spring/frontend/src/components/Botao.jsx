function Botao({

texto,

acao,

tipo="normal",

disabled=false


}){


return(


<button


className={

tipo==="verde"

?

"btn-verde"

:

tipo==="amarelo"

?

"btn-amarelo"

:

tipo==="vermelho"

?

"btn-vermelho"

:

"botao"

}


onClick={acao}


disabled={disabled}


>


{texto}


</button>


)


}


export default Botao;