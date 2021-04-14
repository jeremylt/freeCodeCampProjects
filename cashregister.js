function checkCashRegister(price, cash, cid) {
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
  // Copy drawer to cents
  let drawer = cid.map(denom => [denom[0], Math.round(denom[1]*100)]);
  // Compute change needed
  let totalChange = Math.round((cash - price)*100);
  let change = [];
  // Give money from drawer
  for (let i = drawer.length - 1; i >= 0; i--) {
    const cents = unitToCents[drawer[i][0]];
    let currentChange = 0;
    while (totalChange >= cents && drawer[i][1] >= cents){
      totalChange -= cents;
      drawer[i][1] -= cents;
      currentChange += cents;
    }
    if (currentChange !== 0) {
      change.push([drawer[i][0], currentChange])
    }
  }
  // Check for sufficient funds
  if (totalChange > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  // Check and return change and drawer status
  let empty = drawer.every(denom => denom[1] === 0);
  const status = empty ? "CLOSED" : "OPEN";
  change = empty ? cid : change.map(denom => [denom[0], denom[1]/100]);
  return { status, change };
}
