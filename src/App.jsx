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

function App() {

  return (
    <div className="bg-light">
    <Router >
        <NavBar/>
        <Switch>
          <Route path="/Buscar/:name">
            <Buscar/>
          </Route>
         <Route path="/detalles/:id"> 
            <Detalles/>
          </Route>
          <Route path="/" exact>
             <Tendencias/>
          </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
