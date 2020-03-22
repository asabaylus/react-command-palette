import { Simulate } from "react-dom/test-utils";

export const clickDown = (input, count = 1) => {
  for (let i = 0; i < count; i++) {
    // throws if key is missing
    Simulate.keyDown(input, { key: "ArrowDown", keyCode: 40 });
  }
};

export const clickUp = (input, count = 1) => {
  for (let i = 0; i < count; i++) {
    // throws if key is missing
    Simulate.keyDown(input, { key: "ArrowUp", keyCode: 38 });
  }
};

export const clickEnter = (input) => {
  // throws if key is missing
  Simulate.keyDown(input, { key: "Enter", keyCode: 13 });
};
