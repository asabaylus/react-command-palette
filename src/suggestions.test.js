import getSuggestions from "./suggestions";
import allCommands from "./__mocks__/commands";

const fuzzysortOptions = {
  threshold: -Infinity,
  limit: 7,
  allowTypo: true,
  key: "name",
  keys: ["name", "section"],
  scoreFn: null
};

describe("getSuggestions", () => {
  describe("no value", () => {
    it("should return all commands", () => {
      const commands = getSuggestions("", allCommands, fuzzysortOptions);
      expect(commands).toEqual(allCommands);
    });
  });

  describe("a value was provided", () => {
    it("should return the matching command", () => {
      const commands = getSuggestions("zz", allCommands, fuzzysortOptions);
      expect(commands).toContainEqual({
        id: 1,
        name: "Fizz",
        command: Function.prototype,
        section: "",
        highlight: "Fi<b>zz</b>"
      });
      expect(commands).toContainEqual({
        id: 1,
        name: "Fizz Buzz",
        command: Function.prototype,
        section: "",
        highlight: "Fi<b>zz</b> Buzz"
      });
      expect(commands.length).toBe(2);
    });
  });
});
