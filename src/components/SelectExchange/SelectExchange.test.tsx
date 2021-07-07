/* eslint-disable no-unused-vars */
import { mount } from "enzyme";
import React from "react";
import Select from "./SelectExchange";

describe("Select", () => {
  let SelectComponent: any;

  beforeEach(() => {
    SelectComponent = mount(<Select items="sell" />);
  });
  afterEach(() => {
    SelectComponent = null;
  });

  it("should render correctly", () => {
    expect(SelectComponent).toMatchSnapshot();
  });

  it("should render items selected", () => {
    expect(SelectComponent.find(".sell").first().exists()).toBeTruthy();
  });

  it("should render correct options", () => {
    expect(SelectComponent.find("option").first().props().value).toBe("BTC");
  });

  // it("should show list on click", () => {
  //   SelectComponent.find(".btn-currency").simulate("click");
  //   console.log(SelectComponent.find(".currency-list").debug());
  //   expect(
  //     SelectComponent.find(".currency-list").hasClass("currency-list-active")
  //   ).toBe(true);
  // });
});
