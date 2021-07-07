import React from "react";
import { render } from "enzyme";
import { act } from "react-dom/test-utils";
import Username from "./Username";

describe("Username", () => {
  let UsernameComponent;
  beforeEach(async () => {
    await act(async () => {
      UsernameComponent = render(<Username />);
    });
  });
  it("should render correctly", () => {
    expect(UsernameComponent).toMatchSnapshot();
  });
  it("should render Username title", () => {
    expect(UsernameComponent.find("h3").text()).toBe("Username");
  });
  it("should render an icon", () => {
    expect(UsernameComponent.find("p").text()).toBe("@");
  });

  it("should render an input", () => {
    expect(UsernameComponent.find("input").length).toBe(1);
  });
  it("should render a button called Update", () => {
    expect(UsernameComponent.find("button").text()).toBe("Update");
  });
});
