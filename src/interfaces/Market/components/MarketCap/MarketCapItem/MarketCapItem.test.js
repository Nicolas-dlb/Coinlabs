import React from "react";
import { render } from "enzyme";
import { Provider } from "react-redux";
import store from "redux/store";
import { act } from "react-test-renderer";
import MarketCapItem from "./MarketCapItem";

describe("MarketCapItem", () => {
  let MarketCapItemComponent;
  beforeEach(async () => {
    await act(async () => {
      MarketCapItemComponent = render(
        <Provider store={store}>
          <MarketCapItem name="bitcoin" />
        </Provider>
      );
    });
  });
  it("should render correctly", () => {
    expect(MarketCapItemComponent).toMatchSnapshot();
  });

  it("should render custom market cap", () => {
    expect(MarketCapItemComponent.find(".item_name").text()).toBe("bitcoin");
  });
});
