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
