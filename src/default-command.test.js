import { render } from "@testing-library/react";
import mockCommands from "./__mocks__/commands";
import DefaultCommand from "./default-command";

describe("DefaultCommand", () => {
  it("should render", () => {
    const { container } = render(
      <DefaultCommand suggestion={mockCommands[0]} />
    );
    expect(container).toMatchSnapshot();
  });
});
