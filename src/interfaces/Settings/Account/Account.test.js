import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import store from "redux/store";
import { Provider } from "react-redux";
import Account from "./Account";

describe("Account", () => {
  let AccountComponent;
  beforeEach(async () => {
    await act(async () => {
      AccountComponent = mount(
        <Provider store={store}>
          <Account />
        </Provider>
      );
    });
  });
  it("should render correctly", () => {
    expect(AccountComponent).toMatchSnapshot();
  });
  it("should render Account title", () => {
    expect(AccountComponent.find("h3").first().text()).toBe("Account");
  });
  it("should render user Profil picture", () => {
    expect(AccountComponent.find("img").first().exists()).toBe(true);
  });
  it("should render user name", () => {
    expect(AccountComponent.find("h3").first().exists()).toBe(true);
  });
  it("should render user email", () => {
    expect(AccountComponent.find("h5").exists()).toBe(true);
  });
  it("should render a logout", () => {
    expect(AccountComponent.find(".change_user").first().exists()).toBe(true);
  });
});
