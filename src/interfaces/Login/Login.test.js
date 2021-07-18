/* eslint-disable no-unused-vars */
import { mount } from "enzyme";
import React from "react";
import store from "redux/store";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";
import Login from "./Login";

describe("Login", () => {
  let LoginComponent;
  beforeEach(async () => {
    await act(async () => {
      LoginComponent = mount(
        <Provider store={store}>
          <Login />
        </Provider>
      );
    });
  });
  it("should render correctly", () => {
    expect(LoginComponent).toMatchSnapshot();
  });

  it("should render 6 inputs", () => {
    expect(LoginComponent.find("input").length).toBe(6);
  });

  it("should render 3 button to sign in", () => {
    expect(LoginComponent.find("button").length).toBe(3);
  });
});
