import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";

class Unit extends Component {
  state = {
    title: this.props.unit.title,
  };
  ChangeUpperCase = (title) => {
    this.setState({
      title: title.toUpperCase(),
    });
  };

  ChangeLowerCase = (title) => {
    this.setState({
      title: title.toLowerCase(),
    });
  };

  render() {
    return (
      <div className="row p-10">
        <h5 className="six columns" data-test-id={this.props.unit.code}>
          <Link to={`/unit/${this.props.unit.code}`}>
            {this.props.unit.code}
          </Link>
          - {this.state.title}
        </h5>
        <button
          className="button-primary two columns"
          onClick={() => this.ChangeUpperCase(this.props.unit.title)}
        >
          UpperCase
        </button>{" "}
        <button
          className="button-primary two columns"
          onClick={() => this.ChangeLowerCase(this.props.unit.title)}
        >
          LowerCase
        </button>{" "}
        <button
          className="button-primary two columns"
          onClick={this.props.deleteUnit.bind(this, this.props.unit.id)}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default Unit;
