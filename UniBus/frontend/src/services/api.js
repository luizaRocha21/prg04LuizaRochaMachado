import axios from "axios";


const api = axios.create({

baseURL:"http://localhost:3000"

});




api.interceptors.request.use(config=>{


const usuario = 
localStorage.getItem("usuario");



if(usuario){


config.headers.usuario = usuario;


}



return config;



});




export default api;