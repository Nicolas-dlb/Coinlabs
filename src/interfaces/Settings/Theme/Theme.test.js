import React from "react";
import { render } from "enzyme";
import { act } from "react-dom/test-utils";
import Theme from "./Theme";

describe("Theme", () => {
  let ThemeComponent;
  beforeEach(async () => {
    await act(async () => {
      ThemeComponent = render(<Theme />);
    });
  });
  it("should render correctly", () => {
    expect(ThemeComponent).toMatchSnapshot();
  });

  it("should render Theme title", () => {
    expect(ThemeComponent.find("h3").text()).toBe("Theme");
  });

  it("should render 2 button with Dark and Grey text", () => {
    expect(ThemeComponent.find("button").length).toBe(2);
    expect(ThemeComponent.find("button").first().text()).toBe("Dark");
    expect(ThemeComponent.find("button").last().text()).toBe("Grey");
  });
});
