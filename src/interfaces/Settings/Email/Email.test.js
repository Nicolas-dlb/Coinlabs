import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import Email from "./Email";

describe("Email", () => {
  let EmailComponent;
  beforeEach(async () => {
    await act(async () => {
      EmailComponent = mount(<Email />);
    });
  });
  it("should render correctly", () => {
    expect(EmailComponent).toMatchSnapshot();
  });
  it("should render Email title", () => {
    expect(EmailComponent.find("h3").text()).toBe("Email");
  });
  it("should render an icon", () => {
    const icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="489"
        height="489"
        viewBox="0 0 489.2 489.2"
        className="email_icon"
      >
        <polygon points="0 386.6 143.5 214.9 0 99.6 " />
        <polygon points="489.2 386.6 489.2 99.6 345.6 214.9 " />
        <polygon points="487.9 398.7 489.2 398.7 489.2 397.7 " />
        <polygon points="0 398.7 1.2 398.7 0 397.7 " />
        <polygon points="480.8 398.7 479.9 397.7 334.6 223.7 244.6 296.1 154.6 223.7 9.2 397.7 8.4 398.7 " />
        <polygon points="152.6 204 158.1 208.5 163.6 212.9 244.6 277.9 325.5 212.9 331 208.5 336.5 204 477.9 90.5 11.3 90.5 " />
      </svg>
    );
    expect(EmailComponent.containsMatchingElement(icon)).toBe(true);
  });

  it("should render an input", () => {
    expect(EmailComponent.find("input").length).toBe(1);
  });
  it("should render a button called Update", () => {
    expect(EmailComponent.find("button").text()).toBe("Update");
  });
});
