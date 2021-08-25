import React, {useState, useEffect} from 'react';
import { useParams,Link, useHistory } from 'react-router-dom';

const Detalles = () => {
    const [pelicula, setPelicula] = useState([])
    const [noEncontrada, setNoEncontrada] = useState(false)
    const [cargando, setCargando] = useState(true)
    const {id} = useParams() 
    const history = useHistory()

    const volver = (e)=>{
      e.preventDefault();
     history.goBack();
    }
    const apiKey = '7c98e7765a5fa2334a1f7286d9e0422d'
    const data = async ()=>{
        const obtenerId = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-ES`)
        if(obtenerId.ok === true){
        const date = await obtenerId.json();
        const pelis = await date;
        setPelicula([pelis])
        setCargando(false)
      }else {
        setNoEncontrada(true)
      }
    }
    useEffect(() => {
         data()
    },[id])
    return (

     <div className="d-flex justify-content-center  mt-2 mx-2 row">
       
       {cargando?(
       <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>):(

      <div >
          {noEncontrada === true ?
          <div className="mt-5 "> <h1>Por ahora no hay detalles de esta pelicula</h1>
          <Link to={'/'} style={{"width":"150px"}} className="btn btn-dark mb-5">Volver al listado</Link> 
            <div className="text-center">
            <lord-icon
              src="https://cdn.lordicon.com/dzllstvg.json"
              trigger="hover"
              colors="primary:#121331,secondary:#08a88a"
              style={{"width":"350px","height":"350px"}}>
            </lord-icon>
            </div>
          </div>:
           null}
            {
            pelicula.map(peli => {
              return  (
                <div key={peli.id} className="col-12 container" style={{"width": "100%vh"}}>
                 <div className="row">
                   <div className="col-md-5">
                    <img src={`https://image.tmdb.org/t/p/w500${peli.poster_path}`}  className="img-fluid rounded-start shadow"  alt={peli.title}/>
                   </div>
                  <div className="card-body col-md-7">
                    <h1 className="title">{peli.title || peli.name }</h1>
                    <p>{peli.release_date}</p>
                    {
                      peli.geners ?
                      <div>
                      <h3>Géneros:</h3>
                      <ul>
                      {peli.genres.map(genero => <li key={genero.id}>{genero.name}</li>)}
                     </ul>
                     </div>:
                       null
                    }
                    {
                      peli.vote_average ?
                      <div>
                         <h4>Rating: {peli.vote_average}</h4>
                      </div>:
                      null
                    }
                    {
                      peli.budget ?
                      <h4>Presupuesto: {peli.budget}$</h4>:
                        null
                    }
                    <h3>Reseña:</h3>
                     <p className="overflow-auto card-text" >{peli.overview}</p>
                     <a href={peli.homepage} rel = "noreferrer" target="_blank" className="btn btn-outline-info">Pagina oficial</a>
                    <div className="d-flex flex-wrap">
                      {
                      peli.production_companies.map(companies =>{
                            return (
                            <div key={companies.name}>
                              <img alt={peli.name} className="mx-3 mt-3" style={{width:'80px'}} src={companies.logo_path !== null ? `https://image.tmdb.org/t/p/w500${companies.logo_path}`:null}/>
                             </div>
                          )})}
                      </div>
                    <button className="btn btn-dark mt-5" onClick={volver}>Volver al Listado</button>
                   </div>
                    
                 </div>
                </div>
            )})
             }
        </div>)}
        </div>
        
    );
}

export default Detalles;
