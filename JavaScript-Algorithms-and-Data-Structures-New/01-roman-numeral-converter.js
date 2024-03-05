// Numerals
const romanNumerals = {
  1000 : "M",
  900  : "CM",
  500  : "D",
  400  : "CD",
  100  : "C",
  90   : "XC",
  50   : "L",
  40   : "XL",
  10   : "X",
  9    : "IX",
  5    : "V",
  4    : "IV",
  1    : "I",
};

function convertToRoman(num) {
    // Decrement number while building roman numeral version
  return Object.keys(romanNumerals)
    .sort((a, b) => b - a)
    .reduce((romanNum, arabic) => {
      while (num >= arabic) {
        num -= arabic;
        romanNum += romanNumerals[arabic];
      }
      return romanNum;
    },
    "");
}

function convertAndDisplay() {
  const input = document.getElementById('number').value;

  let output = "";
  if (input.length === 0 || Number.isNaN(input)) {
    output = "Please enter a valid number";
  } else {
    const inputInt = parseInt(input);

    if (inputInt < 0) {
      output = "Please enter a number greater than or equal to 1";
    } else if (inputInt >= 4000) {
      output = "Please enter a number less than or equal to 3999";
    } else {
      output = convertToRoman(inputInt);
    }
  }
  document.getElementById('output').innerText = output;
}

document.getElementById('convert-btn').onclick = convertAndDisplay;
