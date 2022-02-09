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
  let drawer = cid
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
  let empty = drawer.every(denom => denom[1] == 0);
  const status = empty ? "CLOSED" : "OPEN";
  change = empty ? cid : change.filter(denom => denom[1] > 0);
  return { status, change };
}
