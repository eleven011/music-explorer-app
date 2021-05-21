import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Search from "./Home";
import Visuals from "./Visuals";
import Contact from "./Contact"; 
import Recommendations from "./Recommendations";

class Main extends Component {
  render() {
    return (
        <HashRouter>
            <div>
                <h1>Music Explorer</h1>
                    <ul className="header">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/visuals">Visuals</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/recommendations">Recs</NavLink></li>
                    </ul>
                <div className="content">
                    <Route exact path="/" component={Search}/>
                    <Route path="/visuals" component={Visuals}/>
                    <Route path="/contact" component={Contact}/>
                    <Route path="/recommendations" component={Recommendations}/>
                </div>
            </div>
        </HashRouter>
    );
  }
}
 
export default Main;