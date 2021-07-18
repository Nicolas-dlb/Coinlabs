import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import store from "redux/store";
import { Provider } from "react-redux";
import Variation from "./Variation";

describe("Variation", () => {
  let VariationComponent;
  beforeEach(async () => {
    await act(async () => {
      VariationComponent = await mount(
        <Provider store={store}>
          <Variation name="Bitcoin" time="Week" />
        </Provider>
      );
    });
  });
  it("should render correctly", () => {
    expect(VariationComponent).toMatchSnapshot();
  });
  it("should render 1 graph", () => {
    expect(VariationComponent.find(".graph").first().exists()).toBe(true);
  });
  it("should rendre variation", () => {
    expect(VariationComponent.find(".variation_number").first().exists()).toBe(
      true
    );
  });
  it("should rendre one price", () => {
    expect(VariationComponent.find(".variation_price").first().exists()).toBe(
      true
    );
  });
});
