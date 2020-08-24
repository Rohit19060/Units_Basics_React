import React, { Component } from "react";
import Unit from "./Unit";

class Units extends Component {
  render() {
    return this.props.units.map((unit) => (
      <Unit unit={unit} key={unit.id} deleteUnit={this.props.deleteUnit} />
    ));
  }
}

export default Units;
