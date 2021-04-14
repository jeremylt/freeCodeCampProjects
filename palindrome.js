function palindrome(str) {
  // Character codes - faster than a regex
  const CODE_0 = "0".charCodeAt(0);
  const CODE_9 = "9".charCodeAt(0);
  const CODE_A = "A".charCodeAt(0);
  const CODE_Z = "Z".charCodeAt(0);
  // Split into alphanumeric UPPERCASE letters
  let alphanumeric = str
    .toUpperCase()
    .split("")
    .filter(
      char => {
        const code = char.charCodeAt(0);
        return (code >= CODE_0 && code <= CODE_9) ||
               (code >= CODE_A && code <= CODE_Z)
      });
  // Check for palinrome in remaining letters
  const length = alphanumeric.length;
  return alphanumeric.every(
    (char, index) => char === alphanumeric[length - 1 - index] // Note, checks more than is needed if true
  );
}
