import React from "react";
import { mount } from "enzyme";
import store from "redux/store";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import PortfolioStats from "./PortfolioStats";

describe("Portfolio stats", () => {
  let PortfolioStatsComponent;
  beforeEach(() => {
    act(() => {
      PortfolioStatsComponent = mount(
        <Provider store={store}>
          <PortfolioStats />
        </Provider>
      );
    });
  });
  it("should render correctly", () => {
    expect(PortfolioStatsComponent).toMatchSnapshot();
  });
  it("should render Graph", () => {
    expect(PortfolioStatsComponent.find(".graph").first().exists()).toBe(true);
  });

  it("should render Select", () => {
    expect(PortfolioStatsComponent.find("#btn-select").first().exists()).toBe(
      true
    );
  });

  it("should render 5 button", () => {
    expect(PortfolioStatsComponent.find(".btn_portfolio").length).toBe(5);
  });
});
