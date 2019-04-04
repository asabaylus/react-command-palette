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

  describe("commands", () => {
    it("should permit the use custom properties", () => {
      const commands = getSuggestions("Fizz", allCommands, fuzzysortOptions);
      // the command palette does not natively support an "id" property
      // however a developer may easily add any set of obj properties to each command
      // the following assertion tests that custom command properties are supported
      expect(commands[0]).toMatchObject({ id: 4 });
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
