import getSuggestions from "./suggestions";
import allCommands from "./__mocks__/commands";
import fuzzysortOptions from "./fuzzysort-options";

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
      expect(commands[0]).toMatchObject({
        name: "Fizz",
        highlight: "Fi<b>zz</b>"
      });
      expect(commands[1]).toMatchObject({
        name: "Fizz Buzz",
        highlight: "Fi<b>zz</b> Buzz"
      });
      expect(commands.length).toBe(2);
    });
  });
});
