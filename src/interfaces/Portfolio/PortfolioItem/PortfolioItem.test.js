import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import store from "redux/store";
import { act } from "react-dom/test-utils";
import PortfolioItem from "./PortfolioItem";

describe("PortfolioItem", () => {
  let PortfolioItemComponent;
  beforeEach(async () => {
    act(async () => {
      PortfolioItemComponent = mount(
        <Provider store={store}>
          <PortfolioItem name="Bitcoin" />
        </Provider>
      );
    });
  });
  it("should render correctly", () => {
    expect(PortfolioItemComponent).toMatchSnapshot();
  });

  it("should render custom crypto", () => {
    expect(
      PortfolioItemComponent.find(".portfolio_name").find("p").first().text()
    ).toBe("Bitcoin");
  });

  it("should render Graph component", () => {
    expect(PortfolioItemComponent.find(".graph").first().exists()).toBe(true);
  });
});
