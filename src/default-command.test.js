import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import serializer from "enzyme-to-json/serializer";

import mockCommands from "./__mocks__/commands";
import DefaultCommand from "./default-command";

expect.addSnapshotSerializer(serializer);

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe("DefaultCommand", () => {
  it("should render", () => {
    const defaultCommand = shallow(
      <DefaultCommand suggestion={mockCommands[0]} />
    );
    expect(defaultCommand).toMatchSnapshot();
  });
});
