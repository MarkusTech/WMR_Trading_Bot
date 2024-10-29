import { PriceData } from "../types";

export const macdStrategy = (
  prices: PriceData[],
  shortPeriod: number,
  longPeriod: number,
  signalPeriod: number
) => {
  // Extract closing prices for EMA calculations
  const closingPrices = prices.map((price) => price.close);

  const shortEMA = calculateEMA(closingPrices, shortPeriod);
  const longEMA = calculateEMA(closingPrices, longPeriod);

  const macd = shortEMA.map((value, index) => value - longEMA[index]);
  const signalLine = calculateEMA(macd, signalPeriod);

  const signals = [];
  for (let i = 1; i < macd.length; i++) {
    if (macd[i - 1] < signalLine[i - 1] && macd[i] > signalLine[i]) {
      signals.push({ date: prices[i + longPeriod - 1].date, signal: "buy" }); // Adjusted to access the correct date
    } else if (macd[i - 1] > signalLine[i - 1] && macd[i] < signalLine[i]) {
      signals.push({ date: prices[i + longPeriod - 1].date, signal: "sell" }); // Adjusted to access the correct date
    }
  }

  return signals;
};

// Updated calculateEMA to accept an array of numbers
const calculateEMA = (prices: number[], period: number) => {
  const k = 2 / (period + 1);
  const ema: number[] = [];

  // Start with the first price as the initial EMA
  ema.push(prices[0]);

  for (let i = 1; i < prices.length; i++) {
    const newEMA = (prices[i] - ema[i - 1]) * k + ema[i - 1];
    ema.push(newEMA);
  }

  return ema;
};
