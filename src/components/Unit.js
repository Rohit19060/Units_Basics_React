import React, { Component } from "react";

class Unit extends Component {
  state = {
    title: this.props.unit.title,
  };
  changeup = (title) => {
    this.setState({
      title: title.toUpperCase(),
    });
  };

  changedown = (title) => {
    this.setState({
      title: title.toLowerCase(),
    });
  };

  render() {
    return (
      <div className="row">
        <h5 className="six columns">
          {this.props.unit.code} - {this.state.title}
        </h5>
        <button
          className="button-primary two columns"
          onClick={() => this.changeup(this.props.unit.title)}
        >
          Up
        </button>{" "}
        <button
          className="button-primary two columns"
          onClick={() => this.changedown(this.props.unit.title)}
        >
          Down
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
