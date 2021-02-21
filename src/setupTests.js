// React Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import serializer from "enzyme-to-json/serializer";

expect.addSnapshotSerializer(serializer);

Enzyme.configure({ adapter: new Adapter() });

const { JSDOM } = require("jsdom");

const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;

global.document = window.document;

global.navigator = {
  userAgent: "node.js",
};

global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0);
};

global.cancelAnimationFrame = function (id) {
  clearTimeout(id);
};

copyProps(window, global);

