import React, { Component } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import HousesList from "./components/housesList";
import HouseDetails from "./components/houseDetails";
import Home from "./components/home";
import Contribute from "./components/contributionForm";

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="nav_bar">
          <ul>
            <li>
              <NavLink to="/">home</NavLink>
            </li>
            <li>
              <NavLink to="/houses">houses</NavLink>
            </li>
            <li>
              <NavLink to="/contribute">contribute</NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/houses" component={HousesList} />
          <Route exact path="/contribute" component={Contribute} />
          <Route exact path="/houses/:id" component={HouseDetails} />
          <Route render={() => <div>404</div>} />
        </Switch>
      </div>
    );
  }
}

export default App;
