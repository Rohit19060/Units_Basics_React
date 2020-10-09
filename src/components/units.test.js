import Units from "./Units";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import fs from "fs";

test("Check Units", () => {
  let rawdata = fs.readFileSync("server/units.json");
  let units = JSON.parse(rawdata);
  let ourUnits = units.units;
  const deleteUnit = jest.fn();
  const component = render(
    <Router>
      <Units units={ourUnits} deleteUnit={deleteUnit} />
    </Router>
  );
  ourUnits.map((c) => expect(component.container).toHaveTextContent(c.title));
});

test("snapshot test", () => {
  let rawdata = fs.readFileSync("server/units.json");
  let units = JSON.parse(rawdata);
  let ourUnits = units.units;
  const deleteUnit = jest.fn();
  const component = render(
    <Router>
      <Units units={ourUnits} deleteUnit={deleteUnit} />
    </Router>
  );
  expect(component).toMatchSnapshot();
});
