import {
useEffect,
useState
} from "react";


import api from "../services/api";


import Header from "../components/Header";

import FormularioMotorista from "../components/FormularioMotorista";

import FormularioRota from "../components/FormularioRota";

import FormularioOnibus from "../components/FormularioOnibus";



function Admin(){


const [rotas,setRotas]=useState([]);

const [onibus,setOnibus]=useState([]);



const [motorista,setMotorista]=useState({

nome:"",
email:"",
senha:"",
telefone:"",
cnh:""

});



const [rota,setRota]=useState({

nome:"",
origem:"",
destino:"",
horario_saida:"",
horario_retorno:""

});



const [bus,setBus]=useState({

numero:"",
placa:"",
capacidade:"",
rota_id:""

});





useEffect(()=>{

carregarDados();

},[]);



function carregarDados(){


api.get("/rotas")
.then(res=>setRotas(res.data));


api.get("/onibus")
.then(res=>setOnibus(res.data));


}




function salvarMotorista(){


api.post(

"/admin/motoristas",

motorista

)
.then(()=>{

alert("Motorista criado");

});


}





function salvarRota(){


api.post(

"/admin/rotas",

rota

)
.then(()=>{

alert("Rota criada");

carregarDados();

});


}





function salvarOnibus(){


api.post(

"/admin/onibus",

bus

)
.then(()=>{

alert("Ônibus criado");

carregarDados();

});


}




return(

<div>


<Header/>


<h1>
Painel Administrador 🛠️
</h1>



<FormularioMotorista

motorista={motorista}

setMotorista={setMotorista}

salvarMotorista={salvarMotorista}

/>



<FormularioRota

rota={rota}

setRota={setRota}

salvarRota={salvarRota}

/>



<FormularioOnibus

onibus={bus}

setOnibus={setBus}

rotas={rotas}

salvarOnibus={salvarOnibus}

/>



</div>


)


}


export default Admin;