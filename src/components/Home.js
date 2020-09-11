import React, { Component } from "react";

class Home extends Component {
  render() {
    var user = this.props.user;
    if (user) {
      return (
        <div className="row">
          <h1>Happy to see you, {user}</h1>
        </div>
      );
    } else {
      return (
        <div className="row">
          <h1>Welcome to our Unit App, You have not logged in</h1>
        </div>
      );
    }
  }
}

export default Home;
