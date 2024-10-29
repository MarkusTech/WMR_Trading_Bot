// src/strategies/macd.ts

import { PriceData } from "../types";

export const macdStrategy = (
  prices: PriceData[],
  shortPeriod: number,
  longPeriod: number,
  signalPeriod: number
) => {
  const shortEMA = calculateEMA(prices, shortPeriod);
  const longEMA = calculateEMA(prices, longPeriod);
  const macd = shortEMA.map((value, index) => value - longEMA[index]);
  const signalLine = calculateEMA(macd, signalPeriod);

  const signals = [];
  for (let i = 1; i < macd.length; i++) {
    if (macd[i - 1] < signalLine[i - 1] && macd[i] > signalLine[i]) {
      signals.push({ date: prices[i].date, signal: "buy" });
    } else if (macd[i - 1] > signalLine[i - 1] && macd[i] < signalLine[i]) {
      signals.push({ date: prices[i].date, signal: "sell" });
    }
  }

  return signals;
};

const calculateEMA = (prices: PriceData[], period: number) => {
  const k = 2 / (period + 1);
  const ema: number[] = [];

  // Start with the first price as the initial EMA
  ema.push(prices[0].close);

  for (let i = 1; i < prices.length; i++) {
    const newEMA = (prices[i].close - ema[i - 1]) * k + ema[i - 1];
    ema.push(newEMA);
  }

  return ema;
};
