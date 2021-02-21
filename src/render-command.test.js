import { mount } from "enzyme";
import allCommands from "./__mocks__/commands";
import RenderCommand from "./render-command";
import sampleAtomCommand from "./examples/sampleAtomCommand";

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
