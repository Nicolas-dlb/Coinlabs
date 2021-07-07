import React from "react";
import { shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import MenuItem from "./MenuItem";

describe("MenuItem", () => {
  let MarketItemComponent: any;
  const setState = jest.fn();
  const useStateMock: any = (state: number) => [state, setState];
  jest.spyOn(React, "useState").mockImplementation(useStateMock);

  beforeEach(() => {
    MarketItemComponent = shallow(
      <MenuItem item="Market" active="market" onClick={setState} />
    );
  });

  afterEach(() => {
    MarketItemComponent = null;
  });

  it("should render correctly", () => {
    expect(MarketItemComponent).toMatchSnapshot();
  });

  it("should change page on item click", async () => {
    expect(setState).toHaveBeenCalledTimes(0);
    act(() => {
      MarketItemComponent.simulate("click");
    });
    expect(setState).toHaveBeenCalledWith("market");
  });
});
