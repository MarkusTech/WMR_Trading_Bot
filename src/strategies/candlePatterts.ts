// src/strategies/candlePatterns.ts

import { PriceData } from "../types";

export const candlePatternStrategy = (prices: PriceData[]) => {
  const signals = [];

  for (let i = 1; i < prices.length; i++) {
    const current = prices[i];
    const previous = prices[i - 1];

    // Example: Bullish engulfing pattern
    if (current.close > previous.open && previous.close < previous.open) {
      signals.push({ date: current.date, signal: "buy" });
    }
    // Example: Bearish engulfing pattern
    else if (current.close < previous.open && previous.close > previous.open) {
      signals.push({ date: current.date, signal: "sell" });
    }
  }

  return signals;
};
