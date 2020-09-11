import React, { Component } from "react";
import axios from "axios";
import Units from "./Components/Units";
import Home from "./Components/Home";
import Form from "./Components/Form";

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
      <div className="App mar">
        <Home user={this.state.user} />
        <Form
          addUnit={this.addUnit}
          user={this.state.user}
          setUser={this.setUser}
          logout={this.logout}
        />
        <Units units={this.state.units} deleteUnit={this.deleteUnit} />
      </div>
    );
  }
}

export default App;
