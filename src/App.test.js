import React from "react";
import { mount } from "enzyme";
import store from "redux/store";
import { Provider } from "react-redux";
import { act } from "@testing-library/react";
import App from "./App";
import Login from "./interfaces/Login/Login";

describe("App", () => {
  global.fetch = jest.fn();
  let AppComponent;
  beforeEach(async () => {
    await act(async () => {
      AppComponent = mount(
        <Provider store={store}>
          <App />
        </Provider>
      );
    });
  });

  it("should render correctly", async () => {
    expect(AppComponent).toMatchSnapshot();
  });

  it("should render Login on load", async () => {
    expect(AppComponent.containsMatchingElement(<Login />)).toBe(true);
  });
});
