/*  eslint
  no-unused-vars: ["error", { "varsIgnorePattern": "^renderer$" }],
  "function-paren-newline":0  */
import { mount } from "enzyme";
import PaletteSpinner from "./palette-spinner";

describe("PaletteSpinner", () => {
  describe("props.spinner", () => {
    it("should render the DefaultSpinnerComponent by default", () => {
      const wrapper = mount(<PaletteSpinner />);
      const spinner = wrapper.find("DefaultSpinnerComponent");
      expect(spinner).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });

    it("should display a custom string when props.spinner is set", () => {
      const wrapper = mount(<PaletteSpinner spinner="Waiting" />);
      const spinner = wrapper.find("CustomSpinnerComponent");
      expect(spinner).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });

    it('should display an "inline" custom string when props.spinner is set', () => {
      const wrapper = mount(
        <PaletteSpinner spinner="Waiting" display="inline" />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("props.display", () => {
    it("should display a black spinner when set to inline", () => {
      const wrapper = mount(<PaletteSpinner display="inline" />);
      const hasCSSInlineClass = wrapper.find("div").hasClass("inline");
      expect(hasCSSInlineClass).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });

    it("should display a white spinner when set to modal", () => {
      const wrapper = mount(<PaletteSpinner display="modal" />);
      const hasCSSInlineClass = wrapper.find("div").hasClass("modal");
      expect(hasCSSInlineClass).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
