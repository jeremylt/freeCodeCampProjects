// Character codes - faster than a regex
const CODE_0 = "0".charCodeAt(0);
const CODE_9 = "9".charCodeAt(0);
const CODE_A = "A".charCodeAt(0);
const CODE_Z = "Z".charCodeAt(0);

function isPalindrome(str) {
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

function checkPalindrome() {
  const input = document.getElementById('text-input').value;

  if (input.length === 0) {
    alert("Please input a value");
  } else {
    document.getElementById('result').innerText = input + " is " + (isPalindrome(input) ? "" : "not ") + "a palindrome";
  }
}

document.getElementById('check-btn').onclick = checkPalindrome;
