import * as React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import CommandPalette from "./command-palette";
import commands from "./__mocks__/commands";

const app = document && document.getElementById("app");

// Thank you codecrap https://codecrap.com/content/10461/

//to get the clicked button and set the values for the function
//speaking of inefficiency
document.getElementById('F1B0').onclick = setQuestionChoice(1, 1);
document.getElementById('F1B1').onclick = setQuestionChoice(1, 2);
document.getElementById('F1B2').onclick = setQuestionChoice(1, 3);
document.getElementById('F1B3').onclick = setQuestionChoice(1, 4);
document.getElementById('F1B4').onclick = setQuestionChoice(1, 5);
document.getElementById('F2B0').onclick = setQuestionChoice(2, 1);
document.getElementById('F2B1').onclick = setQuestionChoice(2, 2);
document.getElementById('F2B2').onclick = setQuestionChoice(2, 3);
document.getElementById('F2B3').onclick = setQuestionChoice(2, 4);
document.getElementById('F2B4').onclick = setQuestionChoice(2, 5);
document.getElementById('F3B0').onclick = setQuestionChoice(3, 1);
document.getElementById('F3B1').onclick = setQuestionChoice(3, 2);
document.getElementById('F3B2').onclick = setQuestionChoice(3, 3);
document.getElementById('F3B3').onclick = setQuestionChoice(3, 4);
document.getElementById('F3B4').onclick = setQuestionChoice(3, 5);
document.getElementById('F4B0').onclick = setQuestionChoice(4, 1);
document.getElementById('F4B1').onclick = setQuestionChoice(4, 2);
document.getElementById('F4B2').onclick = setQuestionChoice(4, 3);
document.getElementById('F4B3').onclick = setQuestionChoice(4, 4);
document.getElementById('F4B4').onclick = setQuestionChoice(4, 5);
document.getElementById('F5B0').onclick = setQuestionChoice(5, 1);
document.getElementById('F5B1').onclick = setQuestionChoice(5, 2);
document.getElementById('F5B2').onclick = setQuestionChoice(5, 3);
document.getElementById('F5B3').onclick = setQuestionChoice(5, 4);
document.getElementById('F5B4').onclick = setQuestionChoice(5, 5);
document.getElementById('F6B0').onclick = setQuestionChoice(6, 1);
document.getElementById('F6B1').onclick = setQuestionChoice(6, 2);
document.getElementById('F6B2').onclick = setQuestionChoice(6, 3);
document.getElementById('F6B3').onclick = setQuestionChoice(6, 4);
document.getElementById('F6B4').onclick = setQuestionChoice(6, 5);
document.getElementById('F7B0').onclick = setQuestionChoice(7, 1);
document.getElementById('F7B1').onclick = setQuestionChoice(7, 2);
document.getElementById('F7B2').onclick = setQuestionChoice(7, 3);
document.getElementById('F7B3').onclick = setQuestionChoice(7, 4);
document.getElementById('F7B4').onclick = setQuestionChoice(7, 5);
document.getElementById('F8B0').onclick = setQuestionChoice(8, 1);
document.getElementById('F8B1').onclick = setQuestionChoice(8, 2);
document.getElementById('F8B2').onclick = setQuestionChoice(8, 3);
document.getElementById('F8B3').onclick = setQuestionChoice(8, 4);
document.getElementById('F8B5').onclick = setQuestionChoice(8, 5);
document.getElementById('F9B0').onclick = setQuestionChoice(9, 1);
document.getElementById('F9B1').onclick = setQuestionChoice(9, 2);
document.getElementById('F9B2').onclick = setQuestionChoice(9, 3);
document.getElementById('F9B3').onclick = setQuestionChoice(9, 4);
document.getElementById('F9B4').onclick = setQuestionChoice(9, 5);
document.getElementById('F10B0').onclick = setQuestionChoice(10, 1);
document.getElementById('F10B1').onclick = setQuestionChoice(10, 2);
document.getElementById('F10B2').onclick = setQuestionChoice(10, 3);
document.getElementById('F10B3').onclick = setQuestionChoice(10, 4);
document.getElementById('F10B4').onclick = setQuestionChoice(10, 5);


if (app) {
  ReactDOM.render(<CommandPalette commands={commands} />, app);
}
