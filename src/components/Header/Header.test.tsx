import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import store from "redux/store";
import { act } from "react-dom/test-utils";
import Header from "./Header";

describe("Header", () => {
  let HeaderComponent: any;

  beforeEach(async () => {
    await act(async () => {
      HeaderComponent = await mount(
        <Provider store={store}>
          <Header />
        </Provider>
      );
    });
  });
  afterEach(() => {
    HeaderComponent = null;
  });

  it("should render correctly", () => {
    expect(HeaderComponent).toMatchSnapshot();
  });

  it("should disconnect user when click on logout", () => {
    const logoutComponent = HeaderComponent.find("#btn-logout").first();
    logoutComponent.simulate("click");
    expect(store.getState().user.userName).toBeNull();
  });
});
