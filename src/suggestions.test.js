/*  eslint
  no-unused-vars: ["error", { "varsIgnorePattern": "^renderer$" }],
  "function-paren-newline":0  */

import * as React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import serializer from "enzyme-to-json/serializer";
import getSuggestions from "./suggestions";
import allCommands from "./__mocks__/commands";

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(serializer);

describe.only("getSuggestions", () => {
  describe("no value", () => {
    it("should return all commands", () => {
      const commands = getSuggestions("", allCommands, {});
      expect(commands).toEqual(allCommands);
    });
  });
  describe("a value was provided", () => {
    it("should return the matching command", () => {
      const commands = getSuggestions("Fizz", allCommands, {});   
      expect(commands).toContainEqual({
        item: { name: "Fizz" },
        matches: [
          { indices: [[0, 0]], value: "Fizz", key: "name", arrayIndex: 0 }
        ]
      });
      // expect(commands).toContainEqual({
      //   item: { name: "Fizz Buzz" },
      //   matches: [
      //     {
      //       indices: [[0, 0]],
      //       value: "Fizz Buzz",
      //       key: "name",
      //       arrayIndex: 0
      //     }
      //   ]
      // });
      // )
    });
  });
});
