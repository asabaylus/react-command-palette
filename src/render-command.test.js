import { render, screen } from "@testing-library/react";
import allCommands from "./__mocks__/commands";
import RenderCommand from "./render-command";
import sampleAtomCommand from "./examples/sampleAtomCommand";

describe("RenderCommand", () => {
  it("should render the default child command", () => {
    const { container } = render(<RenderCommand suggestion={allCommands[0]} />);
    // DefaultCommand renders the suggestion name in a div with class "item"
    expect(container.querySelector(".item")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
  it("should render a custom child command", () => {
    const { container } = render(
      <RenderCommand
        suggestion={allCommands[0]}
        renderCommand={sampleAtomCommand}
      />
    );
    // Custom command has different structure than DefaultCommand
    expect(screen.getByText(allCommands[0].name)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
