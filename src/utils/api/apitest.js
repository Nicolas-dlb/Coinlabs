import { getData } from "./api.js";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        bitcoin: 0,
      }),
  })
);
describe("getData", () => {
  it("should fetch data", async () => {
    let result;
    expect(global.fetch).not.toHaveBeenCalled();

    await getData().then((data) => {
      result = data;
      console.log(data);
    });

    expect(result).not.toBe(undefined);
  });
});
