import { PriceData } from "../types";

export const volumeAnalysis = (prices: PriceData[], threshold: number) => {
  const signals = [];

  for (let i = 1; i < prices.length; i++) {
    if (prices[i].volume > threshold) {
      signals.push({ date: prices[i].date, signal: "buy" }); // Example: Buy on high volume
    }
  }

  return signals;
};
