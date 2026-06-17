import {
useState
} from "react";


import {
useNavigate
} from "react-router-dom";


import api from "../services/api";


import Header from "../components/Header";

import Botao from "../components/Botao";





function Login(){



const navigate = useNavigate();




const [email,setEmail]=useState("");

const [senha,setSenha]=useState("");







function entrar(){



api.post(

"/auth/login",

{

email,

senha

}

)



.then(res=>{



const usuario =
res.data.usuario;




localStorage.setItem(

"usuario",

JSON.stringify(usuario)

);







if(usuario.tipo==="estudante"){


navigate("/estudante");


}





else if(usuario.tipo==="motorista"){


navigate("/motorista");


}





else if(usuario.tipo==="admin"){


navigate("/admin");


}





else{


alert(
"Usuário sem permissão"
);


}



})






.catch(err=>{


alert(

err.response?.data?.mensagem ||

"Erro ao realizar login"

);



});




}









return(



<div className="pagina-login">



<Header/>






<div className="card login-box">





<h1>

Login UniBus 🚍

</h1>





<p>

Acesse sua conta para continuar

</p>







<input


placeholder="Email"


value={email}


onChange={e=>

setEmail(e.target.value)

}


/>








<input


type="password"


placeholder="Senha"


value={senha}


onChange={e=>

setSenha(e.target.value)

}


/>








<Botao


texto="Entrar"


acao={entrar}


/>







<hr/>






<Botao


texto="Cadastrar estudante"


acao={()=>navigate("/cadastro")}


/>







</div>





</div>



)



}



export default Login;