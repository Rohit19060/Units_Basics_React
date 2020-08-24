import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      title: "",
      Offerings: [
        { id: 1, value: "S1" },
        { id: 2, value: "S2" },
      ],
      checkedItems: new Map(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var offers = [];
    // console.log(this.state.Offerings);
    // console.log(this.state.checkedItems);
    if (this.state.checkedItems.size !== 0) {
      //   this.setState({ Offerings: [] });
      var off = Array.from(this.state.checkedItems.keys());
      off.forEach((x) => {
        this.state.Offerings.forEach((y) => {
          //   console.log(typeof x);
          //   console.log(typeof y["id"]);
          if (parseInt(x) === y["id"]) {
            if (this.state.checkedItems.get(x) === true) {
              offers.push(y["value"]);
            }
          }
        });
      });
    }
    offers.sort();

    this.props.addUnit(this.state.code, this.state.title, offers);
    this.setState({ code: "", title: "" });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleChange(event) {
    var isChecked = event.target.checked;
    var item = event.target.value;

    this.setState((prevState) => ({
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <input
              className="three columns"
              type="text"
              name="code"
              value={this.state.code}
              onChange={this.onChange}
              placeholder="Code"
              required
            />
            <input
              className="three columns"
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.onChange}
              placeholder="Title"
              required
            />
          </div>
          {this.state.Offerings.map((item) => (
            <label key={item.id}>
              <input
                type="checkbox"
                value={item.id}
                onChange={this.handleChange}
              />
              <span className="label-body primary"> {item.value}</span>
            </label>
          ))}

          <input type="submit" value="Submit" className="button-primary" />
        </form>
      </>
    );
  }
}

export default Form;
