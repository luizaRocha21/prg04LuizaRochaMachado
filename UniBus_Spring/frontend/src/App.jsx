import {
BrowserRouter,
Routes,
Route
} from "react-router-dom";


import Home from "./pages/Home";

import Login from "./pages/Login";

import Cadastro from "./pages/Cadastro";

import Estudante from "./pages/Estudante";

import Motorista from "./pages/Motorista";

import Admin from "./pages/Admin";





function App(){


return(


<BrowserRouter>


<Routes>





<Route

path="/"

element={<Home/>}

/>






<Route

path="/login"

element={<Login/>}

/>






<Route

path="/cadastro"

element={<Cadastro/>}

/>






<Route

path="/estudante"

element={<Estudante/>}

/>







<Route

path="/motorista"

element={<Motorista/>}

/>







<Route

path="/admin"

element={<Admin/>}

/>





</Routes>



</BrowserRouter>


)


}



export default App;