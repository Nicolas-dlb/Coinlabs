import React from "react";
import { shallow } from "enzyme";
import Grid from "./Grid";

describe("Grid", () => {
  it("should render Grid component", () => {
    const GridComponent = shallow(<Grid />);
    expect(GridComponent).toMatchSnapshot();
  });
  it("should render 5 element with grid_card classname", () => {
    const GridComponent = shallow(<Grid />);
    expect(GridComponent.find(".grid_card")).toHaveLength(5);
  });
});
