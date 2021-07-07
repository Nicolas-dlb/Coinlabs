import React from "react";
import { render } from "enzyme";
import { Provider } from "react-redux";
import store from "redux/store";
import { act } from "react-test-renderer";
import MarketCap from "./MarketCap";

describe("MarketCap", () => {
  let MarketCapComponent;
  beforeEach(async () => {
    await act(async () => {
      MarketCapComponent = render(
        <Provider store={store}>
          <MarketCap name="bitcoin" />
        </Provider>
      );
    });
  });
  it("should render correctly", () => {
    expect(MarketCapComponent).toMatchSnapshot();
  });

  it("should render 5 market cap components", () => {
    expect(MarketCapComponent.find(".market_cap_item").length).toBe(5);
  });
});
