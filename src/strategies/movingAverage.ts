export const movingAverageCrossover = (
  prices: number[],
  shortPeriod: number,
  longPeriod: number
) => {
  const shortMA = calculateMovingAverage(prices, shortPeriod);
  const longMA = calculateMovingAverage(prices, longPeriod);
  let buySignal = false;
  let sellSignal = false;

  if (shortMA > longMA) {
    buySignal = true;
  } else if (shortMA < longMA) {
    sellSignal = true;
  }

  return { buySignal, sellSignal };
};

const calculateMovingAverage = (data: number[], period: number) => {
  if (data.length < period) return 0;
  const slice = data.slice(-period);
  const sum = slice.reduce((a, b) => a + b, 0);
  return sum / period;
};
