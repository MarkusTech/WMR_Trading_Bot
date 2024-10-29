export interface PriceData {
  date: string; // e.g., ISO date string
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
}

export interface SignalData {
  date: string; // Date of the signal
  signal: "buy" | "sell"; // Buy or sell signal
  dValue?: number; // Optional dValue for tracking
}

export interface BollingerBandSignal {
  date: string; // Date of the signal
  signal: "buy" | "sell" | "hold"; // Type of signal
  upperBand: number; // Upper Bollinger Band
  lowerBand: number; // Lower Bollinger Band
}
