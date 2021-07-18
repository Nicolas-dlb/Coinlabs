import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import store from "redux/store";
import { Provider } from "react-redux";
import StatsGraph from "./StatsGraph";

describe("StatsGraph", () => {
  let StatsGraphComponent;
  beforeEach(async () => {
    await act(async () => {
      const data = [{ tokens: 0, Price: 0, timestamp: 0 }];
      StatsGraphComponent = await mount(
        <Provider store={store}>
          <StatsGraph
            data={data}
            color="White"
            width={10}
            height={10}
            tooltip
            selected="Bitcoin"
          />
        </Provider>
      );
    });
  });
  it("should render correctly", () => {
    expect(StatsGraphComponent).toMatchSnapshot();
  });
  it("should render 1 graph", () => {
    expect(StatsGraphComponent.find(".graph").first().exists()).toBe(true);
  });
});
