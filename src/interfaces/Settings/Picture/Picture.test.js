import React from "react";
import { render } from "enzyme";
import { act } from "react-dom/test-utils";
import Picture from "./Picture";

describe("Picture", () => {
  let PictureComponent;
  beforeEach(async () => {
    await act(async () => {
      PictureComponent = render(<Picture />);
    });
  });
  it("should render correctly", () => {
    expect(PictureComponent).toMatchSnapshot();
  });
  it("should render Profil picture title", () => {
    expect(PictureComponent.find("h3").text()).toBe("Profil picture");
  });

  it("should render an input", () => {
    expect(PictureComponent.find("input").length).toBe(1);
  });
  it("should render a button called Select file", () => {
    expect(PictureComponent.find("button").first().text()).toBe("Select file");
  });
});
