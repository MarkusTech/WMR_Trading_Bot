import { PriceData } from "../types";

export const trendLineStrategy = (prices: PriceData[]) => {
  const signals = [];

  const trendLine = calculateTrendLine(prices);

  for (let i = 1; i < prices.length; i++) {
    if (prices[i].close > trendLine) {
      signals.push({ date: prices[i].date, signal: "buy" });
    } else {
      signals.push({ date: prices[i].date, signal: "sell" });
    }
  }

  return signals;
};

const calculateTrendLine = (prices: PriceData[]) => {
  // Placeholder for trend line calculation logic
  return prices[prices.length - 1].close;
};
