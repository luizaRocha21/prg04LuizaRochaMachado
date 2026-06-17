import {
useState
} from "react";


import {
useNavigate
} from "react-router-dom";


import api from "../services/api";


import Header from "../components/Header";

import CardPerfil from "../components/CardPerfil";

import Botao from "../components/Botao";





function Cadastro(){



const navigate = useNavigate();





const [dados,setDados]=useState({


nome:"",

email:"",

senha:"",


telefone:"",


faculdade:"",

curso:""



});







function alterar(campo,valor){


setDados({

...dados,

[campo]:valor


});


}









function cadastrar(){



api.post(

"/auth/cadastro",

{


...dados,


tipo:"estudante"


}


)



.then(()=>{


alert(

"Cadastro realizado com sucesso"

);



navigate("/login");



})



.catch(err=>{


alert(

err.response?.data?.mensagem ||

"Erro ao cadastrar"

);


});



}









return(


<div>



<Header/>





<CardPerfil>



<h1>

Cadastro estudante 🎓

</h1>





<p>

Crie sua conta para acessar o transporte UniBus

</p>







<input


placeholder="Nome completo"


value={dados.nome}


onChange={e=>

alterar(

"nome",

e.target.value

)


}



/>










<input


placeholder="Email"


value={dados.email}


onChange={e=>

alterar(

"email",

e.target.value

)


}



/>











<input


type="password"


placeholder="Senha"


value={dados.senha}


onChange={e=>

alterar(

"senha",

e.target.value

)


}



/>









<h3>

Informações acadêmicas

</h3>








<input


placeholder="Faculdade"


value={dados.faculdade}


onChange={e=>

alterar(

"faculdade",

e.target.value

)


}



/>










<input


placeholder="Curso"


value={dados.curso}


onChange={e=>

alterar(

"curso",

e.target.value

)


}



/>









<input


placeholder="Telefone"


value={dados.telefone}


onChange={e=>

alterar(

"telefone",

e.target.value

)


}



/>










<Botao


texto="Criar conta"

acao={cadastrar}


/>







</CardPerfil>






</div>


)


}



export default Cadastro;