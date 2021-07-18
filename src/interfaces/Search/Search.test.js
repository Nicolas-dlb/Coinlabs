import React from "react";
import { render } from "enzyme";
import { Provider } from "react-redux";
import store from "redux/store";
import { act } from "react-dom/test-utils";
import Search from "./Search";

describe("Search", () => {
  let SearchComponent;
  beforeEach(async () => {
    await act(async () => {
      SearchComponent = await render(
        <Provider store={store}>
          <Search />
        </Provider>
      );
    });
  });
  it("should render corectly", () => {
    expect(SearchComponent).toMatchSnapshot();
  });
  it("should render 5 Variation component", () => {
    expect(SearchComponent.find(".variation").length).toBe(6);
  });
  it("should render 1 market cap item", () => {
    expect(SearchComponent.find(".market_cap_item").length).toBe(1);
  });
  it("should render 1 portfolio item", () => {
    expect(SearchComponent.find(".portfolio_item").length).toBe(1);
  });
  it("should render Stats component", () => {
    expect(SearchComponent.find(".portfolio_stats").length).toBe(1);
  });
});
