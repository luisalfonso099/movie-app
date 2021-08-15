import React from 'react';
import { useParams,Link, useHistory } from 'react-router-dom';

const Detalles = () => {
    const [pelicula, setPelicula] = React.useState([])
    const [noEncontrada, setNoEncontrada] = React.useState(false)
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
      }else {
        setNoEncontrada(true)
      }
    }

 
    React.useEffect(() => {
         data()
    },[])
    return (
        <div className="d-flex justify-content-center mx-4 row">
          {noEncontrada === true ?
          <div className="mt-5"> <h1>Por ahora no hay detalles de esta pelicula</h1>
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
                <div key={peli.id} className="p-0 m-2 col-12" style={{"width": "100%vh"}}>
                 <div className="row">
                   <div className="col-4">
                    <img src={`https://image.tmdb.org/t/p/w500${peli.poster_path}`} className="img-fluid rounded-start" alt={peli.title}/>
                   </div>
                  <div className="col-md-7">
                  <div className="card-body d-flex flex-column">
                    <h1 className="title">{peli.title || peli.name }</h1>
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
                    <button className="btn btn-dark " onClick={volver}>Volver al Listado</button>
                   </div>
                  </div>
                 </div>
                </div>
            )})
             }
        </div>
    );
}

export default Detalles;
