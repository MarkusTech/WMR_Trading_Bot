import { PriceData } from "../types";

export const movingAverageCrossover = (
  prices: PriceData[],
  shortPeriod: number,
  longPeriod: number
) => {
  const shortMA = calculateMovingAverage(prices, shortPeriod);
  const longMA = calculateMovingAverage(prices, longPeriod);
  const signals = [];

  for (let i = 1; i < prices.length; i++) {
    if (shortMA[i - 1] < longMA[i - 1] && shortMA[i] > longMA[i]) {
      signals.push({ date: prices[i].date, signal: "buy" });
    } else if (shortMA[i - 1] > longMA[i - 1] && shortMA[i] < longMA[i]) {
      signals.push({ date: prices[i].date, signal: "sell" });
    }
  }

  return signals;
};

const calculateMovingAverage = (prices: PriceData[], period: number) => {
  const movingAverages: number[] = [];
  for (let i = 0; i <= prices.length - period; i++) {
    const slice = prices.slice(i, i + period);
    const average = slice.reduce((acc, price) => acc + price.close, 0) / period;
    movingAverages.push(average);
  }
  return movingAverages;
};
