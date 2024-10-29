import { PriceData, SignalData } from "../types";

export const stochasticStrategy = (prices: PriceData[], period: number) => {
  const signals: SignalData[] = [];
  let previousDValue: number | undefined;

  for (let i = period; i < prices.length; i++) {
    const slice = prices.slice(i - period, i + 1);
    const highestHigh = Math.max(...slice.map((price) => price.close));
    const lowestLow = Math.min(...slice.map((price) => price.close));

    const kValue =
      ((prices[i].close - lowestLow) / (highestHigh - lowestLow)) * 100;
    const dValue = (kValue + (previousDValue || 0)) / 2;
    previousDValue = dValue;

    if (kValue > 80 && dValue > 80) {
      signals.push({ date: prices[i].date, signal: "sell", dValue });
    } else if (kValue < 20 && dValue < 20) {
      signals.push({ date: prices[i].date, signal: "buy", dValue });
    }
  }

  return signals;
};
