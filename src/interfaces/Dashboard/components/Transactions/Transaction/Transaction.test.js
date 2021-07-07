import React from "react";
import { render } from "enzyme";
import { Provider } from "react-redux";
import store from "redux/store";
import { act } from "react-dom/test-utils";
import Transaction from "./Transaction";

describe("TransactionItem", () => {
  let TransactionComponent;
  beforeEach(async () => {
    await act(async () => {
      TransactionComponent = render(
        <Provider store={store}>
          <Transaction name="Bitcoin" status="Buy" price={100} />
        </Provider>
      );
    });
  });

  it("should render correctly", () => {
    expect(TransactionComponent).toMatchSnapshot();
  });

  it("should render custom price", () => {
    expect(TransactionComponent.find(".transaction_price").text()).toBe("$100");
  });

  it("should render custom status", () => {
    expect(TransactionComponent.find(".transaction_statut").text()).toBe("Buy");
  });

  it("should render custom name", () => {
    expect(TransactionComponent.find(".transaction_name").text()).toBe(
      "Bitcoin"
    );
  });
});
