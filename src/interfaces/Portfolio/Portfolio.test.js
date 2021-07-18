import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import store from "redux/store";
import { act } from "react-dom/test-utils";
import Portfolio from "./Portfolio";

describe("Portfolio", () => {
  let PortfolioComponent;
  beforeEach(async () => {
    await act(async () => {
      PortfolioComponent = await mount(
        <Provider store={store}>
          <Portfolio />
        </Provider>
      );
    });
  });
  it("should render correctly", () => {
    expect(PortfolioComponent).toMatchSnapshot();
  });
  it("should render 5 portfolio items", () => {
    expect(PortfolioComponent.find(".portfolio_item").length).toBe(5);
  });
  it("should render 4 infoboxD components", () => {
    expect(PortfolioComponent.find(".infoboxD").length).toBe(4);
  });
});
