import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import store from "redux/store";
import { Provider } from "react-redux";
import Stats from "./Stats";

describe("Stats", () => {
  let StatsComponent;
  beforeEach(async () => {
    await act(async () => {
      StatsComponent = await mount(
        <Provider store={store}>
          <Stats name="Bitcoin" time="Week" />
        </Provider>
      );
    });
  });
  it("should render correctly", () => {
    expect(StatsComponent).toMatchSnapshot();
  });
});
