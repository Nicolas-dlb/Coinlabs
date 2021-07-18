import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import store from "redux/store";
import { Provider } from "react-redux";
import Founds from "./Founds";

describe("Founds", () => {
  let FoundsComponent;
  beforeEach(async () => {
    await act(async () => {
      FoundsComponent = await mount(
        <Provider store={store}>
          <Founds />
        </Provider>
      );
    });
  });
  it("should render correctly", () => {
    expect(FoundsComponent).toMatchSnapshot();
  });
  it("should render Founds title", () => {
    expect(FoundsComponent.find("h3").text()).toBe("Founds");
  });
  it("should render an icon", () => {
    expect(FoundsComponent.find("p").text()).toBe("$");
  });

  it("should render an input", () => {
    expect(FoundsComponent.find("input").length).toBe(1);
  });
  it("should render a button called Add", () => {
    expect(FoundsComponent.find("button").first().text()).toBe("Add");
  });
});
