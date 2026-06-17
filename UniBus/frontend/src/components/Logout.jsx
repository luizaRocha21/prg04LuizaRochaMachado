function Logout(){


function sair(){


localStorage.removeItem("usuario");


window.location="/login";


}


return(

<button onClick={sair}>

Sair

</button>

)


}


export default Logout;