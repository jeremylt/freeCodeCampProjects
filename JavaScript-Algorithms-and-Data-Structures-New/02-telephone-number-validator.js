function telephoneCheck(str) {
  return /^(1 ){0,1}[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(str) ||
         /^1{0,1} {0,1}\([0-9]{3}\) {0,1}[0-9]{3}-[0-9]{4}$/.test(str) ||
         /^(1 ){0,1}[0-9]{3} [0-9]{3} [0-9]{4}$/.test(str) ||
         /^(1 ){0,1}[0-9]{3} [0-9]{3} [0-9]{4}$/.test(str) ||
         /^(1 ){0,1}[0-9]{10}$/.test(str);
}

function checkAndDisplay() {
  const input = document.getElementById('user-input').value;
  const isValid = telephoneCheck(input);

  if (input.length === 0) {
    alert("Please provide a phone number");
  } else {
    document.getElementById('results-div').innerText = (isValid ? "Valid" : "Invalid") + " US number: " + input;
  }
}

function clearDisplay() {
  document.getElementById('results-div').innerText = "";
}

document.getElementById('check-btn').onclick = checkAndDisplay;
document.getElementById('clear-btn').onclick = clearDisplay;
