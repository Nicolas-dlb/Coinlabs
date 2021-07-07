import { getNumberFixed, numberWithSpaces, strUcFirst } from "./utils";

describe("getNumberFixed", () => {
  it("should return number with decimal fixed with the argument", () => {
    const numberFixed = getNumberFixed(1.123456, 2);
    expect(Number(numberFixed)).toBe(1.12);
  });
});

describe("numberWithSpaces", () => {
  it("should return number formatted in string with space every 3 integer", () => {
    const numberWithSpace = numberWithSpaces(10000);
    expect(numberWithSpace).toBe("10 000");
  });
});

describe("strUcFirst", () => {
  it("should return string with the first charachter in uppercase", () => {
    const str = strUcFirst("test");
    expect(str).toBe("Test");
  });
});
