import Mapa from "./Mapa";


function CardViagem({dados}){


return(


<div className="card">


<h2 className="titulo-card">

🚌 Viagem ativa

</h2>



<div className="grid">


<div>


<p>

Data:

<strong>

{dados.data}

</strong>

</p>


<p>

Ônibus:

{dados.onibus}

</p>


<p>

Rota:

{dados.rota}

</p>


<p>

Motorista:

{dados.motorista}

</p>



</div>



<div>


<h3>

📍 Localização

</h3>



<Mapa

rotaId={dados.rota_id}

onibusId={dados.onibus_id}

/>


</div>


</div>




</div>


)


}


export default CardViagem;