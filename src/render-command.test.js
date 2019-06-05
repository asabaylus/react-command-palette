import * as React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import serializer from "enzyme-to-json/serializer";

import allCommands from "./__mocks__/commands";
import RenderCommand from "./render-command";
import sampleAtomCommand from "../examples/sampleAtomCommand";

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(serializer);

describe("RenderCommand", () => {
  it("should render the default child command", () => {
    const wrapper = mount(<RenderCommand suggestion={allCommands[0]} />);
    expect(wrapper.props().suggestion).toEqual(allCommands[0]);
    expect(wrapper.childAt(0).name()).toBe("DefaultCommand");
    expect(wrapper).toMatchSnapshot();
  });
  it("should render a custom child command", () => {
    const wrapper = mount(
      <RenderCommand
        suggestion={allCommands[0]}
        renderCommand={sampleAtomCommand}
      />
    );
    expect(wrapper.props().suggestion).toEqual(allCommands[0]);
    expect(wrapper.childAt(0).name()).not.toBe("DefaultCommand");
    expect(wrapper).toMatchSnapshot();
  });
});
