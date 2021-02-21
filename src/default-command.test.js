import React from "react";
import { shallow } from "enzyme";
import mockCommands from "./__mocks__/commands";
import DefaultCommand from "./default-command";

describe("DefaultCommand", () => {
  it("should render", () => {
    const defaultCommand = shallow(
      <DefaultCommand suggestion={mockCommands[0]} />
    );
    expect(defaultCommand).toMatchSnapshot();
  });
});
