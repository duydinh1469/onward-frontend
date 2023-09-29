export function currencyFormat(money, currency) {
  return new Intl.NumberFormat("en-GB", {
    notation: "compact",
    style: "currency",
    currency: currency,
    compactDisplay: "short",
  }).format(money);
}
