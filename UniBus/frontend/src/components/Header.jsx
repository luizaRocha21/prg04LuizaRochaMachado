import { useLocation, useNavigate } from "react-router-dom";


function Header(){


const navigate = useNavigate();

const location = useLocation();



const usuario = 
JSON.parse(localStorage.getItem("usuario"));




function sair(){


localStorage.removeItem("usuario");


navigate("/login");


}





const paginaInicial =
location.pathname === "/";





return(



<header className="header-unibus">





<div

className="logo-unibus"

onClick={()=>navigate("/")}

>


<span>

🚍

</span>


<h2>

UniBus

</h2>


</div>








{

usuario && !paginaInicial &&



<div className="usuario-area">


<span>

Olá, {usuario.nome}

</span>



<button

onClick={sair}

>

Sair

</button>



</div>



}



</header>



)


}



export default Header;