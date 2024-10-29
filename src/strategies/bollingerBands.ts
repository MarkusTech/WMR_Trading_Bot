import { PriceData, BollingerBandSignal } from "../types";

// Function to calculate the moving average
const calculateMovingAverage = (prices: number[], period: number): number[] => {
  const movingAverages: number[] = [];

  for (let i = 0; i <= prices.length - period; i++) {
    const slice = prices.slice(i, i + period);
    const average = slice.reduce((sum, price) => sum + price, 0) / period;
    movingAverages.push(average);
  }

  return movingAverages;
};

// Function to calculate the standard deviation
const calculateStandardDeviation = (
  prices: number[],
  period: number,
  movingAverage: number
): number => {
  const slice = prices.slice(prices.length - period);
  const variance =
    slice.reduce((sum, price) => sum + Math.pow(price - movingAverage, 2), 0) /
    period;
  return Math.sqrt(variance);
};

// Bollinger Bands Strategy
export const bollingerBands = (
  prices: PriceData[],
  period: number,
  numOfStdDev: number
): BollingerBandSignal[] => {
  const signals: BollingerBandSignal[] = [];
  const closingPrices = prices.map((price) => price.close); // Extract closing prices
  const movingAverages = calculateMovingAverage(closingPrices, period);

  for (let i = period - 1; i < closingPrices.length; i++) {
    const movingAverage = movingAverages[i - (period - 1)];
    const stdDev = calculateStandardDeviation(
      closingPrices.slice(0, i + 1),
      period,
      movingAverage
    );

    const upperBand = movingAverage + numOfStdDev * stdDev;
    const lowerBand = movingAverage - numOfStdDev * stdDev;

    let signal: "buy" | "sell" | "hold" = "hold";

    if (closingPrices[i] < lowerBand) {
      signal = "buy"; // Buy signal when price is below lower band
    } else if (closingPrices[i] > upperBand) {
      signal = "sell"; // Sell signal when price is above upper band
    }

    signals.push({
      date: prices[i].date,
      signal: signal,
      upperBand: upperBand,
      lowerBand: lowerBand,
    });
  }

  return signals;
};
