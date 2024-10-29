import { PriceData } from "../types";

export const atrStrategy = (
  prices: PriceData[],
  period: number,
  threshold: number
) => {
  const signals = [];
  const trValues: number[] = [];

  // Calculate True Range (TR) for each price point
  for (let i = 1; i < prices.length; i++) {
    const currentHigh = prices[i].high;
    const currentLow = prices[i].low;
    const previousClose = prices[i - 1].close;

    // Calculate True Range (TR)
    const tr = Math.max(
      currentHigh - currentLow,
      Math.abs(currentHigh - previousClose),
      Math.abs(currentLow - previousClose)
    );
    trValues.push(tr);
  }

  // Calculate Average True Range (ATR)
  const atrValues = calculateATR(trValues, period);

  // Generate signals based on ATR value
  for (let i = period - 1; i < atrValues.length; i++) {
    const atrValue = atrValues[i];
    if (atrValue !== undefined) {
      // Check if atrValue is defined
      if (atrValue > threshold) {
        signals.push({ date: prices[i + 1].date, signal: "high volatility" });
      } else {
        signals.push({ date: prices[i + 1].date, signal: "low volatility" });
      }
    }
  }

  return signals;
};

// Function to calculate ATR from TR values
const calculateATR = (
  trValues: number[],
  period: number
): (number | undefined)[] => {
  const atr: (number | undefined)[] = [];

  for (let i = 0; i < trValues.length; i++) {
    if (i < period - 1) {
      atr.push(undefined);
    } else if (i === period - 1) {
      // Calculate the initial ATR
      const initialAtr =
        trValues.slice(0, period).reduce((sum, tr) => sum + tr, 0) / period;
      atr.push(initialAtr);
    } else {
      // Smooth ATR calculation
      const previousAtr = atr[i - 1];
      const currentTr = trValues[i];

      if (previousAtr !== undefined) {
        const newAtr = (previousAtr * (period - 1) + currentTr) / period;
        atr.push(newAtr);
      } else {
        atr.push(undefined);
      }
    }
  }

  return atr;
};
