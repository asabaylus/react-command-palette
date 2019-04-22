/*  eslint
  no-unused-vars: ["error", { "varsIgnorePattern": "^renderer$" }],
  "function-paren-newline":0  */

import * as React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import serializer from "enzyme-to-json/serializer";
import PaletteSpinner from "./palette-spinner";

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(serializer);

describe("PaletteSpinner", () => {
  describe("props.display", () => {
    it("should display a black spinner when set to inline", () => {
      const paletteSpinner = mount(<PaletteSpinner display="inline" />);
      expect(paletteSpinner).toMatchSnapshot();
    });
    it("should display a white spinner when set to modal", () => {
      const paletteSpinner = mount(<PaletteSpinner display="modal" />);
      expect(paletteSpinner).toMatchSnapshot();
    });
  });
});
