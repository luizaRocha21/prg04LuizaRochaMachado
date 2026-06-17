function CardPerfil({titulo,children}){


return(


<div className="card">


{
titulo &&

<h2 className="titulo-card">

{titulo}

</h2>

}



{children}



</div>


)


}



export default CardPerfil;