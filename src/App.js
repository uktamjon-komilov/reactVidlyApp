import { Component } from "react";
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container p-5">
          <Switch>
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/notFound" component={NotFound} />
            <Redirect path="/" exact to="/movies" />
            <Redirect to="notFound" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
