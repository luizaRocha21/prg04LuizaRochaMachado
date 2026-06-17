import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline
} from "react-leaflet";


import {
    useEffect,
    useState
} from "react";


import L from "leaflet";


import api from "../services/api";


import "leaflet/dist/leaflet.css";





const busIcon = new L.Icon({

    iconUrl:
    "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",

    iconSize:[
        40,
        40
    ]

});






function Mapa({rotaId,onibusId}){



const [pontos,setPontos]=useState([]);

const [localizacao,setLocalizacao]=useState(null);







// carregar pontos da rota

useEffect(()=>{


if(!rotaId)

return;



api.get(

`/rotas/${rotaId}/pontos`

)


.then(res=>{


setPontos(res.data);


})


.catch(err=>{


console.log(err);


});



},[rotaId]);








// acompanhar ônibus

useEffect(()=>{


if(!onibusId)

return;




function buscarLocalizacao(){



api.get(

`/localizacao/${onibusId}`

)


.then(res=>{


if(res.data.latitude){


setLocalizacao([


Number(res.data.latitude),


Number(res.data.longitude)



]);


}



})


.catch(err=>{


console.log(err);


});



}






buscarLocalizacao();



const intervalo = setInterval(

buscarLocalizacao,

5000

);




return ()=>clearInterval(intervalo);



},[onibusId]);







if(pontos.length===0){


return(

<p>

Carregando mapa...

</p>


)

}






const caminho = pontos.map(p=>[


Number(p.latitude),

Number(p.longitude)


]);







return(



<MapContainer


center={


localizacao || caminho[0]

}


zoom={14}


style={{

height:"400px",

width:"100%"

}}



>


<TileLayer


url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"

/>






{

pontos.map(p=>(


<Marker


key={p.id}


position={[

Number(p.latitude),

Number(p.longitude)

]}



>


<Popup>

📍 {p.nome}

</Popup>


</Marker>



))


}







{

localizacao &&



<Marker


position={localizacao}


icon={busIcon}


>


<Popup>

🚌 Ônibus em movimento

</Popup>


</Marker>



}







<Polyline


positions={caminho}


/>





</MapContainer>



)



}



export default Mapa;