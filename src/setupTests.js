// Setup Enzyme and Jest to correctly "mount" components for snapshot testing
// Important: Note the Create React App loads JSDOM v16+ and There is a bug in it:
// (https://github.com/facebook/create-react-app/issues/3206)
// So JSDOM 15 is installed into the package.json then imported into the Jest setup
// Also note that we need the window in order to test that MouseTrap keyboard shortcuts 
// work from the window
import { JSDOM } from "jsdom";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import serializer from "enzyme-to-json/serializer";

expect.addSnapshotSerializer(serializer);

Enzyme.configure({ adapter: new Adapter() });

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

