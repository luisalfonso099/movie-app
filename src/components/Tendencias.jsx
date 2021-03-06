import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
const Tendencias = () => {
    const [tendencias, setTendencias] = useState([]);
    const apiKey = '7c98e7765a5fa2334a1f7286d9e0422d'
    const data = async ()=>{
        const obtenerId = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&language=es-ES`)
        const date = await obtenerId.json();
        const pelis = await date.results;
        setTendencias(pelis)

    }
    useEffect(() => {
            data()
    },[])
    return (
        
        <div >
            <div className="d-flex justify-content-center m-0 row d-flex p-0">
            <h1 className="text-center text-light title my-5">Tendencias</h1>
            {
            tendencias.map(peli => {
              return  (
                <div key={peli.id} className="p-0 card shadow m-2 col-4" style={{"width": "20rem"}}>
                     <Link to={`/detalles/${peli.id || peli.belongs_to_collection.id}`} >
                     <img src={`https://image.tmdb.org/t/p/w500${peli.poster_path}`} style={{"height":"500px"}} className="card-img-top" alt={peli.title}/>

                       
                     </Link>
                </div>
            )}) }

            </div>
            
        </div>
        )
}

export default Tendencias;
