function calcPercent(balance: number, percent: number) {
  return Number(Number(balance).toFixed(2)) * Number(Number(percent).toFixed(2)) / 100;
}

export { calcPercent }