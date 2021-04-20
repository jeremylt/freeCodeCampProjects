function convertToRoman(num) {
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
  const arabicNumerals = Object.keys(romanNumerals)
    .sort((a, b) => b - a);
  // Decrement number while building roman numeral version
  return arabicNumerals.reduce(
    (romanNum, arabic) => {
      while (num >= arabic) {
        num -= arabic;
        romanNum += romanNumerals[arabic];
      }
      return romanNum;
    },
    "");
}
