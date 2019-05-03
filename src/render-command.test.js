import * as React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import serializer from "enzyme-to-json/serializer";

import allCommands from "./__mocks__/commands";
import RenderCommand from "./render-command";
import SampleCustomCommand from "../examples/sampleCustomCommand";
import DefaultCommand from "./default-command";

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(serializer);

describe("RenderCommand", () => {
  it("should render the default child command", () => {
    const wrapper = mount(<RenderCommand suggestion={allCommands[0]} />);
    expect(wrapper).toMatchSnapshot();
  });
  it("should render a custom child command", () => {
    const wrapper = mount(
      <RenderCommand
        suggestion={allCommands[0]}
        renderCommand={SampleCustomCommand}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
