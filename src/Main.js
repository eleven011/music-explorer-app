import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Search from "./Home";
import Visuals from "./Visuals";
import Results from "./Results"; 
import Recommendations from "./Recommendations";

let artistName;
class Main extends Component {
  render() {
    return (
        <HashRouter>
            <div>
                <h1>Music Explorer</h1>
                    <ul className="header">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/visuals">Visuals</NavLink></li>
                        <li><NavLink to="/recommendations">Recs</NavLink></li>
                    </ul>
                <div className="content">
                    <Route exact path="/" component={Search}/>
                    <Route path="/visuals" component={Visuals}/>
                    <Route path="/recommendations" component={Recommendations}/>
                    <Route path='/results' render={() => <Results artistName={artistName} />}/>
                </div>
            </div>
        </HashRouter>
    );
  }
}
 
export default Main;