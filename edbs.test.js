const app = () => require("./src/index.js");

describe("This App", () => {
  it("should run lmao", () => {
    expect(app).not.toThrow();
  });
});
