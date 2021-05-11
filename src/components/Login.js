import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.formHandler = this.formHandler.bind(this);
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  formHandler = (e) => {
    e.preventDefault();
    this.props.setUser(this.state.username, this.state.password);
  };

  render() {
    var user = this.props.user;
    if (user) {
      return <div className="row center">Logged In Successful</div>;
    } else {
      return (
        <form onSubmit={this.formHandler} className="row center">
          <input
            type="text"
            name="username"
            onChange={this.onChange}
            placeholder="Username"
          />
          <br></br>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.onChange}
          />
          <br></br>
          <input type="submit" value="Login" className="button-primary" />
        </form>
      );
    }
  }
}

export default Login;
