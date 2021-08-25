import React, { useState } from 'react';
import {Link, useParams} from "react-router-dom";



const Buscar = () => {
    const [busquedas, setBusquedas] = useState([]);
    const [encontrado, setEncontrado] = useState(false);
    const [cargando, setCargando] = useState(true);
    const {name} = useParams();
    const apiKey = '7c98e7765a5fa2334a1f7286d9e0422d'

    React.useEffect(() => {
        const data = async ()=>{
            const obtenerId = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${name}`)
            const date = await obtenerId.json();
            const pelis = await date.results;
            setCargando(false)
            setBusquedas(pelis);
            setEncontrado(true);
            }
        data();
    },[name]
    )

    return (
        <div className="d-flex justify-content-center">
            {cargando ? (
            <div className=" mt-5 spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
        ):(
         <div className="d-flex justify-content-center mx-0 row d-flex p-0">
            <h1 className="text-center my-5">Resultados De Busqueda de : {name.toUpperCase()}</h1> 
            { encontrado === true ?
                 busquedas.map(peli => {
                        return  (
                          <div key={peli.id} className="p-0 shadow card m-2 col-4" style={{"width": "20rem"}}>
                           {peli.poster_path !== null ?
                            <img src={`https://image.tmdb.org/t/p/w500${peli.poster_path}`} style={{"height":"500px"}} className="card-img-top" alt={peli.title}/>:
                            ( <div className="p-4"  style={{"height":"500px"}}>
                                <h2 className="mb-5">Sin imagen</h2>
                                   <lord-icon
                                        src="https://cdn.lordicon.com/fgkmrslx.json"
                                        trigger="hover"
                                        colors="primary:#121331,secondary:#08a88a"
                                        style={{"width":"250px","height":"250px"}}>
                                    </lord-icon>
                            </div>  )}
                            <div className="card-body">
                              <h5 className="card-title" style={{"height":"50px"}}>{peli.title || peli.name }</h5>
                             <Link to={`/detalles/${peli.id}`} className="btn btn-info">Detalles</Link>
                             </div>
                          </div>
                 )}): <h1>No encontrado</h1>
            }
        </div>)}

    </div>
        

    )
}

export default Buscar;
