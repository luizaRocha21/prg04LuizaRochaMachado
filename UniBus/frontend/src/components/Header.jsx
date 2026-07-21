import {useNavigate} from "react-router-dom";


function Header(){


const navigate = useNavigate();


return(


<header className="header">


<h2 onClick={()=>navigate("/")}>


🚌 UniBus


</h2>



<nav>


<button

className="btn-verde"

onClick={()=>navigate("/login")}

>


Entrar


</button>


</nav>



</header>


)


}


export default Header;