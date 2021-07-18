/* eslint-disable no-unused-vars */
import { mount, render } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import store from "redux/store";
import { act } from "react-dom/test-utils";
import Growth from "./Growth";

describe("Growth", () => {
  let GrowthComponent;
  const setState = jest.fn();
  const useStateMock = (state) => [state, setState];
  jest.spyOn(React, "useState").mockImplementation(useStateMock);

  beforeEach(async () => {
    await act(async () => {
      GrowthComponent = await mount(
        <Provider store={store}>
          <Growth />
        </Provider>
      );
    });
  });

  it("should render correctly", () => {
    expect(GrowthComponent).toMatchSnapshot();
  });

  it("should render Graph component", () => {
    expect(GrowthComponent.find(".graph").exists()).toBeTruthy();
  });

  // it("should render correct timeline", () => {
  //   expect(GrowthComponent.find("Graph").props().data).toStrictEqual([
  //     { tokens: 0, Price: 0, timestamp: 0 },
  //   ]);
  // });
});
