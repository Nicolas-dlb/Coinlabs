/* eslint-disable no-unused-vars */
import { mount } from "enzyme";
import React from "react";
import store from "redux/store";
import { Provider } from "react-redux";
import InfoBoxD from "./InfoBoxD";

describe("InfoBoxD", () => {
  it("should render correctly", () => {
    const InfoBoxDComponent = mount(
      <Provider store={store}>
        <InfoBoxD title="Balance" variation={26} />
      </Provider>
    );
    expect(InfoBoxDComponent).toMatchSnapshot();
  });
});
