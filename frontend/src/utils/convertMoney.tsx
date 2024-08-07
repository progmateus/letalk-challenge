export const convertMoney = (value: number) => {
  return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'BRL' }).format(
    value,
  )
}