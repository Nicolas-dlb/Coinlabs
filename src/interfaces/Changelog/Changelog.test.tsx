/* eslint-disable no-unused-vars */
import { render } from "@testing-library/react";
import { mount, shallow } from "enzyme";
import React from "react";
import Changelog from "./Changelog";

describe("Changelog", () => {
  let ChangelogComponent: any;

  beforeEach(() => {
    ChangelogComponent = shallow(<Changelog />);
  });

  it("should render correctly", () => {
    expect(ChangelogComponent).toMatchSnapshot();
  });
  it("should render upcoming change", () => {
    expect(ChangelogComponent.find(".added").first().exists()).toBe(true);
  });
});
