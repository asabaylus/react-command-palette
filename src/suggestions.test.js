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
      const commands = getSuggestions("Jump", allCommands, fuzzysortOptions);
      // the command palette does not natively support an "id" property
      // however a developer may easily add any set of obj properties to each command
      // the following assertion tests that custom command properties are supported
      expect(commands[0]).toHaveProperty("id", 6);
    });
  });

  describe("a value was provided", () => {
    it("should return and highlight the matching commands", () => {
      const commands = getSuggestions("Imports", allCommands, fuzzysortOptions);

      expect(commands[0]).toMatchObject({
        name: "Stop All Data Imports",
        highlight: "Stop All Data <b>Imports</b>"
      });
      expect(commands[1]).toMatchObject({
        name: "Start All Data Imports",
        highlight: "Start All Data <b>Imports</b>"
      });
      expect(commands.length).toBe(2);
    });
  });
});
