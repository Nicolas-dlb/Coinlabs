import React from "react";
import { mount } from "enzyme";
import store from "redux/store";
import { Provider } from "react-redux";
import { login, setUsername } from "redux/reducers/userSlice";
import Menu from "./Menu";

describe("Menu", () => {
  let MenuComponent: any;
  beforeEach(async () => {
    MenuComponent = await mount(
      <Provider store={store}>
        <Menu />
      </Provider>
    );
  });
  afterEach(() => {
    MenuComponent = null;
  });

  it("should render correctly", () => {
    expect(MenuComponent).toMatchSnapshot();
  });

  it("should render 5 MenuItem components", () => {
    expect(MenuComponent.find(".menu_item").length).toBe(5);
  });

  it("should render user profil picture", () => {
    expect(MenuComponent.find("img").exists()).toBe(true);
  });

  it("should render user name name", () => {
    store.dispatch(setUsername("John Doe"));
    expect(MenuComponent.find(".user_name").text()).toBe(
      store.getState().user.userName
    );
  });

  it("should render user email email", () => {
    store.dispatch(login({ userName: "John Doe", email: "johndoe@gmail.com" }));
    expect(MenuComponent.find(".user_email").text()).toBe(
      store.getState().user.userEmail
    );
  });
});
