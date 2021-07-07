import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import store from "redux/store";
import { act } from "react-dom/test-utils";
import Transactions from "./components/Transactions/Transactions";
import Dashboard from "./Dashboard";
import Growth from "./components/Growth/Growth";

describe("DashboardItem", () => {
  let DashboardComponent;
  beforeEach(async () => {
    await act(async () => {
      DashboardComponent = mount(
        <Provider store={store}>
          <Dashboard />
        </Provider>
      );
    });
  });
  it("should render correctly", () => {
    expect(DashboardComponent).toMatchSnapshot();
  });

  it("should render 4 InfoBoxD components", () => {
    expect(DashboardComponent.find(".infoboxD").length).toBe(4);
  });

  it("should render 5 InfoBoxM components", () => {
    expect(DashboardComponent.find(".infoboxM").length).toBe(5);
  });

  it("should render Transactions component", () => {
    expect(DashboardComponent.containsMatchingElement(<Transactions />)).toBe(
      true
    );
  });
  it("should render Growth component", () => {
    expect(DashboardComponent.containsMatchingElement(<Growth />)).toBe(true);
  });
});
