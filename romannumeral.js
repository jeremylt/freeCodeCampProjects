function rot13(str) {
  // Constants
  const SHIFT = 13;
  const CODE_A = "A".charCodeAt(0);
  const CODE_Z = "Z".charCodeAt(0);
  // Map old characters to encoded (or back since this is a shift of 13)
  return str
    .split("")
    .map(
      char => {
        let value = char.charCodeAt(0);
        if (value >= CODE_A && value <= CODE_Z) {
          value = (((value + SHIFT - CODE_A) % 26) + CODE_A);
        }
        return String.fromCharCode(value);
      }
    )
    .join("");
}
