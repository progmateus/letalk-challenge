function calcPercent(balance: number, percent: number) {
  return Number(balance.toFixed(2)) * Number(percent.toFixed(2)) / 100;
}

export { calcPercent }