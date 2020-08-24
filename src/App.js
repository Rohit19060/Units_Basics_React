import React, { Component } from "react";
import axios from "axios";
import Units from "./components/Units";
import Form from "./components/form";

import "./App.css";

class App extends Component {
  state = {
    units: [],
  };

  addUnit = (code, title, offering) => {
    // console.log(code,title,offering);
    const newUnit = {
      code,
      title,
      offering: offering,
    };
    // console.log(newUnit);
    axios
      .post("http://localhost:3001/api/units", newUnit)
      .then((res) => {
        this.setState({ units: res.data });
      })
      .catch((err) => console.error(err));
  };

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/units")
      .then((res) => {
        this.setState({ units: res.data });
        // console.log(res.data);
      })
      .catch((err) => {
        if (err.response) {
          // Server responded with a status other than 200 range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);

          if (err.response.status === 404) {
            alert("Error: Page Not Found");
          }
        } else if (err.request) {
          // Request was made but no response
          console.error(err.request);
        } else {
          console.error(err.message);
        }
      });
  }

  deleteUnit = (id) => {
    axios
      .delete("http://localhost:3001/api/units?id=" + id)
      .then((res) => {
        this.setState({ units: res.data });
      })
      .catch((err) => console.error(err));
    // console.log(id);
  };

  render() {
    return (
      <div className="App mar">
        <h2 className="title center">COMP3120: Advanced Web Development</h2>
        <Form addUnit={this.addUnit} />
        <Units units={this.state.units} deleteUnit={this.deleteUnit} />
      </div>
    );
  }
}

export default App;
