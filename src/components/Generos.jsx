import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom";


const Generos = () => {

    const [generos, setGeneros] = useState([])
    const [tituloBusqueda, setTituloBusqueda] = useState("")
    const [generoSelecionado, setGeneroSelecionado] = useState("")
    const [peliculas, setPeliculas] = useState([])
    const apiKey = '7c98e7765a5fa2334a1f7286d9e0422d'


    useEffect(() =>{
        busquedaGenero()
    },[])
    const busquedaGenero = async () => {
        const peticion = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es-ES`)
        const data = await peticion.json()
        setGeneros(data.genres)
    }
    const seleccionado = async(e)=>{
        e.preventDefault()
        const obtenerId = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${generoSelecionado}&language=es-ES&page=10`)
        const date = await obtenerId.json();
        const pelis = await date.results;
        const text = e.target.name;
        const titulo = e.target.innerHTML;
        setPeliculas(pelis)
        setTituloBusqueda(titulo)
        setGeneroSelecionado(text)
    }




    return (
        <div className="container">
            {generos.map(g => <button onClick={seleccionado} name={g.id} className="btn btn-outline-primary m-1" onClick={seleccionado} key={g.id}>{g.name}</button>)}
              <h1>{tituloBusqueda}</h1>
              <hr/>
               <div className="d-flex justify-content-center mx-0 row d-flex p-0"> {
                     peliculas.map(peli => {
                        return  (
                          <div key={peli.id} className="p-0 card m-2 d-flex col-4" style={{"width": "20rem"}}>
                              {peli.poster_path !== null ?
                            <img src={`https://image.tmdb.org/t/p/w500${peli.poster_path}`} style={{"height":"500px"}} className="card-img-top" alt={peli.title}/>:
                            ( <div className="p-4"  style={{"height":"500px"}}>
                                <h2 className="mb-5">Sin imagen</h2>
                                <lord-icon
                                    src="https://cdn.lordicon.com/sbiheqdr.json"
                                    trigger="hover"
                                    colors="primary:#121331,secondary:#08a88a"
                                    style={{"width":"250px","height":"250px"}}>
                                </lord-icon>
                            </div>  )}
                            <div className="card-body">
                              <h5 className="card-title" style={{"height":"50px"}}>{peli.title || peli.name }</h5>
                             <Link to={`detalles/${peli.id}`} className="btn btn-info">Detalles</Link>
                             </div>
                          </div>              
                     )})}
                     </div>
                     </div>
    )
}

export default Generos
