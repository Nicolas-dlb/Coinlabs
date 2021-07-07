/* eslint-disable no-unused-vars */
import { mount } from "enzyme";
import React from "react";
import Select from "./Select";

describe("Select", () => {
  let SelectComponent: any;

  beforeEach(() => {
    SelectComponent = mount(<Select items="currency" />);
  });
  afterEach(() => {
    SelectComponent = null;
  });
  it("should render correctly", () => {
    expect(SelectComponent).toMatchSnapshot();
  });

  it("should render items selected", () => {
    expect(SelectComponent.find(".currency").first().exists()).toBeTruthy();
  });

  it("should render correct options", () => {
    expect(SelectComponent.find("option").first().props().value).toBe(
      "Balance"
    );
  });

  // it("should show list on click", () => {
  //   SelectComponent.find(".btn-currency").simulate("click");
  //   console.log(SelectComponent.find(".currency-list").debug());
  //   expect(
  //     SelectComponent.find(".currency-list").hasClass("currency-list-active")
  //   ).toBe(true);
  // });
});
