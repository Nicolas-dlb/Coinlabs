import React from "react";
import { shallow } from "enzyme";
import { Tooltip } from "recharts";
import Graph from "./Graph";

describe("Graph", () => {
  it("should render correctly", () => {
    const GraphComponent = shallow(
      <Graph
        data={[{ tokens: 0, Price: 0, timestamp: 0 }]}
        color="White"
        width={10}
        height={10}
      />
    );
    expect(GraphComponent).toMatchSnapshot();
  });

  it("should render correct color", () => {
    const GraphComponent = shallow(
      <Graph
        data={[{ tokens: 0, Price: 0, timestamp: 0 }]}
        color="Blue"
        width={10}
        height={10}
      />
    );
    expect(GraphComponent.find("Area").first().props()).toHaveProperty(
      "fill",
      "url(#Blue)"
    );
  });

  it("should render correct height", () => {
    const GraphComponent = shallow(
      <Graph
        data={[{ tokens: 0, Price: 0, timestamp: 0 }]}
        color="Blue"
        width={10}
        height={10}
      />
    );
    expect(
      GraphComponent.find("ResponsiveContainer").first().props()
    ).toHaveProperty("height", 10);
  });

  it("should render correct data", () => {
    const GraphComponent = shallow(
      <Graph
        data={[{ tokens: 0, Price: 10, timestamp: 10 }]}
        color="Blue"
        width={10}
        height={10}
      />
    );
    expect(GraphComponent.find("AreaChart").first().props()).toHaveProperty(
      "data",
      [{ tokens: 0, Price: 10, timestamp: 10 }]
    );
  });

  it("should not render tooltip if not defined", () => {
    const GraphComponent = shallow(
      <Graph
        data={[{ tokens: 0, Price: 10, timestamp: 10 }]}
        color="Blue"
        width={10}
        height={10}
      />
    );
    expect(GraphComponent.containsMatchingElement(<Tooltip />)).toBeFalsy();
  });

  it("should render tooltip if defined", () => {
    const GraphComponent = shallow(
      <Graph
        data={[{ tokens: 0, Price: 10, timestamp: 10 }]}
        color="Blue"
        width={10}
        height={10}
        tooltip
      />
    );
    expect(GraphComponent.find("Tooltip").first().exists()).toBe(true);
  });

  it("should render only selected element if defined", () => {
    const GraphComponent = shallow(
      <Graph
        data={[{ tokens: 0, Price: 10, timestamp: 10 }]}
        color="Blue"
        width={10}
        height={10}
        tooltip
        selected="Ethereum"
      />
    );
    expect(GraphComponent.find("Area").at(1).props().strokeWidth).toBe(1);
  });
  const setState = jest.fn();
  const useStateMock: any = (state: number) => [state, setState];

  it("should show correct tooltip", () => {
    const GraphComponent = shallow(
      <Graph
        data={[{ tokens: 0, Price: 10, timestamp: 10 }]}
        color="Blue"
        width={10}
        height={10}
      />
    );
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    const EthereumArea: any = GraphComponent.find("Area").at(1);

    EthereumArea.prop("onMouseOver")(setState(1));
    expect(setState).toHaveBeenCalledTimes(1);
  });
});
