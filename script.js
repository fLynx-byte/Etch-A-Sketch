const DEFAULT_COLOR = "#333333";
const DEFAULT_SIZE = 16;

const reset = document.getElementById("reset");
const rgb = document.getElementById("rgb");
const color = document.getElementById("color");
const grid = document.querySelector(".grid");
const sizeSlider = document.getElementById("slider");
const sizeValue = document.getElementById("sizeValue");

let value = document.getElementById("slider").value;
let cell = grid.children;

/**
 * This function creates a grid of div elements on a webpage.
 * The number of div elements in the grid is determined by the input argument,
 * which specifies the number of rows and columns in the grid. The function
 * also adds a "mouseover" event listener to each div element, which changes
 * the background color of the element to the color specified by the second
 * argument, "color". Finally, the div elements are appended to an element with the id "grid".
 * @param {*} input the width and length of the grid
 */
function gridMaker(input, color) {
  for (let i = 0; i < input * input; i++) {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.addEventListener("mouseover", function (event) {
      event.target.style.backgroundColor = color;
    });
    grid.appendChild(div);
  }
}
/**
 * This function generates a random hexadecimal color code by creating a string of
 * all possible hexadecimal values and then using a loop to randomly select six of
 * those values and append them to a string with a "#" symbol at the beginning.
 * The resulting string is then returned as the random color code.
 * @returns a random color
 */
function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
reset.addEventListener("click", function () {
  for (let i = 0; i < value * value; i++) {
    cell[i].style.backgroundColor = "white";
  }
});

rgb.addEventListener("click", function () {
  for (let i = 0; i < value * value; i++) {
    cell[i].addEventListener("mouseover", function (e) {
      e.target.style.backgroundColor = getRandomColor();
    });
  }
});

color.addEventListener("input", function () {
  let newColor = color.value;
  for (let i = 0; i < value * value; i++) {
    cell[i].addEventListener("mouseover", function (e) {
      e.target.style.backgroundColor = newColor;
    });
  }
});
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
sizeSlider.addEventListener("input", function (e) {
  sizeValue.innerHTML = `${e.target.value} x ${e.target.value}`;
  removeAllChildNodes(grid);
  value = e.target.value;
  grid.setAttribute(
    "style",
    `grid-template-columns: repeat(${e.target.value}, 2fr); grid-template-rows: repeat(${e.target.value}, 2fr);`
  );
  gridMaker(e.target.value, DEFAULT_COLOR);
});

window.onload = () => {
  gridMaker(DEFAULT_SIZE, DEFAULT_COLOR);
};
