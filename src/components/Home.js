import React, { Component } from "react";

class Home extends Component {
  render() {
    var user = this.props.user;
    if (user) {
      return (
        <div className="row center">
          <h1>Happy to see you here, {user}</h1>
        </div>
      );
    } else {
      return (
        <div className="row center">
          <h1>Welcome to our Units app</h1>
          <h3>Login to add units</h3>
        </div>
      );
    }
  }
}

export default Home;
