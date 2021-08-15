import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Buscar from "./components/Buscar";
import Detalles from "./components/Detalles";
import NavBar from "./components/NavBar";
import Tendencias from "./components/Tendencias";
import Generos from "./components/Generos";

function App() {

  return (
    <>
    <Router >
        <NavBar/>
        <Switch>
          <Route path="/Buscar/:name">
            <Buscar/>
          </Route>
         <Route path="/detalles/:id"> 
            <Detalles/>
          </Route>
          <Route path="/generos"> 
            <Generos/>
          </Route>
          <Route path="/" exact>
             <Tendencias/>
          </Route>
        </Switch>
    </Router>
    </>
  );
}

export default App;
