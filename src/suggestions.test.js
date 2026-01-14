import getSuggestions from "./suggestions";
import allCommands from "./__mocks__/commands";
import fuzzysortOptions from "./fuzzysort-options";

describe("getSuggestions", () => {
  describe("no value", () => {
    it("should return all commands", () => {
      const commands = getSuggestions("", allCommands, fuzzysortOptions, inputValue => inputValue);
      expect(commands).toEqual(allCommands);
    });
  });

  describe("commands", () => {
    it("should permit the use custom properties", () => {
      const commands = getSuggestions("Jump", allCommands, fuzzysortOptions, inputValue => inputValue);
      // the command palette does not natively support an "id" property
      // however a developer may easily add any set of obj properties to each command
      // the following assertion tests that custom command properties are supported
      expect(commands[0]).toHaveProperty("id", 6);
    });
  });

  describe("a value was provided", () => {
    it("should return and highlight the matching commands", () => {
      const commands = getSuggestions("Imports", allCommands, fuzzysortOptions, inputValue => inputValue);

      expect(commands[0]).toMatchObject({
        name: "Stop All Data Imports",
        highlight: "Stop All Data <b>Imports</b>",
      });
      expect(commands[1]).toMatchObject({
        name: "Start All Data Imports",
        highlight: "Start All Data <b>Imports</b>",
      });
      expect(commands.length).toBe(2);
    });
  });

  describe("a value was provide with mutiple keys to search", () => {
    it("should return the matching command with multple highlights", () => {
      fuzzysortOptions.keys = ["name", "category"];
      const matchName = getSuggestions(
        "Imports",
        allCommands,
        fuzzysortOptions,
        inputValue => inputValue
      );
      expect(matchName[0]).toMatchObject({
        name: "Stop All Data Imports",
        category: "Command",
        highlight: ["Stop All Data <b>Imports</b>", null],
      });

      const matchCategory = getSuggestions(
        "Com",
        allCommands,
        fuzzysortOptions,
        inputValue => inputValue
      );
      // When searching by category, multiple commands may match with same score
      // Check that at least one result has the expected structure
      const hasCommandHighlight = matchCategory.some(cmd =>
        cmd.category === "Command" &&
        Array.isArray(cmd.highlight) &&
        cmd.highlight[0] === null &&
        cmd.highlight[1] === "<b>Com</b>mand"
      );
      expect(hasCommandHighlight).toBe(true);
    });

    it("should handle single key in keys array", () => {
      // To hit the KeysResult branch with single key, we need keys array WITHOUT key property
      const optionsWithKeysOnly = {
        ...fuzzysortOptions,
        keys: ["name"] // Array with single key
      };
      delete optionsWithKeysOnly.key; // Remove key to force use of keys

      const commands = getSuggestions(
        "Imports",
        allCommands,
        optionsWithKeysOnly,
        inputValue => inputValue
      );
      expect(commands[0]).toMatchObject({
        name: "Stop All Data Imports",
        highlight: "Stop All Data <b>Imports</b>",
      });
      expect(commands.length).toBe(2);
    });
  });

  describe("edge cases", () => {
    it("should handle empty search results gracefully", () => {
      const commands = getSuggestions(
        "NonExistentCommandXYZ123",
        allCommands,
        fuzzysortOptions,
        inputValue => inputValue
      );
      // Should return all commands when no matches found
      expect(commands).toEqual(allCommands);
    });
  });
});
