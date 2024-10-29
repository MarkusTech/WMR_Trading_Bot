import { PriceData } from "../types";

// Define a type for signals
export interface CandlePatternSignal {
  date: string; // Date of the signal
  signal: "buy" | "sell" | "hold"; // Type of signal based on the pattern detected
  pattern: string; // The name of the candlestick pattern
}

// Candle Pattern Strategy
export const candlePatternStrategy = (
  prices: PriceData[]
): CandlePatternSignal[] => {
  const signals: CandlePatternSignal[] = [];

  for (let i = 1; i < prices.length; i++) {
    const current = prices[i];
    const previous = prices[i - 1];

    // Check for Hammer pattern
    const isHammer =
      current.close < current.open && // Bearish candle
      current.open - current.low > 2 * (current.open - current.close) && // Long lower shadow
      current.high - current.close < current.open - current.close; // Small upper shadow

    // Check for Bullish Engulfing pattern
    const isBullishEngulfing =
      current.close > current.open && // Current is bullish
      previous.close < previous.open && // Previous is bearish
      current.open < previous.close && // Current opens lower than previous close
      current.close > previous.open; // Current closes higher than previous open

    // Check for Bearish Engulfing pattern
    const isBearishEngulfing =
      current.close < current.open && // Current is bearish
      previous.close > previous.open && // Previous is bullish
      current.open > previous.close && // Current opens higher than previous close
      current.close < previous.open; // Current closes lower than previous open

    // Create signals based on detected patterns
    if (isHammer) {
      signals.push({ date: current.date, signal: "buy", pattern: "Hammer" });
    } else if (isBullishEngulfing) {
      signals.push({
        date: current.date,
        signal: "buy",
        pattern: "Bullish Engulfing",
      });
    } else if (isBearishEngulfing) {
      signals.push({
        date: current.date,
        signal: "sell",
        pattern: "Bearish Engulfing",
      });
    }
  }

  return signals;
};
