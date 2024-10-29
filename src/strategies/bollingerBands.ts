type PriceData = {
  close: number; // Closing price
  date: Date; // Date of the price
};

// Function to calculate Bollinger Bands
export const calculateBollingerBands = (
  prices: PriceData[],
  period: number,
  stdDevMultiplier: number
) => {
  if (prices.length < period) {
    throw new Error("Not enough data to calculate Bollinger Bands");
  }

  // Calculate the SMA
  const sma: number[] = [];
  const upperBand: number[] = [];
  const lowerBand: number[] = [];

  for (let i = 0; i <= prices.length - period; i++) {
    const slice = prices.slice(i, i + period);
    const sum = slice.reduce((acc, price) => acc + price.close, 0);
    const average = sum / period;
    sma.push(average);

    // Calculate standard deviation
    const variance =
      slice.reduce(
        (acc, price) => acc + Math.pow(price.close - average, 2),
        0
      ) / period;
    const stdDev = Math.sqrt(variance);

    // Calculate upper and lower bands
    upperBand.push(average + stdDevMultiplier * stdDev);
    lowerBand.push(average - stdDevMultiplier * stdDev);
  }

  // Create an array of objects containing the results
  const results = [];
  for (let i = 0; i < upperBand.length; i++) {
    results.push({
      date: prices[i + period - 1].date, // Using the date from the original price data
      sma: sma[i],
      upperBand: upperBand[i],
      lowerBand: lowerBand[i],
    });
  }

  return results;
};
