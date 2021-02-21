/*  eslint
  no-unused-vars: ["error", { "varsIgnorePattern": "^renderer$" }],
  "function-paren-newline":0  */
import { mount } from "enzyme";
import PaletteTrigger from "./palette-trigger";

describe("PaletteTrigger", () => {
  describe("props.trigger", () => {
    it("should accept a custom child component", () => {
      const MyButton = () => <b>foo</b>;
      const paletteTrigger = mount(<PaletteTrigger trigger={<MyButton />} />);
      expect(paletteTrigger.contains(<b>foo</b>)).toBe(true);
      expect(paletteTrigger).toMatchSnapshot();
    });

    it("should accept a custom text string", () => {
      const paletteTrigger = mount(<PaletteTrigger trigger="foo" />);
      expect(paletteTrigger.find("div").text()).toBe("foo");
      expect(paletteTrigger).toMatchSnapshot();
    });

    it("should be accessible", () => {
      const paletteTrigger = mount(<PaletteTrigger trigger="foo" />);
      expect(paletteTrigger.find("div").prop("tabIndex")).toBe(0);
      expect(paletteTrigger.find("div").prop("role")).toBe("button");
    });
  });
});
