import React from 'react';
import {Link, useHistory} from 'react-router-dom';

const NavBar = () => {
  const history = useHistory()
    const search = (e)=>{
        e.preventDefault();
        let form = e.currentTarget;
        let pelicula = form.busqueda.value;
        if(pelicula.trim()){
          history.push(`/Buscar/${pelicula}`)
          form.reset();
          return
        }
      
      }
    return (
        <div >
            <nav className=" btn-group navbar navbar-expand-lg navbar-light bg-dark">
               <div className="container-fluid container">
                 <div className="d-flex">
                 <Link to="/" className="navbar-brand text-light d-flex aling-items-center">
                  <lord-icon
                      src="https://cdn.lordicon.com/rzrkjbrm.json"
                      trigger="hover"
                      colors="primary:#ffffff,secondary:#9ce5f4"
                      style={{"width":"100"}}>
                  </lord-icon>
                      Inicio
                  </Link>
                 </div>
                  <form onSubmit={search} className="d-flex">
                    <input className="form-control me-2" type="search" name="busqueda"  placeholder="Escribe aqui..." aria-label="Search"/>
                    <button className="btn btn-outline-info" type="submit">Buscar</button>
                  </form>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
