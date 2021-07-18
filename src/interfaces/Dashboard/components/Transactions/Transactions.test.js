import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import store from "redux/store";
import { act } from "react-dom/test-utils";
import Transactions from "./Transactions";

describe("TransactionsItem", () => {
  let TransactionsComponent;
  beforeEach(async () => {
    await act(async () => {
      TransactionsComponent = await mount(
        <Provider store={store}>
          <Transactions />
        </Provider>
      );
    });
  });
  it("should render correctly", () => {
    expect(TransactionsComponent).toMatchSnapshot();
  });
});
