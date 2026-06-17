import {
useNavigate
} from "react-router-dom";


import Header from "../components/Header";


function Home(){


const navigate=useNavigate();


return(


<div className="page">


<Header/>


<div className="container">



<div className="hero">



<div>


<h1 className="titulo">

UniBus 🚍

</h1>


<p className="subtitulo">

Transporte universitário inteligente conectando estudantes,
motoristas e universidades.

</p>



<button

className="btn-verde"

onClick={()=>navigate("/login")}

>


Começar agora


</button>



</div>





<div className="hero-box">


<h2>

Mobilidade acadêmica

</h2>


<p>


Controle viagens,
embarques,
rastreamento e comunicação em tempo real.


</p>


</div>




</div>




<div className="grid">


<div className="card">

<h2>

🚌 Viagens

</h2>

<p>

Acompanhe seus trajetos.

</p>


</div>



<div className="card">

<h2>

📍 Localização

</h2>

<p>

GPS dos ônibus.

</p>


</div>





<div className="card">

<h2>

💬 Comunicação

</h2>

<p>

Converse com motoristas.

</p>


</div>



</div>




</div>


</div>


)


}



export default Home;