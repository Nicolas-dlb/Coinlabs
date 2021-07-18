import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import store from "redux/store";
import { Provider } from "react-redux";
import Settings from "./Settings";

describe("settings", () => {
  let SettingsComponent;
  beforeEach(async () => {
    await act(async () => {
      SettingsComponent = await mount(
        <Provider store={store}>
          <Settings />
        </Provider>
      );
    });
  });
  it("should render correctly", () => {
    expect(SettingsComponent).toMatchSnapshot();
  });

  it("should render correctly account panel", () => {
    expect(SettingsComponent.find(".settings_account").exists()).toBe(true);
  });
  it("should render correctly username panel", () => {
    expect(SettingsComponent.find(".settings_username").exists()).toBe(true);
  });
  it("should render correctly picture panel", () => {
    expect(SettingsComponent.find(".settings_picture").exists()).toBe(true);
  });
  it("should render correctly email panel", () => {
    expect(SettingsComponent.find(".settings_email").exists()).toBe(true);
  });
  it("should render correctly founds panel", () => {
    expect(SettingsComponent.find(".settings_founds").exists()).toBe(true);
  });
  it("should render correctly theme panel", () => {
    expect(SettingsComponent.find(".settings_theme").exists()).toBe(true);
  });
});
