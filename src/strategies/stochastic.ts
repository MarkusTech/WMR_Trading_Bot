// src/strategies/stochastic.ts

import { PriceData } from "../types";

export const stochasticStrategy = (prices: PriceData[], period: number) => {
  const signals = [];

  for (let i = period; i < prices.length; i++) {
    const slice = prices.slice(i - period, i + 1);
    const highestHigh = Math.max(...slice.map((price) => price.close));
    const lowestLow = Math.min(...slice.map((price) => price.close));

    const kValue =
      ((prices[i].close - lowestLow) / (highestHigh - lowestLow)) * 100;
    const dValue = (kValue + (signals[i - 1]?.dValue || 0)) / 2; // Simple moving average of K

    if (kValue > 80 && dValue > 80) {
      signals.push({ date: prices[i].date, signal: "sell" });
    } else if (kValue < 20 && dValue < 20) {
      signals.push({ date: prices[i].date, signal: "buy" });
    }
  }

  return signals;
};
