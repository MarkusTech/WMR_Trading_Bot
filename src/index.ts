import { getMarketData } from "./marketData";
import { movingAverageCrossover } from "./strategies/movingAverage";
import { rsiStrategy } from "./strategies/rsi";
import { bollingerBands } from "./strategies/bollingerBands";
import { macdStrategy } from "./strategies/macd";
import { stochasticStrategy } from "./strategies/stochastic";
import { volumeAnalysis } from "./strategies/volume";
import { supportResistanceStrategy } from "./strategies/supportResistance";
import { candlePatternStrategy } from "./strategies/candlePatterns";
import { trendLineStrategy } from "./strategies/trendLines";
import { atrStrategy } from "./strategies/atr"; // Make sure to import the ATR strategy
import { PriceData } from "./types"; // Ensure you have the PriceData type defined

const TRADE_SYMBOL = "EURUSD"; // Trading symbol

const runBot = async () => {
  try {
    const marketData: PriceData[] = await getMarketData(TRADE_SYMBOL); // Fetch market data
    // Extract close prices from market data
    const prices = marketData.map((data) => data.close);

    // Call various strategies
    const maSignal = movingAverageCrossover(prices, 9, 21);
    const rsiSignal = rsiStrategy(marketData, 14);
    const bbSignal = bollingerBands(prices, 20, 2);
    const macdSignal = macdStrategy(marketData, 12, 26, 9);
    const stochasticSignal = stochasticStrategy(marketData, 14);
    const volumeSignal = volumeAnalysis(marketData, 1000); // Example volume threshold
    const srSignal = supportResistanceStrategy(marketData, 1.1, 1.2); // Example levels for EUR/USD
    const candleSignal = candlePatternStrategy(marketData);
    const trendSignal = trendLineStrategy(marketData, 1.15); // Example trend line
    const atrSignal = atrStrategy(marketData, 14, 0.01); // Example ATR threshold

    console.log({
      maSignal,
      rsiSignal,
      bbSignal,
      macdSignal,
      stochasticSignal,
      volumeSignal,
      srSignal,
      candleSignal,
      trendSignal,
      atrSignal,
    });

    // Example: Make trade decisions based on signals
    if (maSignal.length > 0 && rsiSignal.length > 0) {
      console.log("Place Buy Order for EUR/USD");
    } else if (maSignal.length < 0 || rsiSignal.length < 0) {
      console.log("Place Sell Order for EUR/USD");
    }
  } catch (error) {
    console.error("Error running the bot:", error);
  }
};

runBot();
