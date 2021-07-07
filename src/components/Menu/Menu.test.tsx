import React from "react";
import { mount } from "enzyme";
import store from "redux/store";
import { Provider } from "react-redux";
import { login, setProfilPic, setUsername } from "redux/reducers/userSlice";
import Menu from "./Menu";

describe("Menu", () => {
  let MenuComponent: any;
  beforeEach(async () => {
    MenuComponent = mount(
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
    store.dispatch(
      setProfilPic(
        "https://www.vhv.rs/dpng/d/164-1645859_selfie-clipart-groucho-glass-good-profile-hd-png.png"
      )
    );
    expect(MenuComponent.find(".user_icon").props().src).toBe(
      store.getState().user.profilPic
    );
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
