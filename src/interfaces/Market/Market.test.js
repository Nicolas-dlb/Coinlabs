import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import store from "redux/store";
import { act } from "react-test-renderer";
import Market from "./Market";

describe("Market", () => {
  let MarketComponent;
  beforeEach(async () => {
    await act(async () => {
      MarketComponent = mount(
        <Provider store={store}>
          <Market />
        </Provider>
      );
    });
  });
  it("should render correctly", () => {
    expect(MarketComponent).toMatchSnapshot();
  });

  it("should render 5 InfoBoxM", () => {
    expect(MarketComponent.find(".infoboxM").length).toBe(5);
  });

  it("should render Market Cap", () => {
    expect(MarketComponent.find(".market_cap").first().exists()).toBe(true);
  });

  it("should render Exchange", () => {
    expect(MarketComponent.find(".exchange").first().exists()).toBe(true);
  });

  it("should render Portfolio Stats", () => {
    expect(MarketComponent.find(".portfolio_stats").first().exists()).toBe(
      true
    );
  });
});
