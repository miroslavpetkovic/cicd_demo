import { add, subtract, multiply, divide, percentage } from "../src/calculator";

describe("Calculator Tests", () => {
  describe("add()", () => {
    test("adds two positive numbers", () => {
      expect(add(2, 3)).toBe(5);
    });

    test("adds negative numbers", () => {
      expect(add(-2, -3)).toBe(-5);
    });

    test("adds zero", () => {
      expect(add(5, 0)).toBe(5);
    });
  });

  describe("subtract()", () => {
    test("subtracts correctly", () => {
      expect(subtract(10, 4)).toBe(6);
    });

    test("returns negative when result is negative", () => {
      expect(subtract(2, 10)).toBe(-8);
    });
  });

  describe("multiply()", () => {
    test("multiplies correctly", () => {
      expect(multiply(4, 5)).toBe(20);
    });

    test("multiplying by zero returns zero", () => {
      expect(multiply(5, 0)).toBe(0);
    });
  });

  describe("divide()", () => {
    test("divides correctly", () => {
      expect(divide(10, 2)).toBe(5);
    });

    test("throws when dividing by zero", () => {
      expect(() => divide(10, 0)).toThrow("Cannot divide by zero");
    });
  });

  describe("percentage()", () => {
    test("calculates percentage", () => {
      expect(percentage(25, 100)).toBe(25);
    });

    test("throws when total is zero", () => {
      expect(() => percentage(25, 0)).toThrow("Total cannot be zero");
    });
  });
});
