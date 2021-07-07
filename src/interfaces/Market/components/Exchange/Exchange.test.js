import React from "react";
import { mount } from "enzyme";
import { act } from "react-test-renderer";
import store from "redux/store";
import { Provider } from "react-redux";
import { setWallets } from "redux/reducers/walletsSlice";
import Exchange from "./Exchange";

describe("Exchange", () => {
  let ExchangeComponent;
  beforeEach(async () => {
    await act(async () => {
      ExchangeComponent = mount(
        <Provider store={store}>
          <Exchange />
        </Provider>
      );
    });
  });
  it("should render correctly", () => {
    expect(ExchangeComponent).toMatchSnapshot();
  });

  it("should render 2 input", () => {
    expect(ExchangeComponent.find("input").length).toBe(2);
  });

  it("should render 2 Select components", () => {
    expect(ExchangeComponent.find(".sell").first().exists()).toBe(true);
    expect(ExchangeComponent.find(".buy").first().exists()).toBe(true);
  });

  it("should render exchange right card", () => {
    expect(ExchangeComponent.find(".exchange_right").first().exists()).toBe(
      true
    );
  });

  it("should render correct current balance", () => {
    store.dispatch(setWallets({ usd: 100 }));
    expect(ExchangeComponent.find(".wallet").find("p").last().text()).toBe(
      "100.00"
    );
  });

  it("should render 1 button", () => {
    expect(ExchangeComponent.find(".btn-exchange").length).toBe(1);
  });
});
