import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import HousesList from "./components/housesList";
import HouseDetails from "./components/houseDetails";
import Home from "./components/home";
import addHouseForm from "./components/addHouseForm";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/houses">houses</Link>
          </li>
          <li>
            <Link to="/add">add</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/houses" component={HousesList} />
          <Route exact path="/add" component={addHouseForm} />
          <Route exact path="/houses/:id" component={HouseDetails} />
          <Route render={() => <div>404</div>} />
        </Switch>
      </div>
    );
  }
}

export default App;
