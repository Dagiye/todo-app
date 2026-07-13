import { describe, it, expect } from "vitest";

describe("Todo App", () => {
  it("runs the test environment", () => {
    expect(true).toBe(true);
  });

  it("checks basic JavaScript", () => {
    expect(2 + 2).toBe(4);
  });

  it("checks string comparison", () => {
    expect("Todo Manager").toBe("Todo Manager");
  });
});