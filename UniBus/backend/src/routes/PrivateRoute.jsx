import { Navigate } from "react-router-dom";


function PrivateRoute({children,tipo}){


const usuario =
JSON.parse(
localStorage.getItem("usuario")
);



if(!usuario){

return <Navigate to="/login"/>

}



if(tipo && usuario.tipo !== tipo){

return <Navigate to="/"/>

}



return children;


}


export default PrivateRoute;