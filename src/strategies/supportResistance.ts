import { PriceData } from "../types";

export const supportResistanceStrategy = (
  prices: PriceData[],
  threshold: number
) => {
  const signals = [];

  for (let i = 1; i < prices.length; i++) {
    if (prices[i].close < prices[i - 1].close - threshold) {
      signals.push({ date: prices[i].date, signal: "buy" });
    } else if (prices[i].close > prices[i - 1].close + threshold) {
      signals.push({ date: prices[i].date, signal: "sell" });
    }
  }

  return signals;
};
