import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

import axios from "axios";
import Units from "./components/Units";
import Form from "./components/Form";
import Home from "./components/Home";
import Login from "./components/Login";
import Un from "./components/Un";
import NoMatch from "./NoMatch";

import "./App.css";

class App extends Component {
  state = {
    units: [],
    user: null,
  };

  addUnit = (code, title, offering) => {
    const newUnit = {
      code,
      title,
      offering: offering,
    };
    axios
      .post("/api/units", newUnit)
      .then((res) => {
        this.setState({ units: res.data });
      })
      .catch((err) => console.error(err));
  };

  setUser = (username, password) => {
    const user = {
      username,
      password,
    };
    axios
      .post("/api/login", user)
      .then((res) => {
        console.log(res.data);
        this.setState({ user: res.data.name });
      })
      .catch((err) => console.error(err));
  };

  componentDidMount() {
    axios
      .get("/api/units")
      .then((res) => {
        this.setState({ units: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteUnit = (id) => {
    axios
      .delete("/api/units?id=" + id)
      .then((res) => {
        this.setState({ units: res.data });
      })
      .catch((err) => console.error(err));
  };
  logout = () => {
    this.setState({ user: null });
    console.log("Logout Successfully");
  };

  render() {
    return (
      <Router>
        <div className="navigation">
          <div className="navLink">
            <Link to="/">Home</Link>
            <Link to="/units">Units</Link>
            <Link to="/add-units">Add Unit</Link>
            {this.state.user ? (
              <>
                <span onClick={this.logout} className="logout">
                  Logout
                </span>
              </>
            ) : (
                <Link to="/login">Login</Link>
            )}
          </div>
        </div>
        <Switch>
          <Route exact path="/">
            <Home user={this.state.user} />
          </Route>
          <Route path="/units">
            <Units units={this.state.units} deleteUnit={this.deleteUnit} />
          </Route>
          <Route path="/add-units">
            <Route
              path="/add-units"
              render={() =>
                this.state.user ? (
                  <Form addUnit={this.addUnit} user={this.state.user} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Route>
          <Route path="/login">
            <Login user={this.state.user} setUser={this.setUser} />
          </Route>
          <Route path="/unit/:code">
            <Un units={this.state.units} />
          </Route>
          <Route component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

export default App;
