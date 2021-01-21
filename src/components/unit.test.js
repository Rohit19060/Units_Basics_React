import Unit from "./Unit";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("check unit", () => {
  const unit = {
    title: "New",
    code: "abcd",
  };
  const deleteUnit = function () {};
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <Unit unit={unit} deleteUnit={deleteUnit} />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

test("Check Title", () => {
  const unit = {
    title: "New",
    code: "abcd",
  };
  const deleteUnit = jest.fn();
  const component = render(
    <Router>
      <Unit unit={unit} deleteUnit={deleteUnit} />
    </Router>
  );
  expect(component.getByTestId("abcd")).toHaveTextContent("abcd- New");
});

test("Delete button Fire event Check", () => {
  const unit = {
    title: "New",
    code: "abcd",
  };
  const deleteUnit = jest.fn();
  const component = render(
    <Router>
      <Unit unit={unit} deleteUnit={deleteUnit} />
    </Router>
  );
  const button = component.getByText("Delete");
  fireEvent.click(button);
  expect(deleteUnit.mock.calls).toHaveLength(1);
});
