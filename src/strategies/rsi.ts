import { PriceData } from "../types";

export const rsiStrategy = (prices: PriceData[], period: number) => {
  const gains: number[] = [];
  const losses: number[] = [];
  const rsi: number[] = [];

  for (let i = 1; i < prices.length; i++) {
    const change = prices[i].close - prices[i - 1].close;
    gains.push(Math.max(change, 0));
    losses.push(Math.max(-change, 0));
  }

  for (let i = period; i < gains.length; i++) {
    const avgGain =
      gains.slice(i - period, i).reduce((a, b) => a + b, 0) / period;
    const avgLoss =
      losses.slice(i - period, i).reduce((a, b) => a + b, 0) / period;
    const rs = avgGain / avgLoss;
    rsi.push(100 - 100 / (1 + rs));
  }

  return rsi;
};
