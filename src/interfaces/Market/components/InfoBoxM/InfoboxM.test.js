import { mount } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";
import Graph from "components/Graph/Graph";
import InfoBoxM from "./InfoBoxM";

describe("InfoBoxM", () => {
  let InfoBoxMComponent;
  beforeEach(async () => {
    await act(async () => {
      InfoBoxMComponent = mount(
        <InfoBoxM
          name="Bitcoin"
          price={25}
          variation={10}
          data={[{ tokens: 0, price: 0, timestamp: 0 }]}
        />
      );
    });
  });

  it("should render correctly", () => {
    expect(InfoBoxMComponent).toMatchSnapshot();
  });
  it("should render graph component", () => {
    expect(InfoBoxMComponent.containsMatchingElement(<Graph />)).toBe(true);
  });
  it("should render custom price", () => {
    expect(InfoBoxMComponent.find("#infoboxM_price").text()).toBe("25");
  });

  it("should render custom name", () => {
    expect(InfoBoxMComponent.find("#infoBoxM_name").text()).toBe("Bitcoin");
  });
});
