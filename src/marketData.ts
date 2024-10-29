import axios from "axios";

const API_URL = "https://api.exchangeratesapi.io/latest"; // Example API URL

export const getMarketData = async (symbol: string): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_URL}?base=EUR&symbols=USD`);
    const rates = response.data.rates;

    // Transform the response to your needed format
    return Object.keys(rates).map((key) => ({
      close: rates[key],
      // Add other necessary fields here if available
    }));
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw error;
  }
};
