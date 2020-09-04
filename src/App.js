import React, { Component } from "react";
import axios from "axios";
import Units from "./components/Units";
import Form from "./components/form";

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
        <h2 className="title center">COMP3120: Advanced Web Development</h2>
        <Form
          addUnit={this.addUnit}
          user={this.state.user}
          username={this.state.username}
          setUser={this.setUser}
          logout={this.logout}
        />
        <Units units={this.state.units} deleteUnit={this.deleteUnit} />
      </div>
    );
  }
}

export default App;
