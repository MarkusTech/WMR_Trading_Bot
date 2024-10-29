import { getMarketData } from "./marketData";
import { movingAverageCrossover } from "./strategies/movingAverage";
import { rsiStrategy } from "./strategies/rsi";
import { bollingerBands } from "./strategies/bollingerBands";
import { macdStrategy } from "./strategies/macd";
import { stochasticStrategy } from "./strategies/stochastic";
import { volumeAnalysis } from "./strategies/volume";
// import { supportResistanceStrategy } from "./strategies/supportResistance";
import { candlePatternStrategy } from "./strategies/candlePatterns";
import { trendLineStrategy } from "./strategies/trendLines";
import { atrStrategy } from "./strategies/atr";
import { PriceData } from "./types";

const TRADE_SYMBOL = "EURUSD"; // Trading symbol

const runBot = async () => {
  try {
    // Fetch market data as an array of PriceData
    const marketData: PriceData[] = await getMarketData(TRADE_SYMBOL);

    // Extract close prices for strategies that require them
    const prices = marketData.map((data) => data.close);

    // Call various strategies
    const maSignal = movingAverageCrossover(marketData, 9, 21);
    const rsiSignal = rsiStrategy(marketData, 14);
    const bbSignal = bollingerBands(marketData, 20, 2);
    const macdSignal = macdStrategy(marketData, 12, 26, 9);
    const stochasticSignal = stochasticStrategy(marketData, 14);
    const volumeSignal = volumeAnalysis(marketData, 1000);
    // const srSignal = supportResistanceStrategy(marketData, 1.1, 1.2);
    const candleSignal = candlePatternStrategy(marketData);
    const trendSignal = trendLineStrategy(marketData);
    const atrSignal = atrStrategy(marketData, 14, 0.01);

    // Log all signals for debugging
    console.log({
      maSignal,
      rsiSignal,
      bbSignal,
      macdSignal,
      stochasticSignal,
      volumeSignal,
      // srSignal,
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
