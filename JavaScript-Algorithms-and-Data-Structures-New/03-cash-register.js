// Global variables required by freeCodeCamp
let price = 19.5;
let cid = [
  ["PENNY", .50],
  ["NICKEL", 0.0],
  ["DIME", 0.0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
];


// Use cents to avoid roundoff
const unitToCents = {
  "PENNY"       : 1,
  "NICKEL"      : 5,
  "DIME"        : 10,
  "QUARTER"     : 25,
  "ONE"         : 100,
  "FIVE"        : 500,
  "TEN"         : 1000,
  "TWENTY"      : 2000,
  "ONE HUNDRED" : 10000,
};

function checkCashRegister(price, cash, cid) {
  // Copy drawer to cents
  const drawer = cid
    .map(denom => [denom[0], Math.round(denom[1] * 100)])
    .reverse();
  // Compute change needed
  let totalChange = Math.round((cash - price) * 100);
  let change = drawer.reduce(
    (change, denom) => {
      const cents = unitToCents[denom[0]];
      let currentChange = 0;
      while (totalChange >= cents && denom[1] >= cents) {
        totalChange -= cents;
        denom[1] -= cents;
        currentChange += cents;
      }
      change.push([denom[0], currentChange / 100]);
      return change;
    },
    []
  )
  // Check for sufficient funds
  if (totalChange > 0.0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  // Check and return change and drawer status
  const empty = drawer.every(denom => denom[1] == 0);
  const status = empty ? "CLOSED" : "OPEN";
  change = empty ? cid : change.filter(denom => denom[1] > 0);
  return { status, change };
}

function checkAndDisplay() {
  const input = document.getElementById('cash').value;
  const cash = Number(input);

  document.getElementById('change-due').innerText = "";
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cash === price) {
    document.getElementById('change-due').innerText = "No change due - customer paid with exact cash";
  } else {
    const result = checkCashRegister(price, cash, cid);

    let message = "Status: " + result.status;
    for (const denomination of result.change) {
      // Closed drawer lists empty denominations
      if (denomination[1] > 0) {
        message += " " + denomination[0] + ": $" + denomination[1];
      }
    }
    document.getElementById('change-due').innerText = message;
  }
}

document.getElementById('purchase-btn').onclick = checkAndDisplay;
