/*  eslint
  no-unused-vars: ["error", { "varsIgnorePattern": "^renderer$" }],
  "function-paren-newline":0  */
import { render, screen } from "@testing-library/react";
import PaletteTrigger from "./palette-trigger";

describe("PaletteTrigger", () => {
  describe("props.trigger", () => {
    it("should accept a custom child component", () => {
      const MyButton = () => <b>foo</b>;
      const { container } = render(<PaletteTrigger trigger={<MyButton />} />);
      expect(screen.getByText("foo")).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });

    it("should accept a custom text string", () => {
      const { container } = render(<PaletteTrigger trigger="foo" />);
      expect(screen.getByRole("button")).toHaveTextContent("foo");
      expect(container).toMatchSnapshot();
    });

    it("should be accessible", () => {
      render(<PaletteTrigger trigger="foo" />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("tabIndex", "0");
      expect(button).toHaveAttribute("role", "button");
    });
  });
});
