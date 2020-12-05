/*  eslint
  no-unused-vars: ["error", { "varsIgnorePattern": "^renderer$" }],
  "function-paren-newline":0  */

import * as React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import serializer from "enzyme-to-json/serializer";
import PaletteTrigger from "./palette-trigger";

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(serializer);

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
