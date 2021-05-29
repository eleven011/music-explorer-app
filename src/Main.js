import React, { Component } from "react";
// import {
//   Route,
//   NavLink,
//   HashRouter
// } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import Search from "./Home";
// import Visuals from "./Visuals";
import Results from "./Results"; 
import Recommendations from "./Recommendations";
import "./Main.css";

//let artistName = "test";
class Main extends Component {
  render() {
    return (
        <Router>
            <div>
              <h1 className="site-title"><Link to="/">New Search</Link></h1>
                    {/* {/* <ul className="header"> 
                        // <li><Link to="/">Home</Link></li>
                        // <li><Link to="/visuals">Visuals</Link></li>
                        // <li><Link to="/recommendations">Recs</Link></li>
                    </ul> */}
                <div className="content">
                  <Switch>
                    {/* <Route exact path="/" component={Search}/>
                    <Route path="/visuals" component={Visuals}/> */}
                    <Route exact path="/" component={Recommendations}/>
                    <Route path='/results' render={(props) => <Results {...props} /> }/>
                    </Switch>
                </div>
            </div>
        </Router>
    );
  }
}
 
export default Main;