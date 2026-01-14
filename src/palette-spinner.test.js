/*  eslint
  no-unused-vars: ["error", { "varsIgnorePattern": "^renderer$" }],
  "function-paren-newline":0  */
import { render } from "@testing-library/react";
import PaletteSpinner from "./palette-spinner";

describe("PaletteSpinner", () => {
  describe("props.spinner", () => {
    it("should render the DefaultSpinnerComponent by default", () => {
      const { container } = render(<PaletteSpinner />);
      const spinner = container.querySelector(".default-spinner");
      expect(spinner).toBeTruthy();
      expect(container).toMatchSnapshot();
    });

    it("should display a custom string when props.spinner is set", () => {
      const { container } = render(<PaletteSpinner spinner="Waiting" />);
      const spinner = container.querySelector(".spinner");
      expect(spinner).toBeTruthy();
      expect(container).toMatchSnapshot();
    });

    it('should display an "inline" custom string when props.spinner is set', () => {
      const { container } = render(
        <PaletteSpinner spinner="Waiting" display="inline" />
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("props.display", () => {
    it("should display a black spinner when set to inline", () => {
      const { container } = render(<PaletteSpinner display="inline" />);
      const div = container.querySelector("div.inline");
      expect(div).toBeTruthy();
      expect(container).toMatchSnapshot();
    });

    it("should display a white spinner when set to modal", () => {
      const { container } = render(<PaletteSpinner display="modal" />);
      const div = container.querySelector("div.modal");
      expect(div).toBeTruthy();
      expect(container).toMatchSnapshot();
    });
  });
});
